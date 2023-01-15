import styled from "styled-components";
import { breakpointsMQ } from "../../mediaQueries";
import { sizes } from "../../sizes";
import { colors } from "../../colors";

export const LocalizacaoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18rem 2rem;

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;

    h1 {
      color: ${colors.elements};
    }
    h3 {
      color: #fff;
      text-align: center;
      font-size: min(1.5rem, 4vw);
    }
    p {
      display: block;
      flex-grow: 1;
      font-size: min(1rem, 8vw);
      color: #fff;
      overflow-y: auto;
      &::first-letter {
        font-size: 2rem;
        font-weight: bold;
        float: left;
        margin: 0px 5px;
      }
    }
  }

  .frame {
    iframe {
      width: 70vw;
      height: min(350px, 70vw);
    }
  }

  @media ${breakpointsMQ.mobile} {
    height: 100%;
    .frame {
      iframe {
        width: 90vw;
      }
    }
  }
  @media ${breakpointsMQ.tablet} {
    padding: 5rem 2rem;
    .frame {
      iframe {
        width: 90vw;
        height: min(60vh, 700px);
      }
    }
  }
  @media ${breakpointsMQ.desktopSmUp} {
    padding: 5rem 2rem;
  }
`;
