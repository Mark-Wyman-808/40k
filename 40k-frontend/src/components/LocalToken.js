// import React,{useContext, useEffect} from 'react';
// import {LoginContext } from './LoginContext'
// import {uriBase,api} from '../const'

// function LocalToken(props) {
//     return ( const verifyToken = () => {
//         const token = window.localStorage.getItem('token')

//         fetch(`${uriBase}${api}/users/auth/verifytoken`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then(httpResponse => {

//                 if (!httpResponse.ok) {
//                     throw new Error("Couldn't Verify Stored Token")
//                 }
//                 return httpResponse.json()
//             })
//             .then(response => {
//                     console.log(response)
//                 if (response.hasOwnProperty("token")) {
//                     setLoggedIn(true)
//                     writeToken(response.token)
//                     props.history.push('/homepage')
//                 } else {
//                     setLoggedIn(false)
//                     writeToken("") 
//                 }
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }
//     useEffect(() =>{
//         verifyToken()
//     }), []
//        return null
//     );
// }

// export default LocalToken;