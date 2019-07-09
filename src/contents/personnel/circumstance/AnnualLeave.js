import React, { useState } from "react";
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
import axios from "axios";

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
  }
}));
let filterEmpCode = "";
const AnnualLeave = props => {
  const classes = useStyles();

  const workInfoColumnDefs = [
    {
      headerName: "사번",
      field: "empCode",
      width: 120
    },
    {
      headerName: "사원명",
      field: "empName",
      width: 130
    },
    {
      headerName: "입사년도",
      field: "hireDate",
      width: 150
    }
  ];

  const annualColumnDefs = [
    {
      headerName: "사번",
      field: "empCode",
      width: 100
    },
    {
      headerName: "년도",
      field: "standardYear",
      width: 100
    },
    { headerName: "가용일수", field: "usableDays", width: 120 },
    { headerName: "사용일수", field: "usedDays", width: 120 },
    { headerName: "잔여일수", field: "restDays", width: 120 }
  ];

  const fetchExtendedAllowance_axiosOptions = {
    url: `http://localhost:8282/hr/pm/findWorkInfoAll`,
    fetchOnStart: false
  };

  const { data, fetch } = useAxios(fetchExtendedAllowance_axiosOptions);
  const [annualData, setAnnualData] = useState(false);
  const rowSelection = "single";

  const fetchInfo = () => {
    fetch();
    fetchAnnualInfo();
  };

  const fetchAnnualInfo = () => {
    axios({
      method: "post",
      url: "http://localhost:8282/hr/circumstance/findAnnualLeaveList",
      fetchOnStart: false
    })
      .then(function(response) {
        setAnnualData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const [workInfoGridApi, setworkInfoGridApi] = useState(false);
  const [annualGridApi, setAnnualGridApi] = useState(false);

  const onWorkInfoGridReady = params => {
    setworkInfoGridApi(params.api);
  };
  const onAnnualGridReady = params => {
    setAnnualGridApi(params.api);
  };

  function onSelectionChanged() {
    const selectedRows = workInfoGridApi.getSelectedRows();
    selectedRows.forEach(function(selectedRow, index) {
      filterEmpCode = selectedRow.empCode;
    });
    annualGridApi.onFilterChanged();
  }

  function doesExternalFilterPass(node) {
    if (filterEmpCode) {
      return node.data.empCode === filterEmpCode;
    }
    return true;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">사원정보</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <form>
            <Button variant={"outlined"} color={"primary"} onClick={fetchInfo}>
              조회
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
              columnDefs={workInfoColumnDefs}
              rowData={data ? data : []}
              rowSelection={rowSelection}
              onGridReady={onWorkInfoGridReady}
              onSelectionChanged={onSelectionChanged}
            />
          </div>
          <br />
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper className={classes.rightPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">연차정보</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <div
            className={"ag-theme-material"}
            style={{
              height: "436px",
              width: "100%",
              paddingTop : '36px'
            }}
          >
            <AgGridReact
              columnDefs={annualColumnDefs}
              rowData={annualData}
              onGridReady={onAnnualGridReady}
              isExternalFilterPresent={() => {
                return true;
              }}
              doesExternalFilterPass={doesExternalFilterPass}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnnualLeave;
