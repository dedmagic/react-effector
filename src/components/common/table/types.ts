import { RenderFunction } from "components/types";

export type CellContent = string | RenderFunction;

// Столбец, у которого обязательно должно быть одно из двух:
// или функция `render`, или имя поля с данными
interface ColumnBase {
  key: string;
  header: CellContent;
  width?: number;
}

interface ColumnWithRender extends ColumnBase {
  render: RenderFunction;
}

interface ColumnWithData extends ColumnBase {
  dataName: string;
}

export type Column = ColumnWithRender | ColumnWithData;

export function shouldRender(column: Column): column is ColumnWithRender {
  return (column as ColumnWithRender).render !== undefined;
}

export function isDataColumn(column: Column): column is ColumnWithData {
  return (column as ColumnWithData).dataName !== undefined;
}
