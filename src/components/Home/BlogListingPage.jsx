import React, { useState, useEffect } from "react";
import blogPostService from "../../services/blogPostService";

const BlogListingPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Categories",
    ".NET",
    "AI",
    "Blockchain",
    "Blog",
    "Businesses",
    "Data Engineering",
    "Git",
    "Golang",
    "Java",
    "JavaScript",
    "Mobile App Development",
    "MVP",
    "Personal",
    "Programming & Development",
    "Python",
    "React",
    "Software Development",
    "SQL Server",
    "Staff-Augmentation",
    "Technology",
    "Web",
  ];

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 6,
        status: "Published", // Note: Capital P based on your API response
      };

      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await blogPostService.getAllPosts(params);

      console.log("API Response:", response);

      // Your API returns: { success, data: [...], pagination: {...} }
      const postsData = response.data || [];
      const paginationData = response.pagination || {};

      setPosts(postsData);
      setTotalPages(paginationData.totalPages || 1);
      setError(null);
    } catch (err) {
      setError("Failed to load blog posts. " + (err.message || ""));
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === "All Categories" ? "all" : category);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPosts();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
  if (!text || typeof text !== "string") return ""; 
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
};


  return (
    <div className="min-h-screen w-full" style={{ background: "#0C0A25" }}>
      <div className="max-w-[1350px] mx-auto px-4 py-18">
        {/* Header Section */}
        <div className="mb-[60px]">
          <h1 className="font-['Space_Grotesk'] font-bold text-5xl leading-[150%] tracking-[-0.01em] text-white ">
            Resources and insights
          </h1>
          <p className="font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] capitalize text-white">
            The latest industry news, interviews, technologies and resources.
          </p>
        </div>

        <div className="flex gap-[88px]">
          {/* Sidebar */}
          <div className="w-[263px] flex-shrink-0">
            <div className="flex flex-col gap-3">
              {/* Search Box */}
              <div className="flex items-center px-4 gap-2 h-12 rounded bg-[#DBDBDB]">
                {/* Search Icon Placeholder */}
                <div className="w-8 h-8 flex items-center justify-center rounded-lg">
                  {/* <SearchIcon /> */}
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent font-['Roboto'] text-base text-[#4A4A4A] outline-none placeholder:text-[#4A4A4A]"
                />
              </div>

              {/* Blog Categories Header */}
              <div className="flex items-center px-4 h-14 rounded-lg">
                <span
                  className="font-['Space_Grotesk'] font-medium text-base leading-[150%] tracking-[-0.01em] capitalize"
                  style={{ color: "#74BEDC" }}
                >
                  Blog Categories
                </span>
              </div>

              {/* All Categories Button */}
              <button
                onClick={() => handleCategoryChange("All Categories")}
                className={`flex items-center px-4 h-10 rounded-lg ${
                  selectedCategory === "all" ? "bg-[#503AF2]" : ""
                }`}
              >
                <span className="flex-1 text-left font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] capitalize text-white">
                  All Categories
                </span>
              </button>

              {/* Category List */}
              <div className="flex flex-col">
                {categories.slice(1).map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex items-center px-4 h-12 rounded-lg hover:bg-[#503AF2] transition-colors ${
                      selectedCategory === category ? "bg-[#503AF2]" : ""
                    }`}
                  >
                    <span className="flex-1 text-left font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] capitalize text-white">
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="text-white text-center py-20">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-20">{error}</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white text-xl mb-4">No blog posts found</p>
                <p className="text-gray-400 text-sm">
                  {selectedCategory !== "all"
                    ? `No posts in "${selectedCategory}" category yet.`
                    : "Start by creating your first blog post!"}
                </p>
              </div>
            ) : (
              <>
                {/* Blog Grid */}
                <div className="flex flex-col gap-10">
                  {/* Row 1 */}
                  <div className="flex gap-6">
                    {posts.slice(0, 2).map((post, index) => (
                      <div
                        key={post._id || index}
                        className="flex-1 p-2 flex flex-col gap-6"
                      >
                        {/* Image */}
                        <div
                          className="w-full h-[230px] rounded-lg bg-cover bg-center"
                          style={{
                            backgroundImage: post.image?.url
                              ? `url(${post.image.url})`
                              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          }}
                        />

                        {/* Content */}
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-3">
                            {/* Category */}
                            <span
                              className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize"
                              style={{ color: "#83C5E0" }}
                            >
                              {post.categories && post.categories.length > 0
                                ? post.categories.join(" ")
                                : "Uncategorized"}
                            </span>

                            {/* Title */}
                            <h3 className="font-['Space_Grotesk'] font-bold text-xl leading-[150%] tracking-[-0.01em] capitalize text-white">
                              {truncateText(post.title, 60)}
                            </h3>

                            {/* Excerpt */}
                            <p className="font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                              {truncateText(
                                post.summary || post.blog_content,
                                120
                              )}
                            </p>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full bg-cover bg-center"
                              style={{
                                backgroundImage: post.author?.avatar
                                  ? `url(${post.author.avatar})`
                                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                                Author: {post.author_name || "DeshIt-BD Team"}
                              </span>
                              <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                                Date:{" "}
                                {formatDate(
                                  post.createdAt || post.publish_date
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Row 2 */}
                  <div className="flex gap-6">
                    {posts.slice(2, 4).map((post, index) => (
                      <div
                        key={post._id || index}
                        className="flex-1 p-2 flex flex-col gap-6"
                      >
                        <div
                          className="w-full h-[230px] rounded-lg bg-cover bg-center"
                          style={{
                            backgroundImage: post.featuredImage
                              ? `url(${post.featuredImage})`
                              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          }}
                        />
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-3">
                            <span
                              className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize"
                              style={{ color: "#83C5E0" }}
                            >
                              {post.category || "Uncategorized"}
                            </span>
                            <h3 className="font-['Space_Grotesk'] font-bold text-xl leading-[150%] tracking-[-0.01em] capitalize text-white">
                              {truncateText(post.title, 60)}
                            </h3>
                            <p className="font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                              {truncateText(post.excerpt || post.content, 120)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full bg-cover bg-center"
                              style={{
                                backgroundImage: post.author?.avatar
                                  ? `url(${post.author.avatar})`
                                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                                Author: {post.author?.name || "DeshIt-BD Team"}
                              </span>
                              <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                                Date:{" "}
                                {formatDate(post.createdAt || post.publishedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Row 3 */}
                  <div className="flex gap-6">
                    {posts.slice(4, 6).map((post, index) => (
                      <div
                        key={post._id || index}
                        className="flex-1 p-2 flex flex-col gap-6"
                      >
                        <div
                          className="w-full h-[230px] rounded-lg bg-cover bg-center"
                          style={{
                            backgroundImage: post.featuredImage
                              ? `url(${post.featuredImage})`
                              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          }}
                        />
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-3">
                            <span
                              className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize"
                              style={{ color: "#83C5E0" }}
                            >
                              {post.category || "Uncategorized"}
                            </span>
                            <h3 className="font-['Space_Grotesk'] font-bold text-xl leading-[150%] tracking-[-0.01em] capitalize text-white">
                              {truncateText(post.title, 60)}
                            </h3>
                            <p className="font-['Space_Grotesk'] font-normal text-base leading-[150%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                              {truncateText(post.excerpt || post.content, 120)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full bg-cover bg-center"
                              style={{
                                backgroundImage: post.author?.avatar
                                  ? `url(${post.author.avatar})`
                                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              }}
                            />
                            <div className="flex flex-col">
                              <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                                Author: {post.author?.name || "DeshIt-BD Team"}
                              </span>
                              <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                                Date:{" "}
                                {formatDate(post.createdAt || post.publishedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-[103px] mt-10">
                  <div className="flex gap-4">
                    {/* Previous/Page Numbers */}
                    {[...Array(Math.min(3, totalPages))].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`flex justify-center items-center px-2 py-2 w-20 h-[38px] rounded-lg ${
                          currentPage === i + 1
                            ? "text-[#F2F2F2]"
                            : "text-[#503AF2]"
                        }`}
                      >
                        <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize">
                          {i + 1}
                        </span>
                      </button>
                    ))}

                    {totalPages > 3 && (
                      <div className="flex justify-center items-center px-2 py-2 w-20 h-[38px] rounded-lg">
                        <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#F2F2F2]">
                          ...
                        </span>
                      </div>
                    )}

                    {totalPages > 3 && (
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="flex justify-center items-center px-2 py-2 w-20 h-[38px] rounded-lg text-[#503AF2]"
                      >
                        <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize">
                          {totalPages}
                        </span>
                      </button>
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="flex justify-center items-center px-2 py-2 w-20 h-[38px] bg-white rounded-lg disabled:opacity-50"
                    >
                      <span className="font-['Space_Grotesk'] font-normal text-sm leading-[160%] tracking-[-0.01em] capitalize text-[#0C0A25]">
                        Next
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListingPage;
