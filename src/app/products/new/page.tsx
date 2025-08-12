import Link from "next/link";
import ProductForm from "../ProductForm";

export default async function NewProduct() {
  return (
   <div className="w-full min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">상품 추가</h1>
        <div className="flex gap-2">

                <Link
                href="/products" className="px-4 py-2 bg-blue-500 text-white rounded 
                                    hover:bg-blue-600 transition">
                상품 목록
                </Link>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}