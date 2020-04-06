//class component
import React, { useContext, useState, useEffect } from 'react'
import { uriBase, api } from "../const"
import { Link, Redirect } from "react-router-dom"
import queryString from 'query-string'
import { LoginContext } from './LoginContext'


//import querystring
const style = {
    backgroundImage: `url(${uriBase}/images/warhammer3-skulls.jpg)`,
    height: "100vh",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: "red",
    text: "bold"


}
// const hrefStyle = {
//     textColor:"black",



// }
export default function Login(props) {

    const [name, setName] = useState(props.initalMessage)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loggedIn, setLoggedIn, token, writeToken } = useContext(LoginContext)

    const onClickHandler = () => {

        let body = {
            email: email,
            password: password

        }

        fetch(`${uriBase}${api}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(httpResponse => {
                if (!httpResponse.ok) {
                    throw new Error("Could not send login")
                }
                return httpResponse.json()
            })
            .then(response => {

                if (response.hasOwnProperty("token")) {

                    writeToken(response.token)
                    setLoggedIn(true)
                    props.history.push('/homepage')
                } else {

                    writeToken("")
                    setLoggedIn(false)
                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    const getLogin = () => {
        window.location.href = `${uriBase}/api/v1/users/auth/googlelogin`
    }

    const isLoggedIn = () => {

        const parsed = queryString.parseUrl(window.location.href);

        // check to see if we have any query key value pairs
        if (Object.keys(parsed.query).length > 0) {
            // have to make an new object.  If we don't
            // we get an error parsed.query.hasOwnProperty is not a method
            let query = { ...parsed.query }
            // check to see if we have a token
            if (query.hasOwnProperty("token")) {
                verifyToken(query.token)
            }
        }
    }

    const verifyToken = (token) => {

        fetch(`${uriBase}${api}/users/auth/verifytoken`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(httpResponse => {

                if (!httpResponse.ok) {
                    throw new Error("Couldn't Verify Token")
                }
                return httpResponse.json()
            })
            .then(response => {

                if (response.hasOwnProperty("token")) {
                    setLoggedIn(true)
                    writeToken(response.token)
                    props.history.push('/homepage')
                } else {
                    setLoggedIn(false)
                    writeToken("") 
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        isLoggedIn()
    }, [])
    return (
        <div style={style}>
            <h1>Login or Sign Up to Find Players in Your Area</h1>

            <div>
                {
                    loggedIn ? <h4>Logged In</h4> : <h4> Not Logged In </h4>
                }
            </div>

            <div>
                {/* <h1>{name}</h1>
                    <h2>{loggedIn}</h2> */}
                    Email <input onChange={(event) => setEmail(event.target.value)} value={email}></input> <br /> <br />
                    Password <input onChange={(event) => setPassword(event.target.value)} value={password}></input>
                <div>
                    <button onClick={onClickHandler} >Login</button> <br />
                    <div>
                        <br /> <Link to="/signup" style={{ color: 'red' }}>Don't Have An Account?...Sign UP Here!!</Link> <br />
                    </div>
                </div>

                <div>
                    <button onClick={getLogin}><img src={`${uriBase}/images/btn_google_signin_dark_focus_web@2x.png`} alt='google login'></img></button>
                </div>
            </div>

        </div >

    )

    //need google button and to add it above the create account

}