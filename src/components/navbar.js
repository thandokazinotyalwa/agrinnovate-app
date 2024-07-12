import React, {useState} from 'react'


function navbar() {
  return (
    <>
    <nav className='navbar-container'>
        <div className='navbar-container'>
            <link to='/' className='navbar-logo'>
                Agrinnovate 
            </link>
            <div className='menu-icon'>
               <i className='{click? }'>hamburger</> 
            </div>
        </div>  
    </nav>
    </>
  )
}

export default navbar
