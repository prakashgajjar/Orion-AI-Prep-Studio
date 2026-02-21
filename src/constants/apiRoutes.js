export const API_ROUTES = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  REFRESH_TOKEN: "/api/auth/refresh",

  GET_USER_PROFILE: "/api/user/profile",
  UPDATE_PROFILE: "/api/user/update",

  CREATE_MEETING: "/api/meeting/create",
  JOIN_MEETING: "/api/meeting/join",
  END_MEETING: "/api/meeting/end",
  GET_MEETING_DETAILS: "/api/meeting",

  START_TRANSCRIPTION: "/api/ai/transcribe",
  START_TRANSLATION: "/api/ai/translate",
  GET_SUMMARY: "/api/ai/summary",

  START_RECORDING: "/api/recording/start",
  STOP_RECORDING: "/api/recording/stop",
  GET_RECORDINGS: "/api/recording",

  SEND_MESSAGE: "/api/chat/send",
  GET_MESSAGES: "/api/chat",

  CREATE_CHECKOUT_SESSION: "/api/payment/checkout",
  VERIFY_PAYMENT: "/api/payment/verify",

  DASHBOARD_STATS: "/api/admin/stats",
  USERS_LIST: "/api/admin/users",
};
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";