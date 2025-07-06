export const API_ROUTES = {
  // 🔐 Auth
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  REFRESH_TOKEN: "/api/auth/refresh",

  // 👤 User
  GET_USER_PROFILE: "/api/user/profile",
  UPDATE_PROFILE: "/api/user/update",

  // 🎥 Meeting
  CREATE_MEETING: "/api/meeting/create",
  JOIN_MEETING: "/api/meeting/join",
  END_MEETING: "/api/meeting/end",
  GET_MEETING_DETAILS: "/api/meeting",

  // 🗣️ Transcription & Translation
  START_TRANSCRIPTION: "/api/ai/transcribe",
  START_TRANSLATION: "/api/ai/translate",
  GET_SUMMARY: "/api/ai/summary",

  // 🎙️ Recording
  START_RECORDING: "/api/recording/start",
  STOP_RECORDING: "/api/recording/stop",
  GET_RECORDINGS: "/api/recording",

  // 💬 Chat
  SEND_MESSAGE: "/api/chat/send",
  GET_MESSAGES: "/api/chat",

  // 💳 Payments
  CREATE_CHECKOUT_SESSION: "/api/payment/checkout",
  VERIFY_PAYMENT: "/api/payment/verify",

  // ⚙️ Admin
  DASHBOARD_STATS: "/api/admin/stats",
  USERS_LIST: "/api/admin/users",
};
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";