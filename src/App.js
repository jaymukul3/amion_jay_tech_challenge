import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Home from './components/Home/Home';

class App extends React.Component{
  
    constructor(props){
      super(props);
    }
  
    render(){
        return(
          <BrowserRouter>          
            <div>          
                <Switch>      
                <Route path='/' component={Home}/>
                </Switch>           
            </div> 
          </BrowserRouter>    
        )     
    }
  }

export default App;
