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

const Allowance = props => {
  const classes = useStyles();

  const extendedAllowanceColumnDefs = [
    {
      headerName: "code",
      field: "overtimeSalCode",
      width : 150
    },
    {
      headerName: "연장수당명",
      field: "overtimeSalName",
      width : 150
    },
    {
      headerName: "수당추가율",
      field: "overtimeSalRate",
      width : 150
    }
  ];

  const etcAllowanceColumnDefs = [
    {
      headerName: "code",
      field: "etcSalCode",
      width : 150
    },
    {
      headerName: "기타수당명",
      field: "etcSalName",
      width : 150
    },
    {
      headerName: "금액",
      field: "etcSalPrice",
      width : 150
    }
  ];

  const fetchExtendedAllowance_axiosOptions = {
    url: `http://localhost:8282/hr/circumstance/findSudangList`,
    fetchOnStart: false
  };

  const { data, fetch } = useAxios(fetchExtendedAllowance_axiosOptions);

  const fetchAllowance = () => {
    fetch();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper className={classes.leftPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">연장수당</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <form>
            <Button variant={"outlined"} color={"primary"} onClick={fetchAllowance}>
              연장수당/기타수당 조회
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
              columnDefs={extendedAllowanceColumnDefs}
              rowData={data ? data.overtimeSudangList : []}
            />
          </div>
          <br />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.rightPaper}>
          <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
              <Typography variant="h5">기타수당</Typography>
            </Toolbar>
          </AppBar>
          <div
            className={"ag-theme-material"}
            style={{
              height: "400px",
              width: "100%",
              paddingTop : '56px'
            }}
          >
            <AgGridReact
              columnDefs={etcAllowanceColumnDefs}
              rowData={data ? data.etcSudangList : []}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Allowance;
