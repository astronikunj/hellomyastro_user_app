import { baseUrl } from '@/constants/constant';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productService = createApi({
	reducerPath: 'productService',
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders: (headers) => {
			return headers;
		}
	}),
	endpoints: (builder) => ({
		getProductCategories: builder.mutation({
			query: (bodyContent) => ({
				url: '/getproductCategory',
				method: 'POST',
				body: bodyContent
			})
		}),
		getLatestProduct: builder.mutation({
			query: (bodyContent) => ({
				url: '/getAstromallProduct',
				method: 'POST',
				body: bodyContent
			})
		}),
		getProductById: builder.mutation({
			query: (bodyContent) => ({
				url: `/getAstromallProductById`,
				method: 'POST',
				body: bodyContent
			})
		}),
	})
})

export const {
	useGetProductCategoriesMutation,
	useGetLatestProductMutation,
	useGetProductByIdMutation,
} = productService;