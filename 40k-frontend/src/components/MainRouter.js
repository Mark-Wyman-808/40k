import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Login from './Login'
import SignUp from './SignUp'
//import AppBar from './AppBar'
import UsersF from './UsersF'
import HomePage from './HomePage'
import Profile from './Profile'
import {LoginProvider} from './LoginContext'
//import ProtectedRpoute from "./ProtectedRoute"
//import LocalToken from "./LocalToken"
import Blog from "./Blog/Blog"



export default function MainRouter() {
    const [currentUser, setCurrentUser] = React.useState("")
    const setLoggedInUser = (user) => {
        console.log("!!!!!!!!!!!!!", user)
        setCurrentUser(user)
    }

    return (
        <div>

            <Router>
                <LoginProvider>
                    
                {/* <Link to="/">Home</Link><br /> */}
                <Switch>
                    <Route path="/homepage">
                        <HomePage></HomePage>
                    </Route>

                    <Route path="/users">
                        <UsersF></UsersF>
                    </Route>
                    <Route path="/blog" component= {Blog}></Route>
                    <Route path="/signup" render={(props) => <SignUp {...props} currentUser={currentUser} inintialMessage="Sign Up to Find Players"></SignUp>} >

                    </Route>
                    <Route path="/profile" render={(props) => <Profile {...props} currentUser={currentUser} inintialMessage="edit profile"></Profile>}>

                    </Route>

                    {/* all paths above this line */}
                    <Route path="/" render={(props) => <Login {...props} setLoggedInUser={(user) => setLoggedInUser(user)} inintialMessage="Wanna play 40k?"></Login>}>
                    </Route>
                </Switch>
                </LoginProvider>
            </Router>
        </div>


    )

}