import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/app/types/product";
import { products } from "@/app/types/product";


//CRUD를 구현할 JSON 파일 접근을 위해 필요한 모듈
import path from "path";
import { promises as fs} from "fs";

//CRUD를 구현할 JSON 파일의 경로 만들기
const dataPath = path.join(process.cwd(), 'src/app/data/product.json')

//데이터 조회
export async function GET(request:NextRequest) {
  try{
  //json 파일 불러오기
  const jsonData = await fs.readFile(dataPath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  //URL에서 쿼리 파라미터 가져오기
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  //URL 쿼리 스트링에 category 값이 있는 경우 해당값 조회
  if (category){
    const cProducts = products.filter(
      item => item.category == category
    );
    return NextResponse.json(cProducts);
  }

    //터미널 콜솔에 출력
    //console.log(products)
  return (
    NextResponse.json({msg:'상품목록',products})
  );
  } catch (error){
    console.error("데이터 읽는 중 오류발생", error);
    return (
    NextResponse.json({msg:'서버 오류'}, {status : 500})
  );
  }
}

//파일 추가
export async function POST(request:NextRequest) {
  try{
  //json 파일 불러오기
  const jsonData = await fs.readFile(dataPath, 'utf-8');
  const products: Product[] = JSON.parse(jsonData);

  //요청시 추가될 상품 자료가져오기(post로 입력하는값)
  const {name, category, price, description} = await request.json();

  //추가상품 id 만들기 
  const newId = Date.now().toString();

  //추가 상품 객체 생성
  const newProduct : Product = {
    id : newId,
    name,
    category,
    price,
    description
  }

  //상품 목록에 추가
  products.push(newProduct);

  //업데이트된 자료를 JSON 파일에 쓰기
  
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2));

  return (
    NextResponse.json({msg:'상품이 성공적으로 추가', Product : newProduct}, 
    {status : 200})
  );

  } catch (error){
    console.error("상품 추가 중 요청 오류", error);
    return (
    NextResponse.json({msg:'요청 오류'}, {status : 400})
  );
  }
}