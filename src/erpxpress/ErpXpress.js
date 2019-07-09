import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {setMenu} from '../actions';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Header from './Header';
import RouteList from "../utils/RouteList";
import {Route} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import useAxios from "../utils/useAxios";

const drawerWidth = 256;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    mainContent: {
        flex: 1,
        padding: '48px 36px 0',
        background: '#eaeff1',
    },
});

const ErpXpress = (props) => {
    const {classes, dispatch} = props;
    // const [state, setState] = useState({mobileOpen: false});

    const axiosOpts = {
        url: "http://localhost:8282/sys/findMenuList",
        method: "get"
    };
    const {loading, data, headers, fetch} = useAxios(axiosOpts);

    useEffect(fetch, []);
    useEffect(() => {
        if(data !== null)
            dispatch(setMenu(data));
    }, [data]);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <nav className={classes.drawer}>
                {/*<Hidden smUp implementation="js">*/}
                {/*    <Navigator*/}
                {/*        PaperProps={{style: {width: drawerWidth}}}*/}
                {/*        variant="temporary"*/}
                {/*        open={state.mobileOpen}*/}
                {/*        onClose={handleDrawerToggle}*/}
                {/*    />*/}
                {/*</Hidden>*/}
                <Hidden xsDown implementation="css">
                    <Navigator
                        PaperProps={{
                            style: {
                                width: drawerWidth
                            }
                        }}
                    />
                </Hidden>
            </nav>
            <div className={classes.appContent}>
                <Route path="/" render={(routeProps) => <Header logout={props.logout}/>}/>
                {/*<Route path="/" component={Header}/>*/}
                {/*<Header onDrawerToggle={handleDrawerToggle}/>*/}
                <main className={classes.mainContent}>
                    <RouteList/>
                </main>
            </div>
        </div>
    );
}

ErpXpress.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(ErpXpress));
