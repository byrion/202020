import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import TIMER_TARGET from "../types/TimerValue";

import TimerVisual from "./TimerVisual";

export interface Props {}

const Clock = (props: Props) => {
  const [timerState, setTimerState] = useState(TIMER_TARGET.TWENTY_SECONDS);

  const onTimerCompleted = () => {
    console.log("Timer Completed");
    const state =
      timerState === TIMER_TARGET.TWENTY_SECONDS
        ? TIMER_TARGET.TWENTY_MINUTES
        : TIMER_TARGET.TWENTY_SECONDS;
    setTimerState(state);
  };

  return <TimerVisual seconds={timerState} completed={onTimerCompleted} />;
};

export default Clock;
