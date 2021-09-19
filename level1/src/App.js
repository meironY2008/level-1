import React, { useEffect, useRef } from "react";

function App() {
  //ref to canvas
  const drawingRef = useRef(null);
  const contextRef = useRef(null);
  // create of the canvas
  useEffect(() => {
    //canvas size
    const canvas = drawingRef.current;
    canvas.width = 400;
    canvas.height = 400;

    canvas.style.width = `400px`;
    canvas.style.height = `400px`;
//canvas characteristics
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    //shape of line
    context.lineCap = "round";
    //color of line
    context.strokeStyle = "black";
    //width of line
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);
  const startDrawing = () => {
    //draw lines
    contextRef.current.beginPath();
    //draw first line
    contextRef.current.moveTo(125, 125);
    //draw second line
    contextRef.current.lineTo(125, 45);
    //draw third line
    contextRef.current.lineTo(45, 125);
    contextRef.current.closePath();
    contextRef.current.stroke();
  };

  return (
    //div to click on
    <div
      onClick={startDrawing}
      style={{ height: "500px", width: "500px", background: "green" }}
    >
      <canvas ref={drawingRef} />
    </div>
  );
}

export default App;
