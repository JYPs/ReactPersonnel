import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import useAxios from '../../utils/useAxios';
import useInput from '../../utils/useInput';

const styles = theme => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

const Journal = (props) => {
    const columnDefs = [{
        headerName: "전표번호", field: "slipNo"
    }, {
        headerName: "분개번호", field: "journalNo"
    }, {
        headerName: "구분", field: "balanceDivision"
    }, {
        headerName: "계정과목", field: "accountName"
    }, {
        headerName: "거래처", field: "customerCode"
    }, {
        headerName: "차변", field: "leftDebtorPrice"
    }, {
        headerName: "대변", field: "rightCreditsPrice"
    }];
    // const [rowData, setRowData] = useState([]);

    const toDate = useInput("2019-06-18");
    const fromDate = useInput("2019-06-18");
    const axiosOptions = {
        url: `http://localhost:8282/account/journalList/${toDate.value}/${fromDate.value}`,
        fetchOnStart: false
    };
    // const {loading, rowData, error, fetch} = useAxios(axiosOptions);
    const {rowData, fetch} = useAxios(axiosOptions);

    const fetchJournalList = () => {
        axiosOptions.url = `http://localhost:8282/account/journalList/${toDate.value}/${fromDate.value}`;

        fetch(axiosOptions.url);
    };


    return (
        <Paper>
            <div>
                <TextField
                    id={"fromDate"}
                    label={"시작일"}
                    type={"date"}
                    defaultValue={fromDate.value}
                    onChange={fromDate.onChange}
                />
                <TextField
                    id={"toDate"}
                    label={"종료일"}
                    type={"date"}
                    defaultValue={toDate.value}
                    onChange={toDate.onChange}
                />
                <Button variant={"outlined"} color={"primary"} onClick={fetchJournalList}>
                    조회
                </Button>
            </div>
            <div className={"ag-theme-material"}
                 style={{
                     height: '500px',
                     width: '100%'
                 }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                />
            </div>
        </Paper>
    );
}

Journal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Journal);
