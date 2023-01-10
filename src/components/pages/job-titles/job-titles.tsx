import { useStore } from "effector-react";

import { $jobTitles } from "models/job-title";

export const JobTitles = () => {
  const store = useStore($jobTitles);

  return (
    <>
      <h4 className="pageTitle">Должности</h4>
      {store.map((jobTitle) => jobTitle.name)}
    </>
  );
};
