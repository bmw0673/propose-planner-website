import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const page = Number(searchParams.get('page') || '1')
  const limit = Number(searchParams.get('limit') || '12')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (id) {
    // 단건 상세
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id,title,content,excerpt,thumbnail_url,pinned,published_at,views')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: error?.message || 'Not found' }, { status: 404 })
    }
    return NextResponse.json({
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      image: data.thumbnail_url,
      date: new Date(data.published_at).toISOString().slice(0, 10).replace(/-/g, '.'),
      content: data.content,
      pinned: data.pinned,
      views: data.views,
    })
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  // 총 개수 계산
  const { count } = await supabase
    .from('v_blog_posts_public')
    .select('*', { count: 'exact', head: true })

  // 데이터 페이지네이션
  const { data, error } = await supabase
    .from('v_blog_posts_public')
    .select('id,title,excerpt,thumbnail_url,pinned,published_at,views')
    .order('pinned', { ascending: false })
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const posts = (data || []).map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.excerpt,
    image: p.thumbnail_url,
    pinned: p.pinned,
    date: new Date(p.published_at as unknown as string).toISOString().slice(0, 10).replace(/-/g, '.'),
  }))

  return NextResponse.json({ total: count || 0, posts })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      thumbnail_url: body.image || null,
      pinned: !!body.pinned,
      is_published: body.is_published ?? true,
    })
    .select('id')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ id: data.id })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { error } = await supabase
    .from('blog_posts')
    .update({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      thumbnail_url: body.image,
      pinned: body.pinned,
      is_published: body.is_published,
    })
    .eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}


