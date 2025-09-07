import React, { useEffect, useState } from 'react';
import { BlogPost } from '@/entities/BlogPost';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostCard from '@/components/blog/PostCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'pt';
    setLanguage(savedLang);
    load();
  }, []);

  const load = async () => {
    const data = await BlogPost.list('-created_date');
    setPosts((data || []).filter(p => p.published));
  };

  const featured = posts.find(p => p.featured) || posts[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">{language === 'pt' ? 'Blog' : 'Blog'}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {language === 'pt' ? 'Insights, cases e guias práticos de IA e automação.' : 'Insights, case studies and practical guides on AI and automation.'}
          </p>
        </div>

        {featured && (
          <div className="mb-10">
            <FeaturedPost post={featured} language={language} />
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.filter(p => p.id !== featured?.id).map(post => (
            <PostCard key={post.id} post={post} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
}
