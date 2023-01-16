import { ReactNode } from "react";

type RenderFunction = () => ReactNode;

type CellContent = string | RenderFunction;

export interface Column {
  header: CellContent;
  dataName?: string;
  render?: RenderFunction;
  width?: number;
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
    <div className="tableWrapper">
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
    </div>
  );
};
