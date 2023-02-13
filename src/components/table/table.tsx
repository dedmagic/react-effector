import { ReactNode } from "react";
import "./table.css";

import { CellContent, Column, shouldRender, isDataColumn } from "./types";

export interface TableProps<TRow> {
  columns: Column<TRow>[];
  data: TRow[];
}

export const Table = <TRow extends { id: number }>(props: TableProps<TRow>) => {
  const { columns, data } = props;

  const createCell = (row: TRow, column: Column<TRow>) => {
    if (shouldRender(column)) {
      return <td key={column.key}>{column.render(row)}</td>;
    }

    if (isDataColumn(column)) {
      const cellContent = row[column.dataName] as ReactNode;
      return <td key={column.key}>{cellContent}</td>;
    }

    const guard: never = column;
    return guard;
  };

  const createColumnHeader = (content: CellContent) => {
    if (typeof content === "string") {
      return content;
    }

    return content();
  };

  const createRow = (row: TRow) => (
    <tr key={row.id}>{columns.map((column) => createCell(row, column))}</tr>
  );

  return (
    <table className="data-table">
      <thead>
        <tr className="header">
          {columns.map((column) => (
            <th key={column.key}>{createColumnHeader(column.header)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return createRow(row);
        })}
      </tbody>
    </table>
  );
};
