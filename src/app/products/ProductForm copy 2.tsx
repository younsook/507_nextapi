'use client'
import type { Product } from "@/types/product";
import { useActionState, useEffect, useState } from "react";
import type { FormStatus } from "../actions";
import { createProductAction, updateProductAction } from "../actions";
import SubmitButton from "@/app/products/SubmitButton";

interface ProductFormProps {
  //product가 있으면 수정모드 없으면 입력모드
  product?: Product;

}

export default function ProductForm({product} : ProductFormProps) {
  //수정인지 입력인지 구분 
  const isEditMode = product != null;
  //useActionstate 설정
  // React의 새로운 훅(Hook)
  // 서버 액션(Server Action)의 결과와 대기 상태(pending state)를 손쉽게 관리하기 위해 사용
  // 폼의 제출 상태(pending)와 함께 서버 액션이 반환하는 결과(state)까지 처리해야 할 때 사용
  // <form> 태그를 감싸는 상위 컴포넌트에서 사용하여 액션 함수와 상태를 직접 관리
  const actionUse = isEditMode ? updateProductAction : createProductAction;
  const initState : FormStatus = {message : ''};
  const [status, formAction] = useActionState(actionUse, initState);


  //  // 최초 마운트/언마운트 로그
  // useEffect(() => {
  //   console.log('[ProductForm] mounted');
  //   return () => console.log('[ProductForm] unmounted');
  // }, []);

  // product가 바뀔 때만 상세 로그
  useEffect(() => {
    console.log('[ProductForm] product updated', {
      isEditMode,
      product,
      id: product?.id,
      name: product?.name,
      category: product?.category,
      price: product?.price,
      types: { price: typeof product?.price }
    });
  }, [product?.id]); // id 기준으로 변경 감지

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(''); // 문자열로
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(product?.name ?? '');
    setCategory(product?.category ?? '');
    setPrice(product?.price != null ? String(product.price) : '');
    setDescription(product?.description ?? '');
  }, [product?.id]); // id 바뀔 때만 초기화

  return (
    <div>

<form key={product ? `edit-${String(product.id)}` : 'create'}
  action={formAction} className="space-y-6">
    {isEditMode && <input type="hidden" name="id" value={product.id}/>}
      {/* 그리드: 제품명, 카테고리, 가격, 설명 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 제품명 */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium">
            제품명 
                    {/* 수정 모드면 이름 표시, 아니면 새 상품 */}
                    <span className="ml-2 text-gray-500">
                      {isEditMode ? (product?.name ?? '(이름 없음)') : '(새 상품)'}
                    </span>
          </label>
          <input
          key={`name-${product ? String(product.id) : 'new'}`}
            id="name"
            name="name"
            type="text"
            defaultValue={product?.name ?? ''}
            //defaultValue={isEditMode ? product.name : ""}
            className="border rounded px-3 py-2"
            placeholder="제품명을 입력하세요"
          />
         
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 text-sm font-medium">
            카테고리
          </label>
          <input
          key={`category-${product ? product.id : 'new'}`}
            id="category"
            name="category"
            type="text"
            defaultValue={product?.category ?? ''}
//            defaultValue={isEditMode ? product.category : ""}
            className="border rounded px-3 py-2"
            placeholder="카테고리를 입력하세요"
          />
        </div>

        {/* 가격 */}
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 text-sm font-medium">
            가격
          </label>
          <input
          key={`price-${product ? product.id : 'new'}`}
            id="price"
            name="price"
            type="number"
            defaultValue={isEditMode ? product.price : ""}
            className="border rounded px-3 py-2"
            placeholder="가격을 입력하세요"
          />
        </div>

        {/* 설명 */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-sm font-medium">
            설명
          </label>
          <input
          key={`description-${product ? product.id : 'new'}`}
            id="description"
            name="description"
            type="text"
            defaultValue={product?.description ?? ''} 
            //defaultValue={isEditMode ? product.description : ""}
            className="border rounded px-3 py-2"
            placeholder="설명을 입력하세요"
          />
        </div>
      </div>
     <div className="w-full text-right md:col-span-2 lg:col-span-4">
          <SubmitButton isEditMode={isEditMode} />
        </div>
      {/* 버튼 영역 - 폼 가운데 위치, 내부에서 오른쪽 정렬 */}
      {/* <div className="flex justify-center">
        <div className="w-full max-w-4xl flex justify-end gap-3">
          {!isEditMode && (
            <button
              type="submit"
              className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700">
              상품 추가
            </button>
          )}
          {isEditMode && (
            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              상품 수정
            </button>
          )}
        </div>
      </div> */}
    </form>

    </div>
  );
}