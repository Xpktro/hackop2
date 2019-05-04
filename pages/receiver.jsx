import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';


class Receiver extends Component {
  state = {
    devices: [],
    outputDevice: null,
    channel: 0,
    cc: 44,
    value: 0,
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('connect', socket => {
      console.log('connected');
      this.socket.emit('join', 'receiver');
      this.socket.on('message', this.handleMessage);
    });

    navigator
      .requestMIDIAccess()
      .then((access) => this.accessGranted(access));
  }

  updateOutputDevices = () => {
    const devices = [];
    this.access.outputs.forEach(device => devices.push(device));
    this.setState({ devices, outputDevice: this.state.outputDevice || devices[0] });
    this.outputDevice = this.access.outputs.get(this.state.outputDevice.id || devices[0].id);
    this.sendCCData();
  };

  accessGranted = midiAccess => {
    this.access = midiAccess;
    this.access.onstatechange = this.updateOutputDevices;
    this.updateOutputDevices();
  };

  sendCCData = () => {
    if(!this.outputDevice) {
      console.log('no output');
      return;
    }
    this.outputDevice.send([
      0xB0 + (this.state.channel & 15),
      this.state.cc & 127,
      this.state.value & 127
    ]);
  };

  handleMessage = message => {
    const direction = parseFloat(message);
    if(this.state.value + direction >= 0 &&
       this.state.value + direction <= 127) {
      this.setState({ value: this.state.value + direction }, this.sendCCData);
    }
  };

  render() {
    return (
      <Fragment>
        <h1>Receiver</h1>
        <select onChange={e => this.setState({ outputDevice: this.state.devices[e.target.value] }, this.updateOutputDevices)}>
          {this.state.devices.map((device, i) =>
            <option key={device.id} value={i}>{device.name}</option>
          )}
        </select>
        <h1>Channel:</h1>
        <input type="number" value={this.state.channel} onChange={e => this.setState({ channel: e.target.value })} />
        <h1>CC:</h1>
        <input type="number" value={this.state.cc} onChange={e => this.setState({ cc: e.target.value })} />
        <h1>Value: {this.state.value}</h1>
      </Fragment>
    );
  }
}

export default Receiver;
