export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

export const products: Product[] = [
  {
    id: '123',
    name: '에어맥스 270',
    category: 'shoes',
    price: 129000,
    description: '편안한 착화감과 스타일을 동시에 갖춘 인기 러닝화',
  },
  {
    id: '124',
    name: '울트라부스트 22',
    category: 'shoes',
    price: 149000,
    description: '에너지 반환을 극대화한 아디다스 프리미엄 러닝화',
  },
  {
    id: '201',
    name: '패딩 자켓',
    category: 'clothes',
    price: 99000,
    description: '겨울철 필수 아이템, 따뜻한 경량 패딩 자켓',
  },
  {
    id: '202',
    name: '데님 팬츠',
    category: 'clothes',
    price: 59000,
    description: '트렌디한 핏의 데일리 데님 팬츠',
  },
];
