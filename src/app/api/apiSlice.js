import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl : 'http://localhost:3500',
    credentials : 'include',
    prepareHeaders : (headers, { getState }) => {
        const token = getState().auth.token

        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReAuth = async (arg, api, extraOptions) => {
    let result = await baseQuery(arg, api, extraOptions)

    if(result?.error?.originalStatus === 403){
        console.log("Sending refresh token")

        const refreshResult = await baseQuery('/refresh', api, extraOptions)

        console.log(refreshResult)
        if(refreshResult?.data){
            const username = api.getState().auth.username

            api.dispatch(setCredentials({
                ...refreshResult.data,
                username
            }))

            result = await baseQuery(arg, api, extraOptions)
        }else{
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery : baseQueryWithReAuth,
    endpoints : (builder) => ({}),
})