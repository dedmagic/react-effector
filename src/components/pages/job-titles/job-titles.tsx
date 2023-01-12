import { Column, Table } from "components/common/table";
import { useStore } from "effector-react";

import { $jobTitlesWithParentName } from "models/job-title";

export const JobTitles = () => {
  const store = useStore($jobTitlesWithParentName);

  return (
    <>
      <h4 className="pageTitle">Должности</h4>
      <Table columns={columns} data={store} />
    </>
  );
};

const columns: Column[] = [
  {
    caption: "Должность",
    dataName: "name",
  },
  {
    caption: "Непосредственный руководитель",
    dataName: "parentName",
  },
  {
    caption: "Action",
    render: () => {
      return <i>test</i>;
    },
  },
];
