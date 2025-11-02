import { apiGet, apiPost, apiPut, apiDelete } from './api.config';

const BASE_ENDPOINT = '/BookReservations';

// Get all reservations
export const getAllReservations = async () => {
  return await apiGet(BASE_ENDPOINT);
};

// Get reservation by ID
export const getReservationById = async (id) => {
  return await apiGet(`${BASE_ENDPOINT}/${id}`);
};

// Create new reservation
export const createReservation = async (reservationData) => {
  return await apiPost(BASE_ENDPOINT, reservationData);
};

// Update reservation
export const updateReservation = async (id, reservationData) => {
  return await apiPut(`${BASE_ENDPOINT}/${id}`, reservationData);
};

// Delete reservation
export const deleteReservation = async (id) => {
  return await apiDelete(`${BASE_ENDPOINT}/${id}`);
};

