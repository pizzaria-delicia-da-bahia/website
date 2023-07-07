import { formatPhoneNumber } from "@util/format";
import { FC } from "react";
import { MyInputStyle } from "./styles";

export const MyInput: FC<{
  disabled?: boolean;
  name: string;
  placeholder?: string;
  type: "text" | "name" | "address" | "phoneNumber" | "zipCode" | "number";
  value: string | number;
  tabIndex?: number;
  setValue: (value: string | number) => void;
  min?: number;
  max?: number;
}> = ({
  disabled = false,
  name,
  type,
  placeholder,
  tabIndex,
  value,
  min,
  max,
  setValue,
}) => {
  return (
    <MyInputStyle>
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        id={name.replace(/[* ]/g, "")}
        disabled={disabled}
        placeholder={placeholder}
        tabIndex={tabIndex}
        type={
          type === "zipCode"
            ? "tel"
            : type === "phoneNumber"
            ? "tel"
            : type === "address"
            ? "search"
            : type === "name"
            ? "text"
            : type
        }
        autoComplete={
          type === "address"
            ? "street-address"
            : type === "phoneNumber"
            ? "tel-national"
            : type === "zipCode"
            ? "postal-code"
            : type === "name"
            ? "given-name"
            : undefined
        }
        min={min ?? undefined}
        max={max ?? undefined}
        step={type === "number" ? 0.5 : undefined}
        value={value || ""}
        onBlur={(e) => {
          if (type === "phoneNumber")
            setValue(formatPhoneNumber(e.target.value, true, false));
        }}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          const onlyNumbers = e.key.match(/[^\d-)(\s]/g);
          const cutOrCopy = (e.key === "c" || e.key === "v") && e.ctrlKey;
          if (
            ["phoneNumber", "zipCode"].includes(type) &&
            onlyNumbers &&
            !cutOrCopy &&
            !["Backspace", "Delete", "Tab"].includes(e.key)
          )
            e.preventDefault();
        }}
      />
    </MyInputStyle>
  );
};
