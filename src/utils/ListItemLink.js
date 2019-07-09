import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {setCurrentMenu} from "../actions";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";

const styles = theme => ({
    item: {
        paddingTop: 0,
        paddingBottom: 0,
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(1),
    },
});

const ListItemLink = (props) => {
    const {classes, to, name, icon, dispatch} = props;

    const setCurrentMenuName = () => {
        dispatch(setCurrentMenu(name));
    };

    const renderLink = React.forwardRef((itemProps, ref) => (
        // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
        <Link to={to ? to : '#'} {...itemProps} innerRef={ref}/>
    ));

    const linkIcon = icon ? icon : 'angle-right';

    return (
        <ListItem
            button
            component={renderLink}
            className={classes.item}
            onClick={setCurrentMenuName}
        >
            {
                linkIcon &&
                <IconButton className={clsx(classes.item, classes.itemIcon)}>
                    <Icon className={`fa fa-${linkIcon}`} fontSize={"small"}/>
                </IconButton>
                // </ListItemIcon>
            }
            <ListItemText className={classes.itemPrimary}>{props.children}</ListItemText>
        </ListItem>
    )
};

export default connect()(withStyles(styles)(ListItemLink));
