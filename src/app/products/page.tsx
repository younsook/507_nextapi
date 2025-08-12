import { promises } from "dns";
import type { Product } from "@/types/product";
import Link from "next/link";

async function getProducts() : Promise<Product[]> {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
   if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is not set');
    const res = await fetch(`${baseUrl}/api/products`, {cache: 'no-store'});

    if(!res.ok) {
        throw new Error('fetch error');
    }
    const data = await res.json();
  return data.products;
    
}
export default async function Products() {
     const products = await getProducts();
     console.log(products)
  return (
   
    <div className="w-full min-h-screen p-8">
      {/* 상단 제목 + 홈으로 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold"><Link href="/products">상품 목록</Link></h1>
        <div className="flex gap-2">
                <Link
                href="/" className="px-4 py-2 bg-amber-500 text-white rounded 
                                    hover:bg-amber-600 transition">
                상품추가
                </Link>
                <Link
                href="/" className="px-4 py-2 bg-blue-500 text-white rounded 
                                    hover:bg-blue-600 transition">
                홈으로
                </Link>
        </div>
      </div>

      {/* 상품 카드 영역 */}
      <div className="grid grid-cols-4 gap-4">
        {products.map((item: Product) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col justify-between shadow hover:shadow-lg transition"
          >
            <div>
              <h2 className="text-lg font-bold mb-2"><Link href={`/products/${item.id}`}>{item.name}</Link></h2>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
            </div>
            <div className="text-right text-blue-600 font-bold">
              {item.price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}