export interface JobTitle {
  id: number;
  name: string;
  parent?: JobTitle;
}
