import React from 'react'
import AppBar from './AppBar'
import { uriBase } from '../const'
import Blog from "./Blog/Blog"
const style = {
    backgroundImage:`url(${uriBase}/images/warhammer3-skulls.jpg)`,
    height:"100vh",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color:"red",
    text:"bold"
    
    
    }
export default function HomePage(props) {

    return (
        <div style={style}>
            
        <AppBar></AppBar>
        <Blog></Blog>
        
            
        </div>



    )

}
