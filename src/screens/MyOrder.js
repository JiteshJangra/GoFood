import React, { useState ,useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
    const [orderData, setOrderData] =useState("");
    
    const fetchMyOrder = async ()=>{
      const res = await fetch( "http://localhost:5000/api/myOrderData",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:localStorage.getItem('userEmail')
        })
      }).then(async (res)=>{
        let response = await res.json()
        
        await setOrderData(response)
        
      })

        
      }
      // console.log(orderData)
      // console.log(Object.keys(orderData).length)
      
    
    useEffect(()=>{
      fetchMyOrder()
    },[])
  return (
    <>
      <div> <Navbar/></div>
      <div className='container fs-1 text-center mt-5'>Order History</div>
        <div className='container'>
            <div className='row'>
                {
                    Object.keys(orderData).length!==0 ? Array(orderData).map(data =>{
                        return (
                            data.orderData ?
                              //console.log(data.OrderData)
                                data.orderData.order_data.slice(0).reverse().map((item)=>{
                                  return( 
                                    item.map((arrayData)=>{
                                      return ( 
                                        <div>
                                          { arrayData.Order_date ? 
                                            <div className='m-auto mt-5 fs-3 text-success'>
                                              {data = arrayData.Order_date}
                                            <hr />

                                          </div> :
                                          <div className='col-12 col-md-8 col-lg-3 '>
                                            <div className='card mt-3' style={{width:"18rem",maxHeigth:"360px"}}>
                                              {/* <img src={arrayData.img} className='card-img-top' alt='...' style={{height: "120px", objectFit: "fill"}}/> */}
                                              <div className="card-body ">
                                                                    <h5 className="card-title text-danger">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-3' style={{ height: "80px" }}>
                                                                        <span className='m-1 '>{arrayData.qty}</span>
                                                                        <span className='m-1 '>{arrayData.size}</span>
                                                                        <span className='ms-2 '>{data}</span>
                                                                        <div className=' d-block ms-1 h-100 w-20 fs-4 text-warning' >
                                                                            ₹ {arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                </div>
                                              </div>
                                              }
                                        </div>
                                      )
                                    })
                                  )
                                }):<div>No order data</div>
                        )
                    }):<div>No orders</div>
                }
            </div>
        </div>
      <div><Footer/></div>

    </>
  );
}
