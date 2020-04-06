import React from 'react'
import AppBar from './AppBar'
import { uriBase } from '../const'
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
        
            <h1 >there is only war</h1>
            {/* <img src={`${uriBase}/images/warhammer-40000-video-games-space-marines-1080P-wallpaper-middle-size.jpg`} alt="Space Marine"></img> */}
        </div>



    )

}
