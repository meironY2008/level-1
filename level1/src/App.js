import React, { useEffect, useRef, useState } from "react";

function App() {
  // ref for the canvas
  const drawingRef = useRef(null);
  const contextRef = useRef(null);
  //time of click
  let time;
  useEffect(() => {
    const canvas = drawingRef.current;
    canvas.width = 1400;
    canvas.height = 1000;
    //canvas size
    canvas.style.width = `700px`;
    canvas.style.height = `500px`;
    // libe info
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
//time of press
  const startDrawing = () => {
    time = Date.now();
  };
  const releaseHandeler = () => {
    // take release time tap
    let secondTime = Date.now();
    // calculate the height we need
    let height = (100+((secondTime - time) % 500)) * (Math.sqrt(3)/2);
    //draw lines
    contextRef.current.beginPath();
    //first point
    contextRef.current.moveTo(150, 150);
    //draw line to second point
    contextRef.current.lineTo(150 +((secondTime - time) % 500), 150+ height);
    //draw line to third point
    contextRef.current.lineTo(150 - ((secondTime - time) % 500), 150 + height);
    //draw line to first point
    contextRef.current.lineTo(150, 150);
    
    contextRef.current.closePath();
    contextRef.current.stroke();
  };
  return (
    //element to click on
    <div
      onMouseDown={startDrawing}
      onMouseUp={releaseHandeler}
      style={{ height: "500px", width: "700px", background: "green" }}
    >
      {/* canvas element */}
      <canvas ref={drawingRef} />
    </div>
  );
}

export default App;
