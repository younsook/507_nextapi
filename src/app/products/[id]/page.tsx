// app/products/[id]/page.tsx
import type { Product } from "@/app/types/product";

import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
   params: Promise<{ id: string }>;
  //params: { id: string }; 
  // /products/123 -> params.id === "123"
};

async function getProduct(id: string): Promise<Product | null> {
  // 상세 API가 있다고 가정: /api/products/[id]
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) return null;
  const data = await res.json();
  return (data.product as Product) ?? null;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params; 
  const product = await getProduct(id);
  //const product = await getProduct(params.id);
  if (!product) return notFound();

  return (
    <div className="w-full min-h-screen p-8">
      {/* 상단 바 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">상품 상세</h1>
        <Link
          href="/products"
          className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 transition"
        >
          목록으로
        </Link>
      </div>

      {/* 카드 */}
      <div className="max-w-3xl border rounded-xl p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <div className="text-right text-blue-600 font-bold text-lg">
          {product.price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
