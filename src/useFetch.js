// import { useEffect, useState } from 'react';


// const useFetch = (url) =>{
//     const [tasks, setTask] = useState(null);
//     const [ispending,setIsPending] = useState(true);
//     const [error,setError] = useState(null);

//     useEffect(()=>{
//         const abortCont = new AbortController();

//         setTimeout(()=>{
//          fetch(url,{ signal:abortCont.signal })
//          .then(res=>{
//            if(!res.ok){
//              throw Error('Could not fetch the data for that resourse');
//            }
//            return res.json();
//          })
//          .then(data => {
//            console.log(data);
//            setTask(data);
//            setIsPending(false);
//          })
//          .catch(err=>{
//           if(err.name === 'AbortError'){
//             console.log('fetch aborted')
//           }else{
//             setIsPending(false);
//             setError(err.message);
//           }
//          })
//         },1000);

//         return () => abortCont.abort();
//         //whenever wr chnage the route before loading then fetching is taking place in the backend , however this statement aborts the fetching once its landed to different page 
//        },[url]);//whenever the url changes then it is going to re-run to get the data

//        return {tasks,ispending,error}
// }

// export default useFetch;

import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
