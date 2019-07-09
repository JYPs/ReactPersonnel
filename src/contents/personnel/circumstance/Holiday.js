import React from "react";
import Paper from "@material-ui/core/Paper";
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

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    height: 650
  },
  subCategory: {
    background: "#232f3e",
    color: "white"
  }
}));

const Allowance = props => {
  const classes = useStyles();

  const holidayColumnDefs = [
    {
      headerName: "일자",
      field: "basicDay"
    },
    {
      headerName: "휴일명",
      field: "holidayName"
    },
    {
      headerName: "비고",
      field: "note"
    },
    {
      headerName: "휴일타입",
      field: "holidayType"
    }
  ];

  const fetchHolidayList_axiosOptions = {
    url: `http://localhost:8282/hr/circumstance/findHolidayList`,
    fetchOnStart: false
  };

  const { data, fetch } = useAxios(fetchHolidayList_axiosOptions);

  const fetchAllowance = () => {
    fetch();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">휴일</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <form>
            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={fetchAllowance}
            >
              휴일 조회
            </Button>
          </form>
          <div
            className={"ag-theme-material"}
            style={{
              height: "400px",
              width: "100%"
            }}
          >
            <AgGridReact
              columnDefs={holidayColumnDefs}
              rowData={data}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Allowance;
