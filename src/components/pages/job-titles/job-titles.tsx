import { Card, Column, Modal, Table } from "components/common";
import { useStore } from "effector-react";

import { $jobTitlesWithParentName, removeJobTitle } from "models/job-title";
import { useState } from "react";

export const JobTitles = () => {
  const viewData = useStore($jobTitlesWithParentName);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentJobTitleId, setCurrentJobTitleId] = useState(0);

  const deleteHandler = (jobTitleId: number) => {
    setCurrentJobTitleId(jobTitleId);
    setIsModalVisible(true);
    //removeJobTitle(jobTitleId);
  };

  const approveDelete = () => {
    setIsModalVisible(false);
    removeJobTitle(currentJobTitleId);
  };

  const columns = getColumns(deleteHandler);

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
      <Modal
        isVisible={isModalVisible}
        title="Удаление должности"
        content="Вы действительно хотите удалить эту должность?"
        footer={
          <>
            <button onClick={() => approveDelete()}>Да, хочу</button>
            <button onClick={() => setIsModalVisible(false)}>Отмена</button>
          </>
        }
        onClose={() => setIsModalVisible(false)}
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
