import moment, { Moment } from "moment";
import { useEffect, useRef, useState } from "react";

const ARC_ANGLE_TWELVE_OCLOCK = 1.5;

export interface Props {
  seconds: number;
  completed(): void;
}

const TimerVisual = (props: Props) => {
  const canvasRef = useRef(null);

  const futureDate = moment().add(props.seconds, "second");
  const [deadline, setDeadline]: any = useState(futureDate);

  useEffect(() => {
    const futureDate: Moment = moment().add(props.seconds, "second");
    setDeadline(futureDate);
  }, [props.seconds]);

  useEffect(() => {
    renderTimer();
  }, [deadline]);

  const renderTimer = () => {
    const canvas: any = canvasRef.current;
    if (canvas !== null) {
      const now = moment();
      var ctx = canvas.getContext("2d");

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const arcAngle =
        ((2 * Math.PI) / props.seconds) *
          ((now.valueOf() - deadline.valueOf()) / 1000) +
        4.7;

      const timeRemaining = (deadline.valueOf() - now.valueOf()) / 1000;

      const counter = timeRemaining > 60 ? timeRemaining / 60 : timeRemaining;
      const millisecondsRemaining = Math.floor((counter % 1) * 60);
      const counterMillis: string =
        millisecondsRemaining < 10
          ? `0${millisecondsRemaining}`
          : `${millisecondsRemaining}`;

      ctx.lineWidth = 5;
      ctx.strokeStyle = "#cccccc";
      ctx.beginPath();
      ctx.arc(250, 250, 100, ARC_ANGLE_TWELVE_OCLOCK * Math.PI, arcAngle, true);
      ctx.stroke();

      ctx.fillStyle = "#cccccc";
      ctx.textBaseline = "middle";

      ctx.font = "64px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(Math.floor(counter), 266, 252);

      ctx.font = "30px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(counterMillis, 273, 262);

      if (timeRemaining > 0) {
        window.requestAnimationFrame(renderTimer);
      } else {
        props.completed();
      }
    }
  };

  return <canvas height="500" width="500" ref={canvasRef} />;
};

export default TimerVisual;
