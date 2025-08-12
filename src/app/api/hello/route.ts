import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  return (
    NextResponse.json([
      {msg:'Hello World 안녕하세요'},
      {msg:'Hello World 안녕하세요22'},
      {msg:'2025-08-12'}
    ])
  );
}