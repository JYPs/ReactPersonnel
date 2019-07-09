import React, {useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import useInput from "../../../utils/useInput";
import useAxios from '../../../utils/useAxios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/styles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3, 3)
    },
    subCategory: {
        background: "#232f3e",
        color: "white"
    }
}));


const axiosOptions = {
    url: `http://localhost:8282/hr/attendance/findMonthAttdReport/`,
    method: 'POST',
    fetchOnStart: false,
};

const MonthlyAttd = () => {

    const classes = useStyles();

    const columnDefs = [
        {
            headerName: '', checkboxSelection: true, width: 50, headerCheckboxSelection: true
        },
        {
            headerName: "사원코드", field: "empCode", width: 100,
        },
        {
            headerName: "사원명", field: "empName", width: 120
        },
        {
            headerName: "적용년월", field: "basicYearMonth", width: 100
        },
        {
            headerName: "기준근무일수", field: "basicWorkDays", width: 140
        },
        {
            headerName: "실제근무일수", field: "weekdayWork", width: 140
        },
        {
            headerName: "기준근무시간", field: "basicWorkHour", width: 140
        },
        {
            headerName: "실제근무시간", field: "workHour", width: 140
        },
        {
            headerName: "연장근무시간", field: "overWorkHour", width: 140
        },
        {
            headerName: "심야근무시간", field: "nightWorkHour", width: 140
        },
        {
            headerName: "지각시간", field: "lateHour", width: 100
        },
        {
            headerName: "근태외일수(연차)", field: "attdRestDays", width: 150
        },
        {
            headerName: "결근일수", field: "absentDays", width: 100
        },
        {
            headerName: "지각일수", field: "lateDays", width: 100
        },
        {
            headerName: "조퇴일수", field: "leaveEarlyDays", width: 100
        },
        {
            headerName: "외출일수", field: "leaveDays", width: 100
        },
        {
            headerName: "휴일근무일수", field: "holidayWorkDays", width: 140
        },
        {
            headerName: "휴일근무시간", field: "holidayWorkHour", width: 140
        },
        {
            headerName: "마감여부", field: "closeYn", width: 100
        }
    ];

    const baseYear = useInput(2019);
    const baseMonth = useInput(7);

    const {data, fetch} = useAxios(axiosOptions);

    //마감취소 미구현
    const cancelFetch = () => {
        axiosOptions.selectedRows.forEach((item, index, array) => {
            array[index].closeYn = 'N'
        });
        axiosOptions.data = axiosOptions.selectedRows;
        axiosOptions.url = 'http://localhost:8282/hr/attendance/updateMonthAttdCloseYN';
        fetch(axiosOptions);
    };


    //조회
    const findFetch = () => {
        let baseMonthData;
        if (baseMonth.value.toString().length < 2) {
            baseMonthData = '0' + baseMonth.value
        } else {
            baseMonthData = baseMonth.value.toString()
        }
        axiosOptions.url = `http://localhost:8282/hr/attendance/findMonthAttdReport`;
        axiosOptions.data = {baseYearMonth: baseYear.value + baseMonthData};
        fetch(axiosOptions.url);

    };

    //마감
    const updateFetch = () => {
        axiosOptions.selectedRows.forEach((item, index, array) => {
            array[index].closeYn = 'Y'
        });
        axiosOptions.data = axiosOptions.selectedRows;
        axiosOptions.url = 'http://localhost:8282/hr/attendance/updateMonthAttdCloseYN';
        fetch(axiosOptions);
    };

    useEffect(() => {
        if (axiosOptions.url === 'http://localhost:8282/hr/attendance/updateMonthAttdCloseYN') {
            findFetch();
        }
    });

    const [value, setValue] = React.useState(0);

    const [yearItem, setYearItem] = React.useState(2019);

    const [monthItem, setMonthItem] = React.useState(7);


    const tabChange = (event, newValue) => {
        setValue(newValue);
    };

    const yearChange = (event) => {
        setYearItem(event.target.value);
        baseYear.onChange(event);
    };

    const monthChange = (event) => {
        setMonthItem(event.target.value);
        baseMonth.onChange(event);
    };

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return <Paper className={classes.paper}>
        <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
                <Typography variant="h5">월근태관리</Typography>
            </Toolbar>
        </AppBar>
        <br/>
        <div align="right">
            <Select
                value={yearItem}
                onChange={yearChange}
                inputProps={{
                    name: 'year',
                    id: 'year',
                }}
            >
                <MenuItem value={2018}>2018</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
            </Select>
            <Select
                value={monthItem}
                onChange={monthChange}
                inputProps={{
                    name: 'month',
                    id: 'month',
                }}
            >
                {months.map((month) =>
                    <MenuItem value={month} key={month}>{month}</MenuItem>
                )
                }
            </Select>
        </div>
        <br/>
        <div>
            <AppBar position="static" color={"default"}>
                <Tabs textColor="primary" value={value} onChange={tabChange}>
                    <Tab label="월근태 미마감 항목"/>
                    <Tab label="월근태 마감 항목"/>
                </Tabs>
            </AppBar>
            <br/>
            <div align={"right"}>
                <Button variant="outlined" color="primary" onClick={findFetch}>조회</Button>
                <Button variant="outlined" color="primary" onClick={
                    value === 0 ? updateFetch : cancelFetch
                }>
                    {value === 0 ? "마감" : "마감취소"}</Button>
            </div>
            {value === 0 && <UnfinishMonthlyAttd data={data ? data.filter((DC) => DC.closeYn === 'N') : ""}
                                                 columnDefs={columnDefs}/>}
            {value === 1 && <FinishMonthlyAttd data={data ? data.filter((DC) => DC.closeYn === 'Y') : ""}
                                               columnDefs={columnDefs}/>}
        </div>
    </Paper>;
};

//미마감 항목
const UnfinishMonthlyAttd = ({data, columnDefs}) => {

    const onSelectionChangedUnfinish = (event) => {
        const gridApi = event.api;
        const selectedRows = gridApi.getSelectedRows();
        axiosOptions.selectedRows = selectedRows;
    };

    return <div>
        <div className={"ag-theme-material"} style={{
            height: "500px",
            width: "100%"
        }}>
            <AgGridReact columnDefs={columnDefs} rowData={data} rowSelection={"multiple"}
                         onSelectionChanged={onSelectionChangedUnfinish}/>
        </div>
    </div>
};

//마감 항목
const FinishMonthlyAttd = ({data, columnDefs}) => {

    const onSelectionChangedFinish = (event) => {
        const gridApi = event.api;
        const selectedRows = gridApi.getSelectedRows();
        axiosOptions.selectedRows = selectedRows;
    };

    return <div>
        <div className={"ag-theme-material"} style={{
            height: "500px", width: "100%"
        }}>
            <AgGridReact columnDefs={columnDefs} rowData={data} rowSelection={"multiple"}
                         onSelectionChanged={onSelectionChangedFinish}/>
        </div>
    </div>
};


export default MonthlyAttd;
