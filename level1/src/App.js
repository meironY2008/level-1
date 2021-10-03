import React, { useEffect, useRef } from "react";

function App() {
  //array for the triangles
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
    //get item from local storage
    const saved = localStorage.getItem("triangle");
    const initialValue = JSON.parse(saved);
    if (initialValue != null) {
      for (let i = 0; i < initialValue.length; i++) {
        treangeleArray.push(initialValue[i]);
        contextRef.current.beginPath();
        //draw first line
        contextRef.current.moveTo(
          initialValue[i].pointA.x,
          initialValue[i].pointA.y
        );
        //draw second line
        contextRef.current.lineTo(
          initialValue[i].pointB.x,
          initialValue[i].pointB.y
        );
        //draw third line
        contextRef.current.lineTo(
          initialValue[i].pointC.x,
          initialValue[i].pointC.y
        );
        contextRef.current.closePath();
        contextRef.current.stroke();
      }
    }
  }, []);

  const startDrawing = () => {
    //time of start drawing
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
   };

  const handleSaveButton = () => {
    //save item to local storage
    localStorage.setItem("triangle", JSON.stringify(treangeleArray));
  };
  return (
    
    <div>
      {/* element to click on */}
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
      {/* save button */}
      <button onClick={handleSaveButton}>save</button>
    </div>
  );
}



export default App;
