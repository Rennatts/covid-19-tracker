import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import MainRouter from './MainRouter';
import store from "./redux/store";


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainRouter></MainRouter>
      </Router>
    </Provider>
  );
}

export default App;
