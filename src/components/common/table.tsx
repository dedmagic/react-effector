export interface Column {
  caption: string;
  dataName: string;
}

export interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table = (props: TableProps) => {
  const { columns, data } = props;

  const createCell = (row: any, column: Column) => (
    <td>{row[column.dataName]}</td>
  );
  const createRow = (row: any) => (
    <tr>{columns.map((column) => createCell(row, column))}</tr>
  );

  return (
    <table>
      <tr>
        {columns.map((column) => (
          <th>{column.caption}</th>
        ))}
      </tr>
      {data.map((row) => {
        return createRow(row);
      })}
    </table>
  );
};
