import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {connect, useSelector} from 'react-redux';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    appbar: {
        backgroundColor: '#232f3e',
    },
    toolbar: {
        paddingTop: theme.spacing(2) - 3,
        paddingBottom: theme.spacing(2) - 3,
    },
    title: {
        color: theme.palette.common.white,
    },
    secondaryBar: {
        zIndex: 0,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 0,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
    breadcrumbs: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    breadcrumbsLink: {
        textDecoration: 'none',
        color: theme.palette.common.white,
    }
});

function Header(props) {
    const {classes, currentMenuName} = props;

    return (
        <React.Fragment>
            <AppBar className={classes.appbar} position="sticky" elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Grid container spacing={1} alignItems="center">
                        {/*<Hidden smUp>*/}
                        {/*    <Grid item>*/}
                        {/*        <IconButton*/}
                        {/*            color="inherit"*/}
                        {/*            aria-label="Open drawer"*/}
                        {/*            onClick={onDrawerToggle}*/}
                        {/*            className={classes.menuButton}*/}
                        {/*        >*/}
                        {/*            <MenuIcon/>*/}
                        {/*        </IconButton>*/}
                        {/*    </Grid>*/}
                        {/*</Hidden>*/}
                        <Grid item>
                            <Typography noWrap color={"inherit"} variant={"h6"}>
                                {useSelector(state => state.menu.currentMenuName)}
                            </Typography>
                        </Grid>
                        <Grid item xs/>
                        {/*<Grid item>*/}
                        {/*    <Typography className={classes.link} component="a" href="#">*/}
                        {/*        Go to docs*/}
                        {/*    </Typography>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Tooltip title="Alerts • No alters">
                                <IconButton color="inherit">
                                    <NotificationsIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton
                                color="inherit"
                                className={classes.iconButtonAvatar}
                                onClick={props.logout}
                            >
                                <Avatar
                                    className={classes.avatar}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png"
                                    alt="My Avatar"
                                />
                                <Typography>
                                    {useSelector(state => state.login.user && state.login.user.empName)}
                                </Typography>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    // onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
