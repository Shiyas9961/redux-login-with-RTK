import React, { useEffect, useRef, useState } from 'react'
import { useLoginMutation } from './authApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setCredentials } from './authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const userRef = useRef()
    const errorRef = useRef()

    const [ login,{isLoading}] = useLoginMutation()
    const [username, setUsername] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(selectUser)

    console.log(user)

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg('')
    },[username, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const loginResult = await login({
                username,
                password : pwd
            }).unwrap()

            dispatch(setCredentials({
                ...loginResult,
                username
            }))
            setUsername('')
            setPwd('')
            navigate('/welcome')
        }catch(err){
            if(!err.originalStatus){
                setErrMsg("No server respond")
            }else if(err.originalStatus === 400){
                setErrMsg("Missing Username and Password")
            }else if(err.originalStatus === 401){
                setErrMsg("Unautherized")
            }else{
                setErrMsg("Login failed")
            }
            /* console.log(errorRef.current)
            errorRef.current.focus() */
        }
    }

    const content = isLoading ? (
        <h1>Loding...</h1>
    ) : (
        <section className='login'>
            <p 
            ref={errorRef} 
            className={errMsg.length ? "errmsg" : "offscreen"} >{errMsg}</p>

            <h1>Employee Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                ref={userRef}
                value={username} 
                type="text" 
                id='username'
                autoComplete='off' 
                onChange={(e)=>setUsername(e.target.value)}
                required 
                />

                <label htmlFor="password">Password</label>
                <input 
                type="password"
                value={pwd} 
                onChange={(e)=>setPwd(e.target.value)}
                id='password'
                required 
                />

                <button>Sign In</button>
            </form>
        </section>
    )

  return content
}

export default Login