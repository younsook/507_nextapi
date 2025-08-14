// src/components/FoodGrid.tsx
import FoodCard from "@/components/FoodCard";
import type { FoodItem } from "@/types/food";

type Props = {
  items: FoodItem[];
  onCardClick?: (item: FoodItem) => void;
};

export default function FoodGrid({ items, onCardClick }: Props) {
  if (!items.length) {
    return (
      <div className="text-gray-500 text-sm py-8 text-center">
        표시할 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((it) => (
        <FoodCard key={it.UC_SEQ} item={it} onClick={onCardClick} />
      ))}
    </div>
  );
}
