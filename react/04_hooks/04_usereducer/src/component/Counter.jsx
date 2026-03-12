// import { useState } from "react";

// function Counter() {

//   const [count, setCount] = useState(0);
//   const [step, setStep] = useState(1);

//   function increment() {
//     setCount(count + step);
//   }

//   function decrement() {
//     setCount(count - step);
//   }

//   function reset() {
//     setCount(0);
//   }

//   return (
//     <>
//       <h2>{count}</h2>

//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <button onClick={reset}>Reset</button>

//       <input
//         type="number"
//         value={step}
//         onChange={(e)=>setStep(Number(e.target.value))}
//       />
//     </>
//   );
// }

// export default Counter;



import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1
};

const actions = {
  increment: (state) => ({
    ...state,
    count: state.count + state.step
  }),

  decrement: (state) => ({
    ...state,
    count: state.count - state.step
  }),

  reset: (state) => ({
    ...state,
    count: 0
  }),

  setStep: (state, action) => ({
    ...state,
    step: action.value
  })
};

function reducer(state, action) {
  return actions[action.type]
    ? actions[action.type](state, action)
    : state;
}

function Counter() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>{state.count}</h2>

      <button onClick={()=>dispatch({type:"increment"})}>
        +
      </button>

      <button onClick={()=>dispatch({type:"decrement"})}>
        -
      </button>

      <button onClick={()=>dispatch({type:"reset"})}>
        Reset
      </button>

      <input
        type="number"
        value={state.step}
        onChange={(e)=>
          dispatch({
            type:"setStep",
            value:Number(e.target.value)
          })
        }
      />
    </>
  );
}

export default Counter;