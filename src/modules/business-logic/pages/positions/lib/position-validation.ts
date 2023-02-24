import { NO_ERRORS } from "types";

import { Position } from "models/position";

export const validatePosition = (
  rawPosition: Position
): string[] | typeof NO_ERRORS => {
  const errors: string[] = [];

  if (rawPosition.name.trim().length === 0) {
    errors.push("Наименование должности не должно быть пустым");
  }

  if (rawPosition.id && rawPosition.id === rawPosition.parentId) {
    errors.push("Чувак не может быть начальником сам себе");
  }

  // TODO: Проверять иерархию должностей, чтобы не было циклов (нижестоящий
  // является начальником вышестоящему)

  if (errors.length === 0) {
    return NO_ERRORS;
  }

  return errors;
};
