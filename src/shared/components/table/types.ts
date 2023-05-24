import { RenderFunction } from "shared/types/common-types";

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

interface ColumnWithData<TRow> extends ColumnBase {
  dataName: keyof TRow;
}

export type Column<TRow> = ColumnWithRender | ColumnWithData<TRow>;

export function shouldRender<TRow>(
  column: Column<TRow>
): column is ColumnWithRender {
  return (column as ColumnWithRender).render !== undefined;
}

export function isDataColumn<TRow>(
  column: Column<TRow>
): column is ColumnWithData<TRow> {
  return (column as ColumnWithData<TRow>).dataName !== undefined;
}
