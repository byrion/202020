import moment, { Moment } from "moment";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ARC_ANGLE_TWELVE_OCLOCK = 1.5;

export interface Props {
  targetSeconds: number;
  paused: boolean;
  timerCompleted(): void;
}

const TimerVisual = (props: Props) => {
  const canvasRef = useRef(null);

  const futureDate = moment().add(props.targetSeconds, "second");
  const [targetTimestamp, setTargetTimestamp]: any = useState(futureDate);

  const [millisRemaining, setMillisRemaining]: any = useState(0);

  useEffect(() => {
    const now = moment();
    renderTimer(now, props.targetSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const futureDate: Moment = moment().add(props.targetSeconds, "second");
    setTargetTimestamp(futureDate);
  }, [props.targetSeconds]);

  useLayoutEffect(() => {
    if (props.paused) {
      const now = moment();
      const remainder = targetTimestamp.valueOf() - now.valueOf();
      setMillisRemaining(remainder);
    } else if (millisRemaining > 0) {
      const newDeadline = moment().add(millisRemaining, "milliseconds");
      setMillisRemaining(0);
      setTargetTimestamp(newDeadline);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.paused]);

  useLayoutEffect(() => {
    let animationRequest: number;

    if (!props.paused && millisRemaining === 0) {
      const updateTimer = () => {
        const now = moment();
        const timeRemaining =
          (targetTimestamp.valueOf() - now.valueOf()) / 1000;

        if (timeRemaining >= 0) {
          renderTimer(now, timeRemaining);
          animationRequest = window.requestAnimationFrame(updateTimer);
        } else {
          window.cancelAnimationFrame(animationRequest);
          props.timerCompleted();
        }
      };

      animationRequest = window.requestAnimationFrame(updateTimer);

      return () => window.cancelAnimationFrame(animationRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.paused, targetTimestamp]);

  const renderTimer = (now: Moment, timeRemaining: number) => {
    const counter = timeRemaining > 60 ? timeRemaining / 60 : timeRemaining;
    const tinyCounter = Math.floor((counter % 1) * 60);

    const arcPosition = now.valueOf() - targetTimestamp.valueOf();

    const canvas: any = canvasRef.current;
    if (canvas !== null) {
      var ctx = canvas.getContext("2d");

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 5;
      ctx.strokeStyle = "#cccccc";
      ctx.beginPath();

      const arcAngle =
        ((2 * Math.PI) / props.targetSeconds) * (arcPosition / 1000) + 4.7;

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

      ctx.fillText(
        Math.floor(counter),
        canvas.width / 2 + 18,
        canvas.height / 2 + 3
      );

      const tinyCounterStr: string =
        tinyCounter < 10 ? `0${tinyCounter}` : `${tinyCounter}`;

      ctx.font = "30px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(
        tinyCounterStr,
        canvas.width / 2 + 24,
        canvas.height / 2 + 13
      );
    }
  };

  return <canvas height="250" width="250" ref={canvasRef} />;
};

export default TimerVisual;
