import {
    GET_WELCOME_MSG,
    GET_COUNT,
    GET_CUMULATIVE,
    GET_ALL
} from './../types/covidTypes';

import axios from 'axios';


export const getMessage = () => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/api/covid`)
        .then((res) => {
            if (res.data.error) {
                return {error: res.data.error };
            } else {
                dispatch({
                    type: GET_WELCOME_MSG,
                    payload: res.data
                });
            }
        })
        .catch((err) => console.log(err));
    }
};


export const getCount = (date) => {
    return axios.get(`http://localhost:5000/api/covid/cases/${date}/count`)
        .then((res) => {
            console.log(res);
            if (res.data.error) {
                return {error: res.data.error };
            } else {
              return {data: res.data};  
            }
        })
        .catch((err) => console.log(err));
    
    
};

export const getCumulative = (date) => {
    return (dispatch) => {
        axios
        .get(`http://localhost:5000/api/covid/cases/${date}/cumulative`)
        .then((res) => {
            dispatch({
                type: GET_CUMULATIVE,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
    };
};


export const getAll = () => {
    return (dispatch) => {
        axios
        .get("http://localhost:5000/api/covid/cases")
        .then((res) => {
            console.log(res);
            dispatch({
                type: GET_ALL,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
    };
};





