import {
  Dispatch,
  forwardRef,
  MutableRefObject,
  SetStateAction,
  useState,
} from "react";
import styled from "styled-components";

const SearchbarComponent = (
  {
    placeholder,
    value,
    setValue,
    userClicked,
    setUserClicked,
  }: {
    placeholder?: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    userClicked?: boolean;
    setUserClicked: Dispatch<SetStateAction<boolean>>;
  },
  ref: MutableRefObject<HTMLInputElement>
) => {
  const [active, setActive] = useState(false);
  return (
    <SearchbarStyle className={active ? "active" : undefined}>
      <input
        ref={ref}
        onKeyDown={() => setActive(true)}
        onTouchStart={() => {
          setUserClicked(true);
          setActive(true);
        }}
        onMouseDown={() => {
          setUserClicked(true);
          setActive(true);
        }}
        onMouseLeave={() => setActive(false)}
        onBlur={() => setActive(false)}
        placeholder={placeholder ?? "Pesquise..."}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </SearchbarStyle>
  );
};

export const Searchbar = forwardRef(SearchbarComponent);

const SearchbarStyle = styled.div`
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
  max-width: 300px;
  width: 300px;
  align-self: center;
  border: 2px solid white;
  input {
    width: 100%;
    outline: none;
    border: none;
    color: white;
    background-color: transparent;
    &::placeholder {
      color: #ffffff98;
    }
  }

  &.active {
    border-bottom: 2px solid white;
  }
`;
