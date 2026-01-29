import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// export const baseUri = `http://206.162.244.179`;
export const baseUri = `https://backend.joinventureai.com`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "api/category/get_all_categories/",
    }),
    getJobs: builder.query({
      query: () => `api/jobs/all_job/`,
    }),
    applyOnJob: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "api/jobs/submit_application/",
        body: data,
      }),
    }),
    getClientReviews: builder.query({
      query: () => `api/review/get_client_reviews/`,
    }),
    getExperts: builder.query({
      query: () => `api/experts/get_all_experts/`,
    }),
    getMomentsInJvai: builder.query({
      query: () => `api/what_we_do_everyday/get_what_we_do/`,
    }),
    getProjects: builder.query({
      query: () => `api/projects/get_all_projects/`,
      transformResponse: (res) => res.Data,
    }),
    getOneProject: builder.query({
      query: (id) => `api/projects/get_individual_project/${id}/`,
    }),
    getSeo: builder.query({
      query: () => `api/seo/get_seo_content/`,
    }),
    subscribeUpdate: builder.mutation({
      query: (email) => ({
        method: "POST",
        url: "api/newsletter/subscribe/",
        body: email,
      }),
    }),
    getAllBlog: builder.query({
      query: () => `api/jvai_insider/get_all_articles/`,
    }),
    getOneBlog: builder.query({
      query: (id) => `api/jvai_insider/get_individual_article/${id}/`,
    }),
    submitContact: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `api/contact/send_contact_request/`,
        body: data,
      }),
    }),
    getFaQ: builder.query({
      query: () => "api/faq/get_all_faq/",
    }),
    sendToBot: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "api/chatbot/send_message/",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetJobsQuery,
  useApplyOnJobMutation,
  useGetClientReviewsQuery,
  useGetExpertsQuery,
  useGetMomentsInJvaiQuery,
  useGetProjectsQuery,
  useGetOneProjectQuery,
  useGetSeoQuery,
  useSubscribeUpdateMutation,
  useGetOneBlogQuery,
  useGetAllBlogQuery,
  useSubmitContactMutation,
  useGetFaQQuery,
  useSendToBotMutation,
} = apiSlice;
