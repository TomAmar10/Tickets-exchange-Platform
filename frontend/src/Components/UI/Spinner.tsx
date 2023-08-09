import { CircularProgress, Stack } from "@mui/material";
import "./Spinner.scss";

function Spinner(props: any): JSX.Element {
  return (
    <Stack sx={props.style} spacing={2} direction="row">
      <CircularProgress className="spinner" style={props.spinnerStyle} />
    </Stack>
  );
}

export default Spinner;
