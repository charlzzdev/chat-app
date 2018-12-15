import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Start extends Component {
      state = {
            name: '',
            privateId: ''
      }

      setInputs = (e) => {
            this.setState({
                  [e.target.id]: e.target.value
            });
      }

      getRandomPath = () => {
            let chars = 'qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM0123456789';
            let path = '/private/';
            
            for(let i = 0; i < 32; i++){
                  path += chars.charAt(Math.round(Math.random()*chars.length-1));
            }

            return path;
      }

      render(){
            return(
                  <div className="Start">
                        <div className="App center row valign-wrapper">
                              <form className="col l6">
                                    <input type="text" placeholder="Your name" id="name" onChange={this.setInputs} />
                                    <input type="text" placeholder="Private chat room ID" id="privateId" onChange={this.setInputs} />
                                    {
                                          this.state.name.trim() !== '' ? (
                                                <div>
                                                      <Link to={
                                                            {
                                                                  pathname: "/public",
                                                                  state: {
                                                                        name: this.state.name
                                                                  }
                                                            }
                                                      } className="btn btn-flat white-text blue">Join public chat room</Link>
                                                      <Link to={
                                                            {
                                                                  pathname: '/private/' + this.state.privateId,
                                                                  state: {
                                                                        name: this.state.name
                                                                  }
                                                            }
                                                      } className="btn btn-flat white-text blue">Join private chat room</Link>
                                                      <Link to={
                                                            {
                                                                  pathname: this.getRandomPath(),
                                                                  state: {
                                                                        name: this.state.name
                                                                  }
                                                            }
                                                      } className="btn btn-flat blue-text white">Create private chat room</Link>
                                                </div>
                                          ) : (
                                                <div>
                                                      <Link to="/" className="btn disabled">Join public chat room</Link>
                                                      <Link to="/" className="btn disabled">Join private chat room</Link>
                                                      <Link to="/" className="btn disabled btn-flat">Create private chat room</Link>
                                                </div>
                                          )
                                    }
                              </form>
                        </div>
                  </div>
            )
      }
}

export default Start;