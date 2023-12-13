import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({
        getAllUsers : builder.query({
            query : () => ({
                url : '/users'
            }),
            keepUnusedDataFor : 5,
        })
    })
})

export const {
    useGetAllUsersQuery
} = usersApiSlice