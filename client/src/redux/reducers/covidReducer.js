import {
    GET_WELCOME_MSG,
    GET_COUNT,
    GET_CUMULATIVE,
    GET_ALL 
} from './../types/covidTypes';


const initialState = {
    msg: "",
    count: [],
    cumulative: [],
    allData: []
}


const covidReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_WELCOME_MSG:
            return {
                ...state,
                msg: action.payload,
            }
        case GET_COUNT: 
            return{
                ...state,
                count: action.payload,
            }
        case GET_CUMULATIVE : 
            return{
                ...state,
                cumulative: action.payload,
            }
        case GET_ALL : 
            return{
                ...state,
                allData: action.payload,
            }
        default:
            return state;
    }
};



export default covidReducer;