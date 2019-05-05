import React, { Component, Fragment } from 'react';
import Layout from '../layout/layout';
import io from 'socket.io-client';


const styles = {
  controls: {
    display: 'flex',
    flexDirection: 'row',
  },
  control: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  content: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
  }
};

class Receiver extends Component {
  state = {
    devices: [],
    outputDevice: null,
    controls: null,
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('connect', socket => {
      console.log('connected');
      this.socket.on('controls', controls => {
        this.setState(
          { controls },
          () => this.sendCCData()
        );
      });
      navigator
        .requestMIDIAccess()
        .then((access) => this.accessGranted(access));
    });
  }

  accessGranted = midiAccess => {
    this.access = midiAccess;
    this.access.onstatechange = this.updateOutputDevices;
    this.updateOutputDevices();
  };

  updateOutputDevices = () => {
    const devices = [];
    this.access.outputs.forEach(device => devices.push(device));
    this.setState({ devices, outputDevice: this.state.outputDevice || devices[0] });
    this.outputDevice = this.access.outputs.get(this.state.outputDevice.id || devices[0].id);
    this.sendCCData();
  };

  sendCCData = () => {
    if(!this.outputDevice || !this.state.controls) {
      console.log('no output');
      return;
    }
    this.state.controls.forEach(control =>
      this.outputDevice.send([
        0xB0 + (control.channel & 15),
        control.cc & 127,
        Math.round(control.value) & 127
      ])
    );
  };

  render() {
    const { controls } = this.state;
    controls && console.log(controls.map(c => c.value));

    return (
      <Layout title="Receiver" forceLandscape={false}>
        <div style={styles.content}>
          <h1>Receiver</h1>
          <select onChange={e => this.setState({ outputDevice: this.state.devices[e.target.value] }, this.updateOutputDevices)}>
            {this.state.devices.map((device, i) =>
              <option key={device.id} value={i}>{device.name}</option>
            )}
          </select>

          <div style={styles.controls}>
            {!controls
              ? <h1>Loading...</h1>
              : controls.map((control, i) => (
                <div key={i} style={styles.control}>
                  <h1>#{i}</h1>
                  <h1>CH: {control.channel}</h1>
                  <h1>CC: {control.cc}</h1>
                  <h1>Val: {control.value}</h1>
                </div>
              ))
            }
          </div>
        </div>
      </Layout>
    );
  }
}

export default Receiver;
