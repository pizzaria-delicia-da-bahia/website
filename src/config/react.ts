import { Dispatch, SetStateAction } from "react";

export interface SetState<T> extends Dispatch<SetStateAction<T>> {}
