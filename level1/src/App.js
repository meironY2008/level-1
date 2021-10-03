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

    let height = 100 * (Math.sqrt(3)/2);
    //draw lines
    contextRef.current.beginPath();
    //first point
    contextRef.current.moveTo(80, 80);
    //draw line to second point
    contextRef.current.lineTo(130, 80+height);
    //draw line to third point
    contextRef.current.lineTo(30, 80+height);
    //draw line to first point
    contextRef.current.lineTo(80, 80);
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
