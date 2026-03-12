import React, { useRef, useState } from "react";

const SearchSuggetion = ()=>{

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const timerRef = useRef(null);

  const topics = [
    "React",
    "Redux",
    "React Router",
    "JavaScript",
    "Java",
    "Spring Boot",
    "NodeJS",
    "NextJS",
    "TypeScript",
    "MongoDB"
  ];

  const handelSearch = (e)=>{
    const value = e.target.value;
    setQuery(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(()=>{
        // console.log(1);
          const filtered = topics.filter(topic =>
        topic.toLowerCase().includes(value.toLowerCase())
      );

      setResults(filtered);
    }, 500)
  }
    return <>
    
    <input type="text"  
    onChange={handelSearch}
    value={query}/>
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

    </>
}

export default SearchSuggetion;