import React, { Component } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
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
                  this.chat.emit('message', {name: this.props.location.state.name, message: input.value, public: true});
            }

            input.value = '';
      }

      render() {
            return(
                  typeof this.props.location.state !==  'undefined' ? (
                        <Chat messages={this.state.messages} sendMessage={this.sendMessage} />
                  ) : <Redirect to="/" />
            )
      }
}

export default PublicChat;
