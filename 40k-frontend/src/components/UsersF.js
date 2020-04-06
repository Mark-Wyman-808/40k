import React from "react"
import { uriBase, api } from "../const"
import objectId from 'bson-objectid'

export default function UsersF(props) {

    const [users, setUsers] = React.useState([])

    //form data
    const [id, setId] = React.useState(objectId())
    const [fName, setfName] = React.useState("")
    const [lName, setlName] = React.useState("")
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showId, setShowId] = React.useState(true)


    const refresh = () => {

        fetch(`${uriBase}${api}/users`,
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            })
            .then(HttpResponse => {
                if (!HttpResponse.ok) {
                    throw new Error("Bad Response")
                }
                return HttpResponse.json()
            })
            .then(response => {
                console.log(response)
                setUsers(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onEditClickHandler = (event, index) => {
        let user = users[index]
        setId(user._id)
        setfName(user.fName)
        setlName(user.lName)
        setUserName(user.userName)
        setPassword(user.password)
        setShowId(false)
    }
    const onSaveHandler = () => {

        let update = {}
        let method = "PATCH"

        let user = users.find((user) => {
            return user._id === id
        })

        if (user !== undefined) {
            //we are patching
            if (user.fName !== fName || user.fName === undefined) {
                update.fName = fName
            }

            if (user.lName !== lName || user.lName === undefined) {
                update.lName = lName
            }

            if (user.userName !== userName || user.userName === undefined) {
                update.userName = userName
            }

            if (user.password !== password || user.password === undefined) {
                update.password = password
            }


            //end of for in
        } else {
            //not found, we are posting
            method = "PUT"
            update._id = id
            update.fName = fName
            update.lName = lName
            update.userName = userName
            update.password = password
        }
        //make sure we are not trying to 
        //update with a blank 
        console.log(update)
        if (Object.entries(update).length > 0) {


            // patch or put
            fetch(`${uriBase}${api}/users/${id}`, {
                method: method,
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(update)
            })
                .then(httpResponse => {
                    if (!httpResponse.ok) {
                        throw new Error(`Couldn't ${method}`)
                    }
                    return httpResponse.json()
                })
                .then(user => {
                    onCancelHandler()
                    refresh()
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
        setShowId(true)

    }
    const onDeleteClickHandler = (event, index) => {
        const id = users[index]._id
        fetch(`${uriBase}${api}/users/${id}`, {
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
                refresh()
            })
            .catch(error => {
                console.log(error)
            })
    }


    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case "id":
                setId(event.target.value)
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


    const idField = () => {
        let rtnVal = null

        if (showId === true) {
            rtnVal = (
                <div> ID<input onChange={onChangeHandler} name="id" value={id}></input>
                </div>
            )
        }
        return rtnVal

    }

    React.useEffect(() => {

        refresh()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <div>
                <ul>
                    {
                        users.map((user, index) => {
                            return (
                                <li key={index}>{user.fName}
                                    <button onClick={(event) => { onEditClickHandler(event, index) }}>Edit</button> <br/> 
                                    <button onClick={(event) => { onDeleteClickHandler(event, index) }}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>

                {idField()}
                First name <input onChange={onChangeHandler} name="fName" value={fName}></input> <br /> <br/>
                Last name  <input onChange={onChangeHandler} name="lName" value={lName}></input> <br /> <br/>
                User name  <input onChange={onChangeHandler} name="userName" value={userName}></input> <br /> <br/>
                Password   <input onChange={onChangeHandler} name="password" value={password}></input> <br /> <br/>

            </div>
            <div>
                <button onClick={onSaveHandler}>save</button>
                <button onClick={onCancelHandler}>cancel</button>

            </div>
        </div>
    )
}

