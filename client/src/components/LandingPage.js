import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import "./LandingPage.css";
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
        <div className="main_container_landingpage">
            <h2>Covid-19 Tracker</h2>
            <p>{msg.msg}</p>
            <GlobalMap/>
        </div>
    )
}

const mapStateToProps = ({ covid: {msg} }) => ({
    msg
})


export default connect(mapStateToProps, null)(LandingPage);