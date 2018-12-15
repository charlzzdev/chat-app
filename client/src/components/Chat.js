import React from 'react';

const Chat = (props) => {
      return(
            <div>
                  <ul className="container chatbox collection">
                        {
                              props.messages.length > 0 ? props.messages.map(message => {
                                    return(
                                          <li key={Math.random()} className="collection-item"><strong>{message.name}</strong>: {message.message}</li>
                                    )
                              }) : null
                        }
                  </ul>
                  <form onSubmit={props.sendMessage} className="container valign-wrapper">
                        <input type="text" className="" placeholder="Message"/>
                        <button className="btn-floating">
                              <i className="material-icons">send</i>
                        </button>
                  </form>
            </div>
      )
}

export default Chat;