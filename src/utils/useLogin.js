import {useEffect, useState} from "react";
import jwt from "jsonwebtoken";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../actions";

const useLogin = (props) => {
    const SESSION_NAME = "authorization";
    const KEY = Buffer.from("ZWFmYmVvO2Z2Ym87Z3ZlcmFvO2lndmJhZW9yO3ZnYiBlcjtidm5hZWtsO2J2IG5lcmFvdWlwdm5pb3dlO3ZnYmVyO3Zz", "base64");

    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();

    // 토큰 검증
    const verifyToken = (token) => {
        let isVerified = false;
        let json = null;

        jwt.verify(token, KEY, (error, decoded) => {
            isVerified = !error;
            json = decoded;
        });

        return {isVerified, json};
    };

    // 로그인 상태 변경
    const sign = (token) => {
        const verify = token && verifyToken(token);

        if (verify && verify.isVerified !== setIsLogin) {
            setIsLogin(verify.isVerified);
            verify.isVerified && sessionStorage.setItem(SESSION_NAME, token);
        }
    };

    // 로그아웃
    const logout = () => {
        verify.isVerified && sessionStorage.removeItem(SESSION_NAME);
        setIsLogin(false);
    };

    // 유저 정보 저장
    const setUserToRedux = (user) => {
        isLogin && dispatch(setUser(user));
    };

    const verify = verifyToken(sessionStorage.getItem(SESSION_NAME));

    isLogin !== verify.isVerified && setIsLogin(verify.isVerified);
    useEffect(() => {
        setUserToRedux(verify.json)
    }, []);

    return {isLogin, sign, logout};
};

export default useLogin;
