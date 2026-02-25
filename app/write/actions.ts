'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createPost(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if (!title || !content) {
        return { error: '제목과 내용을 입력해주세요.' }
    }

    // Create a brief excerpt from content
    const excerpt = content.length > 100 ? content.substring(0, 100) + '...' : content

    const newPost = {
        title: title,
        content: content,
        excerpt: excerpt,
        category: 'UNCATEGORIZED',
        author_name: 'Guest User',
        author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
        reading_time: '3 min',
        image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
        is_trending: false,
        likes_count: 0
    }

    const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select()
        .single()

    if (error) {
        console.error('Error creating post:', error)
        return { error: error.message }
    }

    revalidatePath('/')
    redirect(`/posted/${data.id}`)
}
