import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import { nestJSON } from "../common/Common";
import { enablePanZoom } from "../common/UsePanZoom";
import PanZoomControls from "../panzoom/PanZoomControls";
import ParticipantSelector from "./ParticipantSelector";

function SequenceDiagram({ activeTab }) {
  const { data } = useAppContext();
  const sequenceDiagramContainerRef = useRef(null);
  const modalSequenceDiagramContainerRef = useRef(null);
  const [panZoomInstance, setPanZoomInstance] = useState(null);
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [participantSet, setParticipantSet] = useState(new Set());
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [checkboxStatus, setCheckboxStatus] = useState({});
  mermaid.initialize({ startOnLoad: false });

  useEffect(() => {
    if (activeTab === "SequenceDiagram") {
      const newSet = new Set();
      extractParticipants(data, newSet);
      setParticipantSet(newSet);

      // 当是第一次加载，或者checkedItems为空时，才设置为默认全选
      setCheckedItems(new Set(newSet));

      const renderChart = async () => {
        await renderSequenceDiagram(
          sequenceDiagramContainerRef,
          "sequenceDiagramFixedId"
        );
      };
      renderChart();
    }
  }, [activeTab, data]);

  useEffect(() => {
    const refreshDiagram = async (containerRef, chartId) => {
      if (checkedItems.size === 0) {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        return;
      }
      await renderSequenceDiagram(
        containerRef,
        chartId,
        data,
        checkedItems,
        setPanZoomInstance
      );
    };

    if (show) {
      refreshDiagram(
        modalSequenceDiagramContainerRef,
        "modalSequenceDiagramFixedId"
      );
    } else {
      refreshDiagram(sequenceDiagramContainerRef, "sequenceDiagramFixedId");
    }
  }, [checkedItems, show]);

  useEffect(() => {
    // 当checkedItems改变时，更新checkboxStatus
    const newStatus = {};
    Array.from(participantSet).forEach((participant) => {
      newStatus[participant] = checkedItems.has(participant);
    });
    setCheckboxStatus(newStatus);
  }, [checkedItems, participantSet]);

  // 全屏进入事件
  const handleEntered = async () => {
    await renderSequenceDiagram(
      modalSequenceDiagramContainerRef,
      "modalSequenceDiagramFixedId"
    );
  };

  // 全屏退出事件，重新渲染并激活原页面的 SVG
  const handleExited = async () => {
    await renderSequenceDiagram(
      sequenceDiagramContainerRef,
      "sequenceDiagramFixedId"
    );
  };

  const extractParticipants = (arr, set) => {
    arr.forEach((item) => {
      if (item.sourceParticipant) set.add(item.sourceParticipant);
      if (item.targetParticipant) set.add(item.targetParticipant);
      if (item.children) {
        extractParticipants(item.children, set);
      }
    });
  };

  const renderSequenceDiagram = async (containerRef, chartId) => {
    if (panZoomInstance) {
      try {
        panZoomInstance.disablePan();
        panZoomInstance.disableZoom();
        console.debug("disable svg pan/zoom");
      } catch (e) {
        console.warn("Error disabling pan/zoom:", e);
      }
    }

    if (!(data && data.length > 0)) {
      console.warn("Data is empty or not available");
      return;
    }

    try {
      const nest = nestJSON(data);
      const sequenceHeader = "sequenceDiagram";
      const allMermaidLines = generateMermaidFromNest(nest);
      const mermaidLines = filterMermaidLines(allMermaidLines, checkedItems);
      const mermaidData = mermaidLines.join("\n");
      const mermaidConfig = `${sequenceHeader}\n${mermaidData}`;
      console.info("sequence diagram:", mermaidConfig);

      if (containerRef.current) {
        const { svg } = await mermaid.render(chartId, mermaidConfig);
        containerRef.current.innerHTML = svg;
        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          const instance = enablePanZoom(
            svgElement,
            chartId,
            sequenceDiagramContainerRef,
            modalSequenceDiagramContainerRef
          );

          if (instance) {
            setPanZoomInstance(instance);
          } else {
            console.warn("pan/zoom instance is null");
          }
        } else {
          console.warn("SVG element not found in the DOM.");
        }
      }
    } catch (e) {
      console.warn("Mermaid rendering failed:", e);
    }
  };

  const filterMermaidLines = (mermaidLines, checkedItems) => {
    let stack = [];
    let filteredLines = [];

    mermaidLines.forEach((line) => {
      if (line.startsWith("alt ")) {
        stack.push({ type: "alt", lines: [] });
        return;
      }

      if (line.startsWith("else ")) {
        if (stack.length > 0 && stack[stack.length - 1].type === "alt") {
          stack[stack.length - 1].type = "else";
        }
        return;
      }

      if (line === "end") {
        const lastAlt = stack.pop();
        if (lastAlt && lastAlt.lines.length > 0) {
          filteredLines.push("alt " + lastAlt.lines[0].split(":")[1]);
          filteredLines.push(...lastAlt.lines);
          filteredLines.push("end");
        }
        return;
      }

      const [source, target] = line
        .split("->>")
        .map((p) => p.trim().split(":")[0]);

      if (checkedItems.has(source) && checkedItems.has(target)) {
        if (stack.length > 0) {
          stack[stack.length - 1].lines.push(line);
        } else {
          filteredLines.push(line);
        }
      }
    });

    return filteredLines;
  };

  const generateMermaidFromNest = (nestedArray) => {
    let lines = [];

    for (const item of nestedArray) {
      if (item.sourceParticipant && item.targetParticipant) {
        let line = `${item.sourceParticipant}->>${item.targetParticipant}: ${item.name}`;
        if (item.appId) {
          line += `<br/>${item.appId}`;
        }
        lines.push(line);
      }

      if (item.isAltGroup && item.children) {
        lines.push("alt " + item.children[0]?.name);
        lines.push(...generateMermaidFromNest(item.children));
        for (let i = 1; i < item.children.length; i++) {
          lines.push("else " + item.children[i]?.name);
          lines.push(...generateMermaidFromNest(item.children.slice(i, i + 1)));
        }
        lines.push("end");
      } else if (item.children) {
        lines.push(...generateMermaidFromNest(item.children));
      }
    }

    return lines;
  };

  // 全屏事件
  const handleShow = () => {
    setFullscreen(true);
    setShow(true);
  };

  // checkbox变更事件
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const newCheckedItems = new Set(checkedItems);
    if (e.target.checked) {
      newCheckedItems.add(value);
    } else {
      newCheckedItems.delete(value);
    }
    setCheckedItems(newCheckedItems);
  };

  // 全选事件
  const handleSelectAll = () => {
    setCheckedItems(new Set(participantSet));
  };

  // 全不选事件
  const handleDeselectAll = () => {
    setCheckedItems(new Set());
  };

  // 反选事件
  const handleInverseSelection = () => {
    const newCheckedItems = new Set();

    for (const item of participantSet) {
      if (checkedItems.has(item)) {
        // 如果已经选中，则忽略
        continue;
      } else {
        // 如果没有选中，则添加到新集合中
        newCheckedItems.add(item);
      }
    }

    // 将原来选中的项取消选中，并将新选中的项加入
    setCheckedItems(newCheckedItems);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <ParticipantSelector
          participantSet={participantSet}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
        <div className="d-flex align-items-center" style={{ gap: "5px" }}>
          <Button variant="primary" onClick={handleShow} size="sm">
            全屏查看
          </Button>
          <PanZoomControls
            panZoomInstance={panZoomInstance}
            containerRef={sequenceDiagramContainerRef}
            exportSvgFileName="sequence_diagram"
          />
        </div>
      </div>
      <div
        ref={sequenceDiagramContainerRef}
        id="sequenceDiagramContainer"
        style={{ height: "100%", width: "100%", padding: "10px" }}
      ></div>

      <Modal
        show={show}
        fullscreen={fullscreen}
        onHide={() => setShow(false)}
        onEntered={handleEntered}
        onExited={handleExited}
      >
        <Modal.Header closeButton>
          <Modal.Title>时序图</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between">
            <ParticipantSelector
              participantSet={participantSet}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
            />
            <div className="d-flex align-items-center" style={{ gap: "5px" }}>
              <PanZoomControls
                panZoomInstance={panZoomInstance}
                containerRef={modalSequenceDiagramContainerRef}
                exportSvgFileName="sequence_diagram"
              />
            </div>
          </div>
          <div
            ref={modalSequenceDiagramContainerRef}
            id="modalSequenceDiagramContainer"
            style={{ height: "100%", width: "100%", padding: "10px" }}
          ></div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SequenceDiagram;
