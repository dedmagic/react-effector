import { useState } from "react";
import { useStore } from "effector-react";

import { ByIdHandler, NullableNumber } from "types";
import { Card, Column, Table } from "components/common";

import {
  $jobTitlesWithParentName,
  JobTitleView,
  removeJobTitle,
} from "models/job-title";
import { DeleteDialog } from "./delete-dialog";
import { EditDialog } from "./edit-dialog";

export const JobTitles = () => {
  const viewData = useStore($jobTitlesWithParentName);

  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [currentJobTitleId, setCurrentJobTitleId] =
    useState<NullableNumber>(null);
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

  const deleteHandler = (jobTitleId: number) => {
    setCurrentJobTitleId(jobTitleId);
    showDeleteDialog();
  };

  const approveDeleteHandler = () => {
    closeDeleteDialog();
    if (currentJobTitleId) {
      removeJobTitle(currentJobTitleId);
      setCurrentJobTitleId(null);
    }
  };

  const addHandler = () => {
    setCurrentJobTitleId(null);
    showEditDialog();
  };

  const editHandler = (jobTitleId: number) => {
    setCurrentJobTitleId(jobTitleId);
    showEditDialog();
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
        entityId={currentJobTitleId}
        approveHandler={function (): void {
          throw new Error("Function not implemented.");
        }}
        closeHandler={closeEditDialog}
      />
      <DeleteDialog
        isVisible={isDeleteDialogVisible}
        closeHandler={closeDeleteDialog}
        approveHandler={approveDeleteHandler}
      />
    </>
  );
};

function getColumns(editHandler: ByIdHandler, deleteHandler: ByIdHandler) {
  const columns: Column[] = [
    {
      header: "Должность",
      dataName: "name",
    },
    {
      header: "Непосредственный руководитель",
      dataName: "parentName",
    },
    {
      header: () => (
        <div className="center">
          <i className="fa fa-gears"></i>
        </div>
      ),
      render: (row: JobTitleView) => {
        return (
          /* eslint-disable jsx-a11y/anchor-is-valid */
          <>
            <a href="#" onClick={() => editHandler(row.id)} className="action">
              <i className="far fa-edit"></i>
            </a>
            <a
              href="#"
              onClick={() => deleteHandler(row.id)}
              className="action"
            >
              <i className="far fa-trash-alt"></i>
            </a>
          </>
        );
      },
    },
  ];

  return columns;
}
