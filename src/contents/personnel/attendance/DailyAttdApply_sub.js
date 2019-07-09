import React from "react";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import useAxios from "../../../utils/useAxios";
import useInput from "../../../utils/useInput";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  rightPaper: {
    padding: theme.spacing(2),
    height: 650,
    width: 1000
  },
  leftPaper: {
    padding: theme.spacing(2),
    height: 650
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },
  subCategory: {
    background: "#232f3e",
    color: "white"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  button: {
    margin: 200
  }
}));

const DailyAttdApplySub = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  const basicDay = useInput();
  const time = useInput();
  const attdTypeCode = useInput();

  //----------------------------------
  const fetchBatchDailyAttd_axiosOptions = {
    url: `http://localhost:8282/hr/attendance/batchDailyAttd`,
    fetchOnStart: false,
    method: "POST",
    headers: { "content-type": "application/json" },
    data: {
      empCode: "1111", //이건 리덕스에서 받아와야함????
      empName: "JYP", //need 리덕스~
      dayAttdSeq: "",
      basicDay: basicDay.value,
      attdTypeCode: attdTypeCode.value,
      time: time.value,
      approvalStatus: "N",
      cost: "", //비용은 안할께요
      cause: "", //사유도 안할께요
      status: "inserted"
    }
  };

  const { fetch } = useAxios(fetchBatchDailyAttd_axiosOptions);

  const fetchBatchDailyAttd = () => {
    console.log("1111");
    console.log(basicDay.value);
    console.log(time.value);
    fetch();
  };

  //----------------------------------

  return (
    <Paper className={classes.leftPaper}>
      <AppBar position="relative" className={classes.subCategory}>
        <Toolbar>
          <Typography variant="h5">신청</Typography>
        </Toolbar>
      </AppBar>
      <form>
        <TextField
          disabled
          id="outlined-disabled"
          label="사원번호"
          defaultValue="need axios"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="사원명"
          defaultValue="need axios"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="date"
          label="기준일"
          type="date"
          defaultValue={basicDay.value}
          onChange={basicDay.onChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <br />
        <TextField
          id="time"
          label="시간"
          type="time"
          defaultValue={time.value}
          onChange={time.onChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 60
          }}
        />
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">
            근태구분
          </InputLabel>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={attdTypeCode.value}
            onChange={attdTypeCode.onChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="ADC001">출근</MenuItem>
            <MenuItem value="ADC003">외출</MenuItem>
            <MenuItem value="ADC004">귀사</MenuItem>
            <MenuItem value="ADC002">퇴근</MenuItem>
          </Select>
        </FormControl>
      </form>
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
      <Box>
        <Button
          variant={"outlined"}
          color={"primary"}
          onClick={fetchBatchDailyAttd}
          className={classes.button}
        >
          신청
        </Button>
      </Box>
    </Paper>
  );
};
export default DailyAttdApplySub;
