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
import TextField from "@material-ui/core/TextField";
import useInput from "../../../utils/useInput";
import useAxios from '../../../utils/useAxios';
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/styles";

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

const axiosOptions = {
    url: `http://localhost:8282/hr/attendance/findDailyAttdReport/`,
    method: 'POST',
    fetchOnStart: false,
};

const DailyAttd = () => {
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
            headerName: "요일", field: "daily", width: 90
        },
        {
            headerName: "출근시각", field: "attendTime", width: 100
        },
        {
            headerName: "퇴근시각", field: "quitTime", width: 100
        },
        {
            headerName: "외출시각", field: "leaveTime", width: 100
        },
        {
            headerName: "귀사시각", field: "returnTime", width: 100
        },
        {
            headerName: "외출시간", field: "leaveHour", width: 100
        },
        {
            headerName: "근무시간", field: "workHour", width: 100
        },
        {
            headerName: "지각시간", field: "lateHour", width: 100
        },
        {
            headerName: "연장근무", field: "overWorkHour", width: 100
        },
        {
            headerName: "심야근무", field: "nightWorkHour", width: 100
        },
        {
            headerName: "마감여부", field: "closeYn", width: 100
        },
    ];
    const date = useInput();

    const {data, fetch} = useAxios(axiosOptions);
    const cancelFetch = () => {
        //미구현 시간없음요 ㅜㅜ
        axiosOptions.url = 'http://localhost:8282/hr/attendance/';
        fetch(axiosOptions.url);
    };
    const findFetch = () => {
        axiosOptions.url = `http://localhost:8282/hr/attendance/findDailyAttdReport/${date.value}`;
        fetch(axiosOptions.url);
    };
    const updateFetch = () => {
        axiosOptions.selectedRows.forEach((item, index, array) => {
            array[index].closeYn = 'Y'
        });
        axiosOptions.data = axiosOptions.selectedRows;
        axiosOptions.url = 'http://localhost:8282/hr/attendance/updateDailyAttdCloseYN';
        fetch(axiosOptions);

    };
    useEffect(()=>{
        if(axiosOptions.url ==='http://localhost:8282/hr/attendance/updateDailyAttdCloseYN'){
            findFetch();
        }
    });

    const [value, setValue] = React.useState(0);
    const tabChange = (event, newValue) => {
        setValue(newValue);
    };
    return <Paper> <AppBar position="relative" className={classes.subCategory}>
        <Toolbar>
            <Typography variant="h5">일근태관리</Typography>
        </Toolbar>
    </AppBar>
        <div align="right">
            <TextField id={"day"} label={"기준일"} type={"date"}
                       defaultValue={date.value}
                       onChange={date.onChange}
            />
        </div>
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={tabChange}>
                    <Tab label="미마감 관리 항목"/>
                    <Tab label="마감 관리 항목"/>
                </Tabs>
            </AppBar>
            <div align={"right"}>
                <Button variant="contained" onClick={findFetch}>조회</Button>
                <Button variant="contained" onClick={
                    value === 0 ? updateFetch : cancelFetch
                    }>
                    {value === 0 ? "마감" : "마감취소"}</Button>
            </div>
            {value === 0 && <UnfinishDailyAttd data={data ? data.filter((DC) => DC.closeYn === 'N') : ""}
                                               columnDefs={columnDefs}/>}
            {value === 1 && <FinishDailyAttd data={data ? data.filter((DC) => DC.closeYn === 'Y') : ""}
                                             columnDefs={columnDefs}/>}
        </div>
    </Paper>;
};

const UnfinishDailyAttd = ({data, columnDefs}) => {

    const onSelectionChanged = (event) => {
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
                         onSelectionChanged={onSelectionChanged}/>
        </div>
    </div>
};
const FinishDailyAttd = ({data, columnDefs}) => {
    return <div>
        <div className={"ag-theme-material"} style={{
            height: "500px", width: "100%"
        }}>
            <AgGridReact columnDefs={columnDefs} rowData={data} rowSelection={"multiple"}/>
        </div>
    </div>
};


export default DailyAttd;
