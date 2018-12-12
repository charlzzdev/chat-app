import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Start extends Component {
      state = {
            name: ''
      }

      setName = (e) => {
            this.setState({
                  name: e.target.value
            });
      }

      render(){
            return(
                  <div className="Start">
                        <div className="App center row valign-wrapper">
                              <form className="col l6">
                                    <input type="text" placeholder="Your name" onChange={this.setName}/>
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
                                                      } className="btn btn-flat white-text blue">Join public chatroom</Link>
                                                      <Link to="/" className="btn btn-flat white-text blue">Join private chatroom</Link>
                                                      <Link to="/" className="btn btn-flat blue-text white">Create private chatroom</Link>
                                                </div>
                                          ) : (
                                                <div>
                                                      <Link to="/" className="btn disabled">Join public chatroom</Link>
                                                      <Link to="/" className="btn disabled">Join private chatroom</Link>
                                                      <Link to="/" className="btn disabled btn-flat">Create private chatroom</Link>
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