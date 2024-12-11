import {
  ObjectTypeCodeName,
  ObjectTypeValueLabel,
} from "@/app/_types/types";

export const DEFAULT_OBJECT_VALUE_LABEL: ObjectTypeValueLabel = {
  value: "",
  label: "전체",
};

export const DEFAULT_OBJECT_CODE_NAME: ObjectTypeCodeName = {
  code: "",
  name: "전체",
};

export const DEFAULT_OPTIONS_YN = [
  { value: "Y", label: "Y" },
  { value: "N", label: "N" },
];

export const FIELD_TYPE = {
  INPUT: "input",
  DATE: "date",
  SELECT: "select",
  CHECK: "check",
};

export const DATE_FORMAT: string = "YYYY/MM/DD";
