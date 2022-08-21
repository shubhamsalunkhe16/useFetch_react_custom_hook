import { useEffect, useRef, useReducer, useState } from "react";

/**
 * @version 1.0.0
 * @author [Shubham Salunkhe](https://github.com/shubhamsalunkhe16/useFetch_react_custom_hook)
 * 
 * useFetch is used to fetch data
 * get its loading and error status
 * cache data
 * refetch(sync) data
 * 
 */

export const useFetch = (url, options = {}, cache = true) => {
  const cachedData = useRef({});
  const [shouldRefetch, setShouldRefetch] = useState({});

  const initialState = {
    loading: false,
    error: null,
    data: [],
    setShouldRefetch
  };

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, loading: true };
      case "FETCHED":
        return { ...initialState, loading: false, data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { ...options, signal: abortCtrl.signal };
    if (!url || !url.trim()) return;
    fetchData(opts, cache);
    return function cleanup() {
      abortCtrl.abort();
    };
  }, [url, shouldRefetch]);

  const fetchData = async (opts, cache) => {
    dispatch({ type: "FETCHING" });
    if (cachedData.current[url] && cache) {
      const data = cachedData.current[url];
      dispatch({ type: "FETCHED", payload: data });
    } else {
      try {
        const response = await fetch(url, opts);
        const data = await response.json();
        if (cache) {
          cachedData.current[url] = data;
        }
        dispatch({ type: "FETCHED", payload: data });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("request was cancelled");
          return;
        }
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    }
  };

  return state;
};
