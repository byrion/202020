import { IconButton, makeStyles } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";

export interface Props {
  pauseState: boolean;
  onPause(): void;
}

const useStyles = makeStyles(() => ({
  playIconButton: {
    marginLeft: -50,
    marginTop: -84,
  },
  playIcon: {
    width: 65,
    height: 65,
    color: "#cccccc",
    borderRadius: "50%",
    borderWidth: "0px",
  },
  introText: {
    fontSize: "1.2em",
    fontWeight: "normal",
    color: "#777777",
    paddingTop: "2em",
  },
}));

export const PlayPauseButton = (props: Props) => {
  const classes = useStyles();

  return (
    <IconButton
      onClick={props.onPause}
      component="span"
      className={classes.playIconButton}
    >
      {props.pauseState ? (
        <PlayCircleFilledIcon className={classes.playIcon} />
      ) : (
        <PauseCircleFilledIcon className={classes.playIcon} />
      )}
    </IconButton>
  );
};

export default PlayPauseButton;
