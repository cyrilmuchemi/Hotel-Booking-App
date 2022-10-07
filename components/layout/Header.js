import Link from 'next/Link';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { signOut } from 'next-auth/react';

const Header = () => {

  const dispatch = useDispatch()

  const {user, loading} = useSelector(state=> state.loadedUser)

  useEffect(()=>{
    dispatch(loadUser())
  }, [dispatch])

  const logoutHandler = () => {
        signOut()
  }


  return (
    <nav className="navbar row justify-content-center sticky-top">
        <div className='container'>
            <div className='col-3 p-0'>
                <div className='navbar-brand'>
                <Link href='/'>
                <img style={{ cursor: 'pointer' }} width='120' height='50' src="/images/MTALII.png" alt="Mtalii" />
                </Link>
                </div>
            </div>
            <div className="col-3 mt-3 mt-md-0 text-center">
              { user ? (

                <div className='ml-4 dropdown d-line'>
                  <a 
                  className='btn dropdown-toggle mr-4' 
                  id='dropDownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup= 'true'
                  aria-expanded='false'
                  >
                    <figure className='avatar avatar-nav'>
                      <img 
                      src={user.avatar && user.avatar.url} 
                      alt={user && user.name}
                      className='rounded-circle'
                      />
                    </figure>
                    <span>{user && user.name}</span>
                  </a>
                  <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>
                    {user.role == 'admin' && (
                      <>
                    <Link href='/admin/rooms'>
                      <a className='dropdown-item'>Rooms</a>
                    </Link>
                    <hr/>
                      </>
                    )}
                    <Link href='/bookings/me'>
                      <a className='dropdown-item'>My Bookings</a>
                    </Link>
                    <Link href='/me/update'>
                      <a className='dropdown-item'>Profile</a>
                    </Link>
                    <Link href='/'>
                      <a className='dropdown-item text-danger' onClick={logoutHandler}>Logout</a>
                    </Link>
                  </div>
                </div>

              ) : 
                  !loading && <Link href='/login'>
                  <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
                  </Link>

              }
              
            </div>
        </div>
    </nav>
  )
}

export default Header
