import React from "react"
import { uriBase, api } from "../const"
import objectId from 'bson-objectid'
const style = {
    backgroundImage:`url(${uriBase}/images/warhammer3-skulls.jpg)`,
    height:"100vh",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color:"red",
    text:"bold"
    
    
    }

export default function Profile(props) {


    //form data
    const [email, setEmail] = React.useState(props.currentUser.email)
    const [id, setId] = React.useState(objectId())
    const [fName, setfName] = React.useState(props.currentUser.fName)
    const [lName, setlName] = React.useState(props.currentUser.lName)
    const [userName, setUserName] = React.useState(props.currentUser.userName)
    const [password, setPassword] = React.useState(props.currentUser.password)

     
    //must fix data base so when editing it replaces old enrty not makes a new with the changed infomation!!!!!!!!!!!
    const onSaveHandler = (event) => {

        let update = {}
        //we are patching
        if (props.currentUser.fName !== fName || props.currentUser.fName === undefined) {
            update.fName = fName
        }

        if (props.currentUser.lName !== lName || props.currentUser.lName === undefined) {
            update.lName = lName
        }

        if (props.currentUser.userName !== userName || props.currentUser.userName === undefined) {
            update.userName = userName
        }

        if (props.currentUser.password !== password || props.currentUser.password === undefined) {
            update.password = password
        }
        if (props.currentUser.email !== email || props.currentUser.email === undefined) {
            update.email = email
        }

        console.log(update)
        if (Object.entries(update).length > 0) {


            // patch or put
            fetch(`${uriBase}${api}/users/${props.currentUser._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(update)
            })
                .then(httpResponse => {
                    if (!httpResponse.ok) {
                        throw new Error(`Couldn't patch`)
                    }
                    return httpResponse.json()
                })
                .then(user => {
                    onCancelHandler()
                    //refresh()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }  //end of saveHandler
    const onCancelHandler = () => {
        setId(objectId())
        setfName('')
        setlName('')
        setUserName('')
        setPassword('')
        setEmail('')

    }
    const onDeleteClickHandler = (event) => {
     
        fetch(`${uriBase}${api}/users/${props.currentUser._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(httpResponse => {
                if (!httpResponse.ok) {
                    throw new Error("delete failed")
                }
                return httpResponse.json()
            })
            .then(response => {
                //refresh(must redirect to login page)
            })
            .catch(error => {
                console.log(error)
            })
    }


    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case "email":
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
            <div>
            {/* <input type="text" placeholder="Please fill this field" /> */}
                First name <input onChange={onChangeHandler} name="fName"   value={fName}></input> <br /> <br />
                Last name  <input onChange={onChangeHandler} name="lName"  value={lName}></input> <br /> <br />

                User name  <input onChange={onChangeHandler} name="userName" value={userName}></input> <br /> <br />
                Password   <input onChange={onChangeHandler} name="password" value={password}></input> <br /> <br />
                Email   <input onChange={onChangeHandler} name="email" value={email}></input> <br /> <br />

            </div>
            <div>
                <button onClick={onSaveHandler}>Save Changes</button>  <br/>
                {/* <button onClick={onEditClickHandler}>Edit Profile</button> */}
                {/* <button onClick={onCancelHandler}>cancel</button> */}
                {/* <button onClick={onDeleteClickHandler}>Delete Profile</button> */}
                <button onClick={onDeleteClickHandler}>Delete</button>



            </div>
        </div>
    )
}