'use client'
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
//import { useSearchParams } from "next/navigation";

type helloT = {
  msg : string
}
export default function Hello() {
  const [tdata, setTdata] = useState<helloT[]|null>(null);
  //클라이언트 컴포넌트에서 쿼리스트링 추출
  // const searchParams = useSearchParams();
  // const msg = searchParams.get('msg');
  // console.log(msg)



  const getFetchData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const resp = await fetch(`${baseUrl}/api/hello`);
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