import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import QRCode from 'qrcode.react';

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
  title: {
    fontSize: '2.5em',
  },
};

class Home extends Component {
  state = { url: null };

  componentDidMount() {
    this.setState({ url: `${window.location.href}sender` });
  }

  render() {
    return (
      <Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <style jsx global>{`
          body {
            background: black;
            width: 100%;
            height: 100%;
            margin: 0;
            font-family: monospace;
            font-size: 1.3rem;
          }
          #__next {
            width: 100%;
            height: 100%;
            display: flex;
            position: absolute;
          }
        `}</style>
        {
          this.state.url
          ? <div style={style.root}>
              <p style={style.title}>Enter the matrix</p>
              <QRCode
                style={style.qr}
                value={this.state.url}
                renderAs="svg"
                size={'30em'}
              />
            </div>
          : null
        }
      </Fragment>
    );
  }
}

export default Home;
