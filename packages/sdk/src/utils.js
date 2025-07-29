// 工具函数模块
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN');
};

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  formatDate,
  generateId,
  validateEmail
}; 