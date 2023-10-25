import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useAppContext } from "../AppContext";
import { nestJSON, traverseData } from "../common/Common";

function MermaidGraph({ activeTab }) {
  const { data } = useAppContext();
  const graphContainerRef = useRef(null);
  mermaid.initialize({ startOnLoad: false });

  useEffect(() => {
    if (activeTab === "MermaidGraph") {
      const renderChart = async () => {
        await renderMermaidChart(graphContainerRef, "mermaidGraph");
      };
      setTimeout(renderChart, 0);
    }
  }, [activeTab, data]);

  const renderMermaidChart = async (containerRef, chartId) => {
    if (!(data && data.length > 0)) {
      console.warn("Data is empty or not available");
      return;
    }

    try {
      const nest = nestJSON(data);
      const graphDefinition = "graph LR;";
      const mermaidData = traverseData(nest, "0");
      const mermaidConfig = graphDefinition + "\n" + mermaidData;

      console.info("mermaid graph:", mermaidConfig);

      if (containerRef.current) {
        const { svg } = await mermaid.render(chartId, mermaidConfig);
        containerRef.current.innerHTML = svg;
      } else {
        console.warn("SVG element not found in the DOM.");
      }
    } catch (e) {
      console.warn("Mermaid rendering failed:", e);
    }
  };

  return <div ref={graphContainerRef} id="mermaidGraphContainer"></div>;
}

export default MermaidGraph;
