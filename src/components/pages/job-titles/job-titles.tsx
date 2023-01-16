import { Card } from "components/common/card/card";
import { Column, Table } from "components/common/table";
import { useStore } from "effector-react";

import { $jobTitlesWithParentName } from "models/job-title";

export const JobTitles = () => {
  const store = useStore($jobTitlesWithParentName);

  return (
    <>
      <h4 className="pageTitle">Должности</h4>
      <Card>
        <button className="table-action">
          <i className="far fa-square-plus icon-before-label"></i>
          Добавить должность
        </button>
        <Table columns={columns} data={store} />
      </Card>
    </>
  );
};

const editHandler = () => {};

const deleteHandler = () => {};

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
    render: () => {
      return (
        /* eslint-disable jsx-a11y/anchor-is-valid */
        <>
          <a href="#" onClick={editHandler} className="action">
            <i className="far fa-edit"></i>
          </a>
          <a href="#" onClick={deleteHandler} className="action">
            <i className="far fa-trash-alt"></i>
          </a>
        </>
      );
    },
  },
];
