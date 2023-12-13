import React from 'react'
import { useGetAllUsersQuery } from './usersApiSlice'
import { Link } from 'react-router-dom';

const UsersList = () => {

    const {
        isError,
        error,
        isLoading,
        isSuccess,
        data : users
    } = useGetAllUsersQuery()

    let content;

    if(isLoading){
        content = <h1>{error}</h1>
    }else if(isSuccess){
        content = (
            <section className='users'>
                <h1>Users List</h1>
                <ul>
                    {
                        users.map((item) => {
                            return <li key={item._id}>{item.username}</li>
                        })
                    }
                </ul>
                <Link to='/welcome'>Back To Home</Link>
            </section>
        )
    }
    else if(isError){
        <p>{error}</p>
    }
  return content
}

export default UsersList