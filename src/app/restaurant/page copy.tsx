// src/pages/FoodPage.tsx
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

export default function FoodPage() {
    const [tdata, setTdata] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const getFetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const base = "https://apis.data.go.kr/6260000/FoodService/getFoodKr?";
            const encodedKey = process.env.NEXT_PUBLIC_API!;

            // serviceKey는 그대로 붙이고 나머지만 URLSearchParams로
            const qs = new URLSearchParams({
                pageNo: "1",
                numOfRows: "12",
                resultType: "json",
            });
            const url = `${base}serviceKey=${encodedKey}&${qs.toString()}`;

            const res = await fetch(url, { cache: "no-store" });
            const text = await res.text();
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${text.slice(0, 180)}`);
            }

            // 일부 공공데이터 API가 text/plain으로 내려주므로 직접 파싱
            // HTML(OpenAPI 문서 등)이면 '<'로 시작하는 경우가 많음
            if (/^\s*</.test(text)) {
                throw new Error(`JSON이 아니라 HTML 응답으로 보입니다. 일부: ${text.slice(0, 180)}...`);
            }

            const data: ApiResponse = JSON.parse(text);

            const header = data.getFoodKr?.header;
            if (header && header.code !== "00") {
                throw new Error(`API 오류: [${header.code}] ${header.message}`);
            }

            const list =
                data.getFoodKr?.item ??
                data.getFoodKr?.items?.item ??
                [];

            setTdata(Array.isArray(list) ? list : []);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    };



    // 부모에서 useEffect로 한번만 불러오기
    useEffect(() => {
        getFetchData();
    }, []);



    const handleCardClick = (item: FoodItem) => {
        // 예: 상세 모달 오픈, 새 탭으로 이미지 열기 등
        window.open(item.MAIN_IMG_THUMB, "_blank");
    };

    return (
        <div className="w-11/12 mx-auto py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">부산 맛집 리스트</h2>
                <button
                    onClick={getFetchData}
                    className="px-3 py-2 rounded border hover:bg-gray-50"
                >
                    새로고침
                </button>
                {/* <ul>
        {tdata.map((it) => (
          <li key={it.UC_SEQ}>
            {it.MAIN_TITLE} ({it.GUGUN_NM})
          </li>
        ))}
      </ul> */}
            </div>

            {loading && <div>로딩 중…</div>}
            {error && <div className="text-red-500">오류: {error}</div>}

            {!loading && !error && (
                <FoodGrid items={tdata} onCardClick={handleCardClick} />
            )}
        </div>
    );
}
