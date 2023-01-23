import { createEvent, createStore } from "effector";
import { jobTitlesMock } from "./mocks";

export class JobTitle {
  id: number = 0;
  name: string = "";
  parentId?: number;
}

export interface JobTitleView extends JobTitle {
  parentName?: string;
}

export const addJobTitle = createEvent<JobTitle>("add job title");
const addJobTitleHandler = (
  state: JobTitle[],
  newJobTitle: JobTitle
): JobTitle[] => {
  const newId = Math.max(...state.map((jt) => jt.id)) + 1;
  return [...state, { ...newJobTitle, id: newId }];
};

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

// TODO: Убрать использование мока после реализации работы с API
// export const $jobTitles = createStore<JobTitle[]>([])
export const $jobTitles = createStore<JobTitle[]>(jobTitlesMock)
  .on(addJobTitle, addJobTitleHandler)
  .on(removeJobTitle, removeJobTitleHandler)
  .on(updateJobTitle, updateJobTitleHandler);

export const $jobTitlesWithParentName = $jobTitles.map((jobTitles) => {
  return jobTitles.map((jt) => ({
    ...jt,
    parentName: jobTitles.find((parent) => parent.id === jt.parentId)?.name,
  }));
});
