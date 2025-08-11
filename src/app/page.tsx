'use client'
//import { useAtom } from "jotai"
//import { isLogin } from "../atoms/IsLoginAtom"
//import Login from "@/components/Login";
import { useEffect, useState } from "react"
//기본 페이지 app/page.tsx

export default function Home() {
  //const [ login,  ] = useAtom(isLogin) ;
  const [id, setId] = useState("")

  useEffect(() => {
    const storedId = localStorage.getItem("id")
    if (storedId) setId(storedId)
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-2xl font-bold">
                기본페이지 app/page.tsx
                </h1> 
      {/* { login ? <h1 className="text-2xl font-bold">
                 {id} 로그인되었습니다.
                </h1> 
              : <Login />} */}
    {/* {id
        ? <h1 className="text-2xl font-bold">{id} 님, 로그인되었습니다.</h1>
        : <Login onLogin={(loginId) => {
            localStorage.setItem("id", loginId);
            setId(loginId);
          }} />
      }               */}
      
    </div>
  )
}