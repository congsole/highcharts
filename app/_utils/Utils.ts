import {
  DATE_FORMAT,
  DEFAULT_OBJECT_VALUE_LABEL,
  FIELD_TYPE,
} from "@/app/_constants/constants";
import { ObjectTypeValueLabel } from "@/app/_types/types";
import dayjs from "dayjs";

//검색영역, 필터영역의 컴포넌트에 value 설정
export const getFieldValue: any = (
  type: string,
  searchParams: any,
  name: string,
) => {
  if ("get" in searchParams) {
    switch (type) {
      case FIELD_TYPE.INPUT:
        return searchParams.get(name) || null;
      case FIELD_TYPE.SELECT:
        return searchParams.get(name) || "";
      case FIELD_TYPE.DATE:
        return searchParams.get(name)
          ? dayjs(searchParams.get(name), DATE_FORMAT)
          : null;
      case FIELD_TYPE.CHECK:
        return searchParams.get(name)
          ? searchParams.get(name) === "true"
          : true;
    }
  } else {
    switch (type) {
      case FIELD_TYPE.INPUT:
        return searchParams[name] || null;
      case FIELD_TYPE.SELECT:
        return searchParams[name] || "";
      case FIELD_TYPE.DATE:
        return searchParams[name]
          ? dayjs(searchParams[name], DATE_FORMAT)
          : null;
      case FIELD_TYPE.CHECK:
        return searchParams[name] ? searchParams[name] === "true" : true;
    }
  }
};

// object to string
export const objectToKeyValueString = (params?: {
  [key: string]: string | number | undefined;
}) => {
  if (!params) return "";

  if (!params["page"]) params["page"] = 1;
  if (!params["pageSize"]) params["pageSize"] = 10;
  if (!params["size"]) params["size"] = params["pageSize"];
  if (!params.hasOwnProperty("sort") || params["sort"] === undefined)
    params["sort"] = "cre_dt,desc";

  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
};

// set select-options
export const getSelectOptions = (
  options: Array<string | { [key: string]: string | number | null }>,
  showDefault?: boolean,
) => {
  const list: Array<ObjectTypeValueLabel> =
    showDefault !== false ? [DEFAULT_OBJECT_VALUE_LABEL] : [];

  if (Array.isArray(options)) {
    if (options.length > 0 && typeof options[0] === "string") {
      options.forEach((m: any) => {
        list.push({ value: m, label: m });
      });
    } else if (options.length > 0 && typeof options[0] === "object") {
      options.forEach((m: any) => {
        list.push({ value: m[Object.keys(m)[0]], label: m[Object.keys(m)[1]] });
      });
    }
    return list;
  }

  return list; //"Not an Array"
};

export const convertDateFormat = (dateValue: string) => {
  if (!dateValue) return "";
  if (dateValue.length === 6) {
    return (
      dateValue.substring(0, 2) +
      "." +
      dateValue.substring(2, 4) +
      "." +
      dateValue.substring(4)
    );
  } else if (dateValue.length === 8) {
    return (
      dateValue.substring(0, 4) +
      "." +
      dateValue.substring(4, 6) +
      "." +
      dateValue.substring(6)
    );
  } else if (dateValue.length > 8) {
    if (dateValue.includes("-")) {
      return dateValue.replaceAll("-", ".");
    } else {
      return dateValue;
    }
  }
  return "";
};

export const getFileNameFromContentDisposition = (
  disposition: string | null,
) => {
  const decodeURIComponentNm = decodeURIComponent(disposition || "");
  if (decodeURIComponentNm && decodeURIComponentNm.startsWith("form-data;")) {
    let filename = decodeURIComponentNm.replace("form-data;", "");
    filename = filename.trim();
    if (filename.includes("filename*=") && filename.includes("filename=")) {
      let filenames = filename.split(";");
      if (filenames.length > 1) {
        if (filenames[0].trim().startsWith("filename*=")) {
          filename = filenames[0].trim();
        } else {
          filename = filenames[1].trim();
        }
      }
    } else if (filename.startsWith("filename*=")) {
      filename = filename
        .replace("filename*=", "")
        .split("''")
        .slice(1)
        .join("''");
    } else if (filename.startsWith("filename=")) {
      filename = filename.replace("filename=", "");
      if (filename.startsWith('"') && filename.endsWith('"')) {
        filename = filename.slice(1, filename.length - 1);
      }
    }
    return decodeURIComponent(filename);
  }
  return null;
};

export const getContentWithRowNum = ({
  content,
  totalElements,
  pageNumber = 1,
  pageSize = 1,
  rowNumName = "rowNum",
}: {
  content: Array<any>;
  totalElements: number;
  pageNumber?: number;
  pageSize?: number;
  rowNumName?: string;
}) => {
  const startIndex = totalElements - (pageNumber - 1) * pageSize;

  return content.map((item: any, idx: number) => {
    return {
      [rowNumName]: startIndex - idx,
      ...item,
    };
  });
};
