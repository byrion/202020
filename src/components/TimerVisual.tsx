import classes from "*.module.css";
import React, { useEffect, useRef, useState } from "react";

const ARC_ANGLE_MAX = 1.5;
const ARC_ANGLE_MIN = -0.5;
const ANGLE_RANGE = ARC_ANGLE_MAX - ARC_ANGLE_MIN;

export interface Props {
  value: number;
  total: number;
}

const TimerVisual = (props: Props) => {
  const canvasRef = useRef(null);

  // const [arcAngle, setArcAngle] = useState();

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas !== null) {
      var ctx = canvas.getContext("2d");

      // ctx.save();

      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ctx.restore();

      const radianUnit = ANGLE_RANGE / props.total;
      const arcAngle = props.value * -radianUnit + 1.5;

      console.log(arcAngle);

      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.arc(250, 250, 100, 1.5 * Math.PI, arcAngle * Math.PI, true);
      ctx.font = "64px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(props.value, 250, 252);
      ctx.stroke();
    }
  }, [props.value]);

  return <canvas height="500" width="500" ref={canvasRef} />;
};

export default TimerVisual;
