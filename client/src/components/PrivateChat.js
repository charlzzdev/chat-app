import React, {Component} from 'react';
import Chat from './Chat';
import io from 'socket.io-client';
import {Redirect} from 'react-router-dom';

class PrivateChat extends Component {
      state = {
            messages: []
      }

      componentDidMount(){
            this.chat = io.connect('http://192.168.11.248:3100');

            this.chat.on('private message', (message) => {
                  if(message.public === false && message.room === this.props.match.params.id){
                        this.setState({
                              messages: [
                                    ...this.state.messages,
                                    message
                              ]
                        });
                  }
            });
      }

      sendMessage = (e) => {
            e.preventDefault();
            let input = e.target.childNodes[0];

            if(input.value.trim() !== '' && typeof this.props.location.state !== 'undefined'){
                  let messages = {
                        name: this.props.location.state.name,
                        message: input.value,
                        public: false,
                        room: this.props.match.params.id
                  };

                  this.chat.emit('message', messages);
            }

            input.value = '';
      }

      render(){
            return(
                  typeof this.props.location.state !== 'undefined' ? <Chat messages={this.state.messages} sendMessage={this.sendMessage} />
                  : <Redirect to="/" />
            )
      }
}

export default PrivateChat;