import api from "./api";

const blogPostService = {
  // Create a new blog post
  createPost: async (postData) => {
    try {
      const response = await api.post("/blog-posts", postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all blog posts with filters
  getAllPosts: async (params = {}) => {
    try {
      const response = await api.get("/blog-posts", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/blog-posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get post by slug
  getPostBySlug: async (slug) => {
    try {
      const response = await api.get(`/blog-posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update blog post
  updatePost: async (id, postData) => {
    try {
      const response = await api.put(`/blog-posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete blog post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/blog-posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Publish blog post
  publishPost: async (id) => {
    try {
      const response = await api.patch(`/blog-posts/${id}/publish`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get blog statistics
  getStats: async (authorId = null) => {
    try {
      const params = authorId ? { author: authorId } : {};
      const response = await api.get("/blog-posts/stats", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default blogPostService;
