import React from 'react'
import {ReactComponent as Leaf } from '../assets/leaf.svg'


export default function Logo(){
  return (
    <div className='leaf-text-logo'>
      <Leaf className='leaf-svg' />
      <h1 className='logo-text'>Plantae</h1>
    </div>
  )
}