import React, {useState, useEffect} from "react";
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
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from "@material-ui/core/Toolbar";
import TableBody from "@material-ui/core/TableBody";
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
    url: `onload`,
    method: 'POST',
    fetchOnStart: false,
};
//함수명 너무 죄송합니다 시간이 없어요... ㅈㅅㅈㅅㅈㅅㅈㅅㅈㅅㅈㅅㅈㅅ 변수명도 ㅈㅅ
const AttdApproval = () => {
    const classes = useStyles();
    const updateAttd = () => {
        axiosOptions.selectedRows.forEach((item, index, array) => {
            array[index].approvalStatus = 'Y';
                array[index].status = 'updated';
            array[index].cost = '0';
        });
        axiosOptions.updateData.gridApi.updateRowData(axiosOptions.updateData.updateGrid);

        axiosOptions.data = axiosOptions.selectedRows;
    };

    const updateRest = () => {

    };

    const updateOver = () => {

    };

    const updateAnnual = () => {

    };

    const [depts, setDepts] = useState([]);
    useEffect(() => {

        //초기에 부서정보를 가지고오는 곳
        if (axiosOptions.url === 'onload') {
            if (depts.length === 0) {
                axios.get("http://localhost:8282/sys/findPayStepCodeDetailList?divisionCode=SYS07")
                    .then(response => {
                        setDepts(response.data);
                    }).catch(reason => {
                    console.log(reason);
                });
            }
        }

    });
    const {data, fetch} = useAxios(axiosOptions);
    const [value, setValue] = useState(0);
    const tabChange = (event, newValue) => {
        //aa를 갔다오는건 데이터를 초기화해주기 위함입니다. 시간이 없어서 쉬운방법을 택했습니다. 좋은방법은 아니니
        //더 좋은 방법으로 수정해주세요~(key, if(url===??)이 2개를 쓴것도 그 흔적입니다!)
        fetch(axiosOptions.url = 'http://localhost:8282/hr/attendance/aa');
        setValue(newValue);
    };
    const date = useInput();
    const [dept, setDept] = useState([]);
    const deptChange = (event, newValue) => {
        console.log(newValue.props.value)
        setDept(newValue.props.value);
    };
    const [attdData, setAttdData] = useState();
    useEffect(() => {
        if (axiosOptions.url === `http://localhost:8282/hr/attendance/findDailyAttdListByCondition`) {
            setAttdData(data);
    }else if(axiosOptions.url === 'http://localhost:8282/hr/attendance/batchDailyAttd'){
            findFetchAttd();
        }

    }, [data]);


    const [key, setKey] = useState(0);
    //근태승인 조회
    const findFetchAttd = () => {
        setKey(0);
        axiosOptions.url = `http://localhost:8282/hr/attendance/findDailyAttdListByCondition`;
        axiosOptions.data = {
            approvalStatus: approvalStatus.value,
            basicDay: date.value.toString().replace(/-/gi, ''),
            deptCode: dept
        }
        fetch(axiosOptions.url);
    };
    //근태외 조회
    const findFetchRest = () => {
        setKey(1);
        axiosOptions.url = `http://localhost:8282/hr/attendance/findAttdRestListByCondition`;
        axiosOptions.data = {
            approvalStatus: approvalStatus.value,
            basicDay: date.value.toString().replace(/-/gi, ''),
            deptCode: dept
        }
        fetch(axiosOptions.url);
    };
    //심야 승인 조회
    const findFetchOver = () => {
        axiosOptions.url = `http://localhost:8282/hr/attendance/findOverNightReportByCondition`;
        axiosOptions.data = {
            approvalStatus: approvalStatus.value,
            basicDay: date.value.toString().replace(/-/gi, ''),
            deptCode: dept
        }
        fetch(axiosOptions.url);
    };
    //휴가 연차 조회
    const findFetchAnnual = () => {
        axiosOptions.url = `http://localhost:8282/hr/attendance/findDayAnnualListByCondition`;
        axiosOptions.data = {
            approvalStatus: approvalStatus.value,
            fromDate: startDate.value.toString().replace(/-/gi, ''),
            toDate: endDate.value.toString().replace(/-/gi, ''),
            deptCode: dept
        }
        fetch(axiosOptions.url);
    };

    const approvalStatus = useInput('Y');
    const startDate = useInput();
    const endDate = useInput();
    //휴가일은 보내줘야하는 data가 다름
    const renderDate = () => {
        if (value === 3) {
            return <div>
                <TextField id={"startDate"} type={"date"}
                           defaultValue={startDate.value}
                           onChange={startDate.onChange}
                           InputProps={{
                               startAdornment:
                                   <InputAdornment position="start" style={{width: '100px'}}>시작일</InputAdornment>
                           }}
                />
                <TextField id={"endDate"} type={"date"}
                           defaultValue={endDate.value}
                           onChange={endDate.onChange}
                           InputProps={{
                               startAdornment:
                                   <InputAdornment position="start" style={{width: '100px'}}>종료일</InputAdornment>
                           }}
                />
            </div>;
        } else {
            return <TextField id={"date"} type={"date"}
                              defaultValue={date.value}
                              onChange={date.onChange}
                              InputProps={{
                                  startAdornment:
                                      <InputAdornment position="start" style={{width: '100px'}}>기준일</InputAdornment>
                              }}
            />;
        }
    }
    const deleteAttd = ()=> {
        alert('구현x');
    }
    const batchInformation = ()=>{
        axiosOptions.url=`http://localhost:8282/hr/attendance/batchDailyAttd`;
        fetch();
    }
    return <Paper>  <AppBar position="relative" className={classes.subCategory}>
        <Toolbar>
            <Typography variant="h5">근태승인관리</Typography>
        </Toolbar>
    </AppBar>
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={tabChange}>
                    <Tab label="근태승인관리"/>
                    <Tab label="근태 외 승인관리"/>
                    <Tab label="연장/심야 승인관리"/>
                    <Tab label="휴가/연차 승인관리"/>
                </Tabs>
            </AppBar>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid Key={0} item xs={1}>
                        </Grid>
                        <Grid Key={1} item xs={3}>
                            {renderDate()}
                        </Grid>
                        <Grid Key={2} item xs={3}>
                            <TextField
                                select
                                id={"dept"}
                                style={{width: "300px"}}
                                onChange={deptChange}
                                value={dept}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start" style={{width: '100px'}}>부서</InputAdornment>
                                }}
                            >
                                {depts.map(dept => (
                                    <MenuItem key={dept.detailCode} value={dept.detailCode}>
                                        {dept.detailCodeName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid Key={3} item xs={3}>
                            <TextField
                                select
                                id={"dept"}
                                style={{width: "300px"}}
                                onChange={approvalStatus.onChange}
                                value={approvalStatus.value}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start" style={{width: '150px'}}>승인구분</InputAdornment>
                                }}
                            >
                                <MenuItem value={'Y'}>승인</MenuItem>
                                <MenuItem value={'N'}>미승인</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <br/>
            <div align={'right'}>
                <Button variant={"contained"}
                        color={"primary"}
                        onClick={() => {
                            switch (value) {
                                case 0 :
                                    findFetchAttd();
                                    break;
                                case 1 :
                                    findFetchRest();
                                    break;
                                case 2 :
                                    findFetchOver();
                                    break;
                                case 3 :
                                    findFetchAnnual();
                                    break;
                            }
                        }
                        }>조회</Button>
                <Button variant={"contained"}
                        color={"primary"} onClick={
                    () => {
                        switch (value) {
                            case 0 :
                                updateAttd();
                                break;
                            case 1 :
                                updateRest();
                                break;
                            case 2 :
                                updateOver();
                                break;
                            case 3 :
                                updateAnnual();
                                break;
                        }
                    }
                }>승인</Button>
                <Button variant={"contained"}
                        color={"primary"}
                onClick={deleteAttd}>삭제</Button>
                <Button variant={"contained"}
                        color={"primary"}
                onClick={batchInformation}>저장</Button>
            </div>
            <br/>
            <div className={"ag-theme-material"} style={{
                height: "400px",
                width: "100%"
            }}>
                {value === 0 && <AttdApprovalMgt data={
                    // axiosOptions.url === 'http://localhost:8282/hr/attendance/findDailyAttdListByCondition' ?
                    // key === 0 ?
                    attdData
                    // : null
                }/>}
                {value === 1 && <RestAttdApprovalMgt data={
                    // axiosOptions.url === 'http://localhost:8282/hr/attendance/findAttdRestListByCondition' ?
                    data
                    // : null
                }/>}
                {value === 2 && <OverNightApprovalMgt data={
                    axiosOptions.url === 'http://localhost:8282/hr/attendance/findOverNightReportByCondition' ?
                        data : null
                }/>}
                {value === 3 && <AnnualApprovalMgt data={
                    axiosOptions.url === 'http://localhost:8282/hr/attendance/findDayAnnualListByCondition' ?
                        data : null
                }/>}
            </div>
        </div>
    </Paper>;

};

//근태승인관리
const AttdApprovalMgt = ({data}) => {
    const onSelectionChanged = (event) => {
        const gridApi = event.api;
        const selectedRows = gridApi.getSelectedRows();
        const updateGrid = [];
        gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
            console.log(rowNode);
            if (rowNode.selected) {
                rowNode.data.approvalStatus = 'Y';
                updateGrid.push(rowNode.data);
            } else {
                updateGrid.push(rowNode.data);
            }

        });
        // gridApi.updateRowData({ update: updateGrid });
        axiosOptions.updateData = {'gridApi': gridApi, 'updateGrid': updateGrid}
        axiosOptions.selectedRows = selectedRows;

    };
    const columnDefs = [
        {
            headerName: '선택', checkboxSelection: true, width: 50, headerCheckboxSelection: true
        },
        {
            headerName: "사원코드", field: "empCode", width: 100,
        },
        {
            headerName: "사원명", field: "empName", width: 120
        },
        {
            headerName: "시각", field: "time", width: 100
        },
        {
            headerName: "근태구분", field: "attdTypeCode", width: 100
        },
        {
            headerName: "비용", field: "cose", width: 100
        },
        {
            headerName: "승인상태", field: "approvalStatus", width: 100
        },
        {
            headerName: "사유", field: "cause", width: 200
        }
    ];
    return <AgGridReact columnDefs={columnDefs} rowData={data} rowSelection={"multiple"}
                        onSelectionChanged={onSelectionChanged}/>;
};
//근태 외 승인관리
const RestAttdApprovalMgt = ({data}) => {
    const columnDefs = [
        {
            headerName: '선택', checkboxSelection: true, width: 50, headerCheckboxSelection: true
        },
        {
            headerName: "사원번호", field: "empCode", width: 100,
        },
        {
            headerName: "사원명", field: "empName", width: 120
        },
        {
            headerName: "신청일자", field: "requestDate", width: 150
        },
        {
            headerName: "시작일", field: "startDate", width: 150
        },
        {
            headerName: "종료일", field: "endDate", width: 150
        },
        {
            headerName: "일수", field: "days", width: 100
        },
        {
            headerName: "금액", field: "cost", width: 100
        },
        {
            headerName: "승인상태", field: "approvalStatus", width: 100
        },
        {
            headerName: "사유", field: "cause", width: 200
        }
    ];
    return <AgGridReact columnDefs={columnDefs} rowData={data} rowSelection={"multiple"}/>;
};
//연장/심야 승인관리
const OverNightApprovalMgt = ({data}) => {
    const columnDefs = [
        {
            headerName: '선택', checkboxSelection: true, width: 50, headerCheckboxSelection: true
        },
        {
            headerName: "사원번호", field: "empCode", width: 100,
        },
        {
            headerName: "사원명", field: "empName", width: 120
        },
        {
            headerName: "신청일자", field: "requestDate", width: 100
        },
        {
            headerName: "구분", field: "type", width: 100
        },
        {
            headerName: "신청여부", field: "requestStatus", width: 100
        },
        {
            headerName: "승인여부", field: "approvalStatus", width: 100
        }
    ];
    return <AgGridReact columnDefs={columnDefs} rowData={data} rowSelection={"multiple"}/>;
};
//휴가/연차 승인관리
const AnnualApprovalMgt = ({data}) => {
    const columnDefs = [
        {
            headerName: '선택', checkboxSelection: true, width: 50, headerCheckboxSelection: true
        },
        {
            headerName: "사원번호", field: "empCode", width: 100,
        },
        {
            headerName: "사원명", field: "empName", width: 120
        },
        {
            headerName: "시작일", field: "startDate", width: 150
        },
        {
            headerName: "종료일", field: "endDate", width: 150
        },
        {
            headerName: "일수", field: "days", width: 100
        },
        {
            headerName: "승인상태", field: "approvalStatus", width: 100
        },
        {
            headerName: "사유", field: "detailCause", width: 200
        }
    ];
    return <AgGridReact columnDefs={columnDefs} rowData={data} rowSelection={"multiple"}/>;
}

export default AttdApproval;
