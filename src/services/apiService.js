import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service Methods
export const authService = {
  // Authentication
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      // Return the error response data so frontend can display it
      if (error.response?.data) {
        return error.response.data;
      }
      return { success: false, message: error.message || 'Registration failed' };
    }
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/me', { profile: profileData });
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/auth/refresh', { token: refreshToken });
    return response.data;
  },
};

export const projectService = {
  // Projects
  getAllProjects: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  updateProject: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  getMarketplaceStats: async () => {
    const response = await api.get('/projects/marketplace/stats');
    return response.data;
  },
};

export const marketplaceService = {
  // Marketplace
  getAvailableCredits: async (params = {}) => {
    const response = await api.get('/marketplace/credits', { params });
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post('/marketplace/orders', orderData);
    return response.data;
  },

  getUserOrders: async (params = {}) => {
    const response = await api.get('/marketplace/orders', { params });
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/marketplace/orders/${id}`);
    return response.data;
  },

  completeTransaction: async (id, paymentDetails) => {
    const response = await api.post(`/marketplace/transactions/${id}/complete`, paymentDetails);
    return response.data;
  },

  getMarketplaceStats: async (params = {}) => {
    const response = await api.get('/marketplace/stats', { params });
    return response.data;
  },

  getSellerTransactions: async (params = {}) => {
    const response = await api.get('/marketplace/seller/transactions', { params });
    return response.data;
  },
};

export const sponsorshipService = {
  // Sponsorships
  createSponsorship: async (sponsorshipData) => {
    const response = await api.post('/sponsorships', sponsorshipData);
    return response.data;
  },

  getUserSponsorships: async (params = {}) => {
    const response = await api.get('/sponsorships', { params });
    return response.data;
  },

  getSponsorshipById: async (id) => {
    const response = await api.get(`/sponsorships/${id}`);
    return response.data;
  },

  addSponsorshipUpdate: async (id, updateData) => {
    const response = await api.post(`/sponsorships/${id}/updates`, updateData);
    return response.data;
  },

  generateCertificate: async (id, certificateData) => {
    const response = await api.post(`/sponsorships/${id}/certificate`, certificateData);
    return response.data;
  },

  getSponsorStats: async () => {
    const response = await api.get('/sponsorships/stats/user');
    return response.data;
  },

  getPublicSponsorships: async (params = {}) => {
    const response = await api.get('/sponsorships/public', { params });
    return response.data;
  },

  getEmirateStats: async () => {
    const response = await api.get('/sponsorships/stats/emirates');
    return response.data;
  },
};

export const investmentService = {
  // Investments
  createInvestment: async (investmentData) => {
    const response = await api.post('/investments', investmentData);
    return response.data;
  },

  getUserInvestments: async (params = {}) => {
    const response = await api.get('/investments', { params });
    return response.data;
  },

  getInvestmentById: async (id) => {
    const response = await api.get(`/investments/${id}`);
    return response.data;
  },

  getInvestmentPortfolio: async () => {
    const response = await api.get('/investments/portfolio');
    return response.data;
  },

  addInvestmentReturn: async (id, returnData) => {
    const response = await api.post(`/investments/${id}/returns`, returnData);
    return response.data;
  },

  updateInvestmentStatus: async (id, statusData) => {
    const response = await api.put(`/investments/${id}/status`, statusData);
    return response.data;
  },

  addMilestone: async (id, milestoneData) => {
    const response = await api.post(`/investments/${id}/milestones`, milestoneData);
    return response.data;
  },

  getInvestmentStats: async (params = {}) => {
    const response = await api.get('/investments/stats', { params });
    return response.data;
  },

  getInvestmentOpportunities: async (params = {}) => {
    const response = await api.get('/investments/opportunities', { params });
    return response.data;
  },
};

export const userService = {
  // User Management
  getUserProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateUserProfile: async (profileData) => {
    const response = await api.put('/users/profile', { profile: profileData });
    return response.data;
  },

  uploadKYCDocuments: async (documentData) => {
    const response = await api.post('/users/kyc-documents', documentData);
    return response.data;
  },

  getKYCStatus: async () => {
    const response = await api.get('/users/kyc-status');
    return response.data;
  },
};

// Health check
export const healthService = {
  checkHealth: async () => {
    const response = await axios.get('http://localhost:5000/health');
    return response.data;
  },
};

// Export default api instance for custom requests
export default api;
