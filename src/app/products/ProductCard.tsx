// app/products/[id]/page.tsx
import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
};

// async function getProduct(id: string): Promise<Product | null> {
//   // 상세 API가 있는 경우: /api/products/[id]
//   const base = process.env.NEXT_PUBLIC_BASE_URL;
//   if (!base) {
//     throw new Error("NEXT_PUBLIC_BASE_URL is not set");
//   }
//   const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
//   if (!res.ok) return null;

//   const data = await res.json();
//   return data.product;
// }

export default function ProductCard({ product }: ProductCardProps) {
 
  return (
    <div >
      {/* 카드 */}
      <div className="max-w-3xl border rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="text-gray-700">{product.description}</p>
        <div className="text-right text-blue-600 font-bold text-lg">
          {product.price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}