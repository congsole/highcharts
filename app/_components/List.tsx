"use client";

import { getContentWithRowNum } from "@/app/_utils/Utils";
import { Table, TableColumnsType } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

type ListProps = {
  dataSource: any;
  columns: TableColumnsType;
  total?: number;
  keyName: string | "id";
};

export default function List({
  dataSource,
  columns,
  total,
  keyName,
}: ListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const createQueryString = useCallback(
    (page: number, pageSize: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      params.set("pageSize", pageSize.toString());
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    // 뒤로가기 버그 수정으로 인해 주석처리
    // router.push(`${pathname}?${createQueryString(page, pageSize)}`);
  }, [dataSource]);

  useEffect(() => {
    if (!columns) return;

    columns.forEach((m: any) => {
      if (typeof m.sorter === "boolean" && m.sorter) {
        m.sorter = (a: any, b: any) => {
          const valueA = a[m.dataIndex] ? a[m.dataIndex].toString() : "";
          const valueB = b[m.dataIndex] ? b[m.dataIndex].toString() : "";
          return valueA.localeCompare(valueB);
        };
      }
    });
  }, [columns]);

  return (
    <>
      <div className="table">
        <Table
          columns={columns}
          dataSource={getContentWithRowNum({
            content: dataSource,
            totalElements: total ? total : 0,
            pageNumber: page,
            pageSize: pageSize,
            rowNumName: "listNum",
          })}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            position: ["bottomCenter"],
            pageSize,
            total,
            current: page,
            onChange: (page, pageSize) => {
              router.push(`${pathname}?${createQueryString(page, pageSize)}`);
            },
          }}
          scroll={{ y: "calc(100vh - 445px)" }}
          rowKey={keyName}
        />
      </div>
    </>
  );
}
