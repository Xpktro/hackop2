import css from 'styled-jsx/css';

export default css`

  .loading {
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sender {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .controls {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 75%;
    background: linear-gradient(rgba(43, 43, 50, 0.95), rgba(28, 28, 31, 0.95));
    border: 1.5px solid rgba(0, 0, 0, 0.7);
    border-radius: 10em;
    padding: 2.5em 1.5em 4em 1.5em;
  }

  .control {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 1em;
    border-bottom: 2px solid black;
    margin-bottom: 1em;
    height: 50%;
  }

  .control:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .value {
    height: 42%;
    width: 42%;
    padding: 0.3em;
    display: flex;
    align-self: center;
  }

  .buttons {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 80%;
  }

  button {
    width: 40%;
    height: 100%;
    margin: 0.1em;
    background-image: url("/static/button.png");
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    border: 0;
  }

  button:active {
    background-image: url("/static/button-click.png");
  }

  .operator {
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    width: 60%;
    height: 60%;
  }

  .minus {
    background-image: url("/static/minus.svg");
  }

  .minus-circle:active {
    background-image: url("/static/minus-circle.svg");
  }

  .minus-hexagon:active {
    background-image: url("/static/minus-hexagon.svg");
  }

  .plus {
    background-image: url("/static/plus.svg");
  }


  .plus-circle:active {
    background-image: url("/static/plus-circle.svg");
  }

  .plus-hexagon:active {
    background-image: url("/static/plus-hexagon.svg");
  }
`;
