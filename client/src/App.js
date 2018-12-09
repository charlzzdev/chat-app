import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
      state = {
            messages: []
      }

      componentDidMount(){
            this.chat = io.connect('http://192.168.11.248:3100');

            this.chat.on('message', (message) => {
                  this.setState({
                        messages: [
                              ...this.state.messages,
                              message
                        ]
                  });
            });
      }

      sendMessage = (e) => {
            e.preventDefault();

            let input = e.target.childNodes[0];
            if(input.value.trim() !== ''){
                  this.chat.emit('message', input.value);
            }

            input.value = '';
      }

      render() {
            return (
                  <div className="App">
                        <ul className="container chatbox">
                              {
                                    this.state.messages.length > 0 ? this.state.messages.map(message => {
                                          return(
                                                <li key={Math.random()}>{message}</li>
                                          )
                                    }) : null
                              }
                        </ul>
                        <form onSubmit={this.sendMessage} className="container valign-wrapper">
                              <input type="text" className="" placeholder="Message"/>
                              <button className="btn-floating">
                                    <i className="material-icons">send</i>
                              </button>
                        </form>
                  </div>
            );
      }
}

export default App;
