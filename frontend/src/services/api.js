const STORAGE_KEYS = {
  USERS: 'pc_assistant_users',
  CONVERSATIONS: 'pc_assistant_conversations',
  MESSAGES: 'pc_assistant_messages',
};

const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  auth: {
    register: async (username, email, password) => {
      await delay();
      const users = getFromStorage(STORAGE_KEYS.USERS);
      const exists = users.find((u) => u.username === username);
      if (exists) {
        throw { response: { data: { username: ['A user with that username already exists.'] } } };
      }
      const user = {
        id: generateId(),
        username,
        email,
      };
      const token = 'local_' + generateId();
      users.push({ ...user, password });
      saveToStorage(STORAGE_KEYS.USERS, users);
      return { token, user };
    },

    login: async (username, password) => {
      await delay();
      const users = getFromStorage(STORAGE_KEYS.USERS);
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        throw { response: { data: { detail: 'Invalid credentials' } } };
      }
      const token = 'local_' + generateId();
      return {
        token,
        user: { id: user.id, username: user.username, email: user.email },
      };
    },
  },

  conversations: {
    list: async (userId) => {
      await delay();
      const conversations = getFromStorage(STORAGE_KEYS.CONVERSATIONS);
      return conversations
        .filter((c) => c.userId === userId)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    },

    getDetail: async (conversationId, userId) => {
      await delay();
      const conversations = getFromStorage(STORAGE_KEYS.CONVERSATIONS);
      const conversation = conversations.find(
        (c) => c.id === conversationId && c.userId === userId
      );
      if (!conversation) {
        throw { response: { data: { detail: 'Conversation not found' } } };
      }
      const allMessages = getFromStorage(STORAGE_KEYS.MESSAGES);
      const messages = allMessages.filter(
        (m) => m.conversation === conversationId
      );
      return { ...conversation, messages };
    },

    create: async (userId, title) => {
      await delay(100);
      const conversations = getFromStorage(STORAGE_KEYS.CONVERSATIONS);
      const now = new Date().toISOString();
      const conversation = {
        id: generateId(),
        userId,
        title,
        created_at: now,
        updated_at: now,
      };
      conversations.push(conversation);
      saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
      return conversation;
    },
  },

  chat: {
    send: async (conversationId, userId, prompt, aiResponse) => {
      await delay(500);
      const now = new Date().toISOString();
      const allMessages = getFromStorage(STORAGE_KEYS.MESSAGES);

      const userMessage = {
        id: generateId(),
        conversation: conversationId,
        role: 'user',
        content: prompt,
        created_at: now,
      };

      const aiMessage = {
        id: generateId() + 1,
        conversation: conversationId,
        role: 'ai',
        content: aiResponse,
        created_at: new Date(Date.now() + 1).toISOString(),
      };

      allMessages.push(userMessage, aiMessage);
      saveToStorage(STORAGE_KEYS.MESSAGES, allMessages);

      const conversations = getFromStorage(STORAGE_KEYS.CONVERSATIONS);
      const idx = conversations.findIndex((c) => c.id === conversationId);
      if (idx !== -1) {
        conversations[idx].updated_at = now;
        saveToStorage(STORAGE_KEYS.CONVERSATIONS, conversations);
      }

      return {
        conversation_id: conversationId,
        user_message: userMessage,
        ai_message: aiMessage,
      };
    },
  },
};

export default api;
