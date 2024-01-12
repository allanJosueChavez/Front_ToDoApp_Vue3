import axiosInstance from "./api/axiosInstance";
const usersPrefix = "/api/users";
const authPrefix = "/api/auth";
const userPrefix = "/api/user";

async function create(user) {
  const response = await axiosInstance.post(`${usersPrefix}`, user);
  return response;
}

async function login(credentials) {
  const response = await axiosInstance.post(`${authPrefix}/login`, credentials);
  return response;
}

async function evaluateToken(token) {
  const body = {
    token: token,
  };
  const response = await axiosInstance.post( `${usersPrefix}/verify-token`, body);
  return response;
}

async function confirmAccount(body) {
  const response = await axiosInstance.post( `${userPrefix}/confirm-account`, body);
  return response;
}

async function resendEmailConfirmation(body) {
  const response = await axiosInstance.post(
    `${userPrefix}/resend-email-confirmation`,
    body
  );
  return response;
}

async function loginThroughToken(body) {
  const response = await axiosInstance.post(
    `${userPrefix}/login-through-token`,
    body
  );
  return response;
}

async function updateUserInfo(body) {
  const response = await axiosInstance.patch(`${userPrefix}`, body);
  return response;
}

async function sendNewEmailConfirmation(body) {
  const response = await axiosInstance.post(
    `${userPrefix}/new-email-confirmation`,
    body
  );
  return response;
}

async function getUserInfo() {
  const response = await axiosInstance.get(`${userPrefix}`);
  return response;
}

async function updateMainEmail(body) {
  const response = await axiosInstance.patch(
    `${userPrefix}/update-main-email`,
    body
  );
  return response;
}

async function updatePassword(body) {
  const response = await axiosInstance.patch(`${userPrefix}/update-password`, body);
  return response;
}

async function deleteAccount() {
  const response = await axiosInstance.delete(`${userPrefix}`);
  return response;
}

async function sendPasswordResetMail(body) {
  const response = await axiosInstance.post(`${userPrefix}/reset-password-mail`, body);
  return response;
}


export default {    
  create,
  login,
  evaluateToken,
  confirmAccount,
  resendEmailConfirmation,
  loginThroughToken,
  updateUserInfo,
  sendNewEmailConfirmation,
  getUserInfo,
  updateMainEmail,
  updatePassword,
  deleteAccount,
  sendPasswordResetMail,
};
