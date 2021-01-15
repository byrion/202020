import classes from "*.module.css";
import moment, { Moment } from "moment";
import React, { useEffect, useRef, useState } from "react";

const ARC_ANGLE_MAX = 1.5;
const ARC_ANGLE_MIN = -0.5;
const ANGLE_RANGE = ARC_ANGLE_MAX - ARC_ANGLE_MIN;

export interface Props {
  seconds: number;
}

const TimerVisual = (props: Props) => {
  const canvasRef = useRef(null);

  // animate frame
  // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations

  const futureDate = moment().add(props.seconds, "second");
  const [deadline, setDeadline]: any = useState(futureDate);

  useEffect(() => {
    const futureDate: Moment = moment().add(props.seconds, "second");
    setDeadline(futureDate);
  }, [props.seconds]);

  useEffect(() => {
    console.log(deadline);
    renderTimer();
  }, [deadline]);

  const renderTimer = () => {
    const canvas: any = canvasRef.current;
    if (canvas !== null) {
      const now = moment();
      var ctx = canvas.getContext("2d");

      // ctx.save();

      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ctx.restore();

      const arcAngle =
        ((2 * Math.PI) / props.seconds) *
          ((now.valueOf() - deadline.valueOf()) / 1000) +
        4.7;

      const secondsRemaining = (deadline.valueOf() - now.valueOf()) / 1000;
      const counter = Math.round(
        secondsRemaining > 60 ? secondsRemaining / 60 : secondsRemaining
      );

      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#cccccc";
      ctx.arc(250, 250, 100, 1.5 * Math.PI, arcAngle, true);
      ctx.font = "64px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#cccccc";
      ctx.fillText(counter, 250, 252);
      ctx.stroke();

      window.requestAnimationFrame(renderTimer);
    }
  };

  const calculateMillisecondsRemaining = (deadline: Moment) => {
    const now = moment().valueOf();
    const remaining = deadline.valueOf() - now;
    // console.log(now, deadline.valueOf(), remaining);
    return remaining;
  };

  return <canvas height="500" width="500" ref={canvasRef} />;
};

export default TimerVisual;
