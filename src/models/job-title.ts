import { createEvent, createStore } from "effector";
import { jobTitlesMock } from "./mocks";

export interface JobTitle {
  id: number;
  name: string;
  parentId?: number;
}

export const addJobTitle = createEvent<JobTitle>("add job title");
const addJobTitleHandler = (
  state: JobTitle[],
  newJobTitle: JobTitle
): JobTitle[] => [...state, newJobTitle];

export const removeJobTitle = createEvent<number>("remove job title");
const removeJobTitleHandler = (
  state: JobTitle[],
  jobTitleId: number
): JobTitle[] => state.filter((jt) => jt.id !== jobTitleId);

export const updateJobTitle = createEvent<JobTitle>("update job title");
const updateJobTitleHandler = (
  state: JobTitle[],
  changedJobTitle: JobTitle
): JobTitle[] => {
  const itemIndex = state.findIndex((jt) => jt.id === changedJobTitle.id);
  if (itemIndex === -1) {
    throw new Error("Job title not found");
  }
  state.splice(itemIndex, 1, changedJobTitle);
  return [...state];
};

// export const $jobTitles = createStore<JobTitle[]>([])
export const $jobTitles = createStore<JobTitle[]>(jobTitlesMock)
  .on(addJobTitle, addJobTitleHandler)
  .on(removeJobTitle, removeJobTitleHandler)
  .on(updateJobTitle, updateJobTitleHandler);
