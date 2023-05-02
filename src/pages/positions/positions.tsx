import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { EntityActionHandlerByEntity } from "common/types";
import { Column, Table, UnifedCard, UnifedPageTitle } from "common/components";
import { useDialog } from "common/hooks";

import {
  $positionsWithParentName,
  createPosition,
  fetchAllPositions,
  Position,
  PositionRow,
  removePosition,
  updatePosition,
} from "modules/position";
import { PositionEditDialog } from "./position-edit-dialog";
import { PositionDeleteDialog } from "./position-delete-dialog";

export const Positions = () => {
  const viewData = useStore($positionsWithParentName);

  useEffect(() => fetchAllPositions(), []);

  const [currentPosition, setCurrentPosition] = useState<Position>(
    new Position()
  );
  const [isEditDialogVisible, showEditDialog, closeEditDialog] = useDialog();
  const [isDeleteDialogVisible, showDeleteDialog, closeDeleteDialog] =
    useDialog();

  const deleteHandler = (position: Position) => {
    setCurrentPosition(position);
    showDeleteDialog();
  };

  const deletePosition = () => {
    closeDeleteDialog();
    if (currentPosition.id) {
      removePosition(currentPosition.id);
    } else {
      throw new Error("Something went wrong...");
    }
  };

  const addHandler = () => {
    // Нельзя `parentId: null`, ибо стейт не обновляется. По этой же причине
    // нельзя `setCurrentPosition(new Postion())`
    setCurrentPosition({ id: 0, name: "", parentId: 0 } as Position);
    showEditDialog();
  };

  const editHandler = (position: Position) => {
    setCurrentPosition(position);
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
        position={currentPosition}
        closeHandler={closeEditDialog}
        saveHandler={savePosition}
      />
      <PositionDeleteDialog
        isVisible={isDeleteDialogVisible}
        closeHandler={closeDeleteDialog}
        approveHandler={deletePosition}
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
