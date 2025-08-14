// src/components/FoodCard.tsx
import type { FoodItem } from "@/types/food";

type Props = {
  item: FoodItem;
  onClick?: (item: FoodItem) => void;
};

export default function FoodCard({ item, onClick }: Props) {
  return (
    <article
      className="border rounded-lg overflow-hidden shadow hover:shadow-md transition cursor-pointer"
      onClick={() => onClick?.(item)}
      title={item.MAIN_TITLE}
    >
      {item.MAIN_IMG_THUMB ? (
        <img
          src={item.MAIN_IMG_THUMB}
          alt={item.MAIN_TITLE}
          className="w-full h-36 object-cover"
        />
      ) : (
        <div className="w-full h-36 grid place-items-center bg-gray-100 text-gray-400">
          No Image
        </div>
      )}
      <div className="p-3">
        <h3 className="font-semibold truncate">{item.MAIN_TITLE}</h3>
        <p className="text-xs text-gray-500">{item.GUGUN_NM}</p>
        <p className="text-sm mt-1 line-clamp-2">{item.ADDR1 || "-"}</p>
        <p className="text-sm mt-1">{fmtTel(item.CNTCT_TEL)}</p>
        {item.RPRSNTV_MENU && (
          <p className="text-xs mt-1 text-gray-600">
            대표 메뉴: {item.RPRSNTV_MENU}
          </p>
        )}
      </div>
    </article>
  );
}

function fmtTel(v?: string) {
  if (!v) return "-";
  const s = v.replace(/[^0-9]/g, "");
  if (s.length === 8) return s.replace(/(\d{4})(\d{4})/, "$1-$2");
  if (s.length === 9) return s.replace(/(\d{2,3})(\d{3})(\d{3,4})/, "$1-$2-$3");
  if (s.length === 10) return s.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  if (s.length === 11) return s.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  return v;
}
