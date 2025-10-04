import React, { useState } from 'react';
import { X, Calendar, Clock, Film, Pencil, Menu, Trash } from 'lucide-react';


// BlogPostForm Component
const BlogPostForm = ({ onClose, postData }) => {
  const [formData, setFormData] = useState({
    title: postData?.title || '',
    image: null,
    publish_date: '26/09/25',
    publish_time: '19:01',
    is_featured: false,
    tags: ['Tag'],
    categories: ['.NET', 'AI', 'BlockChain'],
    author: postData?.author || 'DeshIt-BD Team',
    summary: '',
    meta_description: '',
    blog_content: ''
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleSave = () => {
    console.log('Saving draft:', formData);
    alert('Draft saved successfully!');
  };

  const handlePublish = () => {
    console.log('Publishing post:', formData);
    alert('Post published successfully!');
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      console.log('Deleting post');
      alert('Post deleted!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        <div className="flex gap-12 p-6 min-h-screen font-['Space_Grotesk',sans-serif] flex-1" style={{ backgroundColor: '#f5f5f5' }}>
          {/* Main Content Area */}
          <div className="flex-1 max-w-[816px]">
            {/* Back Button & Title */}
            <div className="mb-6">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 p-4 border-0 text-base font-normal cursor-pointer mb-2" 
                style={{ background: 'transparent', color: '#6200EE' }}
              >
                ← Back
              </button>
              
              <h1 className="text-2xl font-bold p-4 m-0" style={{ color: '#4A4A4A' }}>
                title - 3077279158
              </h1>
              
              <div className="p-4 text-base" style={{ color: '#4A4A4A' }}>
                API ID : Post
              </div>
            </div>

            {/* Form Container */}
            <div className="p-6 rounded-lg " style={{ backgroundColor: '#E5E0E5' }}>
              {/* Title and Image  */}
              <div className="flex gap-3 mb-6">
                {/* Title Field */}
                <div className="flex-1">
                  <label className="block text-base font-bold p-4 mb-2" style={{ color: '#4A4A4A' }}>
                    title<span style={{ color: '#F62929' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="titles"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-6 text-sm border rounded box-border shadow-[0_6px_12px_rgba(28,0,66,0.02)]"
                    style={{ border: '1px solid #DBDBDB', backgroundColor: 'white' }}
                  />
                </div>

                {/* Image Upload */}
                <div className="flex-1">
                  <label className="block text-base font-bold p-4 mb-2" style={{ color: '#4A4A4A' }}>
                    Image
                  </label>
                  <div className="w-full h-[157px] border rounded flex flex-col items-center justify-center cursor-pointer shadow-[0_6px_12px_rgba(28,0,66,0.02)]" style={{ border: '1px solid #DBDBDB', backgroundColor: 'white' }}>
                    <Film size={24} color="#6200EE" />
                    <p className="text-[10px] text-center mt-2 px-4" style={{ color: '#131313' }}>
                      Click to add an asset or drag and drop one in this area
                    </p>
                  </div>
                </div>
              </div>

              {/* Date, Time, Featured Row */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {/* Publish Date */}
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-base font-bold py-4 mb-2" style={{ color: '#4A4A4A' }}>
                    Publish_on
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-4 py-2 border rounded" style={{ border: '1px solid #DBDBDB', backgroundColor: 'white' }}>
                      <Calendar size={16} color="#4A4A4A" />
                      <span className="text-sm flex-1" style={{ color: '#4A4A4A' }}>{formData.publish_date}</span>
                      <button className="border-0 p-0 cursor-pointer" style={{ background: 'transparent' }}>
                        <X size={16} color="#4A4A4A" />
                      </button>
                    </div>
                    <div className="w-[154px] flex items-center gap-2 px-4 py-2 border rounded" style={{ border: '1px solid #DBDBDB', backgroundColor: 'white' }}>
                      <Clock size={16} color="#4A4A4A" />
                      <span className="text-sm flex-1" style={{ color: '#4A4A4A' }}>{formData.publish_time}</span>
                      <button className="border-0 p-0 cursor-pointer" style={{ background: 'transparent' }}>
                        <X size={16} color="#4A4A4A" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Is Featured */}
                <div className="w-[292px]">
                  <label className="block text-base font-bold py-4 mb-2" style={{ color: '#4A4A4A' }}>
                    is_featured
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleInputChange('is_featured', false)}
                      className="flex-1 px-4 py-2 text-base font-normal border rounded cursor-pointer"
                      style={{
                        color: '#F62929',
                        backgroundColor: formData.is_featured ? 'white' : '#F2F2F2',
                        border: '1px solid #DBDBDB'
                      }}
                    >
                      FALSE
                    </button>
                    <button
                      onClick={() => handleInputChange('is_featured', true)}
                      className="flex-1 px-4 py-2 text-base font-normal border rounded cursor-pointer"
                      style={{
                        color: '#4A4A4A',
                        backgroundColor: formData.is_featured ? '#F2F2F2' : 'white',
                        border: '1px solid #DBDBDB'
                      }}
                    >
                      TRUE
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-base font-bold py-4 mb-2" style={{ color: '#4A4A4A' }}>
                  tags<span style={{ color: '#F62929' }}>*</span>
                </label>
                <div className="flex gap-2 p-2 border rounded flex-wrap items-center" style={{ border: '1px solid #DBDBDB', backgroundColor: 'white' }}>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1 rounded-sm" style={{ backgroundColor: '#BED38F' }}>
                      <span className="text-base" style={{ color: '#4A4A4A' }}>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="border-0 p-0 cursor-pointer flex"
                        style={{ background: 'transparent' }}
                      >
                        <X size={16} color="#4A4A4A" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1 min-w-[100px] p-2 border-0 text-base outline-none"
                    style={{ backgroundColor: 'transparent' }}
                  />
                </div>
              </div>

              {/* Category and Author */}
              <div className="mb-6">
                {/* Category */}
                <div className="mb-4">
                  <label className="block text-base font-bold py-3 mb-2" style={{ color: '#4A4A4A' }}>
                    category ▼
                  </label>
                  <div className="p-4 px-6 border rounded text-sm shadow-[0_6px_12px_rgba(28,0,66,0.02)]" style={{ border: '1px solid rgba(0, 0, 0, 0.29)', backgroundColor: 'white', color: '#131313' }}>
                    {formData.categories.join('  ')}
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-base font-bold py-3 mb-2" style={{ color: '#4A4A4A' }}>
                    author<span style={{ color: '#F62929' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full py-4 px-6 text-sm border rounded shadow-[0_6px_12px_rgba(28,0,66,0.02)] box-border"
                    style={{ border: '1px solid rgba(0, 0, 0, 0.29)', backgroundColor: 'white' }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <label className="block text-base font-bold py-4 mb-2" style={{ color: '#4A4A4A' }}>
                  summary<span style={{ color: '#F62929' }}>*</span>
                </label>
                <textarea
                  placeholder="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  className="w-full h-[115px] p-6 text-sm border rounded resize-y box-border shadow-[0_6px_12px_rgba(28,0,66,0.02)] font-['Space_Grotesk',sans-serif]"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.29)', backgroundColor: 'white' }}
                />
              </div>

              {/* Meta Description */}
              <div className="mb-6">
                <label className="block text-base font-bold py-4 mb-2" style={{ color: '#4A4A4A' }}>
                  meta description
                </label>
                <textarea
                  placeholder="description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  className="w-full h-[93px] p-6 text-sm border rounded resize-y box-border shadow-[0_6px_12px_rgba(28,0,66,0.02)] font-['Space_Grotesk',sans-serif]"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.29)', backgroundColor: 'white' }}
                />
              </div>

              {/* Blog Content */}
              <div>
                <label className="block text-base font-bold py-4 mb-2" style={{ color: '#4A4A4A' }}>
                  Blog Content<span style={{ color: '#F62929' }}>*</span>
                </label>
                
                {/* Toolbar */}
                <div className="flex items-center gap-[7px] p-2 rounded-t flex-wrap" style={{ backgroundColor: 'white', border: '1px solid rgba(0, 0, 0, 0.35)' }}>
                  <button className="px-2 py-1 border-0 cursor-pointer font-semibold text-lg" style={{ background: 'transparent' }}>p</button>
                  <button className="px-2 py-1 border-0 cursor-pointer font-semibold text-lg" style={{ background: 'transparent' }}>H1</button>
                  <button className="px-2 py-1 border-0 cursor-pointer font-bold text-lg" style={{ background: 'transparent' }}>H2</button>
                  <button className="px-2 py-1 border-0 cursor-pointer font-bold" style={{ background: 'transparent' }}>B</button>
                  <button className="px-2 py-1 border-0 cursor-pointer italic" style={{ background: 'transparent' }}>I</button>
                  <button className="px-2 py-1 border-0 cursor-pointer underline" style={{ background: 'transparent' }}>U</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>A</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>•</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>1.</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>≡</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>≣</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>—</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>🖼</button>
                  <button className="px-2 py-1 border-0 cursor-pointer" style={{ background: 'transparent' }}>⋮</button>
                </div>
                
                {/* Content Area */}
                <textarea
                  value={formData.blog_content}
                  onChange={(e) => handleInputChange('blog_content', e.target.value)}
                  className="w-full h-[203px] p-4 text-sm border-t-0 rounded-b resize-y box-border font-['Space_Grotesk',sans-serif]"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.29)', backgroundColor: 'white' }}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[412px] flex flex-col gap-6 sticky top-6 h-fit">
            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 px-4 py-2 border-0 rounded-lg text-base cursor-pointer"
                style={{ backgroundColor: '#E6E6E6', color: '#4A4A4A' }}
              >
                + Publish
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 border-0 rounded-lg text-base cursor-pointer"
                style={{ backgroundColor: '#E6E6E6', color: '#4A4A4A' }}
              >
                Save
              </button>
            </div>

            {/* Draft Status */}
            <div className="p-4 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#E8F6FB' }}>
              <span className="text-base" style={{ color: '#4A4A4A' }}>Editing draft version</span>
            </div>

            {/* Information Section */}
            <div>
              <div className="p-4 text-base font-normal uppercase" style={{ borderBottom: '1px solid #DBDBDB', color: '#4A4A4A' }}>
                INFORMATION
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between p-4">
                  <span className="font-bold text-base" style={{ color: '#4A4A4A' }}>Created</span>
                  <span className="text-sm" style={{ color: '#4A4A4A' }}>6 seconds ago</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="font-bold text-base" style={{ color: '#4A4A4A' }}>By</span>
                  <span className="text-sm" style={{ color: '#4A4A4A' }}>DeshIt-BD Team</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="font-bold text-base" style={{ color: '#4A4A4A' }}>Last update</span>
                  <span className="text-sm" style={{ color: '#4A4A4A' }}>6 seconds ago</span>
                </div>
                <div className="flex justify-between p-4">
                  <span className="font-bold text-base" style={{ color: '#4A4A4A' }}>By</span>
                  <span className="text-sm" style={{ color: '#4A4A4A' }}>DeshIt-BD Team</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-3 px-4 py-3 border rounded text-base cursor-pointer" style={{ backgroundColor: '#F5EDFA', border: '1px solid #DBDBDB', color: '#6200EE' }}>
                <Pencil size={24} color="#6200EE" />
                Edit the model
              </button>
              
              <button className="flex items-center gap-3 px-4 py-3 border rounded text-base cursor-pointer" style={{ backgroundColor: '#F5EDFA', border: '1px solid #DBDBDB', color: '#6200EE' }}>
                <Menu size={24} color="#6200EE" />
                Configure the view
              </button>
              
              <button
                onClick={handleDelete}
                className="flex items-center gap-3 px-4 py-3 border rounded text-base cursor-pointer"
                style={{ backgroundColor: '#FCEDE6', border: '1px solid #DBDBDB', color: '#BD371A' }}
              >
                <Trash size={24} color="#BD371A" />
                Delete this entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;