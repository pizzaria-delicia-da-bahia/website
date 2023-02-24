import styled from "styled-components";
import { breakpointsMQ } from "@styles/mediaQueries";
import { colors } from "@styles/colors";
import { sizes } from "@styles/sizes";

export const LocalizacaoStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding: 2rem 2rem 1rem;
  height: 100%;
  gap: 1rem;

  .frame {
    flex-grow: 1;
    iframe {
      width: 90vw;
      height: 100%;
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
