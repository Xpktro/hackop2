import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import QRCode from 'qrcode.react';
import Layout from '../layout/layout';

const style = {
  root: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    justifyItems: 'center',
  },
  qr: {
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
      <Layout title="Enter the matrix">
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
