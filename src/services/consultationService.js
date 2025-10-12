import api from './api';

// Public API - không cần auth
export const createConsultation = async (data) => {
  const response = await api.post('/consultation', data);
  return response.data;
};

// Admin APIs - cần auth
export const getAllConsultations = async (params = {}) => {
  const { page = 1, limit = 10, search = '', status = '', sortBy = 'createdAt', sortOrder = 'desc' } = params;
  
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && { status }),
    sortBy,
    sortOrder
  });

  const response = await api.get(`/consultation?${queryParams.toString()}`);
  return response.data;
};

export const getConsultationById = async (id) => {
  const response = await api.get(`/consultation/${id}`);
  return response.data;
};

export const updateConsultationStatus = async (id, status) => {
  const response = await api.patch(`/consultation/${id}/status`, { status });
  return response.data;
};

export const updateConsultationNotes = async (id, notes) => {
  const response = await api.patch(`/consultation/${id}/notes`, { notes });
  return response.data;
};

export const deleteConsultation = async (id) => {
  const response = await api.delete(`/consultation/${id}`);
  return response.data;
};

