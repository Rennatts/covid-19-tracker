import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { getMessage } from './../redux/actions/covidActions';
import GlobalMap from './GlobalMap';




function LandingPage({msg}) {
    const dispatch = useDispatch();
    

    useEffect(() => {
        function loadWelcomeMsg() {
            dispatch(getMessage());
        }
        loadWelcomeMsg()
        
    }, [dispatch]);


    return (
        <div>LandingPage
            <p>{msg.msg}</p>
            <GlobalMap/>
        </div>
    )
}

const mapStateToProps = ({ covid: {msg} }) => ({
    msg
})


export default connect(mapStateToProps, null)(LandingPage);