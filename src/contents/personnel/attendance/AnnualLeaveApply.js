import React, {useEffect, useState} from "react";
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import useAxios from '../../../utils/useAxios';
import Button from "@material-ui/core/Button";
import useInput from "../../../utils/useInput";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

const styles = theme => ({
    Paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    }
})

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

const columnDefs = [
    {
        headerName: "사원코드", field: "empCode"
    },
    {
        headerName: "사원명", field: "empName"
    },
    {
        headerName: "기준년도", field: "standardYear"
    },
    {
        headerName: "시작일", field: "startDate"
    },
    {
        headerName: "종료일", field: "endDate"
    },
    {
        headerName: "사유", field: "causeCode"
    },
    {
        headerName: "상세사유", field: "detailCause"
    },
    {
        headerName: "구분", field: "causeCode"
    },
    {
        headerName: "일수", field: "days"
    },
    {
        headerName: "승인여부", field: "approvalStatus"
    }
];

const axiosOptions = {
    url: `http://localhost:8282/hr/attendance/findAnnualMgt`,
    method: 'POST',
    fetchOnStart: false,
    data: {
        'empCode': '1111',
        'standardYear': '2019'
    }
};

const AnnualLeaveApply = () => {
    const classes = useStyles();
    const [empData, setEmpData] = useState([]);

    if (empData.length === 0) {
        axios.get("http://localhost:8282/hr/circumstance/findEmpAnnualData/1111")
            .then(response => {
                setEmpData(response.data);
            }).catch(reason => {
            console.log(reason);
        });
    }
    return <Paper style={{backgroundColor: 'primary'}}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                    <Grid Key={1} item xs={5}>

                        <AnnualData empData={empData} classes={classes}/>

                    </Grid>
                    <Grid Key={2} item xs={7}>

                        <AnnualApl classes={classes}/>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <AnnualCheck classes={classes}/>
    </Paper>;

};

//연차정보
const AnnualData = ({empData, classes}) => {
    return <Paper>
        <Table>
            <ShowEmpAD data={empData} classes={classes}/>
        </Table>
    </Paper>

}

const ShowEmpAD = (({data, classes}) => {
        return <TableBody>

                <AppBar position="relative" className={classes.subCategory}>
                    <Toolbar>
                        <Typography variant="h5">일근태관리</Typography>
                    </Toolbar>
                </AppBar>

            <TableRow>
                <TableCell align="left">기준년도</TableCell>
                <TableCell align="left">{data.standardYear}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">사원명</TableCell>
                <TableCell align="left">{data.empName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">부서</TableCell>
                <TableCell align="left">{data.deptName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">근속년수</TableCell>
                <TableCell align="left">{data.lengthOfService}년</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">사용가능일수</TableCell>
                <TableCell align="left">{data.restDays}일</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">잔여일수</TableCell>
                <TableCell align="left">{data.usableDays}일</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left">사용한일수</TableCell>
                <TableCell align="left">{data.usedDays}일</TableCell>
            </TableRow>
        </TableBody>
    }
)
//연차신청
const AnnualApl = ({classes}) => {
    const fromDate = useInput('2019-07-06');
    const toDate = useInput('2019-07-06');
    const content = useInput();
    const detailContent= useInput();
    const [countDate, setCountDate] = useState([]);
    let fromDateValueList;
    let toDateValueList;
    const changeDate = (value) => {
        fromDateValueList = (fromDate.value.toString().split('-'));
        toDateValueList = (toDate.value.toString().split('-'));
        const fromValue = new Date(fromDateValueList[0],fromDateValueList[1],fromDateValueList[2]);
        const toValue = new Date(toDateValueList[0],toDateValueList[1],toDateValueList[2]);
        if((toValue-fromValue)/86400000 < 0){
            setCountDate("???????????");
        }
        else{
            setCountDate((toValue-fromValue)/86400000);
        }

    }
    const applyVacation = () => {
       alert("구현 x");
    };

    useEffect(() => {
        changeDate("fromDate");
    }, [fromDate.value]);
    useEffect(() => {
        changeDate("toDate")
    }, [toDate.value])

    return <TableBody>

            <AppBar position="relative" className={classes.subCategory}>
                <Toolbar>
                    <Typography variant="h5">연차신청</Typography>
                </Toolbar>
            </AppBar>

        <TableRow>
            <TableCell align="left"><Typography variant={"h6"}>신청기한 </Typography></TableCell>
            <TableCell>
                <TextField
                    id="fromDate"
                    label="fromDate"
                    type="date"
                    defaultValue={fromDate.value}
                    onChange={fromDate.onChange}
                    InputLabelProps={{
                        shrink: true,
                    }}

                /><TextField
                id="toDate"
                label="toDate"
                type="date"
                onChange={toDate.onChange}
                defaultValue={toDate.value}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
                <Typography variant={"h6"} align={"left"}>일수</Typography>
            </TableCell>
            <TableCell>
                <Typography variant={"h6"} align={"left"}>{countDate}</Typography>
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell>
                <Typography variant={"h6"} align={"left"}>사유 </Typography>
            </TableCell>
            <TableCell>
                <TextField defaultValue={content.value}
                onChange={content.onChange}/>
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell>
                <Typography variant={"h6"} align={"left"} defaultValue={detailContent.value}
                onChange={detailContent.onChange}>상세사유</Typography>
            </TableCell>
            <TableCell>
                <TextField multiline rows="4"/>
                <Button   variant={"outlined"}
                          color={"primary"}
                          onClick={applyVacation}>신청</Button>
            </TableCell>
        </TableRow>


    </TableBody>;
}

//연차현황조회
const AnnualCheck = ({classes}) => {

    const {data, fetch} = useAxios(axiosOptions);
    return <Paper>
        <AppBar position="relative" className={classes.subCategory}>
            <Toolbar>
                <Typography variant="h5">일근태관리</Typography>
            </Toolbar>
        </AppBar>
        <div>
            {/*시간이 없어서 그냥 조회만 합니다*/}
            {/*<TextField id={"fromDate"} label={"시작일"} type={"date"}*/}
            {/*           defaultValue={fromDate.value}*/}
            {/*           onChange={fromDate.onChange}/>*/}
            {/*<TextField id={"toDate"} label={"종료일"} type={"date"}*/}
            {/*           defaultValue={toDate.value}*/}
            {/*           onChange={toDate.onChange}/>*/}
            <Button
                variant={"outlined"}
                color={"primary"}
                onClick={fetch}
            >
                조회
            </Button>
        </div>
        <div className={"ag-theme-material"} style={{
            height: "400px",
            width: "100%"
        }}>
            <AgGridReact columnDefs={columnDefs} rowData={data}/>
        </div>
    </Paper>;

}


export default withStyles(styles)(AnnualLeaveApply);
