import { supabase } from "@/lib/supabase/client";


export default async function HelloId({
    params,
}: {
  params: Promise<{ id: string }>;
}) {

    const {id} = await params ;

    const {data, error} = await supabase
        .from('products')
        .select('*')
        .eq('id',id)
        .single();
    
        if(error){
          return ''
        }

  return (
    <div>
      {id}
      <p>ID: {data.id}</p>
      <p>이름: {data.name}</p>
      <p>가격: {data.price}</p>
      <p>카테고리: {data.category}</p>
      <p>설명: {data.description}</p>
    </div>
  );
}