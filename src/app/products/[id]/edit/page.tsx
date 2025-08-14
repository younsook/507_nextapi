import Link from "next/link";
import ProductForm from "@/app/products/ProductForm";
import type { Product } from "@/types/product";

async function getProduct(id: string): Promise<Product> {
  // 상세 API가 있는 경우: /api/products/[id]
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
  // if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const resp = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });
  //if (!resp.ok) throw new Error('Fetch Error') ;
  
  //return resp.json() ;

  if (!resp.ok) throw new Error('Fetch Error');

  const data = (await resp.json()) as any;
  const p = data?.product ?? data; // ← { product: {...} }든 {...}든 언래핑

  // ← 여기서 반드시 반환!
  return {
    id: String(p.id),
    name: String(p.name ?? ""),
    category: String(p.category ?? ""),
    description: String(p.description ?? ""),
    price: Number(p.price ?? 0),
  };
}


export default async function EditProduct ({ 
    params 
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params; 
    const product = await getProduct(id);
  return (
    // 상품 상세 > 상품 수정
   <div className="w-full min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
            상품 수정 {product.id}:{product.name}
        </h1>
        <div className="flex gap-2">

                <Link
                href="/products" className="px-4 py-2 bg-blue-500 text-white rounded 
                                    hover:bg-blue-600 transition">
                상품 목록
                </Link>
        </div>
      </div>
        {/* 수정 모드 */}
      <ProductForm product={product}/>
    </div>
  );
}