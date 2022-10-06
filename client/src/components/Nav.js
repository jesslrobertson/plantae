import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav(props){
  const { logout } = props
  return (
    <div className="nav">
      <h1>Plantae</h1>
      <div className='link-box'>
        <Link className='link' to="/profile">Profile</Link>
        <Link className='link' to="/home">Home</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}