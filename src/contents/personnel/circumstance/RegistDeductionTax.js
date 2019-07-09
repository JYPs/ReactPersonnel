import React, { useState } from "react";
import {
  Grid,
  InputLabel,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  TextField,
  Typography
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import useInput from "../../../utils/useInput";
import useAxios from "../../../utils/useAxios";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    background: "#232f3e",
    color: "white"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130
  },
  buttons: {
    margin: theme.spacing(2)
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
});

const RegistDeductionTax = props => {
  const { classes } = props;
  const [open, setOpen] = useState({ year: false, registYear: false });
  const rowSelection = "single";

  const year = useInput("");
  const registYear = useInput("");
  const healthInsurRate = useInput("");
  const nationalPenRate = useInput("");
  const longTermCareRate = useInput("");
  const employeementInsurRate = useInput("");

  const fetchDeductionTaxList_axiosOptions = {
    url: `http://localhost:8282/hr/circumstance/findDeductionInsuranceList/${year.value}`,
    fetchOnStart: false,
    method: "get"
  };
  const { data, fetch } = useAxios(fetchDeductionTaxList_axiosOptions);

  const fetchDeductionTaxList = () => {
    fetch();
  };

  const searchColumnDefs = [
    { headerName: "소득세율(%)", field: "incomeTaxRate" },
    { headerName: "최저급여", field: "lowSal" },
    { headerName: "최고급여", field: "highSal" },
    { headerName: "누진공제", field: "progressiveDeduction" }
  ];

  const registColumnDefs = [
    { headerName: "소득세율(%)", field: "incomeTaxRate", editable: true },
    { headerName: "최저급여", field: "lowSal", editable: true },
    { headerName: "최고급여", field: "highSal", editable: true },
    { headerName: "누진공제", field: "progressiveDeduction", editable: true }
  ];

  const [registGridApi, setRegistGridApi] = useState();

  const onGridReady = params => {
    setRegistGridApi(params.api);
  };

  const addBtn = () => {
    const newItem = createNewRowData();
    registGridApi.updateRowData({ add: [newItem] });
  };

  const createNewRowData = () => {
    let newData = {
      incomeTaxRate: "",
      lowSal: "",
      highSal: "",
      progressiveDeduction: "",
      status: "inserted",
      inputedYear: registYear.value
    };
    return newData;
  };

  const createNewTextFieldData = () => {
    let newData = {
      healthInsurRate: healthInsurRate.value,
      nationalPenRate: nationalPenRate.value,
      longTermCareRate: longTermCareRate.value,
      employeementInsurRate: employeementInsurRate.value,
      inputedYear: registYear.value,
      status: "inserted"
    };
    return newData;
  };

  let registGridInfo = "";
  let newTextFieldData;
  const saveBtn = () => {
    registGridApi.forEachNode(function(rowNode, index) {
      registGridInfo = rowNode.data;
      console.log(registGridInfo);
      console.log(typeof registGridInfo);

      //console.log(healthInsurRate.value);  //찍힘
    });
    newTextFieldData = createNewTextFieldData();
    console.log(newTextFieldData);
    console.log(typeof newTextFieldData);
    fetchRegistDeduction();
  };

  const fetchRegistDeduction = () => {
    Axios({
      method: "post",
      url: `http://localhost:8282/hr/circumstance/batchDeductionTax`,
      data: {
        deductionTaxTo: newTextFieldData,
        incomeTaxTo: registGridInfo
      }
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper className={classes.root} align="center" color={"primary"}>
            <Typography variant="h5">급여 공제항목 조회</Typography>
          </Paper>
          <Card>
            <CardContent>
              <FormControl className={classes.formControl} align="center">
                <InputLabel>기준연도</InputLabel>
                <Select
                  open={open.year}
                  onClose={() => setOpen({ ...open, year: !open.year })}
                  onOpen={() => setOpen({ ...open, year: !open.year })}
                  value={year.value}
                  onChange={year.onChange}
                >
                  <MenuItem value="2019">
                    <em>2019</em>
                  </MenuItem>
                  <MenuItem value="2020">2020</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                </Select>
              </FormControl>
              <Button
                className={classes.buttons}
                variant={"outlined"}
                color={"primary"}
                onClick={fetchDeductionTaxList}
              >
                조회
              </Button>
            </CardContent>
          </Card>

          <Paper>
            <div
              className={"ag-theme-material"}
              style={{
                height: "300px",
                width: "100%"
              }}
            >
              <AgGridReact
                columnDefs={searchColumnDefs}
                rowData={data ? data.IncomeTaxList : ""}
              />
            </div>
          </Paper>
          <Paper>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left" color={"primary"}>
                    보험률
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">건강보험 부담률</TableCell>
                  <TableCell align="left">
                    {data ? data.DeductionTaxList[0].healthInsurRate : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">국민연금 부담률</TableCell>
                  <TableCell align="left">
                    {data ? data.DeductionTaxList[0].nationalPenRate : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">장기요양보험 부담률</TableCell>
                  <TableCell align="left">
                    {data ? data.DeductionTaxList[0].longTermCareRate : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">고용보험 부담률</TableCell>
                  <TableCell align="left">
                    {data ? data.DeductionTaxList[0].employeementInsurRate : ""}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper align="center" className={classes.root}>
            <Typography variant="h5">급여 공제항목 등록</Typography>
          </Paper>
          <Card>
            <CardContent>
              <FormControl className={classes.formControl} align="center">
                <InputLabel>기준연도</InputLabel>
                <Select
                  open={open.registYear}
                  onClose={() =>
                    setOpen({ ...open, registYear: !open.registYear })
                  }
                  onOpen={() =>
                    setOpen({ ...open, registYear: !open.registYear })
                  }
                  value={registYear.value}
                  onChange={registYear.onChange}
                >
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2025">2025</MenuItem>
                </Select>
              </FormControl>
              <Button
                className={classes.buttons}
                variant={"outlined"}
                color={"primary"}
                onClick={addBtn}
              >
                추가
              </Button>
              <Button
                className={classes.buttons}
                variant={"outlined"}
                color={"primary"}
                onClick={saveBtn}
              >
                등록
              </Button>
            </CardContent>
          </Card>
          <Paper>
            <div
              className={"ag-theme-material"}
              style={{
                height: "300px",
                width: "100%"
              }}
            >
              <AgGridReact
                columnDefs={registColumnDefs}
                onGridReady={onGridReady}
                rowSelection={rowSelection}
              />
            </div>
          </Paper>
          <Paper>
            <TextField
              id="healthInsurRate"
              label="건강보험 부담률(%)"
              className={classes.textField}
              value={healthInsurRate.value}
              onChange={healthInsurRate.onChange}
              margin="normal"
              align="center"
            />
            <TextField
              id="nationalPenRate"
              label="국민연금 부담률(%)"
              className={classes.textField}
              value={nationalPenRate.value}
              onChange={nationalPenRate.onChange}
              margin="normal"
              align="center"
            />
            <TextField
              id="longTermCareRate"
              label="장기요양보험 부담률(%)"
              className={classes.textField}
              value={longTermCareRate.value}
              onChange={longTermCareRate.onChange}
              margin="normal"
              align="center"
            />
            <TextField
              id="employeementInsurRate"
              label="고용보험 부담률(%)"
              className={classes.textField}
              value={employeementInsurRate.value}
              onChange={employeementInsurRate.onChange}
              margin="normal"
              align="center"
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(RegistDeductionTax);