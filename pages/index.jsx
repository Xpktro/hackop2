import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import QRCode from 'qrcode.react';
import Layout from '../layout/layout';

const style = {
  root: {
    height: '100%',
    margin: '0 auto',
    display: 'flex',
    textAlign: 'center',
    color: 'white',
    alignItems: 'center',
    justifyItems: 'center',
  },
  qr: {
    maxWidth: '100%',
    backgroundColor: 'white',
    padding: '1.5em',
  },
};

class Home extends Component {
  state = { url: null };

  componentDidMount() {
    this.setState({ url: `${window.location.href}sender` });
  }

  render() {
    return (
      <Layout title="Enter the matrix" forceLandscape={false}>
        {this.state.url && (
          <a href="/sender"style={style.root}>
            <QRCode
              style={style.qr}
              value={this.state.url}
              renderAs="svg"
              size={'30em'}
            />
          </a>
        )}
      </Layout>
    );
  }
}

export default Home;
