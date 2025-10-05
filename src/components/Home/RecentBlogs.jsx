import { useState, useEffect } from 'react';
import blogPostService from '../../services/blogPostService';

const RecentBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRecentPosts();
  }, [currentPage]);

  const fetchRecentPosts = async () => {
    try {
      setLoading(true);
      const response = await blogPostService.getAllPosts({
        page: currentPage,
        limit: 10,
        status: 'Published'
      });
      
      setPosts(response.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0C0B26' }}>
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0C0B26' }}>
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen" style={{ background: '#0C0B26' }}>
      {/* Background Decorative Elements */}
      <div className="absolute left-0 -top-20 opacity-100 pointer-events-none">
        {/* Decorative circles - commented for now */}
        <div className="w-[103px] h-[206px] rounded-l-full " style={{ background: '#D9D3FF' }} />
        <div className="w-[60px] h-[113px] rounded-r-full absolute -right-15 top-35" style={{ background: '#D3FEE8' }} />
      </div>

      <div className="max-w-[1300px] mx-auto pl-20 py-35">
        {/* Header Section */}
        <div className="flex justify-between mb-12  items-center">
          <h2 className="font-['Space_Grotesk'] font-bold text-5xl leading-[150%] tracking-[-0.01em] text-white">
            Our Recent<br />Blogs
          </h2>
          <p className="font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] text-white max-w-[597px]">
            We follow agile methodology to deliver a high quality task to meet established deadline.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <div 
              key={post._id || index} 
              className="flex flex-col p-2 gap-6"
            >
              {/* Image */}
              <div 
                className="w-full h-[230px] rounded-lg bg-cover bg-center"
                style={{ 
                  backgroundImage: post.image?.url 
                    ? `url(${post.image.url})` 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                }}
              />
              
              {/* Content */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {/* Category */}
                  <span 
                    className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize" 
                    style={{ color: '#83C5E0' }}
                  >
                    {post.categories.join(', ') || 'Software Development'}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-['Space_Grotesk'] font-bold text-xl leading-[150%] tracking-[-0.01em] capitalize text-white min-h-[60px]">
                    {truncateText(post.title, 80)}
                  </h3>
                  
                  {/* Summary/Excerpt */}
                  <p className="font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] capitalize text-[#F2F2F2] min-h-[72px]">
                    {truncateText(post.summary || post.blog_content, 120)}
                  </p>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: post.author?.avatar 
                        ? `url(${post.author.avatar})` 
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                      {post.author_name || 'DeshIt-BD'}
                    </span>
                    <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                      {formatDate(post.createdAt || post.publish_date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize px-2 ${
                currentPage === page ? 'text-[#F2F2F2]' : 'text-[#F2F2F2] opacity-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;