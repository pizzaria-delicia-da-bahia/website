import { FC, HTMLAttributes, InputHTMLAttributes } from "react";
import { TagStyle } from "./style";

export const Tag = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <TagStyle className={`tag ${rest.className ?? ""}`} {...rest}>
      {children}
    </TagStyle>
  );
};
