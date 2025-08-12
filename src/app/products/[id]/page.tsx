// app/products/[id]/page.tsx
import type { Product } from "@/types/product";
import ProductCard from "@/app/products/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDel from "../ProductDel";


type PageProps = {
   params: Promise<{ id: string }>; //상위버전에서 Promise 로 변경되어 나옴
  //products/123 -> params.id === "123"
};

async function getProduct(id: string): Promise<Product | null> {
  // 상세 API가 있는 경우: /api/products/[id]
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) return null;
  const data = await res.json();
  return (data.product as Product) ?? null;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params; 
  //const { id } = use(params) ; // 클라우드 경우
  const product = await getProduct(id);

 
  if (!product) return notFound();

  return (
    <div className="w-full min-h-screen p-8">
      {/* 상단 바 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">상품 상세</h1>
        <div className="flex gap-2">
            
            <Link
              href={`/products/${id}/edit`} className="px-4 py-2 bg-blue-500 text-white rounded
                                        hover:bg-blue-800 transition">
              수정
            </Link>
            
            <ProductDel id={product.id} label="삭제" className="cursor-pointer"/>

            <Link
              href="/products" className="px-4 py-2 bg-slate-700 text-white rounded
                                        hover:bg-slate-800 transition">
              목록으로
            </Link>
          </div>
      </div>
       <ProductCard product={product} />
      {/* 카드 */}
      {/* <div className="max-w-3xl border rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <div className="text-right text-blue-600 font-bold text-lg">
          {product.price.toLocaleString()}원
        </div>
      </div> */}
    </div>
  );
}