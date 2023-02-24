const scrollbar = (color) => /*css*/ `
  scroll-behavior: smooth;
/* width */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-moz-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${color};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #fff;
  }
`;

export default scrollbar;
