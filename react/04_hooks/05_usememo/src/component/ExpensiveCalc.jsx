// export default function ExpensiveCalculation    

// import { useState } from "react";

// export default function ExpensiveCalculation() {
//   const [search, setSearch] = useState("");
//   const [counter, setCounter] = useState(0);

//   const products = Array.from({ length: 10000 }, (_, i) => i);

//   function sortProducts() {
//     console.log("Sorting products...");
//     return products.sort((a, b) => b - a);
//   }

//   const sortedProducts = sortProducts();

//   return (
//     <>
//       <input
//         placeholder="Search"
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <button onClick={() => setCounter(counter + 1)}>
//         Click {counter}
//       </button>

//       <p>Products: {sortedProducts.length}</p>
//     </>
//   );
// }


import { useState, useMemo } from "react";

export default function ExpensiveCalculation() {
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);

  const products = Array.from({ length: 10000 }, (_, i) => i);

  function sortProducts() {
    console.log("Sorting products...");
    return products.sort((a, b) => b - a);
  }

  // useMemo caches the sorted result
  const sortedProducts = useMemo(() => {
    return sortProducts();
  }, []);

  return (
    <>
      <input
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setCounter(counter + 1)}>
        Click {counter}
      </button>

      <p>Products: {sortedProducts.length}</p>
    </>
  );
}