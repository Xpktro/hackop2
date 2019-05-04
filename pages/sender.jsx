import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';


class Home extends Component {
  componentDidMount() {
    this.socket = io();
  }

  emit = (what) => () => {
    console.log('outgoing:', what);
    this.socket.emit('sender', what);
  }

  render() {
    return (
      <Fragment>
        <h1>What do you want?</h1>
        <button onClick={this.emit('-5')}>Less -</button>
        <button onClick={this.emit('5')}>More +</button>
      </Fragment>
    );
  }
}

export default Home;
