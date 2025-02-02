import styled from "styled-components";

export const SizeStyle = styled.li`
  border: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 10px;
  .name {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: min(1.5rem, 5vw);

    input {
      accent-color: #03f703;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  .other-info {
    display: flex;
    gap: 0.2rem;
    section {
      display: flex;
      flex-direction: column;

      label {
        font-size: min(0.8rem, 2vw);
      }
      input {
        padding: 0.2rem 0;
      }
    }
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    cursor: pointer;
  }
`;
