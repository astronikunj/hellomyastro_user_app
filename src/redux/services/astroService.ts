import { baseUrl } from '@/constants/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const astroService = createApi({
	reducerPath: 'astroService',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as any).auth.token;
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getAstrologers: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getAstrologer',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		addIntakeDetail: builder.mutation({
			query: (bodyContent) => ({
				url: '/chatRequest/addIntakeForm',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getUserDetail: builder.mutation({
			query: () => ({
				url: '/users/getUserdetails',
				method: 'POST',
				body: {},
			}),
		}),
		getIntakeForm: builder.mutation({
			query: (bodyContent) => ({
				url: '/chatRequest/getIntakeForm',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		checkUserAlreadyInChatReq: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/checkChatSessionAvailable',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		checkUserAlreadyInCallReq: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/checkCallSessionAvailable',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getAvailability: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getAstrologerAvailability',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		searchAstrologer: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/searchAstro',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getPaymentAmount: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getRechargeAmount',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		changeStatus: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/addStatus',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		changeCallStatus: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/addCallStatus',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		checkFreeSession: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/checkFreeSessionAvailable',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		sendAstrologerChatRequest: builder.mutation({
			query: (bodyRequest) => ({
				url: '/chatRequest/add',
				method: 'POST',
				body: bodyRequest,
			}),
		}),
		sendAstrologerCallRequest: builder.mutation({
			query: (bodyRequest) => ({
				url: '/callRequest/add',
				method: 'POST',
				body: bodyRequest,
			}),
		}),
		getNotifications: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getUserNotification',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		acceptedChat: builder.mutation({
			query: (bodyContent) => ({
				url: '/chatRequest/acceptChatRequest',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		rejectChat: builder.mutation({
			query: (bodyContent) => ({
				url: '/chatRequest/rejectChatRequest',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		endChatTime: builder.mutation({
			query: (bodyContent) => ({
				url: '/chatRequest/endChat',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getHistory: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getUserById',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		activeAstrologerCategory: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/activeAstrologerCategory',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getBanner: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getBanner',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getActiveBlogs: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/activeBlogs',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		updateUserProfile: builder.mutation({
			query: ({ id, bodyContent }) => ({
				url: `/users/user/update/${id}`,
				method: 'POST',
				body: bodyContent,
			}),
		}),
		addReview: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/userReview/add',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getReview: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getAstrologerUserReview',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getFollowedAstrologer: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getFollower',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		followAstrologer: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/follower/add',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		unFollowAstrologer: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/follower/update',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		addAmountInWallet: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/addpayment',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getAstrologerById: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getAstrologerForCustomer',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getPopUpAd: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getPopup',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getHelpSupport: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getHelpSupport',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		addTicket: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/ticket/add',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getAvailableTimeSlots: builder.query({
			query: (body) => ({
				url: `available-slots?astrologer_id=${body.id}&date=${body.date}`,
				method: 'GET',
			}),
		}),
		getUnlimitedAstrologers: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/getunlimitedAstrologer',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		bookUserSlot: builder.mutation({
			query: (bodyContent) => ({
				url: '/users/book_slots',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		sendMessage: builder.mutation({
			query: (bodyContent) => ({
				url: '/chat/send',
				method: 'POST',
				body: bodyContent,
			}),
		}),
		getMessages: builder.query({
			query: (body) => ({
				url: `/chat/messages?user_id=${body.user_id}&astrologer_id=${body.astrologer_id}`,
				method: 'GET',
			}),
		}),
		getChatMessages: builder.mutation({
			query: (bodyContent) => ({
				url: '/chat/messages',
				method: 'POST',
				body: bodyContent,
			}),
		}),
	}),
});

export const {
	useGetAstrologersMutation,
	useAddIntakeDetailMutation,
	useGetUserDetailMutation,
	useGetIntakeFormMutation,
	useCheckUserAlreadyInChatReqMutation,
	useCheckUserAlreadyInCallReqMutation,
	useGetAvailabilityMutation,
	useSearchAstrologerMutation,
	useGetPaymentAmountMutation,
	useChangeStatusMutation,
	useChangeCallStatusMutation,
	useCheckFreeSessionMutation,
	useSendAstrologerChatRequestMutation,
	useSendAstrologerCallRequestMutation,
	useGetNotificationsMutation,
	useAcceptedChatMutation,
	useRejectChatMutation,
	useEndChatTimeMutation,
	useGetHistoryMutation,
	useActiveAstrologerCategoryMutation,
	useGetBannerMutation,
	useGetActiveBlogsMutation,
	useUpdateUserProfileMutation,
	useGetReviewMutation,
	useGetFollowedAstrologerMutation,
	useFollowAstrologerMutation,
	useUnFollowAstrologerMutation,
	useAddAmountInWalletMutation,
	useGetAstrologerByIdMutation,
	useAddReviewMutation,
	useGetPopUpAdMutation,
	useGetHelpSupportMutation,
	useAddTicketMutation,
	useLazyGetAvailableTimeSlotsQuery,
	useGetUnlimitedAstrologersMutation,
	useBookUserSlotMutation,
	useSendMessageMutation,
	useLazyGetMessagesQuery,
	useGetChatMessagesMutation,
} = astroService;
