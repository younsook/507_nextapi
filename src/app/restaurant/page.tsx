// src/app/restaurant/FoodPage.tsx
"use client";
import { useEffect, useState } from "react";
import FoodGrid from "@/components/FoodGrid";
import type { FoodItem } from "@/types/food";

type ApiResponse = {
  getFoodKr?: {
    header?: { code: string; message: string };
    item?: FoodItem[];
    items?: { item?: FoodItem[] };
  };
};

const PAGE_SIZE = 12;

export default function FoodPage() {
    const [tdata, setTdata] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pageNo, setPageNo] = useState(1);     // 현재 페이지
    const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터 여부

  // 공공데이터 한 페이지 가져오기
  const fetchPage = async (page: number) => {
    const base = "https://apis.data.go.kr/6260000/FoodService/getFoodKr?";
    const encodedKey = process.env.NEXT_PUBLIC_API!; // 이미 % 인코딩된 키
    const qs = new URLSearchParams({
      pageNo: String(page),
      numOfRows: String(PAGE_SIZE),
      resultType: "json",
    });
    const url = `${base}serviceKey=${encodedKey}&${qs.toString()}`;

    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 180)}`);
    if (/^\s*</.test(text)) {
      throw new Error(`JSON이 아니라 HTML 응답으로 보입니다. 일부: ${text.slice(0, 180)}...`);
    }

    const data: ApiResponse = JSON.parse(text);
    const header = data.getFoodKr?.header;
    if (header && header.code !== "00") {
      throw new Error(`API 오류: [${header.code}] ${header.message}`);
    }
    const list = data.getFoodKr?.item ?? data.getFoodKr?.items?.item ?? [];
    return Array.isArray(list) ? list : [];
  };

  // ⭐ initData: 첫 페이지 로드(스샷 왼쪽)
  const initData = async () => {
    if (!hasMore) return;
    setLoading(true);
    setError("");
    try {
      const rows = await fetchPage(1);
      setTdata(rows);
      setPageNo(2);                    // 다음 호출은 2페이지부터
      setHasMore(rows.length === PAGE_SIZE); // 한 페이지 꽉 차면 아직 더 있음
    } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
        setHasMore(false);
    } finally {
        setLoading(false);
    }
  };

  // getData: 더보기
  const getData = async () => {
    if (!hasMore || loading) return;
        setLoading(true);
    setError("");
    try {
      const rows = await fetchPage(pageNo);
      setTdata(prev => [...prev, ...rows]); // 뒤에 이어붙임
        setPageNo(prev => prev + 1);
        setHasMore(rows.length === PAGE_SIZE);
    } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
        setHasMore(false);
    } finally {
        setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (item: FoodItem) => {
    window.open(item.MAIN_IMG_THUMB, "_blank");
  };

  return (
    <div className="w-11/12 mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">부산 맛집 리스트</h2>
        <div className="flex gap-2">
          <button
            onClick={initData} // 전체 초기화/새로고침
            className="px-3 py-2 rounded border hover:bg-gray-50"
          >
            새로고침
          </button>
        </div>
      </div>

      {loading && tdata.length === 0 && <div>로딩 중…</div>}
      {error && <div className="text-red-500">오류: {error}</div>}

      {!error && (
        <>
          <FoodGrid items={tdata} onCardClick={handleCardClick} />

          {/* 스샷의 '더보기' 버튼 영역 */}
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={getData}
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
              >
                {loading ? "로딩 중…" : "더보기"}
              </button>
            </div>
          )}
          {!hasMore && tdata.length > 0 && (
            <div className="text-center text-sm text-gray-500 mt-4">
              더 불러올 데이터가 없습니다.
            </div>
          )}
        </>
      )}
    </div>
  );
}
