// import { useState } from "react";

// function Cart() {

//   const [items, setItems] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   function addItem(product) {
//     setItems([...items, { ...product, quantity: 1 }]);
//   }

//   function removeItem(id) {
//     setItems(items.filter(item => item.id !== id));
//   }

//   function updateQuantity(id, qty) {
//     setItems(
//       items.map(item =>
//         item.id === id ? { ...item, quantity: qty } : item
//       )
//     );
//   }

//   function applyDiscount(value) {
//     setDiscount(value);
//   }

//   function clearCart() {
//     setItems([]);
//     setDiscount(0);
//   }

//   function checkout() {

//     setLoading(true);
//     setError("");

//     setTimeout(() => {
//       const success = Math.random() > 0.3;

//       if(success){
//         clearCart();
//         setLoading(false);
//         alert("Order placed");
//       }else{
//         setLoading(false);
//         setError("Payment failed");
//       }

//     },2000);
//   }

//   return (
//     <>
//       <button onClick={()=>addItem({id:1,name:"Laptop",price:1000})}>
//         Add Laptop
//       </button>

//       <button onClick={()=>applyDiscount(10)}>
//         Apply 10% Discount
//       </button>

//       <button onClick={checkout}>
//         {loading ? "Processing..." : "Checkout"}
//       </button>

//       {error && <p>{error}</p>}

//       <ul>
//         {items.map(item=>(
//           <li key={item.id}>
//             {item.name} ({item.quantity})
//             <button onClick={()=>removeItem(item.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default Cart;

function cartReducer(state, action) {

  switch(action.type){

    case "ADD_ITEM":
      return {
        ...state,
        items:[...state.items,{...action.payload,quantity:1}]
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items:state.items.filter(i=>i.id!==action.payload)
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items:state.items.map(i =>
          i.id===action.payload.id
            ? {...i,quantity:action.payload.qty}
            : i
        )
      };

    case "APPLY_DISCOUNT":
      return {
        ...state,
        discount:action.payload
      };

    case "CLEAR_CART":
      return {
        ...state,
        items:[],
        discount:0
      };

    case "CHECKOUT_START":
      return {
        ...state,
        loading:true,
        error:""
      };

    case "CHECKOUT_SUCCESS":
      return {
        ...state,
        loading:false,
        items:[],
        discount:0
      };

    case "CHECKOUT_ERROR":
      return {
        ...state,
        loading:false,
        error:action.payload
      };

    default:
      return state;
  }

}

import { useReducer } from "react";

const initialState = {
  items:[],
  discount:0,
  loading:false,
  error:""
};

function Cart(){

  const [state,dispatch] = useReducer(cartReducer,initialState);

  function checkout(){

    dispatch({type:"CHECKOUT_START"});

    setTimeout(()=>{

      const success = Math.random()>0.3;

      if(success){
        dispatch({type:"CHECKOUT_SUCCESS"});
        alert("Order placed");
      }else{
        dispatch({
          type:"CHECKOUT_ERROR",
          payload:"Payment failed"
        });
      }

    },2000);

  }

  return(

    <>
      <button
        onClick={()=>
          dispatch({
            type:"ADD_ITEM",
            payload:{id:1,name:"Laptop",price:1000}
          })
        }
      >
        Add Laptop
      </button>

      <button
        onClick={()=>dispatch({type:"APPLY_DISCOUNT",payload:10})}
      >
        Apply 10% Discount
      </button>

      <button onClick={checkout}>
        {state.loading ? "Processing..." : "Checkout"}
      </button>

      {state.error && <p>{state.error}</p>}

      <ul>
        {state.items.map(item=>(
          <li key={item.id}>
            {item.name} ({item.quantity})

            <button
              onClick={()=>
                dispatch({type:"REMOVE_ITEM",payload:item.id})
              }
            >
              Remove
            </button>

          </li>
        ))}
      </ul>

    </>
  );

}

export default Cart;