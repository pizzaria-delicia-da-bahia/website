import styled from "styled-components";
import { breakpointsMQ } from "../../mediaQueries";
import { colors } from "../../colors";
import { sizes } from "../../sizes";

export const LocalizacaoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding: 1rem 2rem;
  height: 100%;

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    h1 {
      color: ${colors.elements};
      font-size: min(1.8rem, 6vw);
    }
    h3 {
      color: #fff;
      text-align: center;
      font-size: min(1.5rem, 3vw);
    }
  }

  .frame {
    flex-grow: 1;
    iframe {
      width: 90vw;
      height: 100%;
      /* height: calc(80vh - ${sizes.header}px - ${sizes.footer}px); */

      border: 0.3rem solid ${colors.elements};
      border-radius: 1rem;
    }
  }

  @media ${breakpointsMQ.tablet} {
    padding: 2rem 2rem;
  }
  @media ${breakpointsMQ.desktopSmUp} {
    padding: 3rem 2rem;
    .frame {
      iframe {
        width: 80vw;
      }
    }
  }
  @media ${breakpointsMQ.desktopMdUp} {
    padding: 2rem;
  }
`;
