import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { EntityActionHandlerByEntity } from "shared/types";
import { Column, Table, UnifedCard, UnifedPageTitle } from "shared/components";
import { DeleteDialog } from "shared/components/delete-dialog";
import { useDialog } from "shared/hooks";

import {
  $positionsWithParentName,
  createPosition,
  fetchAllPositions,
  Position,
  PositionRow,
  removePosition,
  updatePosition,
} from "entities/position";
import { PositionEditDialog } from "./position-edit-dialog";

export const Positions = () => {
  const viewData = useStore($positionsWithParentName);

  const [currentEntity, setCurrentEntity] = useState<Position>(new Position());
  const [isEditDialogVisible, showEditDialog, closeEditDialog] = useDialog();
  const [isDeleteDialogVisible, showDeleteDialog, closeDeleteDialog] =
    useDialog();

  useEffect(() => fetchAllPositions(), []);

  const deleteHandler = (position: Position) => {
    setCurrentEntity(position);
    showDeleteDialog();
  };

  const deletePosition = () => {
    closeDeleteDialog();
    if (currentEntity.id) {
      removePosition(currentEntity.id);
    } else {
      throw new Error("Something went wrong...");
    }
  };

  const addHandler = () => {
    // Нельзя `parentId: null`, ибо стейт не обновляется. По этой же причине
    // нельзя `setCurrentPosition(new Postion())`
    setCurrentEntity({ id: 0, name: "", parentId: 0 } as Position);
    showEditDialog();
  };

  const editHandler = (position: Position) => {
    setCurrentEntity(position);
    showEditDialog();
  };

  const savePosition = (position: Position) => {
    closeEditDialog();
    if (position.id) {
      updatePosition(position);
      return;
    }
    createPosition(position);
  };

  const columns = getColumns(editHandler, deleteHandler);

  return (
    <>
      <UnifedPageTitle title="Должности" />
      <UnifedCard>
        <div className="actions-panel">
          <button onClick={addHandler}>
            <i className="far fa-square-plus icon-before-label"></i>
            Добавить должность
          </button>
        </div>
        <Table<PositionRow> columns={columns} data={viewData} />
      </UnifedCard>
      <PositionEditDialog
        isVisible={isEditDialogVisible}
        position={currentEntity}
        closeHandler={closeEditDialog}
        saveHandler={savePosition}
      />
      <DeleteDialog
        isVisible={isDeleteDialogVisible}
        closeHandler={closeDeleteDialog}
        approveHandler={deletePosition}
        title={"Удаление должности"}
        message={"Вы действительно хотите удалить эту должность?"}
      />
    </>
  );
};

function getColumns(
  editHandler: EntityActionHandlerByEntity<Position>,
  deleteHandler: EntityActionHandlerByEntity<Position>
) {
  const columns: Column<PositionRow>[] = [
    {
      key: "name",
      header: "Должность",
      dataName: "name",
    },
    {
      key: "parentName",
      header: "Непосредственный руководитель",
      dataName: "parentName",
    },
    {
      key: "actions",
      header: () => (
        <div className="center">
          <i className="fa fa-gears"></i>
        </div>
      ),
      render: (row: PositionRow) => {
        return (
          /* eslint-disable jsx-a11y/anchor-is-valid */
          <>
            <a href="#" onClick={() => editHandler(row)} className="action">
              <i className="far fa-edit"></i>
            </a>
            <a href="#" onClick={() => deleteHandler(row)} className="action">
              <i className="far fa-trash-alt"></i>
            </a>
          </>
        );
      },
    },
  ];

  return columns;
}
