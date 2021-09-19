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
    time = Date.now();
  };
  const releaseHandeler = ({ nativeEvent }) => {
    //cordinates of the click
    const { offsetX, offsetY } = nativeEvent;
    // take release time tap
    let secondTime = Date.now();
    //set color of line
    contextRef.current.strokeStyle = "black";
    //draw lines
    contextRef.current.beginPath();
    //draw first line
    contextRef.current.moveTo(offsetX, offsetY - ((secondTime - time) % 60));
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
    //push last triangle into array
    treangeleArray.push({
      pointA: {
        x: offsetX,
        y: offsetY - ((secondTime - time) % 60),
      },
      pointB: {
        x: offsetX - ((secondTime - time) % 500),
        y: offsetY - 80 + ((secondTime - time) % 500),
      },
      pointC: {
        x: offsetX - 80 + ((secondTime - time) % 500),
        y: offsetY - ((secondTime - time) % 500),
      },
    });
  };
  const handeleDeleteButton = () => {
    // pop last triangle from array
    const lastTriangle = treangeleArray.pop();
    //if array of triangles empty he will do nothing
    if (lastTriangle == null) return;
    //change color of line
    contextRef.current.strokeStyle = "green";
    contextRef.current.beginPath();
    //delete first line
    contextRef.current.moveTo(lastTriangle.pointA.x, lastTriangle.pointA.y);
    //delete second line
    contextRef.current.lineTo(lastTriangle.pointB.x, lastTriangle.pointB.y);
    //delete third line
    contextRef.current.lineTo(lastTriangle.pointC.x, lastTriangle.pointC.y);
    //end of draw
    contextRef.current.closePath();
    // draw the lines
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
