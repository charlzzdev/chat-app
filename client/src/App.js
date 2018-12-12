import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Start from './components/Start';
import PublicChat from './components/PublicChat';
import PrivateChat from './components/PrivateChat';

class App extends Component {
      render() {
            return (
                  <BrowserRouter>
                        <div>
                              <Route exact path="/" component={Start}/>
                              <Route path="/public" component={PublicChat}/>
                              <Route path="/private" component={PrivateChat}/>
                        </div>
                  </BrowserRouter>
            );
      }
}

export default App;
