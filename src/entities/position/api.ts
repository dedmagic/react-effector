import { api } from 'shared/api';
import { API_URL } from 'shared/config';

import { Position } from '.';

const POSITION_API_URL = `${API_URL}/positions`;

export const fetchAllPositions = (): Promise<Position[]> =>
  api.getAllEntities<Position>(POSITION_API_URL);

export const deletePosition = async (positionId: number): Promise<boolean> =>
  api.deleteEntity(POSITION_API_URL, positionId);

export const updatePosition = async (position: Position): Promise<boolean> =>
  api.updateEntity(POSITION_API_URL, position);

export const createPosition = async (position: Position): Promise<boolean> =>
  api.createEntity(POSITION_API_URL, position);
