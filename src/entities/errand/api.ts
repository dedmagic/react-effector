import { API_URL } from 'shared/config';
import { api } from 'shared/api';

import { Errand } from '.';

const ERRAND_API_URL = `${API_URL}/errands`;

export const fetchAllErrands = () => api.getAllEntities<Errand>(ERRAND_API_URL);

export const deleteErrand = async (errandId: number): Promise<boolean> =>
  api.deleteEntity(ERRAND_API_URL, errandId);

export const updateErrand = async (errand: Errand): Promise<boolean> =>
  api.updateEntity(ERRAND_API_URL, errand);

export const createErrand = async (errand: Errand): Promise<boolean> =>
  api.createEntity(ERRAND_API_URL, errand);
