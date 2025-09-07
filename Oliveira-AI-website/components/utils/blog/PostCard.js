import React from 'react';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PostCard({ post, language }) {
  const title = language === 'pt' ? post.title : (post.title_en || post.title);
  const excerpt = language === 'pt' ? post.excerpt : (post.excerpt_en || post.excerpt);
  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 border hover:shadow-lg transition">
      <img src={post.image_url} alt={title} className="h-44 w-full object-cover" />
      <div className="p-5">
        <div className="text-xs uppercase tracking-wide text-blue-600 flex items-center gap-2">
          <Tag className="w-3 h-3" />
          {post.category?.replace(/_/g, ' ')}
        </div>
        <h4 className="text-lg font-semibold mt-2">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{excerpt}</p>
        <div className="mt-4">
          <Link to={createPageUrl('Blog') + `?slug=${post.slug}`} className="text-blue-600 hover:underline">
            {language === 'pt' ? 'Ler mais' : 'Read more'} →
          </Link>
        </div>
      </div>
    </div>
  );
}