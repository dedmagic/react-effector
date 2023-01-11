export interface Column {
  caption: string;
  dataName?: string;
}

export interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table = (props: TableProps) => {
  const { columns, data } = props;

  const createCell = (row: any, column: Column) => {
    const cellContent = column.dataName ? row[column.dataName] : "***";
    return <td>{cellContent}</td>;
  };

  const createRow = (row: any) => (
    <tr>{columns.map((column) => createCell(row, column))}</tr>
  );

  return (
    <div className="tableWrapper">
      <table className="data-table">
        <thead>
          <tr>
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
