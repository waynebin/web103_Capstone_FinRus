import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Backtest API
export const backtestAPI = {
  runBacktest: async (data) => {
    const response = await api.post('/backtest/run', data);
    return response.data;
  },
  getResults: async (limit = 50, offset = 0) => {
    const response = await api.get(`/backtest/results?limit=${limit}&offset=${offset}`);
    return response.data;
  },
  getResultById: async (id) => {
    const response = await api.get(`/backtest/results/${id}`);
    return response.data;
  }
};

// Portfolio API
export const portfolioAPI = {
  getAll: async () => {
    const response = await api.get('/portfolio');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/portfolio/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/portfolio', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/portfolio/${id}`, data);
    return response.data;
  },
  getPositions: async (id) => {
    const response = await api.get(`/portfolio/${id}/positions`);
    return response.data;
  },
  addPosition: async (id, data) => {
    const response = await api.post(`/portfolio/${id}/positions`, data);
    return response.data;
  },
  updatePosition: async (id, positionId, data) => {
    const response = await api.put(`/portfolio/${id}/positions/${positionId}`, data);
    return response.data;
  },
  deletePosition: async (id, positionId) => {
    const response = await api.delete(`/portfolio/${id}/positions/${positionId}`);
    return response.data;
  }
};

// Strategies API
export const strategiesAPI = {
  getAll: async () => {
    const response = await api.get('/strategies');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/strategies/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/strategies', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/strategies/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/strategies/${id}`);
    return response.data;
  }
};

export default api;
