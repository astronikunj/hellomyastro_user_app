export const baseUrl = "https://www.hellomyastro.com/api";
export const imgBaseurl = "https://www.hellomyastro.com/";

export const ApiEndpoints = {
  CONFIG: '/api/config',
  BANNER: '/api/banner',
  SECOND_BANNER: '/api/lowebanner',
  MAIN_CATEGORY: '/api/main_cat_home',
  SUB_CATEGORY: '/api/sub_cat_home',
  HOME_REVIEW: '/api/home_rating',
  HOME_SEARCH: '/api/searchingFor',
  CATEGORY: '/api/catee',
  REFER_EARN: '/api/refer_n_earn',
  TERMS_CONDITIONS: '/api/terms_condition',
  ABOUT_US: '/api/about_us',
  LOGIN_REGISTER: '/api/login',
  VERIFY_OTP: '/api/verifyOtp',
  UPDATE_PROFILE: '/api/profileupdate',
  USER_PROFILE: '/api/userProfile',
  UPDATE_LOCATION: '/api/update_loc',
  CITY_LIST: '/api/citylist',
  CALLBACK_REQUEST: '/api/callback_req',
  SERVICE: '/api/main_cat_service',
  NOTIFICATION: '/api/notification',
  COUPON_LIST: '/api/coupon_cart_list',
  COUPON_APPLY: '/api/coupon_applied',
  JOB_POST: '/api/post_job',
  TIME_SLOT: '/api/SplitTime',
  FAQ_CATEGORY_LIST: '/api/faqlist',
  FAQ_DESC_LIST: '/api/faqdesc',
  FAQ_ANSWER_LIST: '/api/faq_ans',
  ADDONS: '/api/addons',
  ALL_USER_BOOKING: '/api/all_user_booking',
  ONGOING_BOOKING: '/api/ongoing',
  HISTORY_BOOKING: '/api/history',
  BOOKING_INFO: '/api/booking_info',
  ADD_TO_CART: '/api/add_to_cart',
  SHOW_CART: '/api/show_cart',
  CANCEL_BOOKING: '/api/cancellation',
  ADD_ADDONS: '/api/add_addon',
  RESCHEDULE: '/api/reschedule',
  USER_REOPEN_JOB: '/api/reopenjobuser',
  REOPEN_JOB: '/api/reopen',
  BOOKING_ADD: '/api/bookingadd',
  ADD_BOOKING_IMAGE: '/api/add_booking_images',
  CANCEL_REASON_LIST: '/api/cancelreasonlist',
  AVG_PARTNER_RATING: '/api/avg_partner_rating',
  ADD_PARTNER_RATING: '/api/rating',
};

export type ApiKey = keyof typeof ApiEndpoints;

export function getApiUrl(key: ApiKey, useBase: boolean = true): string {
  const path = ApiEndpoints[key];
  return useBase ? `${baseUrl}${path}` : path;
}
