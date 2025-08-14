import { supabase } from "@/lib/supabase/client";
import type { Product, products } from "@/types/product";
import Link from "next/link";

export default async function Hello() {
  //const tdata = await getFetchData();
  const {data, error} = await supabase
    .from('products')
    .select('*')
    //.eq('id',123)
    //.single();

    if(error){
      return ''
    }
    console.log(data)



  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold p-5">
      supabase test
      {data && data.map((item:Product)=>
      <Link href={`/hello/${item.id}`} key={item.id}>
        <div >{item.name}</div>
        </Link>
      ) }
      </h1>
      <p className="text-green-600">
        
      </p>
    </div>
  );
}