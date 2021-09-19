import React, { useEffect, useRef, useState } from "react";

function App() {
  // ref for the canvas
  const drawingRef = useRef(null);
  const contextRef = useRef(null);
  //time of click
  let time;
  useEffect(() => {
    const canvas = drawingRef.current;
    canvas.width = 400;
    canvas.height = 400;

    canvas.style.width = `400px`;
    canvas.style.height = `400px`;
    // libe info
    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;
  }, []);
  
  const startDrawing = () => {
    time = Date.now();
  };
  const releaseHandeler = () => {
    // take release time tap
    let secondTime = Date.now();
    //draw lines
    contextRef.current.beginPath();
    contextRef.current.moveTo(125, 125 - ((secondTime - time) % 50));
    contextRef.current.lineTo(
      125 - ((secondTime - time) % 500),
      45 + ((secondTime - time) % 500)
    );
    contextRef.current.lineTo(
      45 + ((secondTime - time) % 500),
      125 - ((secondTime - time) % 500)
    );
    contextRef.current.closePath();
    contextRef.current.stroke();
  };
  return (
    //element to click on
    <div
      onMouseDown={startDrawing}
      onMouseUp={releaseHandeler}
      style={{ height: "500px", width: "500px", background: "green" }}
    >
      {/* canvas element */}
      <canvas ref={drawingRef} />
    </div>
  );
}

export default App;
