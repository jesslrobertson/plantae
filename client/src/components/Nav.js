import React from 'react'
import Logo from './Logo'
import SlidingMenu from './Sliding-Menu'

export default function Nav(props){
  const { logout } = props
  return (
    <div className="nav">
      <Logo />
      <SlidingMenu />
    </div>
  )
}