import React, { Component, Fragment } from 'react';
import Layout from '../layout/layout';
import io from 'socket.io-client';
import styles from './sender.css.js'

class Sender extends Component {
  state = {
    controls: null,
  };

  componentDidMount() {
    this.socket = io();
    this.socket.on('controls', controls => this.setState({ controls }));
  }

  emit = (message) => () => {
    console.log('outgoing:', message);
    this.socket.emit('sender', message);
  };

  controlImage = ({ icon, value, max, min }) => (
    <img
      style={{
        width: '100%',
        transition: 'all .2s ease-in-out',
        transform: `scale(${((value - min) / (max - min) * 0.9) + 0.1})`
      }}
      src={`/static/${icon}.svg`}
      alt={icon}
    />
  );


  render() {
    const { controls } = this.state;
    controls && console.log(controls.map(c => c.value));
    return (
      <Layout title="Interactive performance">
        <div className="sender">
          <div className="controls">
            {!controls
              ? <div className="loading">Matrix Operator's Internet of Synths is loading...</div>
              : controls.map((control, i) => (
                <div key={i} className="control">
                  <div className="value">
                    {this.controlImage(control)}
                  </div>
                  <div className="buttons">
                    <button onClick={this.emit({ control: i, type: '-' })}><div className={`operator minus minus-${control.icon}`} /></button>
                    <button onClick={this.emit({ control: i, type: '+' })}><div className={`operator plus plus-${control.icon}`} /></button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <style jsx>{styles}</style>
      </Layout>
    );
  }
}

export default Sender;
