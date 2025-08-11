import { NextRequest, NextResponse } from "next/server";
import type { Product } from "@/app/types/product";

//동적라우팅으로 들어오는 params의 데이터 타입
interface ParamsProp {
    params : {id : string}
}

//CRUD를 구현할 JSON 파일 접근을 위해 필요한 모듈
import path from "path";
import { promises as fs} from "fs";

//CRUD를 구현할 JSON 파일의 경로 만들기
const dataPath = path.join(process.cwd(), 'src/app/data/product.json')

//파일에서 데이터 불러오기 함수로 만들어놓음.
async function getProducts() : Promise<Product[]> {
    const jsonData = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(jsonData);
}

//저장함수
async function saveProduts(products : Product[]) {
    await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

//데이터 조회
export async function GET(request:NextRequest,
                         { params }: { params: Promise<{ id: string }> }
                      ) {
  try{

  //불러온 파일을 json 파실을 통해 product 배열로 만들기
  const products: Product[] = await getProducts();
  const { id } = await params;

  //전체 상품중 요청한 id 자료 가져오기
  const product = products.find(item => item.id == id);

  //상품이 없는 경우
  if (!product){
    return NextResponse.json({msg:'상품을 찾을 수 없습니다.'},{status : 404} );
  }

    //터미널 콜솔에 출력
    console.log(product)
  return NextResponse.json({msg:'조회한 상품목록',product});

  } catch (error){
    console.error("데이터 읽는 중 오류발생", error);
    return NextResponse.json({msg:'서버 오류'}, {status : 500});
  }
}


//데이터 전체 수정
export async function PUT(request:NextRequest,
                        { params }: { params: Promise<{ id: string }> }
                      ) {
  try{
    //불러온 파일을 json 파실을 통해 product 배열로 만들기 (전체상품)
    const products: Product[] = await getProducts();
    const { id } = await params;

    //수정할 id의 인덱스 값을 찾기
    const productIdx = products.findIndex(item => item.id == id);

    //상품이 없는 경우
    if (productIdx == -1){
        return NextResponse.json({msg:'수정할 상품을 찾을 수 없습니다.'},{status : 404} );
    }

    //수정할 자료 만들기
    const updateDate : Product = await request.json();

    //전체 자료에 해당 수정 자료
    products[productIdx] = {...updateDate, id:id};

    //자료 저장
    await saveProduts(products);
    console.log(products[productIdx])
    return NextResponse.json(products[productIdx]);

  } catch (error){
    console.error("데이터 읽는 중 오류발생", error);
    return NextResponse.json({msg:'서버 오류'}, {status : 500});
  }
}


//데이터 부분 수정
export async function PATCH(request:NextRequest,
                       { params }: { params: Promise<{ id: string }> }
                      ) {
  try{
    //불러온 파일을 json 파실을 통해 product 배열로 만들기 (전체상품)
    const products: Product[] = await getProducts();
    const { id } = await params;

    //수정할 id의 인덱스 값을 찾기
    const productIdx = products.findIndex(item => item.id == id);

    //상품이 없는 경우
    if (productIdx == -1){
        return NextResponse.json({msg:'수정할 상품을 찾을 수 없습니다.'},{status : 404} );
    }

    //수정할 자료 만들기
    const updateDate : Partial<Product> = await request.json();

    //전체 자료에 해당 수정 자료
    products[productIdx] = {...products[productIdx], ...updateDate};

    //자료 저장
    await saveProduts(products);
    console.log(products[productIdx])
    return NextResponse.json(products[productIdx]);

  } catch (error){
    console.error("데이터 읽는 중 오류발생", error);
    return NextResponse.json({msg:'서버 오류'}, {status : 500});
  }
}


//데이터 삭제
export async function DELETE(request:NextRequest,
                         { params }: { params: Promise<{ id: string }> }
                      ) {
  try{
    //불러온 파일을 json 파실을 통해 product 배열로 만들기 (전체상품)
    const products: Product[] = await getProducts();
    const { id } = await params;

    //기존 데이터에서 해당하는 아이디만 제외해서 가져오기
    const updateProduct = products.filter(item => item.id !== id);

    //상품이 없는 경우
    if (products.length == updateProduct.length){
        return NextResponse.json({msg:'삭제할 상품을 찾을 수 없습니다.'},{status : 404} );
    }


    //자료 저장
    await saveProduts(updateProduct);
    return NextResponse.json({ msg: '삭제 완료' }, { status: 200 });

  } catch (error){
    console.error("데이터 읽는 중 오류발생", error);
    return NextResponse.json({msg:'서버 오류'}, {status : 500});
  }
}