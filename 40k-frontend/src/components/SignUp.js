import React from 'react'
import { uriBase, api } from '../const'
const style = {
    backgroundImage:`url(${uriBase}/images/warhammer3-skulls.jpg)`,
    height:"100vh",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color:"red",
    text:"bold"
    
    
    }
export default function SignUp(props) {
    let [email, setEmail] = React.useState("")
    let [message, setMessage] = React.useState(props.initalMessage)
    let [fName, setfName] = React.useState("")
    let [lName, setlName] = React.useState("")
    let [userName, setUserName] = React.useState("")
    let [password, setPassword] = React.useState("")



    const onClickHandler = (event) => {
        event.preventDefault()

        let formData = new FormData()
        formData.append('email', email)
        formData.append('fName', fName)
        formData.append('lName', lName)
        formData.append('userName', userName)
        formData.append('password', password)


        fetch(`${uriBase}${api}/users/signup`, {
            method: "POST",
            body: formData

        })
            .then(HttpRequest => {
                if (!HttpRequest.ok) {
                    throw new Error('could not find user')
                }
                return HttpRequest.json()
            })
            .then(user => {
                //ToDo handle user
                props.history.push("/homepage")
            })
            .catch(error => {
                console.log(error)
            })

      
    }
    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value)
                break
            case 'fName':
                setfName(event.target.value)
                break
            case 'lName':
                setlName(event.target.value)
                break
            case 'userName':
                setUserName(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
           
            default:
        }
    }

    return (
        <div style={style}>
            <h1>{message}</h1>
            <form>
                <div>
                    Email <input onChange={onChangeHandler} name="email" placeholder="Email" value={email}></input> <br />
                    First Name <input onChange={onChangeHandler} name="fName" placeholder="First Name" value={fName}></input> <br />
                    Last Name <input onChange={onChangeHandler} name="lName" placeholder="Last Name" value={lName}></input> <br />
                    User Name <input onChange={onChangeHandler} name="userName" placeholder="User Name" value={userName}></input> <br />
                    Password <input onChange={onChangeHandler} name="password" placeholder="Password" value={password}></input> <br />
                    <div>
                        <br />Create Account     <input type="submit" onClick={onClickHandler}></input>
                    </div>

                </div>
            </form>
        </div>
    )
}