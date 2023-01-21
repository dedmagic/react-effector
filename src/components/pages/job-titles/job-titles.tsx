import { Card, Column, Table } from "components/common";
import { useStore } from "effector-react";

import { $jobTitlesWithParentName, removeJobTitle } from "models/job-title";
import { useState } from "react";
import { DeleteDialog } from "./delete-dialog";

export const JobTitles = () => {
  const viewData = useStore($jobTitlesWithParentName);

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [currentJobTitleId, setCurrentJobTitleId] = useState(0);

  const showDeleteDialog = () => {
    setIsDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogVisible(false);
  };

  const queryingDeleteHandler = (jobTitleId: number) => {
    setCurrentJobTitleId(jobTitleId);
    showDeleteDialog();
  };

  const approveDeleteHandler = () => {
    closeDeleteDialog();
    removeJobTitle(currentJobTitleId);
  };

  const columns = getColumns(queryingDeleteHandler);

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
      <DeleteDialog
        isVisible={isDeleteDialogVisible}
        closeHandler={closeDeleteDialog}
        approveHandler={approveDeleteHandler}
      />
    </>
  );
};

const addHandler = () => {};

const editHandler = () => {};

function getColumns(deleteHandler: (jobTitleId: number) => void) {
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
      render: (row: any) => {
        return (
          /* eslint-disable jsx-a11y/anchor-is-valid */
          <>
            <a href="#" onClick={editHandler} className="action">
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
