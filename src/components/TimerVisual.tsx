import moment, { Moment } from "moment";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

  const [millisRemaining, setMillisRemaining]: any = useState(0);

  useEffect(() => {
    const now = moment();
    renderTimer(now, 20);
  }, []);

  useEffect(() => {
    const futureDate: Moment = moment().add(props.seconds, "second");
    setDeadline(futureDate);
  }, [props.seconds]);

  useLayoutEffect(() => {
    if (props.paused) {
      const now = moment();
      const remainder = deadline.valueOf() - now.valueOf();
      setMillisRemaining(remainder);
    } else if (millisRemaining > 0) {
      const newDeadline = moment().add(millisRemaining, "milliseconds");
      setMillisRemaining(0);
      setDeadline(newDeadline);
    }
  }, [props.paused]);

  useLayoutEffect(() => {
    let timerId: number;

    if (!props.paused && millisRemaining === 0) {
      const updateTimer = () => {
        const now = moment();
        const timeRemaining = (deadline.valueOf() - now.valueOf()) / 1000;

        if (timeRemaining >= 0) {
          renderTimer(now, timeRemaining);
          timerId = window.requestAnimationFrame(updateTimer);
        } else {
          window.cancelAnimationFrame(timerId);
          props.completed();
        }
      };

      timerId = window.requestAnimationFrame(updateTimer);

      return () => window.cancelAnimationFrame(timerId);
    }
  }, [props.paused, deadline]);

  const renderTimer = (now: Moment, timeRemaining: number) => {
    const counter = timeRemaining > 60 ? timeRemaining / 60 : timeRemaining;
    const millisecondsRemaining = Math.floor((counter % 1) * 60);

    const arcPosition = now.valueOf() - deadline.valueOf();

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

      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        100,
        ARC_ANGLE_TWELVE_OCLOCK * Math.PI,
        arcAngle,
        true
      );
      ctx.stroke();

      ctx.fillStyle = "#cccccc";
      ctx.textBaseline = "middle";

      ctx.font = "64px sans-serif";
      ctx.textAlign = "right";

      // console.log(props.paused, paused);
      // if (props.paused) {
      //   ctx.fillText("20", canvas.width / 2 + 23, canvas.height / 2);
      // } else {
      ctx.fillText(
        Math.floor(counter),
        canvas.width / 2 + 20,
        canvas.height / 2
      );
      // }

      const tinyCounterStr: string =
        millisecondsRemaining < 10
          ? `0${millisecondsRemaining}`
          : `${millisecondsRemaining}`;

      ctx.font = "30px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        tinyCounterStr,
        canvas.width / 2 + 30,
        canvas.height / 2 + 10
      );
    }
  };

  return <canvas height="250" width="250" ref={canvasRef} />;
};

export default TimerVisual;
