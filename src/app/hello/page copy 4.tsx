//'use client'
//import { useSearchParams } from "next/navigation";
//import { useState, useEffect } from "react";
//import { useSearchParams } from "next/navigation";

type helloT = {
  msg : string
}

//서버컴포넌트  {cache: 'no-store'} 필요 
async function getFetchData() : Promise<helloT[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const res = await fetch(`${baseUrl}/api/hello`, {cache: 'no-store'});
    if(!res.ok) {
        throw new Error('fetch error');
    }
    const data = await res.json();
    return data; 
}


// 서버컴포넌트에는 async 붙이기
export default async function Hello() {
  const tdata = await getFetchData();
  //클라이언트 컴포넌트에서 쿼리스트링 추출
  // const searchParams = useSearchParams();
  // const msg = searchParams.get('msg');f
  // console.log(msg)



  // const getFetchData = async () => {
  //   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  //   const resp = await fetch(`${baseUrl}/api/hello`);
  //   const data = await resp.json();
  //   setTdata(data);
  // }

  // useEffect(()=>{
  //   getFetchData()
  // }, [])

  // useEffect(()=>{
 
  // }, [tdata])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold p-5">
      {tdata.map(item=>
        <div key={item.msg}>{item.msg}</div> 
        )
        }
      </h1>
      <p className="text-green-600">
        
      </p>
    </div>
  );
}