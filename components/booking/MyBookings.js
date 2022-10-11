import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import Link from 'next/link'
import { clearErrors } from '../../redux/actions/bookingActions'
import { MDBDataTable } from 'mdbreact';
import easyinvoice from 'easyinvoice';

const MyBookings = () => {

    const dispatch = useDispatch()

    const {bookings, error} = useSelector(state => state.bookings)

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch])

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: 'Booking ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Check In',
                    field: 'checkIn',
                    sort: 'asc'
                },
                {
                    label: 'Check Out',
                    field: 'checkOut',
                    sort: 'asc'
                },
                {
                    label: 'Amount Paid',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: [],
        }

        bookings && bookings.forEach(booking => {
            data.rows.push({
                id: booking._id,
                checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
                checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
                amount: `$${booking.amountPaid}`,
                actions: 
                <>
                <Link href={`/booking/${booking._id}`}>
                    <a className='btn btn-primary'>
                        <i className='fa fa-eye'></i>
                    </a>
                </Link>
                <button className='btn btn-success mx-2' onClick={() => {
                    downloadInvoice(booking)
                }}>
                    <i className='fa fa-download'></i>
                </button>
                </>
            })
        });
        return data;
    }

    const downloadInvoice = async (booking) => {
        const data = {
            "documentTitle": "Booking Invoice",
            "images": {

                "logo": "https://res.cloudinary.com/dyemjook1/image/upload/v1664806102/bookIt/hotels/bookit_logo_uxsdsg.png",
            },
            // Your own data
            "sender": {
                "company": "Mtalii Agency",
                "address": "Off Dunga Rd, 32583-00600 Ngara Rd",
                "zip": "00100",
                "city": "Nairobi",
                "country": "Kenya"
            },
            // Your recipient
            "client": {
                "company": `${booking.user.name}`,
                "address": `${booking.user.email}`,
                "zip": "",
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                "country": `Check Out: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
            },

            "invoiceNumber": `${booking._id}`,
            "invoiceDate": `${new Date(Date.now()).toLocaleString('en-US')}`,
   
            "products": [
                {
                    "quantity": `${booking.daysOfStay}`,
                    "description": `${booking.room.name}`,
                    "tax-rate": 2,
                    "price": booking.room.pricePerNight
                },
            ],
            
            // Settings to customize your invoice
            "settings": {
                "currency": "USD", 
            },
            
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)
        
    }


  return (
    <div className='container container-fluid'>
        <h1 className='my-5'>My Bookings</h1>
        <MDBDataTable
           data={setBookings()}
           className='px-3'
           bordered
           striped
           hover
        />
    </div>
  )
}

export default MyBookings
