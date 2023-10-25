import svgPanZoom from "svg-pan-zoom";

export const enablePanZoom = (
  svgElement,
  chartId,
  containerRef,
  modalContainerRef
) => {
  let instance = null;
  if (!svgElement) {
    console.warn("SVG element is null or undefined.");
    return instance;
  }

  try {
    const calculatedHeight = calculateHeight(
      chartId,
      containerRef,
      modalContainerRef
    );
    const caclulatedWidth = calculateWidth(
      chartId,
      containerRef,
      modalContainerRef
    );

    svgElement.style.height = `${calculatedHeight}px`;
    svgElement.style.width = `${caclulatedWidth}px`;

    // Enable zoom
    instance = svgPanZoom(svgElement, {
      zoomEnabled: true,
      controlIconsEnabled: false,
      fit: true,
      center: true,
      minZoom: 0.5,
      maxZoom: 8
    });
    console.debug("enable svg pan/zoom");
  } catch (e) {
    console.warn("Error enabling pan/zoom:", e);
  }

  return instance;
};

const calculateHeight = (chartId, containerRef, modalContainerRef) => {
  let ref =
    chartId === "sequenceDiagramFixedId" || chartId === "flowChat"
      ? containerRef
      : modalContainerRef;
  if (ref.current) {
    return ref.current.offsetHeight > 200 ? ref.current.offsetHeight : 300;
  }
  return 400;
};

const calculateWidth = (chartId, containerRef, modalContainerRef) => {
  let ref =
    chartId === "sequenceDiagramFixedId" || chartId === "flowChat"
      ? containerRef
      : modalContainerRef;

  if (ref.current) {
    return ref.current.offsetWidth > 500 ? ref.current.offsetWidth : 600;
  }
  return 800;
};
