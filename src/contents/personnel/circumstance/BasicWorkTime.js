import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import useAxios from "../../../utils/useAxios";
import useInput from "../../../utils/useInput";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    height: 800
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },
  subCategory: {
    background: "#232f3e",
    color: "white"
  }
}));

//58이신헌 1907060730
const BasicWorkTime = props => {
  const classes = useStyles();
  const applyYear = useInput("");
  const axiosOptions = {
    url:
      `http://localhost:8282/hr/circumstance/findBaseWorkTime/` +
      applyYear.value.toString().substring(0, 4),
    fetchOnStart: false,
    method: "post"
  };

  const { data, fetch } = useAxios(axiosOptions);

  const fetchWorkTimeInfo = () => {
    fetch();
  };

  const attendTime = useInput("");
  const quitTime = useInput("");
  const lunchStartTime = useInput("");
  const lunchEndTime = useInput("");
  const overTime = useInput("");
  const nightTime = useInput("");
  const flag = useInput("");

  const setData = () => {
    if (data && data.attendTime !== null) {
      attendTime.setValue(data.attendTime);
      quitTime.setValue(data.quitTime);
      lunchStartTime.setValue(data.lunchStartTime);
      lunchEndTime.setValue(data.lunchEndTime);
      overTime.setValue(data.overTime);
      nightTime.setValue(data.nightTime);
      flag.setValue(data.status);
    } else {
      if(data){
        flag.setValue(data.status);
        console.log("flag : "+flag.value);
      }
      attendTime.setValue('');
      quitTime.setValue('');
      lunchStartTime.setValue('');
      lunchEndTime.setValue('');
      overTime.setValue('');
      nightTime.setValue('');
    }
  };

  const checkDate = () => {
    if (data && data.applyYear !== applyYear.value.toString().substring(0, 4)) {
      fetch();
    }
  };

  useEffect(checkDate, [applyYear.value]);
  useEffect(setData, [data]);

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const deleteWorkTimeInfo = () => {
    if (!applyYear.value) {
      alert("삭제연도를 선택해주세요 ^^a");
    } else {
      alert(
        applyYear.value.toString().substring(0, 4) +
          "년의 기본근무시간 데이터가 삭제됩니다."
      );
      Axios({
        method: "post",
        url: "http://localhost:8282/hr/circumstance/batchBaseWorkTime",
        fetchOnStart: false,
        data: [
          {
            applyYear: applyYear.value.toString().substring(0, 4),
            status: "deleted"
          }
        ]
      })
        .then(function(response) {
          alert("success ^^a");
          fetch();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const saveWorkTimeInfo = () => {
    if (!data) {
      alert("조회부터 해주세요 ^^a");
    } else if (
      !attendTime.value ||
      !quitTime.value ||
      !lunchStartTime.value ||
      !lunchEndTime.value ||
      !overTime.value ||
      !nightTime.value
    ) {
      alert("데이터를 입력해주세요 ^^a");
    } else {
      let status = "";
      let sendData = {
        applyYear: applyYear.value.toString().substring(0, 4),
        attendTime: attendTime.value,
        quitTime: quitTime.value,
        lunchStartTime: lunchStartTime.value,
        lunchEndTime: lunchEndTime.value,
        overTime: overTime.value,
        nightTime: nightTime.value,
        dinnerStartTime: quitTime.value,
        dinnerEndTime: overTime.value
      };

      if (flag.value === "noData") {
        status = "registBaseWorkTime";
      }
      else {
        status = "batchBaseWorkTime";
      }

      if (status === "batchBaseWorkTime") {
        sendData.status = "updated";
        sendData = [sendData];
      }
      
      Axios({
        method: "post",
        url: "http://localhost:8282/hr/circumstance/" + status,
        fetchOnStart: false,
        data: sendData
      })
        .then(function(response) {
          alert("success ^^a");
          fetch();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">근무시간 정보</Typography>
            </Toolbar>
          </AppBar>
          <form>
            <Table>
              <TableRow>
                <td>
                  <TableCell>
                    <TextField
                      id="outlined-read-only-input"
                      defaultValue="적용날짜선택"
                      className={classes.textField}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="applyYear"
                      type="date"
                      defaultValue={applyYear.value}
                      onChange={applyYear.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"outlined"}
                      color={"primary"}
                      onClick={fetchWorkTimeInfo}
                    >
                      조회
                    </Button>
                  </TableCell>
                </td>
              </TableRow>
              <TableRow>
                <td>
                  <TableCell>
                    <TextField
                      id="outlined-read-only-input"
                      defaultValue="출근시간"
                      className={classes.textField}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="attendTime"
                      variant="outlined"
                      value={attendTime.value}
                      onChange={attendTime.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </TableCell>
                </td>
              </TableRow>
              <TableRow>
                <td>
                  <TableCell>
                    <TextField
                      id="outlined-read-only-input"
                      defaultValue="퇴근시간"
                      className={classes.textField}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="quitTime"
                      variant="outlined"
                      value={quitTime.value}
                      onChange={quitTime.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </TableCell>
                </td>
              </TableRow>
              <TableRow>
                <td>
                  <TableCell>
                    <TextField
                      id="outlined-read-only-input"
                      defaultValue="점심시간시작"
                      className={classes.textField}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="lunchStartTime"
                      variant="outlined"
                      value={lunchStartTime.value}
                      onChange={lunchStartTime.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </TableCell>
                </td>
              </TableRow>
              <TableRow>
                <td>
                  <TableCell>
                    <TextField
                      id="outlined-read-only-input"
                      defaultValue="점심시간종료"
                      className={classes.textField}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="lunchEndTime"
                      variant="outlined"
                      value={lunchEndTime.value}
                      onChange={lunchEndTime.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </TableCell>
                </td>
              </TableRow>
              <TableRow>
                <td>
                  <TableCell>
                    <TextField
                      id="outlined-read-only-input"
                      defaultValue="연장근무시작시간"
                      className={classes.textField}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="overTime"
                      variant="outlined"
                      value={overTime.value}
                      onChange={overTime.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"outlined"}
                      color={"primary"}
                      onClick={handleClickOpen}
                    >
                      삭제
                    </Button>
                    <Dialog
                      open={open}
                      onClose={() => {
                        setOpen(false);
                      }}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"삭제 확인창"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => {
                            setOpen(false);
                          }}
                          color="secondary"
                        >
                          No
                        </Button>
                        <Button
                          onClick={() => {
                            setOpen(false);
                            deleteWorkTimeInfo();
                          }}
                          color="primary"
                          autoFocus
                        >
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </td>
              </TableRow>
              <TableRow>
                <td>
                  <TableCell>
                    <TextField
                      id="outlined-read-only-input"
                      defaultValue="심야근무시작시간"
                      className={classes.textField}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="nightTime"
                      variant="outlined"
                      value={nightTime.value}
                      onChange={nightTime.onChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"outlined"}
                      color={"primary"}
                      onClick={saveWorkTimeInfo}
                    >
                      저장
                    </Button>
                  </TableCell>
                </td>
              </TableRow>
            </Table>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BasicWorkTime;
