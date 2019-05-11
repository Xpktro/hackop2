import Head from 'next/head';
import './normalize.css';
import styles from './layout.css.js'

export default ({ children, title = 'Default title', forceLandscape = true }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <meta name="theme-color" content="#1c1c1f" />
    </Head>
    <style jsx global>{`
      body {
        background: #1c1c1f url("/static/background.png") no-repeat center center fixed;
        background-size: cover;

        color: white;
        width: 100vw;
        height: 100vh;

        margin: 0;
        font-family: monospace;
        font-size: 1.3rem;
      }
      *:focus {
        outline: 0 !important;
      }

      #__next, #content {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        position: absolute;
      }

      #orientation {
        display: none;
        width: 100%;
        height: 100%;
        align-self: center;
        margin: 0 auto;
        font-size: 3em;
        align-items: center;
        justify-content: center;
      }

      @media only screen and (orientation:portrait) {
        #content { display: flex; }
        #orientation { display: none; }
      }
      @media only screen and (orientation:landscape) {
        #content { display: ${forceLandscape ? 'none' : 'flex'}; }
        #orientation { display: ${forceLandscape ? 'flex' : 'none'}; }
      }

      #preload {
        display: none;
      }
    `}</style>
    <div id="preload">
      <img src="/static/circle.svg" />
      <img src="/static/hexagon.svg" />
      <img src="/static/button.png" />
      <img src="/static/button-click.png" />
      <img src="/static/minus.svg" />
      <img src="/static/minus-circle.svg" />
      <img src="/static/minus-hexagon.svg" />
      <img src="/static/plus.svg" />
      <img src="/static/plus-circle.svg" />
      <img src="/static/plus-hexagon.svg" />
    </div>
    <div id="orientation">
      <img src="/static/rotate.gif" alt="rotate your device" />
    </div>
    <div id="content">
      <p className="side-label">Internet of Synths - Matrix Operator</p>
      {children}
    </div>
    <style jsx>{styles}</style>
  </>
);
