import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { AgGridReact } from "ag-grid-react";
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

import DailyAttdApplySub from "./DailyAttdApply_sub";

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
    margin: 2
  }
}));

const DailyAttdApply = () => {
  const classes = useStyles();

  const columnDefs = [
    {
      headerName: "사원번호",
      field: "empCode"
    },
    {
      headerName: "사원이름",
      field: "empName"
    },
    {
      headerName: "기준일",
      field: "basicDay"
    },
    {
      headerName: "근태구분",
      field: "attdTypeCode"
    },
    {
      headerName: "시간",
      field: "time"
    }
  ];

  const fromDate = useInput();
  const toDate = useInput();

  const fetchDailyAttdList_axiosOptions = {
    url: `http://localhost:8282/hr/attendance/findDailyAttdList`,
    fetchOnStart: false,
    method: "post",
    data: {
      toDate: toDate.value,
      fromDate: fromDate.value,
      empCode: "1111" //이건 리덕스에서 받아와야함????
    }
  };

  const { data, fetch } = useAxios(fetchDailyAttdList_axiosOptions);

  const fetchDailyAttdList = () => {
    fetch();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <DailyAttdApplySub />
      </Grid>
      <Grid item xs={9}>
        <Paper className={classes.rightPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">근태승인관리</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <div>
            <TextField
              id={"fromDate"}
              //label={"시작일"}
              type={"date"}
              defaultValue={fromDate.value}
              onChange={fromDate.onChange}
            />
            <TextField
              id={"toDate"}
              //label={"종료일"}
              type={"date"}
              defaultValue={toDate.value}
              onChange={toDate.onChange}
            />
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={fetchDailyAttdList}
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
            <AgGridReact columnDefs={columnDefs} rowData={data} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

DailyAttdApply.propTypes = {
  classes: PropTypes.object
};

export default DailyAttdApply;
