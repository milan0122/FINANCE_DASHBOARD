import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {GetKpisResponse} from "./types";


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath : "main",
    tagTypes: ["Kpis"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: ()=> "kpi/kpis/",
            providesTags: ['Kpis']
            
        })
    })
})

export const {useGetKpisQuery}= api;

/*User redux toolkit query, we are creating api for fetching data and caching data
createApi() allows to define a set of endpoints and describe how to reterive
Note: Kpis meand key performance indicator 
*/