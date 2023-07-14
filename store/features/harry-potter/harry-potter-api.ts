import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import { IHarryPotterName } from "@/data/harry-potter.models";

const URL = {  
  base: 'http://localhost:4200/api/harry-potter/',
  // names: 'http://localhost:4200/api/harry-potter/names?count=1000',
  // search: 'https://localhost:4200/api/harry-potter/search'
}
export const harryPotterApi = createApi({
  reducerPath: "harryPotterApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL.base }),
  tagTypes: ["harry-potter"],
  endpoints: (builder) => ({
    search: builder.query<IHarryPotterName[], string>({
      query: (q) => `search?name=${q}`,
      providesTags: (result, error, search) => [ { type: "harry-potter", search }]
    }) 
  })
})