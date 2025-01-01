import React, { useState , useRef, useEffect} from "react";
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOptions = Object.keys(options)

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const priceRef = useRef();
 
  
  
  

  const handleAddToCart = async () => {
    let food=[]
    for( const item of data){
      if( item.id === props.foodItem._id){
        food = item;
        break;
      }
    }
    if( food.length!==0 )
    {
      if( food.size.charAt(0).toUpperCase()+food.size.slice(1) === size.charAt(0).toUpperCase()+size.slice(1)){
            await dispatch({type:"UPDATE",
            id:props.foodItem._id,
            price:finalPrice, 
            qty:qty})
            return 
          }

      else if ( food.size!==size)
            {
              await dispatch({ type: "ADD", 
              id: props.foodItem._id, 
              name: props.foodItem.name, 
              price: finalPrice, 
              qty: qty, 
              size: size })
              return
            }
            return
    }

    await dispatch({ type: "ADD", 
      id: props.foodItem._id, 
      name: props.foodItem.name, 
      price: finalPrice, 
      qty: qty, 
      size: size })

    
  
  }
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[]);
  let finalPrice = qty * parseInt(options[size]);
 

  return (
    <div>
      <div className="card mt-3 " style={{ width: "18rem", maxHeight: "500px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="Food Item" style={{ height: "190px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className=" h-100 bg-dark text-white rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-dark text-white rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data => {
                  return <option key={data} value={data}>{data.charAt(0).toUpperCase() + data.slice(1)}</option>
                }))
              }
            </select>

            <div className='d-inline h-100 fs-6'>${finalPrice}/-</div>
          </div>
        </div>
        <hr />
        <button className='btn btn-success justify-center m-2' onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
}
