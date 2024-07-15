import { click } from '@testing-library/user-event/dist/click'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  const[click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
    <nav className='navbar-container'>
        <div className='navbar-container'>
            <link to='/' className='navbar-logo'>
                Agrinnovate 
            </link>
            <div className='menu-icon' onClick={handleClick}>
               <i className={click ? 'fas fa-times' : 'fa-solid fa-bars'}></i>
            </div>
        </div>  
    </nav>
    </>
  )
}

export default Navbar;
