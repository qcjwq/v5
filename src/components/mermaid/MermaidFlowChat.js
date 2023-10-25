import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Modal, Button } from "react-bootstrap";
import { useAppContext } from "../AppContext";
import { nestJSON } from "../common/Common";
import { enablePanZoom } from "../common/UsePanZoom";
import PanZoomControls from "../panzoom/PanZoomControls";

function MermaidFlowChat({ activeTab }) {
  const { data } = useAppContext();
  const flowChatContainerRef = useRef(null);
  const modalFlowChatContainerRef = useRef(null);
  const [panZoomInstance, setPanZoomInstance] = useState(null);
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  mermaid.initialize({ startOnLoad: false });

  useEffect(() => {
    if (activeTab === "MermaidFlowChat") {
      const renderChart = async () => {
        await renderMermaidChart(flowChatContainerRef, "flowChat");
      };
      setTimeout(renderChart, 0);
    }
  }, [activeTab, data]);

  const handleEntered = async () => {
    await renderMermaidChart(modalFlowChatContainerRef, "modalFlowChat");
  };

  const handleExited = async () => {
    await renderMermaidChart(flowChatContainerRef, "flowChat");
  };

  const renderMermaidChart = async (containerRef, chartId) => {
    if (!(data && data.length > 0)) {
      console.warn("Data is empty or not available");
      return;
    }

    if (panZoomInstance) {
      try {
        panZoomInstance.disablePan();
        panZoomInstance.disableZoom();
      } catch (e) {
        console.warn("Error disabling pan/zoom:", e);
      }
    }

    try {
      const nest = nestJSON(data);
      const graphDefinition = "graph TD;\n";
      const mermaidConfig = graphDefinition + generateMermaidConfig(nest);
      console.info("flow chat:", mermaidConfig);

      if (containerRef.current) {
        const { svg } = await mermaid.render(chartId, mermaidConfig);
        containerRef.current.innerHTML = svg;
        const svgElement = containerRef.current.querySelector("svg");
        if (svgElement) {
          const instance = enablePanZoom(
            svgElement,
            chartId,
            flowChatContainerRef,
            modalFlowChatContainerRef
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

  const handleShow = () => {
    setFullscreen(true);
    setShow(true);
  };

  function generateMermaidConfig(data, level = 0) {
    let mermaidData = "";

    if (level % 2 === 1) {
      mermaidData += "direction LR\n";
    }

    let prevChildId = null;
    data.forEach((node, index) => {
      const { id, name, children, isAlt } = node;
      if (children && children.length > 0) {
        mermaidData += `subgraph ${id}["${name}"]\n`;
        mermaidData += generateMermaidConfig(children, level + 1);
        mermaidData += "end\n";
      } else {
        mermaidData += `${id}["${name}"]\n`;
      }

      const isPartOfAltGroup = index > 0 && data[index - 1].isAlt;

      if (prevChildId) {
        if (isAlt || isPartOfAltGroup) {
          mermaidData += `${prevChildId} ~~~ ${id}\n`;
        } else {
          mermaidData += `${prevChildId} --> ${id}\n`;
        }
      }

      prevChildId = id;
    });

    return mermaidData;
  }

  return (
    <>
      <div className="d-flex" style={{ float: "right", gap: "5px" }}>
        <Button variant="primary" onClick={handleShow} size="sm">
          全屏查看
        </Button>
        <PanZoomControls
          panZoomInstance={panZoomInstance}
          containerRef={flowChatContainerRef}
          exportSvgFileName="flow_chat"
        />
      </div>

      <div
        ref={flowChatContainerRef}
        id="flowChatContainer"
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
          <Modal.Title>流程图</Modal.Title>
          <PanZoomControls
            panZoomInstance={panZoomInstance}
            containerRef={modalFlowChatContainerRef}
            exportSvgFileName="flow_chat"
          />
        </Modal.Header>
        <Modal.Body>
          <div
            ref={modalFlowChatContainerRef}
            id="modalFlowChatContainer"
            style={{ height: "100%", width: "100%", padding: "10px" }}
          ></div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MermaidFlowChat;
