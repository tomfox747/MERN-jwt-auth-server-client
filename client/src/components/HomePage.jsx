import React,{useState, useEffect} from 'react'

import {useHistory} from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'

const HomePage = () =>{
    let history = useHistory()

    useEffect(() =>{
        checkForTokens()
    }, [])

    const checkForTokens = () =>{
        let cookie = new Cookies()
        if(!cookie.get('refresh_token')){
           history.push('/')
        }
    }

    const getInfo = (e) =>{
        let cookie = new Cookies()
        let access_token = cookie.get('access_token')
        axios.post('http://localhost:5000/getInfo/get', {data:"test"},{headers:{'Authorization': `Bearer ${access_token}`}})
        .then((response) =>{
            console.log(response.data, "is logged in")
        })
        .catch((err) =>{
            try{
                refresh_access_token()
                getInfo()
            }catch(e){
                console.log(e)
            }
        })
    }

    const refresh_access_token = () =>{
        let cookie = new Cookies()
        let refresh_token = cookie.get('refresh_token')
        axios.post('http://localhost:5000/authenticate/refresh_token',{refresh_token:refresh_token})
        .then((response) =>{
            cookie.set('access_token', response.data.access_token)
        })
        .catch((err) =>{

            console.log(err)
        })
    }

    const logout = () =>{
        let cookie = new Cookies()
        cookie.remove('refresh_token')
        cookie.remove('access_token')
        history.push('/')
    }

    return(
        <div>
            <p>Home Page</p>
            <p>Welcome</p>
            <button onClick={(e) => getInfo(e)}>Get user Info</button>
            <button onClick={(e) => refresh_access_token(e)}>Refresh Token</button>
            <button onClick={(e) => logout()}>Logout</button>
        </div>
    )
}

export default HomePage