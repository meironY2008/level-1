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
        //point a cordinates
        x: offsetX,
        y: offsetY - ((secondTime - time) % 60),
      },
      pointB: {
        //point b cordinates
        x: offsetX - ((secondTime - time) % 500),
        y: offsetY - 80 + ((secondTime - time) % 500),
      },
      pointC: {
        //point c cordinates
        x: offsetX - 80 + ((secondTime - time) % 500),
        y: offsetY - ((secondTime - time) % 500),
      },
    });
  };
  // delete by draw a new treangle with color green
  const handeleDeleteButton = () => {
    // pop last triangle from array
    const lastTriangle = treangeleArray.pop();
    console.log(lastTriangle);
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
    contextRef.current.closePath();
    contextRef.current.stroke();
  };
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
