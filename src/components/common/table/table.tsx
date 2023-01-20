import { CellContent, Column, shouldRender, isDataColumn } from "./types";

export interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table = (props: TableProps) => {
  const { columns, data } = props;

  const createCell = (row: any, column: Column) => {
    if (shouldRender(column)) {
      return <td>{column.render(row)}</td>;
    }

    if (isDataColumn(column)) {
      return <td>{row[column.dataName]}</td>;
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

  const createRow = (row: any) => (
    <tr>{columns.map((column) => createCell(row, column))}</tr>
  );

  return (
    <table className="data-table">
      <thead>
        <tr className="header">
          {columns.map((column) => (
            <th>{createColumnHeader(column.header)}</th>
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
