import * as Account from "../contents/Account";
import * as Personnel from '../contents/Personnel';
import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

const PageRoute = (props) => {
    const urlArray = props.menuUrl.split('/');
    const category = {'acc': Account, 'hr': Personnel};
    const categoryName = urlArray[1];
    const pageName = urlArray[urlArray.length - 1];
    const currentCategory = category[categoryName];
    const currentComponent = currentCategory && currentCategory[pageName];

    return (
        <React.Fragment>
            {currentComponent && <Route path={props.menuUrl} component={currentComponent}/>}
        </React.Fragment>
    )
};

const RouteList = (props) => {
    const {menuList} = props;

    return (
        <React.Fragment>
            {menuList.map(({menuCode, menuUrl, subMenuList}) => (
                <React.Fragment key={menuCode}>
                    {menuUrl && <PageRoute menuUrl={menuUrl}/>}
                    {subMenuList && <RouteList menuList={subMenuList}/>}
                </React.Fragment>
            ))}
        </React.Fragment>
    )
};

//currentPage
const mapStateToProps = state => ({
    menuList: state.menu.menuList,
});

export default connect(mapStateToProps)(RouteList);
