import Head from 'next/head';
import './normalize.css';

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
    `}</style>
    <div id="orientation">
      <img src="/static/rotate.gif" alt="rotate your device" />
    </div>
    <div id="content">
      {children}
    </div>
  </>
);
