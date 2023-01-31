import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { EntityActionHandlerByEntity, EntityActionHandlerById } from "types";
import { Card, Column, Table } from "components/common";

import {
  $positionsWithParentName,
  addPosition,
  fetchAll,
  Position,
  PositionView,
  removePosition,
  updatePosition,
} from "models/position";
import { DeleteDialog } from "./delete-dialog";
import { EditDialog } from "./edit-dialog";

export const Positions = () => {
  const viewData = useStore($positionsWithParentName);

  useEffect(() => fetchAll(), []);

  const [currentPosition, setCurrentPosition] = useState<Position>(
    new Position()
  );
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const showEditDialog = () => {
    setIsEditDialogVisible(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogVisible(false);
  };

  const showDeleteDialog = () => {
    setIsDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogVisible(false);
  };

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
    setCurrentPosition(new Position());
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
    } else {
      addPosition(position);
    }
  };
  const columns = getColumns(editHandler, deleteHandler);

  return (
    <>
      <h4 className="pageTitle">Должности</h4>
      <Card>
        <button className="table-action" onClick={addHandler}>
          <i className="far fa-square-plus icon-before-label"></i>
          Добавить должность
        </button>
        <Table columns={columns} data={viewData} />
      </Card>
      <EditDialog
        isVisible={isEditDialogVisible}
        jobTitle={currentPosition}
        closeHandler={closeEditDialog}
        saveHandler={savePosition}
      />
      <DeleteDialog
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
  const columns: Column[] = [
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
      render: (row: PositionView) => {
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
