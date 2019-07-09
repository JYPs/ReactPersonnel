// https://youtu.be/IxydSMI4Qjg

import {useState, useEffect} from "react";
import defaultAxios from "axios";

const useAxios = (options, axiosInstance = defaultAxios) => {
    if(sessionStorage.getItem("authorization"))
        axiosInstance.defaults.headers.common['Authorization'] = sessionStorage.getItem("authorization");

    const [state, setState] = useState({
        url: options.url,
        loading: options.fetchOnStart,
        errorCode: 0,
        errorMsg: "",
        data: null,
        headers: null
    });

    const [trigger, setTrigger] = useState(0);
    const [fetchOnStart, setFetchOnStart] = useState(options.fetchOnStart);

    const fetchData = () => {

        if (!state.url)
            return;

        if (!fetchOnStart) {
            setFetchOnStart(true);
            return;
        }

        axiosInstance(options).then(response => {
            setState({
                ...state,
                loading: false,
                data: response.data,
                headers: response.headers
            });
        }).catch(error => {
            setState({...state, loading: false, error: error})
        })
    };

    useEffect(fetchData, [trigger]);

    const fetch = (url = state.url) => {
        setState({
            ...state,
            url: url,
            loading: true
        });

        setTrigger(Date.now())
    };


    return {...state, fetch};
};

export default useAxios;

