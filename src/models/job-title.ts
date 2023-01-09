import { createEvent, createStore } from "effector";

export interface JobTitle {
  id: number;
  name: string;
  parent?: JobTitle;
}

export const addJobTitle = createEvent<JobTitle>("add job title");
export const removeJobTitle = createEvent<number>("remove job title");
export const updateJobTitle = createEvent<JobTitle>("update job title");

export const $jobTitles = createStore<JobTitle[]>([])
  .on(addJobTitle, (state, newJobTitle: JobTitle) => [...state, newJobTitle])
  .on(removeJobTitle, (state, jobTitleId: number) =>
    state.filter((jt) => jt.id !== jobTitleId)
  )
  .on(updateJobTitle, (state, changedJobTitle) => {
    const itemIndex = state.findIndex((jt) => jt.id === changedJobTitle.id);
    if (itemIndex === -1) {
      throw new Error("Job title not found");
    }
    state.splice(itemIndex, 1, changedJobTitle);
    return [...state];
  });
