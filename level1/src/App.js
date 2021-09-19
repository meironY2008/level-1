import React, { useEffect, useRef } from "react";

function App() {
  const drawingRef = useRef(null);
  const contextRef = useRef(null);
  useEffect(() => {
    const canvas = drawingRef.current;
    canvas.width = 400;
    canvas.height = 400;

    canvas.style.width = `400px`;
    canvas.style.height = `400px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);
  const startDrawing = () => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(125, 125);
    contextRef.current.lineTo(125, 45);
    contextRef.current.lineTo(45, 125);
    contextRef.current.closePath();
    contextRef.current.stroke();
  };

  return (
    <div
      onClick={startDrawing}
      style={{ height: "500px", width: "500px", background: "green" }}
    >
      <canvas ref={drawingRef} />
    </div>
  );
}

export default App;
