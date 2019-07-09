import React from "react";
import PropTypes from "prop-types";
import Paper from '@material-ui/core/Paper';
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import useAxios from "../../../utils/useAxios";
import useInput from "../../../utils/useInput";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

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

const OverNightApply = () => {
    const classes = useStyles();
    return <div>
        <Grid>
            <Paper className={classes.paper}>
                <AppBar position="relative" className={classes.subCategory}>
                    <Toolbar>
                        <Typography variant="h5">초과근무신청</Typography>
                    </Toolbar>
                </AppBar>
                <OverNightApl/>
            </Paper>
            <br/>
            <Paper className={classes.paper}>
                <AppBar position="relative" className={classes.subCategory}>
                    <Toolbar>
                        <Typography variant="h5">초과근무현황</Typography>
                    </Toolbar>
                </AppBar>
                <OverNightStatus/>
            </Paper>
        </Grid>
    </div>
};


//신청
const OverNightApl = () => {

    const fromDate = useInput();
    const toDate = useInput();
    const basicDay = useInput();
    const fromTime = useInput("19:00");
    const toTime = useInput("22:00");

    const batchOverNight_axiosOptions = {
        url: `http://localhost:8282/hr/attendance/batchOverNight`,
        fetchOnStart: false,
        method: 'post',
        data: [{
            empCode: "1111",
            basicDay: basicDay.value,
            empName: "JYP",
            approvalStatus: "N",
            requestStatus: "Y",
            type: toTime.value.substring(0,2) <= 22 ? "연장근무" : "심야근무",
            status: 'inserted',
            requestDate: toDate.value,
            fromTime: fromTime.value,
            toTime: toTime.value
        }]
    };


    const {fetch} = useAxios(batchOverNight_axiosOptions);

    return (
        <Grid>
            <br/>
            <Grid container>
                <Grid item sm={2}>
                    <Typography>
                        요청일
                    </Typography>
                </Grid>
                <Grid item sm={10}>
                    <TextField
                        id="basicDay"
                        type="date"
                        defaultValue={basicDay.value}
                        onChange={basicDay.onChange}
                    />
                </Grid>
            </Grid>
            <br/>
            <Grid container>
                <Grid item sm={2}>
                    <Typography>
                        신청날짜
                    </Typography>
                </Grid>
                <Grid item sm={10}>
                    <TextField
                        label={"시작일"}
                        id="fromDate"
                        type="date"
                        defaultValue={fromDate.value}
                        onChange={fromDate.onChange}
                    />
                    <TextField
                        label={"종료일"}
                        id="toDate"
                        type="date"
                        defaultValue={toDate.value}
                        onChange={toDate.onChange}
                    />
                </Grid>
            </Grid>
            <br/>
            <Grid container>
                <Grid item sm={2}>
                    <Typography>
                        신청근무시간
                    </Typography>
                </Grid>
                <Grid item sm={10}>
                    <TextField
                        label={"시작시간"}
                        id="fromTime"
                        type="time"
                        defaultValue={fromTime.value}
                        inputProps={{
                            step: 600, // 10 min
                        }}
                        onChange={fromTime.onChange}
                    />
                    <TextField
                        label={"종료시간"}
                        id="toTime"
                        type="time"
                        defaultValue={toTime.value}
                        inputProps={{
                            step: 600, // 10 min
                        }}
                        onChange={toTime.onChange}
                    />
                    <Button variant="outlined"
                            color="primary"
                            onClick={fetch}
                    >
                        신청
                    </Button>
                </Grid>
            </Grid>

            <br/>

        </Grid>
    );
};


//조회
const OverNightStatus = () => {

    const columnDefs = [
        {
            headerName: "사원이름",
            width: 150,
            field: "empName"
        },
        {
            headerName: "요청일",
            width: 180,
            field: "basicDay"
        },
        {
            headerName: "신청일자",
            width: 180,
            field: "requestDate"
        },
        {
            headerName: "근무시작시각",
            width: 190,
            field: "fromTime"
        },
        {
            headerName: "근무종료시각",
            width: 190,
            field: "toTime"
        },
        {
            headerName: "구분",
            width: 130,
            field: "type"
        },
        {
            headerName: "승인여부",
            width: 140,
            field: "approvalStatus"
        }
    ];

    const fromDate = useInput();
    const toDate = useInput();

    const axiosOptions = {
        url: `http://localhost:8282/hr/attendance/findOverNightAttdReport`,
        fetchOnStart: false,
        method: 'post',
        data: {
            toDate: toDate.value,
            fromDate: fromDate.value,
            empCode: '1111'
        }
    };

    const {data, fetch} = useAxios(axiosOptions);

    return (
        <Grid>
            <br/>
            <TextField
                label={"시작일"}
                id="fromDate"
                type="date"
                defaultValue={fromDate.value}
                onChange={fromDate.onChange}
            />
            <TextField
                label={"종료일"}
                id="toDate"
                type="date"
                defaultValue={toDate.value}
                onChange={toDate.onChange}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={fetch}
            >
                조회
            </Button>
            <div className={"ag-theme-material"}
                 style={{
                     height: "400px",
                     width: "100%"
                 }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={data}>
                </AgGridReact>
            </div>
            <br/>
        </Grid>
    );
};


OverNightApply.propTypes = {
    classes: PropTypes.object
};


export default OverNightApply;