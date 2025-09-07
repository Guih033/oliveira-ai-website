import React from 'react';
import { Tag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function FeaturedPost({ post, language }) {
  if (!post) return null;
  const title = language === 'pt' ? post.title : (post.title_en || post.title);
  const excerpt = language === 'pt' ? post.excerpt : (post.excerpt_en || post.excerpt);
  const category = post.category?.replace(/_/g, ' ');

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border shadow">
      <div className="grid md:grid-cols-2">
        <img src={post.image_url} alt={title} className="h-64 md:h-full w-full object-cover" />
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-blue-600">
            <Tag className="w-3 h-3" /> {category}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mt-3">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-3">{excerpt}</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.created_date).toLocaleDateString()}</span>
          </div>
          <div className="mt-6">
            <Link to={createPageUrl('Blog') + `?slug=${post.slug}`} className="text-blue-600 hover:underline">
              {language === 'pt' ? 'Ler mais' : 'Read more'} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}