import css from 'styled-jsx/css';


export default css`
  .side-label {
    position: absolute;
    top: 30%;
    left: 0.2em;
    margin: 0;
    -webkit-writing-mode: vertical-lr;
    -ms-writing-mode: tb-lr;
    writing-mode: vertical-lr;
    text-orientation: sideways;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 0.7em;
    text-shadow: 0 0 2px black;
    color: rgba(255, 255, 255, 0.3);
  }
`;
