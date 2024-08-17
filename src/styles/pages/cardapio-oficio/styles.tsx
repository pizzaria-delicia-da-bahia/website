import styled from "styled-components";
import { colors } from "@styles/colors";

export const SizesStyle = styled.div`
  list-style: none;
  display: flex;
  gap: 1rem;
  justify-content: end;

  li {
    display: flex;
    background-color: #00000020;
    gap: 1rem;
    padding: 0.5rem;

    .nome {
      color: ${colors.elements};
    }

    .descricao {
      color: #fff;
    }

    .apartir {
      color: #fff;
      font-size: small;
    }

    .valor {
      color: #fff;
    }
  }
`;

export const CardapioOficioStyle = styled.main`
  color: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* max-height: 100svh; */
  scroll-behavior: smooth;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  /* align-items: start; */
  /* justify-items: start; */
  /* align-content: start; */
  gap: 0.3rem;
  /* padding: 0 2rem; */
  /* background: pink; */

  > aside {
    display: flex;
    flex-direction: column;
    flex: 0.5;
    gap: 0.6rem;
  }

  * {
    user-select: text;
  }
  .grupo-sabores {
    /* width: 48.99%; */
    /* flex: 0.5; */
    /* background: green; */
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .grupo {
    text-align: center;
  }
  .tamanhos {
    transform: translateY(200%);
  }
  .sabores {
    display: flex;
    flex-direction: column;
    /* flex-grow: 1; */
    gap: 0.05rem;
  }

  .sabor-valores {
    display: flex;

    .sabor {
      flex: 1;
      display: flex;
      align-items: center;

      .right {
        gap: 0;
        user-select: auto;
        display: flex;
        flex-direction: column;
        /* align-items: center; */

        .flavour-name {
          /* font-size: min(1rem, 5.5vw) !important; */
          font-size: 1.2rem;
          gap: 2px;
          color: ${colors.elements};
        }
        .flavour-ingredients {
          font-size: 0.75rem;
          opacity: 0.8;
          font-weight: bold;
          /* color: #fff; */
        }
      }
    }
    .valores {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.2rem;
      grid-column: 2;
      align-items: center;

      .valor {
        color: #fff;
        min-width: 4rem;
        /* min-height: 2.2rem; */
        p {
          font-size: 0.7rem;
          letter-spacing: 0.1rem;
        }
        strong {
          font-size: 0.8rem;
        }
        /* padding: 0.2rem 0.8rem;
          border-radius: 0.3rem; */
        flex-grow: 1;
        text-align: center;
        /* background-color: #fff; */

        &:nth-child(even) {
          color: ${colors.elements};
        }
      }
      .valor {
        color: #fff;
        min-width: 4rem;
        /* min-height: 2.2rem; */
        font-size: 0.6rem;
        /* padding: 0.2rem 0.8rem;
          border-radius: 0.3rem; */
        flex-grow: 1;
        text-align: center;
        /* background-color: #fff; */

        &:nth-child(even) {
          color: ${colors.elements};
        }
      }
    }

    &:nth-child(even) {
      background-color: #00000020;
    }
  }

  @media print {
    overflow: visible;
  }
`;
