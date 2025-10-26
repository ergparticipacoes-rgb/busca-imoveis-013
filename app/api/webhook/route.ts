import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null)
  console.log('Webhook recebido', data)
  return NextResponse.json({ ok: true })
}