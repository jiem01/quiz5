import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { access } = JSON.parse(userInfo);
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

const api = {
  auth: {
    register: async (username, password) => {
      const { data } = await axiosInstance.post('/auth/signup/', {
        username,
        password,
      });
      return data;
    },

    login: async (username, password) => {
      const { data } = await axiosInstance.post('/auth/signin/', {
        username,
        password,
      });
      return data;
    },
  },

  conversations: {
    list: async () => {
      const { data } = await axiosInstance.get('/conversations/');
      return data;
    },

    getDetail: async (conversationId) => {
      const { data } = await axiosInstance.get(
        `/conversations/${conversationId}/`
      );
      return data;
    },

    create: async (title, content) => {
      const { data } = await axiosInstance.post('/conversation/', {
        title,
        content,
      });
      return data;
    },
  },

  chat: {
    sendMessage: async (conversationId, role, content) => {
      const { data } = await axiosInstance.post(
        `/conversations/${conversationId}/message/`,
        { role, content }
      );
      return data;
    },
  },
};

export default api;
