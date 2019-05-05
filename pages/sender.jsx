import React, { Component, Fragment } from 'react';
import Layout from '../layout/layout';
import io from 'socket.io-client';

const styles = {
  controls: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  control: {
    flex: 1,
    display: 'flex',
    height: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  value: {
    width: '100%',
    height: '50%',
  },
  button: {
    flex: 1,
    height: '50%',
    width: '50%',
    backgroundColor: 'white'
  },
};

class Home extends Component {
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
  }

  render() {
    const { controls } = this.state;
    controls && console.log(controls.map(c => c.value));
    return (
      <Layout title="Interactive performance">
        <div style={styles.controls}>
          {!controls
            ? <h1>Loading...</h1>
            : controls.map((control, i) => (
              <div key={i} style={styles.control}>
                <input style={styles.value} type="range" min={control.min} max={control.max} value={control.value} />
                <button style={styles.button} onClick={this.emit({ control: i, type: '-' })}>-</button>
                <button style={styles.button} onClick={this.emit({ control: i, type: '+' })}>+</button>
              </div>
            ))
          }
        </div>
      </Layout>
    );
  }
}

export default Home;
