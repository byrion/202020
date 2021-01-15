import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";

import TimerVisual from "./TimerVisual";

export interface Props {
  startValue: number;
}

const Clock = (props: Props) => {
  const [timerValue, setTimerValue] = useState(props.startValue);

  useEffect(() => {
    if (timerValue < 0) {
      setTimerValue(props.startValue);
    }
  }, [timerValue]);

  useEffect(() => {
    setInterval(() => {
      setTimerValue((timerValue) => timerValue - 1);
    }, 1000);
  }, []);

  return <TimerVisual seconds={20} />;
};

export default Clock;
