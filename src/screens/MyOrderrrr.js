import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState("");

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        console.log(email);
        
        try {
            const res = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:email })
            });

            const response = await res.json();
            
            setOrderData(response.orderData);
            console.log( response)
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {Object.keys(orderData)!==0 ? Array(orderData).map((data, index) => {
                        return (
                            data.order_data ?
                                data.order_data.slice(0).reverse().map((item, idx) => {
                                    return (
                                        <div key={`${index}-${idx}`}>
                                            {item[0].Order_date ? (
                                                <div className='m-auto mt-5'>
                                                    {item[0].Order_date}
                                                    <hr />
                                                </div>
                                            ) : null}
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                {item.map((arrayData, arrayIndex) => (
                                                    <div key={arrayIndex} className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img src={arrayData.img} className="card-img-top" alt={arrayData.name} style={{ height: "120px", objectFit: "fill" }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{arrayData.qty}</span>
                                                                <span className='m-1'>{arrayData.size}</span>
                                                                <span className='m-1'>{item[0].Order_date}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }) : null
                        );
                    }) : <div>No Orders Found</div>}
                </div>
            </div>

            <Footer />
        </div>
    );
}
