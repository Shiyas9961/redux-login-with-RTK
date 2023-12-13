import React from 'react'
import { useSelector } from 'react-redux'
import { selectToken, selectUser } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'

const Welcome = () => {
    const user = useSelector(selectUser)
    const token = useSelector(selectToken)

    const welcom = user ? `Welcom ${user} !` : "Welcome"
    const tokenAbbr = `${token.slice(0, 9)}....`

    let content = <section className='welcom'>
        <h1>{welcom}</h1>
        <p>Token : {tokenAbbr}</p>
        <p><Link to='/userslist'>Users List</Link></p>
    </section>
  return content
}

export default Welcome