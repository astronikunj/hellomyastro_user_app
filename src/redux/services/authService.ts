import { baseUrl } from "@/constants/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
	reducerPath: 'authService',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
	}),
	endpoints: (builder) => ({
		loginAppUser: builder.mutation({
			query: (data) => ({
				url: '/loginAppUser',
				method: 'POST',
				body: data
			})
		}),
		sendOTP: builder.mutation({
			query: (data) => ({
				url: 'sendOtp',
				method: 'POST',
				body: data
			})
		}),
		verifyOTP: builder.mutation({
			query: (data) => ({
				url: 'verifyOtp',
				method: 'POST',
				body: data
			})
		})
	})
})

export const {
	useLoginAppUserMutation,
	useSendOTPMutation,
	useVerifyOTPMutation,
} = authService