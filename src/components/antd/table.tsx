import React from "react";
import { Table as AntdTable, GetProps } from "antd";
import { ColumnGroupType, ColumnType } from "antd/es/table";

type TableProps =
  | GetProps<typeof AntdTable>
  | {
      columns: (ColumnGroupType<any> | ColumnType<any>)[];
    };

const Table = (props: TableProps) => {
  return (
    <AntdTable
      style={{ marginBottom: 0 }}
      rowKey={(record) => record._id || record.id}
      {...props}
    />
  );
};

export default Table;
