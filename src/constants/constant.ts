import { Platform } from 'react-native';

export const baseUrl = "https://abackend-production-d250.up.railway.app";
export const imgBaseurl = "https://www.hellomyastro.com/";

export const ApiEndpoints = {
  CONFIG: '/users/getBanner',
  BANNER: '/users/getBanner',
  SECOND_BANNER: '/users/getBanner',
  MAIN_CATEGORY: '/users/activeAstrologerCategory',
  SUB_CATEGORY: '/users/activeAstrologerCategory',
  HOME_REVIEW: '/users/getAstrologerUserReview',
  HOME_SEARCH: '/users/searchAstro',
  CATEGORY: '/users/activeAstrologerCategory',
  REFER_EARN: '/users/getReferralInfo',
  TERMS_CONDITIONS: '/users/getHelpSupport',
  ABOUT_US: '/users/getHelpSupport',
  LOGIN_REGISTER: '/auth/loginAppUser',
  VERIFY_OTP: '/auth/verify-otp',
  UPDATE_PROFILE: '/users/user/update',
  USER_PROFILE: '/users/getUserById',
  UPDATE_LOCATION: '/users/updateUserProfile',
  CITY_LIST: '/users/getHelpSupport',
  CALLBACK_REQUEST: '/users/addTicket',
  SERVICE: '/users/getAstrologer',
  NOTIFICATION: '/users/getUserNotification',
  COUPON_LIST: '/ecommerce/coupons',
  COUPON_APPLY: '/ecommerce/coupons/apply',
  JOB_POST: '/orders/create',
  TIME_SLOT: '/users/getAstrologerAvailability',
  FAQ_CATEGORY_LIST: '/users/getHelpSupport',
  FAQ_DESC_LIST: '/users/getHelpSupport',
  FAQ_ANSWER_LIST: '/users/getHelpSupport',
  ADDONS: '/ecommerce/products',
  ALL_USER_BOOKING: '/chat/getChatHistory',
  ONGOING_BOOKING: '/chat/getSession',
  HISTORY_BOOKING: '/call/getCallHistory',
  BOOKING_INFO: '/chat/getSession',
  ADD_TO_CART: '/cart/add',
  SHOW_CART: '/cart',
  CANCEL_BOOKING: '/chat/end',
  ADD_ADDONS: '/cart/update',
  RESCHEDULE: '/users/getAstrologerAvailability',
  USER_REOPEN_JOB: '/chat/start',
  REOPEN_JOB: '/chat/start',
  BOOKING_ADD: '/chat/start',
  ADD_BOOKING_IMAGE: '/ecommerce/products',
  CANCEL_REASON_LIST: '/users/getHelpSupport',
  AVG_PARTNER_RATING: '/users/getAstrologerUserReview',
  ADD_PARTNER_RATING: '/users/addReview',
};

export type ApiKey = keyof typeof ApiEndpoints;

export function getApiUrl(key: ApiKey, useBase: boolean = true): string {
  const path = ApiEndpoints[key];
  return useBase ? `${baseUrl}${path}` : path;
}
