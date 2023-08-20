import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "/comments";
const BASE_URL = "https://64b8491a21b9aa6eb079c089.mockapi.io/contacts/";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => API_ENDPOINT,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query(body) {
        return {
          url: API_ENDPOINT,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query(id) {
        return { url: `${API_ENDPOINT}/${id}`, method: "DELETE" };
      },
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query({ id, ...body }) {
        return { url: `${API_ENDPOINT}/${id}`, method: "PUT", body };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});
export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
