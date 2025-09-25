import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const unanswered = searchParams.get('unanswered') === 'true'
  const page = Number(searchParams.get('page') || '1')
  const limit = Number(searchParams.get('limit') || '10')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (id) {
    const { data, error } = await supabase
      .from('consultations')
      .select('id,title,content,author_name,phone,event_type,is_private,created_at,updated_at,answer,answered_at,views')
      .eq('id', id)
      .single()

    if (error || !data) return NextResponse.json({ error: error?.message || 'Not found' }, { status: 404 })

    return NextResponse.json({
      id: data.id,
      title: data.title,
      content: data.content,
      author: data.author_name,
      phone: data.phone,
      eventType: data.event_type,
      hasPassword: data.is_private,
      date: new Date(data.created_at).toISOString().slice(0,10).replace(/-/g,'.'),
      views: data.views,
      answer: data.answer,
    })
  }

  if (unanswered) {
    const { data, error } = await supabase
      .from('consultations')
      .select('id,author_name,content,created_at')
      .is('answer', null)
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const items = (data || []).map((c) => ({
      id: c.id,
      name: c.author_name,
      question: c.content.slice(0,80),
      createdAt: new Date(c.created_at as unknown as string).toISOString().slice(0,10),
    }))
    return NextResponse.json({ consultations: items })
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  const { count } = await supabase
    .from('consultations')
    .select('id', { count: 'exact', head: true })

  const { data, error } = await supabase
    .from('consultations')
    .select('id,title,event_type,author_name,created_at,is_private,views')
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const items = (data || []).map((c) => ({
    id: c.id,
    title: c.title,
    eventType: c.event_type,
    author: c.author_name,
    date: new Date(c.created_at as unknown as string).toISOString().slice(0,10).replace(/-/g,'.'),
    hasPassword: c.is_private,
    views: c.views,
  }))

  return NextResponse.json({ total: count || 0, consultations: items })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { error } = await supabase
    .from('consultations')
    .update({ answer: body.answer, answered_at: new Date().toISOString() })
    .eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}


