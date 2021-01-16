import moment, { Moment } from "moment";
import { useEffect, useRef, useState } from "react";
import { start } from "repl";
import TIMER_TARGET from "../types/TimerValue";

const ARC_ANGLE_TWELVE_OCLOCK = 1.5;

export interface Props {
  seconds: number;
  completed(): void;
  paused: boolean;
}

const TimerVisual = (props: Props) => {
  const canvasRef = useRef(null);

  const futureDate = moment().add(props.seconds, "second");
  const [deadline, setDeadline]: any = useState(futureDate);

  const [paused, setPaused]: any = useState(props.paused);

  useEffect(() => {
    const futureDate: Moment = moment().add(props.seconds, "second");
    setDeadline(futureDate);
  }, [props.seconds]);

  useEffect(() => {
    updateTimer();
  }, [deadline]);

  useEffect(() => {
    console.log("useEffect", props.paused);
    setPaused(props.paused);
  }, [props.paused]);

  const updateTimer = () => {
    const now = moment();

    const arcAngle =
      ((2 * Math.PI) / props.seconds) *
        ((now.valueOf() - deadline.valueOf()) / 1000) +
      4.7;

    const timeRemaining = (deadline.valueOf() - now.valueOf()) / 1000;
    const counter = timeRemaining > 60 ? timeRemaining / 60 : timeRemaining;
    const millisecondsRemaining = (counter % 1) * 60;

    const arcPosition = now.valueOf() - deadline.valueOf();

    renderTimer(
      arcPosition,
      Math.floor(counter),
      Math.floor(millisecondsRemaining)
    );
  };

  const renderTimer = (
    arcPosition: number,
    bigCounter: number,
    tinyCounter: number
  ) => {
    const canvas: any = canvasRef.current;
    if (canvas !== null) {
      const now = moment();
      var ctx = canvas.getContext("2d");

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 5;
      ctx.strokeStyle = "#cccccc";
      ctx.beginPath();

      const arcAngle =
        ((2 * Math.PI) / props.seconds) * (arcPosition / 1000) + 4.7;

      ctx.arc(250, 250, 100, ARC_ANGLE_TWELVE_OCLOCK * Math.PI, arcAngle, true);
      ctx.stroke();

      ctx.fillStyle = "#cccccc";
      ctx.textBaseline = "middle";

      ctx.font = "64px sans-serif";
      ctx.textAlign = "right";

      if (props.paused && paused) {
        ctx.fillText("I I", 266, 252);
      } else {
        ctx.fillText(bigCounter, 266, 252);
      }

      const tinyCounterStr: string =
        tinyCounter < 10 ? `0${tinyCounter}` : `${tinyCounter}`;

      ctx.font = "30px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(tinyCounterStr, 273, 262);

      if (bigCounter > 0) {
        window.requestAnimationFrame(updateTimer);
      } else if (bigCounter <= 0) {
        window.cancelAnimationFrame(canvas);
        props.completed();
      }
    }
  };

  return <canvas height="500" width="500" ref={canvasRef} />;
};

export default TimerVisual;
