import { useState, useEffect } from 'react';
import edit from '../assets/svg/fi-rr-edit-alt.svg';
import deleteIcon from '../assets/svg/fi-rr-trash.svg';
import BlogPostForm from './content/BlogPostForm';
import blogPostService from '../services/blogPostService';
import { Plus } from 'lucide-react';

function BlogPosts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, [pagination.page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await blogPostService.getAllPosts({
        page: pagination.page,
        limit: pagination.limit
      });
      
      console.log('API Response:', response); // Debug log
      
      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data);
      } else if (Array.isArray(response)) {
        setPosts(response);
      } else {
        setPosts([]);
      }
      
      // Update pagination - check multiple possible structures
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          ...response.pagination
        }));
      } else if (response.total !== undefined) {
        setPagination(prev => ({
          ...prev,
          total: response.total,
          pages: Math.ceil(response.total / prev.limit)
        }));
      } else if (response.data && response.data.length > 0) {
        // Fallback: use array length
        setPagination(prev => ({
          ...prev,
          total: response.data.length,
          pages: 1
        }));
      }
      
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPostClick = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    fetchPosts(); // Refresh posts after closing modal
  };

  const handleDeleteClick = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogPostService.deletePost(postId);
        alert('Post deleted successfully!');
        fetchPosts(); // Refresh posts
      } catch (err) {
        alert(err.message || 'Failed to delete post');
        console.error('Delete error:', err);
      }
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

  const formatViews = (views) => {
    return views.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 gap-6 w-full h-auto bg-white">
      {/* Total Posts Card */}
      <div className="flex flex-col items-start p-0 w-full max-w-[460px] rounded-xl shadow-[0_6px_12px_rgba(28,0,66,0.02)]">
        {/* Header */}
        <div 
          className="box-border flex flex-row items-center px-4 py-4 gap-4 w-full h-[66px] border-b"
          style={{ 
            backgroundColor: '#F8F8F8',
            borderBottom: '1px solid #DBDBDB'
          }}
        >
          <div 
            className="flex justify-center items-center p-2 w-[34px] h-[34px] rounded"
            style={{ backgroundColor: 'rgba(249, 103, 8, 0.16)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0H3C1.35 0 0 1.35 0 3V15C0 16.65 1.35 18 3 18H15C16.65 18 18 16.65 18 15V3C18 1.35 16.65 0 15 0ZM15 15H3V3H15V15Z" fill="#F96708"/>
            </svg>
          </div>
          <span 
            className="font-['Space_Grotesk'] font-medium text-lg leading-[23px] tracking-[-0.01em] capitalize"
            style={{ color: '#4A4A4A' }}
          >
            Total Posts
          </span>
        </div>
        
        {/* Content */}
        <div 
          className="flex flex-col justify-center items-start px-6 py-6 gap-[6px] w-full h-[107px] shadow-[0_6px_12px_rgba(28,0,66,0.02)]"
          style={{ backgroundColor: '#F8F8F8' }}
        >
          <span 
            className="font-['Space_Grotesk'] font-bold text-2xl leading-[31px] tracking-[-0.01em] capitalize"
            style={{ color: '#131313' }}
          >
            {pagination.totalItems}
          </span>
          <span 
            className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize"
            style={{ color: '#4A4A4A' }}
          >
            Lifetime
          </span>
        </div>
      </div>

      {/* Posts Table */}
      <div className="flex flex-col items-start p-0 w-full h-auto bg-gray-50 rounded-xl shadow-sm overflow-auto">
        
        {/* Header Section */}
        <div className="box-border flex flex-row items-center justify-between px-6 py-4 gap-4 w-full h-14 bg-gray-50 border-b border-gray-300 shadow-sm">
          <h2 className="font-['Space_Grotesk'] font-medium text-base md:text-lg leading-6 tracking-tight capitalize text-gray-900">
            Recent Posts 
          </h2>
          
          {/* New Blog Post Button */}
          <button
            onClick={handleNewPostClick}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-['Space_Grotesk'] font-medium text-sm shadow-sm"
            style={{ backgroundColor: '#6200EE' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5000D0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6200EE'}
          >
            <Plus size={18} />
            New Blog Post
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-[1000px] m-4">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 px-6 py-3 border-b border-gray-300 mt-8">
              {[
                "S/N",
                "Title",
                "Status",
                "Views",
                "Date Published",
                "Author",
                "Actions",
              ].map((header) => (
                <span
                  key={header}
                  className="font-['Space_Grotesk'] font-medium text-sm text-gray-600 capitalize"
                >
                  {header}
                </span>
              ))}
            </div>

            {/* Table Rows */}
            {posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No posts found
              </div>
            ) : (
              posts.map((post, index) => (
                <div
                  key={post._id}
                  className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-gray-200 text-sm"
                >
                  {/* Serial Number */}
                  <span className="text-gray-600">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </span>

                  {/* Title */}
                  <span className="truncate text-gray-600" title={post.title}>
                    {post.title}
                  </span>

                  {/* Status */}
                  <span
                    className={
                      post.status === "Published"
                        ? "text-green-500"
                        : post.status === "Draft"
                        ? "text-purple-600"
                        : "text-orange-500"
                    }
                  >
                    {post.status}
                  </span>

                  {/* Views */}
                  <span className="text-gray-600">{formatViews(post.views)}</span>

                  {/* Date Published */}
                  <span className="text-gray-600">
                    {formatDate(post.publish_date)}
                  </span>

                  {/* Author */}
                  <span className="text-gray-600">{post.author_name}</span>

                  {/* Actions */}
                  <div className="flex flex-row items-center pl-0 gap-6 flex-none order-6 self-stretch">
                    <button
                      onClick={() => handleEditClick(post)}
                      className="w-5 h-5 flex-none order-0 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Edit"
                    >
                      <img src={edit} alt="Edit" />
                    </button>

                    <button
                      onClick={() => handleDeleteClick(post._id)}
                      className="w-5 h-5 flex-none order-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-4 py-4 w-full">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BlogPostForm 
          onClose={handleCloseModal} 
          postData={selectedPost}
          isEdit={!!selectedPost}
        />
      )}
    </div>
  );
}

export default BlogPosts;