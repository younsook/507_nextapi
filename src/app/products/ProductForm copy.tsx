'use client'
import type { Product } from "@/types/product";
import { useActionState } from "react";
import type { FormStatus } from "@/app/actions";
import { createProductAction, updateProductAction } from "@/app/actions";
import SubmitButton from "@/app/products/SubmitButton";

interface ProductFormProps {
  //product가 있으면 수정모드 없으면 입력모드
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  //수정인지 입력인지 구분 
  const isEditMode = product != null;

  //useActionstate 설정
  // React의 새로운 훅(Hook)
  // 서버 액션(Server Action)의 결과와 대기 상태(pending state)를 손쉽게 관리하기 위해 사용
  // 폼의 제출 상태(pending)와 함께 서버 액션이 반환하는 결과(state)까지 처리해야 할 때 사용
  // <form> 태그를 감싸는 상위 컴포넌트에서 사용하여 액션 함수와 상태를 직접 관리
  const actionUse = isEditMode ? updateProductAction : createProductAction ;
  const initState : FormStatus = { message : ''} ;
  const [, formAction] = useActionState( actionUse, initState) ;

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {isEditMode && <input type="hidden" name="id" value={product.id} />}
        <div className="p-4">
          <label htmlFor="name"
            className="text-gray-900 mr-2">제품명</label>
          <input type="text"
            id="name"
            name="name"
            required
            defaultValue={isEditMode ? product.name : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="p-4">
          <label htmlFor="category"
            className="text-gray-900 mr-2">카테고리</label>
          <input type="text"
            id="category"
            name="category"
            required
            defaultValue={isEditMode ? product.category : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="p-4">
          <label htmlFor="price"
            className="text-gray-900 mr-2">가격</label>
          <input type="text"
            id="price"
            name="price"
            required
            defaultValue={isEditMode ? product.price : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="p-4">
          <label htmlFor="description"
            className="text-gray-900 mr-2">설명</label>
          <input type="text"
            id="description"
            name="description"
            required
            defaultValue={isEditMode ? product.description : ""}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div className="w-full text-right md:col-span-2 lg:col-span-4">
          <SubmitButton isEditMode={isEditMode} />
        </div>
      </form>
    </div>
  );
}