import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
//import {connect} from 'react-redux';
import LandingPage from './components/LandingPage';


function MainRouter(){

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={LandingPage}></Route> 
                </Switch>
            </Router>
        </div>
    )

};


export default MainRouter;