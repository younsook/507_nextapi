'use client'

//import reactLogo from '../assets/react.svg'
import Image from 'next/image';
//import { Link, useNavigate } from 'react-router-dom'
//nextjs의 Link 사용 : href속성 사용 
import Link from 'next/link';
//useNavigate -> useRouter : next/navigation의 useRouter
import { useRouter } from 'next/navigation';
//import { useAtom } from 'jotai'
//import { isLogin } from '@/atoms/IsLoginAtom'

export default function Nav() {
//  const [login, seLogin] = useAtom(isLogin) ;
  //const navigator = useNavigate() ;
  const router = useRouter();
  // const handleLogout = () => {
  //   seLogin(false) ;
  //   localStorage.removeItem("id") ;
  //   //navigator("/");
  //   router.push("/");
  // }
  
  return (
    <header className="w-full min-h-20 
                         bg-green-50
                         flex justify-between items-center">
        <div className="flex ml-10">
          {/* <img src={reactLogo} alt="react" /> + 
          <img src="/vite.svg" alt="vite" /> */}
          <Image src="/img/react.svg" width={40} height={40} alt="react" /> + 
          <Image src="/next.svg" width={60} height={60} alt="nextjs" />
        </div>
        <div className='text-sm font-bold text-green-800'>
          <ul className='flex justify-center items-center'>
          <Link href="/" >
            <li className='p-4 rounded-lg hover:bg-green-800 hover:text-white'>
              홈으로
            </li>
          </Link>
          { <Link href="/clock" >
           {/* { login && <Link href="/clock" > */}
            {/* <li className='p-4 rounded-lg hover:bg-green-800 hover:text-white'>
              시계
            </li> */}
          </Link>
          }
           { <Link href="/lotto" >
          {/* { login && <Link href="/lotto" > */}
            {/* <li className='p-4 rounded-lg hover:bg-green-800 hover:text-white'>
              로또
            </li> */}
          </Link>
          }
           { <Link href="/clock" >
          {/* { login && <Link href="/food" > */}
            {/* <li className='p-4 rounded-lg hover:bg-green-800 hover:text-white'>
              푸드뱅크 
            </li> */}
          </Link>
          }
           { <Link href="/subway" >
          {/* { login && <Link href="/subway"> */}
            {/* <li className='p-4 rounded-lg hover:bg-green-800  hover:text-white'>
              지하철 대기정보
            </li> */}
          </Link> }
           { <Link href="/todo" >
          {/* { login && <Link href="/todo"> */}
            {/* <li className='p-4 rounded-lg hover:bg-green-800  hover:text-white'>
              할일목록
            </li> */}
          </Link> }
           { <Link href="/products" >
          {/* { login && <Link href="/productlist"> */}
            <li className='p-4 rounded-lg hover:bg-green-800  hover:text-white'>
              상품목록
            </li>
          </Link> }
          </ul>
        </div>
        <div className='mr-10 text-sm font-bold p-3 text-green-900
                        border border-green-700 rounded-xl'>
          {/* { login ? 
            <span   className='cursor-pointer'
                    onClick={handleLogout}>로그아웃</span> 
            : <Link href="/">로그인</Link> } */}
        </div>
      </header>
  )
}