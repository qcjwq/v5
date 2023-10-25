import React from "react";
import { Button } from "react-bootstrap";
import { handleExportSVG } from "../common/Common";

const PanZoomControls = ({
  panZoomInstance,
  containerRef,
  exportSvgFileName
}) => {
  const handleZoomIn = () => {
    if (panZoomInstance) {
      panZoomInstance.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (panZoomInstance) {
      panZoomInstance.zoomOut();
    }
  };

  const handleReset = () => {
    if (panZoomInstance) {
      panZoomInstance.reset();
    }
  };

  return (
    <div className="d-flex" style={{ gap: "5px", marginLeft: "auto" }}>
      <Button variant="primary" onClick={handleZoomIn} size="sm">
        放大
      </Button>
      <Button variant="primary" onClick={handleZoomOut} size="sm">
        缩小
      </Button>
      <Button variant="primary" onClick={handleReset} size="sm">
        重置
      </Button>
      <Button
        variant="secondary"
        onClick={() => handleExportSVG(containerRef, exportSvgFileName)}
        size="sm"
      >
        导出SVG
      </Button>
    </div>
  );
};

export default PanZoomControls;
