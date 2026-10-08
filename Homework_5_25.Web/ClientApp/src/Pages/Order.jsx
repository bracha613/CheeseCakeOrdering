import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LivePreview from '../components/LivePreview';

const baseFlavors = ['Choose...', 'Classic', 'Chocolate', 'Red Velvet', 'Brownie'];

const toppings = [
    "Chocolate Chips",
    "Caramel Drizzle",
    "Whipped Cream",
    "Pecans",
    "Almonds",
    "Toasted Coconut",
    "Graham Cracker Crumble",
    "Cookie Dough",
    "Mint Chocolate Chips",
    "Caramelized Bananas",
    "Rainbow Sprinkles",
    "Powdered Sugar",
    "White Chocolate Shavings",
    "Peanut Butter Drizzle",
    "Dark Chocolate Drizzle"
];

const Order = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [baseFlavor, setBaseFlavor] = useState(baseFlavors[0]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [specialRequests, setSpecialRequests] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = name && email && deliveryDate && quantity >= 1 && baseFlavor !== baseFlavors[0];

    const onSubmitClick = async () => {
        setIsSubmitting(true);
        await axios.post('/api/cheesecakeordering/add', {
            name,
            email,
            baseFlavor,
            toppings: selectedToppings.join(', '),
            specialRequests,
            quantity,
            deliveryDate,
            total: calculateTotal()
        });
        setIsSubmitting(false);
        navigate('/success');
    }

    const onToppingsChange = topping => {
        if (selectedToppings.includes(topping)) {
            const filtered = selectedToppings.filter(t => t !== topping);
            setSelectedToppings(filtered);
        } else {
            setSelectedToppings([...selectedToppings, topping]);
        }
    }

    const calculateTotal = () => {
        if (baseFlavor == baseFlavors[0]) {
            return 0;
        }
        return (49.99 + (selectedToppings.length * 3.95)) * quantity;
    }

    return (
        <>
            <div style={{ marginTop: 80 }}>
                <h1 className='text-center my-4' style={{ marginTop: 80 }}>Cheesecake Factory Order Form</h1>
            </div >
            <div className='row'>
                <div className='col-md-6'>
                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input type='text' onChange={e => setName(e.target.value)} value={name} className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input type='text' onChange={e => setEmail(e.target.value)} value={email} className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Cheesecake Base Flavor ($49.99)</label>
                        <select type='text' onChange={e => setBaseFlavor(e.target.value)} value={baseFlavor} className='form-select'>
                            {baseFlavors.map(f => <option key={f}>{f}</option>)}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Toppings (each topping adds an additional $3.95)</label>
                        {toppings.map(t => {
                            return <div key={t} className='form-check'>
                                <input
                                    id={`check${t}`}
                                    className='form-check-input'
                                    type='checkbox'
                                    checked={selectedToppings.includes(t)}
                                    onChange={() => onToppingsChange(t)}
                                />
                                <label className='form-check-label' for={`check${t}`}>{t}</label>
                            </div>
                        })}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Special Requests</label>
                        <textarea
                            className='form-control'
                            rows={3}
                            value={specialRequests}
                            onChange={e => setSpecialRequests(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Quantity</label>
                        <input
                            type='number'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            min={1}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Delivery Date</label>
                        <input
                            type='date'
                            onChange={e => setDeliveryDate(e.target.value)}
                            value={deliveryDate}
                            className='form-control'
                        />
                    </div>
                    <button type='submit' onClick={onSubmitClick} disabled={!isFormValid} className='btn btn-primary'>{isSubmitting ? 'Submitting...' : 'Submit order'}</button>
                </div>

                <LivePreview
                    baseFlavor={baseFlavor}
                    selectedToppings={selectedToppings}
                    specialRequests={specialRequests}
                    quantity={quantity}
                    deliveryDate={deliveryDate}
                    total={calculateTotal()}
                />
            </div>
        </>
    );
}

export default Order;