import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RoomItem from './room/RoomItem';
import { toast } from 'react-toastify';
import { clearErros } from '../redux/actions/roomActions';

const Home = () => {

  const dispatch = useDispatch();

  const { rooms, error } = useSelector(state=>state.allRooms);

  useEffect(() => {
    toast.error(error)
    dispatch(clearErros())
  }, [])

  return (
    <section id='rooms' className='container mt-5'>
    <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

    <a href='#' className='ml-2 back-to-search'>
      {' '}
      <i className='fa fa-arrow-left'></i> Back to Search
    </a>
    <div className='row'>
      {rooms && rooms.length == 0 ? 
        <div className='alert alert-danger'><b>No Rooms.</b></div>
      :
        rooms && rooms.map(room => (
          <RoomItem key={room._id} room={room}/>
        ))
      }
    </div>
  </section>
  )
}

export default Home
