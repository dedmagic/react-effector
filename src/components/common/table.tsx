import { ReactNode } from "react";

export interface Column {
  caption: string;
  dataName?: string;
  render?: () => ReactNode;
}

export interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table = (props: TableProps) => {
  const { columns, data } = props;

  const createCell = (row: any, column: Column) => {
    if (column.dataName) {
      return <td>{row[column.dataName]}</td>;
    }

    if (column.render) {
      return <td>{column.render()}</td>;
    }

    return <td>***</td>;
  };

  const createRow = (row: any) => (
    <tr>{columns.map((column) => createCell(row, column))}</tr>
  );

  return (
    <div className="tableWrapper">
      <table className="data-table">
        <thead>
          <tr className="header">
            {columns.map((column) => (
              <th>{column.caption}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return createRow(row);
          })}
        </tbody>
      </table>
    </div>
  );
};
