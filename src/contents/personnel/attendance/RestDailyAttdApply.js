import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import useAxios from "../../../utils/useAxios";
import useInput from "../../../utils/useInput";
import Axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(theme => ({
  rightPaper: {
    padding: theme.spacing(2),
    height: 650
  },
  leftPaper: {
    padding: theme.spacing(2),
    height: 650
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
    paddingTop : 8,
    margin : 8
  },
  button : {
    margin : 20
  },
  subCategory: {
    background: "#232f3e",
    color: "white"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const DailyAttdApply = props => {
  const classes = useStyles();

  const columnDefs = [
    {
      headerName: "사번",
      field: "empCode",
      width : 100
    },
    {
      headerName: "이름",
      field: "empName",
      width : 130
    },
    {
      headerName: "근태외구분",
      field: "attdRestCode",
      width : 150
    },
    {
      headerName: "신청일",
      field: "requestDate",
      width : 130
    },
    {
      headerName: "시작일",
      field: "startDate",
      width : 130
    },
    {
      headerName: "종료일",
      field: "endDate",
      width : 130
    },
    {
      headerName: "일수",
      field: "days",
      width : 80
    },
    {
      headerName: "승인상태",
      field: "approvalStatus",
      width : 100
    },
    {
      headerName: "비용",
      field: "cost",
      width : 100
    },
    {
      headerName: "사유",
      field: "cause",
      width : 100
    }
  ];

  const fromDate = useInput("2019-01-01");
  const toDate = useInput("2019-12-31");

  const fetchAttdRestList_axiosOptions = {
    url: `http://localhost:8282/hr/attendance/findAttdRestList`,
    fetchOnStart: false,
    method: "post",
    data: {
      toDate: toDate.value,
      fromDate: fromDate.value,
      empCode: "1111"
    }
  };

  const { data, fetch } = useAxios(fetchAttdRestList_axiosOptions);

  const fetchAttdRestList = () => {
    fetch();
  };

  const [costOpen, setCostOpen] = React.useState(false);
  const [attdRestOpen, setAttdRestOpen] = React.useState(false);

  function costHandleClose() {
    setCostOpen(false);
    console.log(data);
  }

  function costHandleOpen() {
    setCostOpen(true);
  }

  function attdRestHandleClose() {
    setAttdRestOpen(false);
  }

  function attdRestHandleOpen() {
    setAttdRestOpen(true);
  }

  const requestDate = useInput();
  const attdRestStartDate = useInput();
  const attdRestEndDate = useInput();
  const attdRestTypeCode = useInput();
  const cause = useInput();
  const cost = useInput();

  const BatchDailyAttdRest = () => {
    Axios({
      method: "post",
      url: "http://localhost:8282/hr/attendance/batchDailyAttdRest",
      data: [
        {
          empCode: "1111",
          empName: "JYP",
          attdRestCode: attdRestTypeCode.value,
          requestDate: requestDate.value,
          startDate: attdRestStartDate.value,
          endDate: attdRestEndDate.value,
          days: (
            (new Date(attdRestEndDate.value).getTime() -
              new Date(attdRestStartDate.value).getTime()) /
            (1000 * 60 * 60 * 24)
          ).toString(),
          cost: cost.value,
          cause: cause.value,
          approvalStatus: "N",
          status: "inserted",
          otherSudang: "0",
          attdRestSeq: "seq",
          chk: "0"
        }
      ]
    })
      .then(response => {
        alert("success ^^a");
      })
      .catch(reason => {
        console.log(reason);
      });
  };
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">신청</Typography>
            </Toolbar>
          </AppBar>
          <form>
            <TextField
              id="requestDate"
              label="신청날짜"
              type="date"
              defaultValue={requestDate.value}
              onChange={requestDate.onChange}
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-attdRestTypeCode-simple"
              >
              ATTD TYPE
              </InputLabel>
              <Select
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="attdRestTypeCode"
                    id="outlined-attdRestTypeCode-simple"
                  />
                }
                open={attdRestOpen}
                onClose={attdRestHandleClose}
                onOpen={attdRestHandleOpen}
                value={attdRestTypeCode.value}
                onChange={attdRestTypeCode.onChange}
              >
                <MenuItem value="ASC002">출장</MenuItem>
                <MenuItem value="ASC003">교육</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="attdRestStartDate"
              label="근태외 시작일"
              type="date"
              variant="outlined"
              defaultValue={attdRestStartDate.value}
              onChange={attdRestStartDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="attdRestEndDate"
              label="근태외 종료일"
              type="date"
              variant="outlined"
              defaultValue={attdRestEndDate.value}
              onChange={attdRestEndDate.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={inputLabel}
                htmlFor="outlined-cost-simple"
              >
                COST
              </InputLabel>
              <Select
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="cost"
                    id="outlined-cost-simple"
                  />
                }
                open={costOpen}
                onClose={costHandleClose}
                onOpen={costHandleOpen}
                value={cost.value}
                onChange={cost.onChange}
              >
                <MenuItem value="ETS001">출장수당</MenuItem>
                <MenuItem value="ETS002">유류비</MenuItem>
                <MenuItem value="ETS003">자기계발지원금</MenuItem>
                <MenuItem value="ETS004">식비</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="cause"
              label="근태외 사유"
              variant="outlined"
              defaultValue={cause.value}
              onChange={cause.onChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <Box textAlign="right">
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={BatchDailyAttdRest}
              className={classes.button}
            >
              근태외 신청
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper className={classes.rightPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">근태외 현황조회</Typography>
            </Toolbar>
          </AppBar>
          <div>
            <TextField
              id={"fromDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={fromDate.value}
              onChange={fromDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            <TextField
              id={"toDate"}
              label={"검색날짜"}
              type={"date"}
              defaultValue={toDate.value}
              onChange={toDate.onChange}
              className={classes.textField}
              variant="outlined"
            />
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={fetchAttdRestList}
              className={classes.button}
            >
              조회
            </Button>
          </div>
          <div
            className={"ag-theme-material"}
            style={{
              height: "400px",
              width: "100%"
            }}
          >
            <AgGridReact columnDefs={columnDefs} rowData={data ? data : []} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DailyAttdApply;
