import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  TableBody,
  TableRow,
  Typography,
  TableCell,
  Table
} from "@material-ui/core";
import useInput from "../../../utils/useInput";
import { AgGridReact } from "ag-grid-react";
import useAxios from "../../../utils/useAxios";

const useStyles = makeStyles(theme => ({
  topPaper: {
    padding: theme.spacing(2),
    height: 100,
    width: 1380
  },
  rightPaper: {
    margin: 20,
    padding: theme.spacing(2),
    height: 650,
    width: 650
  },
  leftPaper: {
    margin: 20,
    padding: theme.spacing(2, 3),
    height: 650,
    width: 650
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
  buttons: {
    margin: theme.spacing(2)
  },
  topText: {
    background: "#232f3e",
    color: "white",
    width: 630
  }
}));

let rowIndex = 0;
const RegistPayDeduction = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    sal: false,
    pay: false,
    year: false
  });

  const payDeductionHeader = [
    { key: "taxTypeCodeName", subject: "과세구분" },
    { key: "monthSalName", subject: "월정급여" },
    { key: "susubApplyName", subject: "수습적용" },
    { key: "inOutApplyName", subject: "입퇴사적용" },
    { key: "price", subject: "금액" }
  ];

  const [payDeductionData, setPayDeductionData] = useState({});

  const PayDeduction = ({ data }) => {
    return (
      <React.Fragment>
        {data.map(({ subject, key }) => (
          <TableRow>
            <TableCell align="left">{subject}</TableCell>
            <TableCell align="left">{payDeductionData[key]}</TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    );
  };

  const onRowSelected = params => {
    console.log(params.node);
    setPayDeductionData({
      ...params.node.data
    });
  };

  const rowSelection = "single";

  const salPayType = useInput("");
  const payDeductionType = useInput("");
  const year = useInput("");

  const columnDefs = [
    { headerName: "항목코드", field: "payDeductionItemCode" },
    { headerName: "항목명", field: "payDeductionItemName" }
  ];

  const fetchPayDeductionList_axiosOptions = {
    url: `http://localhost:8282/hr/circumstance/findPayDeductionList`,
    fetchOnStart: false,
    method: "post",
    data: {
      salPayType: salPayType.value,
      payDeductionType: payDeductionType.value,
      year: year.value
    }
  };

  const { data, fetch } = useAxios(fetchPayDeductionList_axiosOptions);

  const fetchPayDeductionList = () => {
    console.log(rowIndex);
    console.log(typeof rowIndex);
    fetch();
  };

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Paper className={classes.topPaper}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">
                급여구분
              </InputLabel>
              <Select
                open={open.sal}
                //open={open === "salPayType"} ==> '이것도 가능합니다'를 하려면 필요함
                onClose={() => setOpen({ ...open, sal: !open.sal })}
                onOpen={() => setOpen({ ...open, sal: !open.sal })}
                //onOpen={() => setOpen("salPayType")}  ==> 이것도 가능합니다
                value={salPayType.value}
                onChange={salPayType.onChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="SGC000">급상여</MenuItem>
                <MenuItem value="SGC001">급여</MenuItem>
                <MenuItem value="SGC002">상여</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">
                지급공제구분
              </InputLabel>
              <Select
                open={open.pay}
                onClose={() => setOpen({ ...open, pay: !open.pay })}
                onOpen={() => setOpen({ ...open, pay: !open.pay })}
                value={payDeductionType.value}
                onChange={payDeductionType.onChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="PDC002">공제</MenuItem>
                <MenuItem value="PDC001">지급</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">
                귀속년도
              </InputLabel>
              <Select
                open={open.year}
                onClose={() => setOpen({ ...open, year: !open.year })}
                onOpen={() => setOpen({ ...open, year: !open.year })}
                value={year.value}
                onChange={year.onChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="2019">2019</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
              </Select>
            </FormControl>

            <Button
              className={classes.buttons}
              variant={"outlined"}
              color={"primary"}
              onClick={fetchPayDeductionList}
            >
              조회
            </Button>
          </Paper>
        </Grid>
        <Grid>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Paper className={classes.leftPaper}>
                <div
                  className={"ag-theme-material"}
                  style={{
                    height: "400px",
                    width: "100%"
                  }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={data}
                    rowSelection={rowSelection}
                    onRowSelected={onRowSelected}
                    // onRowSelected={onRowSelected}
                    // onGridReady={onGridReady}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Grid>
                <Paper className={classes.rightPaper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <Typography variant="h6">
                          지급 공제 항목 설정
                        </Typography>
                      </TableRow>
                      <PayDeduction data={payDeductionHeader} />
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RegistPayDeduction;
