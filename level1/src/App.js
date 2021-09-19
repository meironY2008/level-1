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

  const startDrawing = () => {
    time = Date.now();
  };
  const releaseHandeler = ({ nativeEvent }) => {
    //cordinates of the click
    const { offsetX, offsetY } = nativeEvent;
    // take release time tap
    let secondTime = Date.now();
    //draw lines
    contextRef.current.beginPath();
    //draw first line
    contextRef.current.moveTo(offsetX, offsetY - ((secondTime - time) % 50));
    //draw second line
    contextRef.current.lineTo(
      offsetX - ((secondTime - time) % 500),
      offsetY - 80 + ((secondTime - time) % 500)
    );
    //draw third line
    contextRef.current.lineTo(
      offsetX - 80 + ((secondTime - time) % 500),
      offsetY - ((secondTime - time) % 500)
    );
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
