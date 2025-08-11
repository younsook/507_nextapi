'use client'
import { useState, useEffect } from "react";

type helloT = {
  msg : string
}
export default function Hello() {
  const [tdata, setTdata] = useState<helloT[]|null>(null);
  const getFetchData = async () => {
    const resp = await fetch('http://localhost:3000/api/hello');
    const data = await resp.json();
    setTdata(data);
  }

  useEffect(()=>{
    getFetchData()
  }, [])

  useEffect(()=>{
 
  }, [tdata])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold p-5">
      {tdata && tdata.map(
        (item:helloT) =>
        <div key={item.msg}>
          {item.msg}
        </div> 
        )
        }
      </h1>
      <p className="text-green-600">
        
      </p>
    </div>
  );
}