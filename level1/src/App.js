import React, { useEffect, useRef,} from "react";

function App() {
  const treangeleArray = [];
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
    //change color of line
    contextRef.current.strokeStyle = "black";
    contextRef.current.lineWidth = 3;
   //cordinates of the click
   const { offsetX, offsetY } = nativeEvent;
   let secondTime = Date.now();
   // calculate the height we need
   let height = (100 + ((secondTime - time) % 500)) * (Math.sqrt(3) / 2);
   //draw lines
   contextRef.current.beginPath();
   //first point
   contextRef.current.moveTo(offsetX, offsetY);
   //draw line to second point
   contextRef.current.lineTo(offsetX + ((secondTime - time) % 500), offsetY + height);
   //draw line to third point
   contextRef.current.lineTo(offsetX - ((secondTime - time) % 500), offsetY + height);
   //draw line to first point
   contextRef.current.lineTo(offsetX, offsetY);
   contextRef.current.closePath();
   contextRef.current.stroke();
   //push last triangle into array
   treangeleArray.push({
     //point a coordinates
     pointA: {
       x: offsetX,
       y: offsetY ,
     },
     //point b coordinates
     pointB: {
       x: offsetX + ((secondTime - time) % 500),
       y: offsetY + height,
     },
     //point c coordinates
     pointC: {
       x: offsetX - ((secondTime - time) % 500),
       y: offsetY + height,
     },
   });
  };
  const handeleDeleteButton = () => {
    // pop last triangle from array
    const lastTriangle = treangeleArray.pop();
    console.log(lastTriangle);
    if (lastTriangle == null) return;
    //change color of line
    contextRef.current.strokeStyle = "green";
    contextRef.current.lineWidth = 7;
    contextRef.current.beginPath();
    //delete first line
    contextRef.current.moveTo(lastTriangle.pointA.x, lastTriangle.pointA.y);
    //delete second line
    contextRef.current.lineTo(lastTriangle.pointB.x, lastTriangle.pointB.y);
    //delete third line
    contextRef.current.lineTo(lastTriangle.pointC.x, lastTriangle.pointC.y);
    contextRef.current.closePath();
    contextRef.current.stroke();
   }
  return (
    //element to click on
    <div>
      <div
        onMouseDown={startDrawing}
        onMouseUp={releaseHandeler}
        style={{ height: "500px", width: "700px", background: "green" }}
      >
        {/* canvas element */}
        <canvas ref={drawingRef} />
      </div>
      {/* delete button */}
      <button onClick={handeleDeleteButton}>click for delete</button>
    </div>
  );
}

export default App;
