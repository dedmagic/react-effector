import { useState } from "react";
import { useStore } from "effector-react";

import { EntityActionHandlerByEntity, EntityActionHandlerById } from "types";
import { Card, Column, Table } from "components/common";

import {
  $jobTitlesWithParentName,
  JobTitle,
  JobTitleView,
  removeJobTitle,
  updateJobTitle,
} from "models/job-title";
import { DeleteDialog } from "./delete-dialog";
import { EditDialog } from "./edit-dialog";

export const JobTitles = () => {
  const viewData = useStore($jobTitlesWithParentName);

  const [currentJobTitle, setCurrentJobTitle] = useState<JobTitle>(
    new JobTitle()
  );
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);

  const [currentJobTitleId, setCurrentJobTitleId] = useState<number | null>(
    null
  );
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

  const deleteJobTitle = () => {
    closeDeleteDialog();
    if (currentJobTitleId) {
      removeJobTitle(currentJobTitleId);
      setCurrentJobTitleId(null);
    }
    throw new Error("Something went wrong...");
  };

  const addHandler = () => {
    setCurrentJobTitle(new JobTitle());
    showEditDialog();
  };

  const editHandler = (jobTitle: JobTitle) => {
    setCurrentJobTitle(jobTitle);
    showEditDialog();
  };

  const saveJobTitle = (jobTitle: JobTitle) => {
    closeEditDialog();
    updateJobTitle(jobTitle);
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
        jobTitle={currentJobTitle}
        closeHandler={closeEditDialog}
        saveHandler={saveJobTitle}
      />
      <DeleteDialog
        isVisible={isDeleteDialogVisible}
        closeHandler={closeDeleteDialog}
        approveHandler={deleteJobTitle}
      />
    </>
  );
};

function getColumns(
  editHandler: EntityActionHandlerByEntity<JobTitle>,
  deleteHandler: EntityActionHandlerById
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
      render: (row: JobTitleView) => {
        return (
          /* eslint-disable jsx-a11y/anchor-is-valid */
          <>
            <a href="#" onClick={() => editHandler(row)} className="action">
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
