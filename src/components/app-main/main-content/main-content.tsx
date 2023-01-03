import { Route, Routes } from "react-router";

import {
  Analytics,
  Employees,
  Errands,
  Help,
  JobTitles,
  Settings,
} from "../../pages";

export const MainContent = () => {
  return (
    <main className="content">
      <Routes>
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/job-titles" element={<JobTitles />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/errands" element={<Errands />} />
      </Routes>
    </main>
  );
};
