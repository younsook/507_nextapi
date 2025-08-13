'use client'
import type { Product } from "@/types/product";
import { useActionState } from "react";
import type { FormStatus } from "../actions";
import { createProductAction, updateProductAction } from "../actions";

interface ProductFormProps {
  //product가 있으면 수정모드 없으면 입력모드
  product?: Product;

}

export default function ProductForm({product} : ProductFormProps) {
  const isEditMode = product != null;

  const actionUse = isEditMode ? updateProductAction : createProductAction;
  const initState : FormStatus = {message : ''};
  const [status, formAction] = useActionState(actionUse, initState);

  return (
    <div>

<form action={formAction} className="space-y-6">
    {isEditMode && <input type="hidden" name="id" value={product.id}/>}
      {/* 그리드: 제품명, 카테고리, 가격, 설명 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 제품명 */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium">
            제품명
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={product?.name ?? ''}
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
            id="category"
            name="category"
            type="text"
            defaultValue={product?.category ?? ''}
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
            id="price"
            name="price"
            type="number"
            defaultValue={product?.price ?? ''}
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
            id="description"
            name="description"
            type="text"
            defaultValue={product?.description ?? ''}
            className="border rounded px-3 py-2"
            placeholder="설명을 입력하세요"
          />
        </div>
      </div>

      {/* 버튼 영역 - 폼 가운데 위치, 내부에서 오른쪽 정렬 */}
      <div className="flex justify-center">
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
      </div>
    </form>

    </div>
  );
}