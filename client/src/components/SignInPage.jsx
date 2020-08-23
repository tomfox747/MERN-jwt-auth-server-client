import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const SignInPage = () =>{
    let history = useHistory()
    //Sign in form variables
    const[SI_email, set_SI_email] = useState("")
    const[SI_password, set_SI_password] = useState("")

    //Sign up form variables
    const[SU_name, set_SU_name] = useState("")
    const[SU_email, set_SU_email] = useState("")
    const[SU_password, set_SU_password] = useState("")

    const signIn_function = (e) =>{

        axios.post('http://localhost:5000/authenticate/login', 
            {email:SI_email, password:SI_password}, 
            {headers:{'content-type':'application/json'}})
        .then((response) =>{
            let cookie = new Cookies()
            cookie.set('access_token', response.data.access_token)
            cookie.set('refresh_token', response.data.refresh_token)
            history.push('/homepage')
        }).catch((error) =>{
            alert(error.response.data)
        })
    }

    const signUp_function = (e) =>{
        
        axios.post('http://localhost:5000/create_account/create', {name:SU_name, email:SU_email, password:SU_password})
        .then((response) =>{
            alert("account created, please sign in")
        }).catch((error) =>{
            alert(error.response.data)
        })
    }

    return(
        <div>
            <p>Sign In</p>
            <form>
                <label>Email:</label>
                <input type="text" onChange={(e) => set_SI_email(e.target.value)}/><br/>
                <label>Password:</label>
                <input type="text" onChange={(e) => set_SI_password(e.target.value)} /><br/>
            </form><br/>
            <button onClick={(e) => signIn_function(e)}>Submit</button>
            
            <p>Sign Up</p>
            <form>
                <label>Name:</label>
                <input type='text' onChange={(e) => set_SU_name(e.target.value)}/><br/>
                <label>Email:</label>
                <input type='text' onChange={(e) => set_SU_email(e.target.value)}/><br/>
                <label>Password:</label>
                <input type='text' onChange={(e) => set_SU_password(e.target.value)}/><br/>
            </form><br/>
            <button onClick={(e) => signUp_function(e)}>Submit</button>
        </div>
        
    )
}

export default SignInPage