import React, {useState} from 'react';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from '../utils/ListItemLink';
import Icon from '@material-ui/core/Icon';
import {connect} from 'react-redux';

const styles = theme => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    collapse: {
        marginBottom: theme.spacing(2),
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
});

function Navigator(props) {
    const {classes, menuList, dispatch, ...other} = props;

    const [openMenuCode, setOpenMenuCode] = useState(null);

    return (
        <Drawer variant="permanent" {...other}>
            <List component={"nav"} disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    ErpXpress
                </ListItem>
                {menuList.map(({menuCode, menuName, icon, subMenuList}) => (
                    <React.Fragment key={menuCode}>
                        <ListItem className={classes.categoryHeader} onClick={() => setOpenMenuCode(menuCode)}>
                            <ListItemIcon className={clsx(classes.firebase, classes.itemIcon)}><Icon
                                className={`fa fa-${icon}`}
                                fontSize={"small"}/></ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {menuName}
                            </ListItemText>
                        </ListItem>
                        {subMenuList.map(({
                                              menuCode: subMenuCode,
                                              menuName: subMenuName,
                                              menuUrl: subMenuUrl,
                                              icon: subMenuIcon,
                                              subMenuList: lastMenuList,
                                              active
                                          }) => (
                            <Collapse
                                key={subMenuCode}
                                in={openMenuCode === menuCode}
                                timeout={"auto"}
                                unmountOnExit>
                                <List component={"div"} disablePadding
                                      className={classes.collapse}>

                                    {!lastMenuList &&
                                    <ListItemLink
                                        name={subMenuName}
                                        to={subMenuUrl}
                                        key={subMenuCode}
                                        active={active}
                                        icon={subMenuIcon}
                                    >

                                        {subMenuName}
                                    </ListItemLink>
                                    }

                                    {lastMenuList && lastMenuList.map(({
                                                                           menuCode: lastMenuCode,
                                                                           menuName: lastMenuName,
                                                                           menuUrl: lastMenuUrl,
                                                                           icon: lastMenuIcon,
                                                                           active
                                                                       }) => (
                                        <ListItemLink
                                            name={lastMenuName}
                                            to={lastMenuUrl}
                                            key={lastMenuCode}
                                            active={active}
                                            icon={lastMenuIcon}>

                                            {lastMenuName}
                                        </ListItemLink>
                                    ))}
                                </List>
                            </Collapse>
                        ))}
                        <Divider/>

                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    menuList: state.menu.menuList
});

export default connect(mapStateToProps)(withStyles(styles)(Navigator));
