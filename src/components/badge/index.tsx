import type { FC, HTMLAttributes, ReactElement } from "react";
import React from "react";
import { BadgeStyle } from "./styles";

interface BadgeProps {
  number: number;
}

export const Badge: FC<BadgeProps> = ({ number }) => {
  return (
    <BadgeStyle className={`dot ${number > 0 ? "" : "hidden"}`}>
      {number}
    </BadgeStyle>
  );
};
