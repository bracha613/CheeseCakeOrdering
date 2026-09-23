import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const ViewOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const { data } = await axios.get('/api/cheesecakeordering/getorders');
            setOrders(data);
        }
        getOrders();
    }, []);

    return (
        <div className='d-flex justify-content-center'>
            <table className='table text-center shadow-lg' style={{ borderCollapse: 'separate', borderSpacing: '0 15px', maxWidth: '80%' }}>
                <thead>
                    <tr style={{ borderRadius: '15px' }}>
                        <th style={{ backgroundColor: '#212529', color: 'white'}}>Name/Email</th>
                        <th style={{ backgroundColor: '#212529', color: 'white'}}>Base Flavor</th>
                        <th style={{ backgroundColor: '#212529', color: 'white'}}>Toppings</th>
                        <th style={{ backgroundColor: '#212529', color: 'white'}}>Special Requests</th>
                        <th style={{ backgroundColor: '#212529', color: 'white'}}>Quantity</th>
                        <th style={{ backgroundColor: '#212529', color: 'white'}}>Delivery Date</th>
                        <th style={{ backgroundColor: '#212529', color: 'white'}}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                            <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                                <Link to={`/order-details/${order.id}`}>
                                    {order.name} - {order.email}
                                </Link>
                            </td>
                            <td>{order.baseFlavor}</td>
                            <td>{order.toppings || 'N/A'}</td>
                            <td>{order.specialRequests || 'N/A'}</td>
                            <td>{order.quantity}</td>
                            <td>{dayjs(order.deliveryDate).format("MM/DD/YYYY")}</td>
                            <td>${(order.total).toFixed(2)}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default ViewOrders;