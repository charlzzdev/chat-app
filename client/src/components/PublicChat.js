import React, { Component } from 'react';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

class PublicChat extends Component {
      state = {
            messages: []
      }

      componentDidMount(){
            this.chat = io.connect('http://192.168.11.248:3100');

            if(typeof this.props.location.state !== 'undefined'){
                  this.chat.emit('connection info', this.props.location.state.name);
            }

            if(typeof this.props.location.state !== 'undefined'){
                   this.name = this.props.location.state.name;
            }

            this.chat.on('message', (message) => {
                  this.setState({
                        messages: [
                              ...this.state.messages,
                              message
                        ]
                  });
            });

            this.chat.on('disconnect', (info) => {
                  this.setState({
                        messages: [
                              ...this.state.messages,
                              {
                                    name: 'Info',
                                    message: info
                              }
                        ]
                  });
            });

            this.chat.on('join', (info) => {
                  this.setState({
                        messages: [
                              ...this.state.messages,
                              {
                                    name: 'Info',
                                    message: info
                              }
                        ]
                  });
            });
      }

      sendMessage = (e) => {
            e.preventDefault();

            let input = e.target.childNodes[0];
            if(input.value.trim() !== '' && this.name === this.props.location.state.name){
                  this.chat.emit('message', {name: this.props.location.state.name, message: input.value});
            }

            input.value = '';
      }

      render() {
            return(
                  typeof this.props.location.state !==  'undefined' ? (
                        <div>
                              <ul className="container chatbox collection">
                                    {
                                          this.state.messages.length > 0 ? this.state.messages.map(message => {
                                                return(
                                                      <li key={Math.random()} className="collection-item"><strong>{message.name}</strong>: {message.message}</li>
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
                  ) : <Redirect to="/" />
            )
      }
}

export default PublicChat;
