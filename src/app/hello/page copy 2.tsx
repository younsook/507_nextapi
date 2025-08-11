'use client'
import { useState, useEffect } from "react";

export default function Hello() {
  const [msg, setMsg] = useState<string | null>(null);
  const getFetchData = async () => {
    const resp = await fetch('http://localhost:3000/api/hello');
    const data = await resp.json();
    setMsg(data.msg);
  }

  useEffect(()=>{
    getFetchData()
  }, [])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold p-5">
      {msg}
      </h1>
      <p className="text-green-600">
        
      </p>
    </div>
  );
}