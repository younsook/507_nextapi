'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export interface FormStatus {
    message: string;
}

export async function createProductAction(prevState: FormStatus, formDate: FormData): Promise<FormStatus> {
    const name = formDate.get('name');
    const category = formDate.get('category');
    const price = parseInt(String(formDate.get('price')?? '0'));
    const description = formDate.get('description');

    console.log('createProductAction', name)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const resp = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body:JSON.stringify({name, category, price, description})
      });

      if(!resp.ok) {
        const data = resp.json();
        return {message : `API error : ${data}`};
    }
    
    //캐시를 갱신하여 새데이터 즉시 반영
    revalidatePath('/product')
    //제품목록 페이지로 이동
    redirect('/product')
}

export async function updateProductAction(prevState: FormStatus, formDate: FormData): Promise<FormStatus> {
    const id = formDate.get('id');
    const name = formDate.get('name');
    const category = formDate.get('category');
    const price = parseInt(String(formDate.get('price')?? '0'));
    const description = formDate.get('description');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const resp = await fetch(`${baseUrl}/api/products/${id}`, {
        method: 'PUT',
        headers : {
            'Content-type' : 'application/json'
        },
        body:JSON.stringify({name, category, price, description})
      });

      if(!resp.ok) {
        const data = resp.json();
        return {message : `API error : ${data}`};
    }
    
    //캐시를 갱신하여 새데이터 즉시 반영
    revalidatePath('/product')
    revalidatePath(`/product/${id}`)
    //제품목록 페이지로 이동
    redirect(`/product/${id}`)
}