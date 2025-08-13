'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

//import {deleteProductAction } from "../actions";
interface ProductDelProps {
  id : string;
  label?: string;    
  className?: string; 
}

export default  function ProductDel({
  id,
  label = '삭제',
  className,
}:ProductDelProps) {
  const router = useRouter();

  const handleDelete = async() => {
    if(confirm("이상품을 삭제하시겠습니까?")){
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      });

        if(res.ok) {
          alert("정상적으로 삭제되었습니다.");
          router.push("/products")
          router.refresh();
        }else {
          const data = await res.json();
          alert(`삭제오류 : ${data.messgae || '알수없는오류'}`)
        }
    }
  }
  return (
    <div className="flex justify-end">
      <button
      type="button"
      onClick={handleDelete}
      className={`px-4 py-2 bg-red-600 text-white rounded 
                hover:bg-red-700 transition disabled:opacity-50 cursor-pointer ${className ?? ''}`} >
      삭제
    </button>
    </div>
  );
}