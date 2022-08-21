/**
 * @version 1.0.0
 * @author [Shubham Salunkhe](https://github.com/shubhamsalunkhe16/useFetch_react_custom_hook)
 * 
 * This is how useFetch is used to fetch data
 * get its loading and error status
 * cache data
 * refetch(sync) data
 * 
 */


import { useState } from "react";
import "./styles.css";
import { useFetch } from "./useFetch";

export default function App() {
  const [url, setUrl] = useState("");
  const { loading, error, data, setShouldRefetch } = useFetch(
    url,
    { method: "GET" },
    false
  );
  return (
    <div className="App">
      <h1>useFetch Hook</h1>
      {loading && <h4>Loading....</h4>}
      {error && <h4>Error !!!!{error}</h4>}
      {Object.keys(data).length !== 0 && <h3>{data.title}</h3>}
      <button
        onClick={() => setUrl("https://jsonplaceholder.typicode.com/todos/1")}
      >
        get 1
      </button>
      <button
        onClick={() => setUrl("https://jsonplaceholder.typicode.com/todos/2")}
      >
        get 2
      </button>
      <button
        onClick={() => setUrl("https://jsonplaceholder.typicode.com/todos/3")}
      >
        get 3
      </button>

      <button
        onClick={() => {
          setUrl("https://jsonplaceholder.typicode.com/todos/1");
          setShouldRefetch({});
        }}
      >
        refetch 1
      </button>
    </div>
  );
}
