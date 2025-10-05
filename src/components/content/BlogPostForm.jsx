import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Calendar,
  Clock,
  Film,
  Pencil,
  Menu,
  Trash,
  Upload,
  ChevronDown,
} from "lucide-react";
import blogPostService from "../../services/blogPostService";

const CATEGORIES = [
  ".NET",
  "AI",
  "Blockchain",
  "Blog",
  "Business",
  "Data Engineering",
  "DBI",
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
  "Staff Augmentation",
  "Technology",
  "Web",
];

const BlogPostForm = ({ onClose, postData, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    imagePreview: null,
    publish_date: new Date().toISOString().split("T")[0],
    publish_time: new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
    is_featured: false,
    tags: [],
    categories: [],
    author_name: "DeshIt-BD Team",
    summary: "",
    meta_description: "",
    blog_content: "",
    status: "Draft",
  });

  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef(null);
  const contentRef = useRef(null);
  const categoryDropdownRef = useRef(null);
   

  // Load post data if editing
  useEffect(() => {
    if (isEdit && postData) {
      setFormData({
        title: postData.title || "",
        image: postData.image || null,
        imagePreview: postData.image?.url || null,
        publish_date: postData.publish_date
          ? new Date(postData.publish_date).toISOString().split("T")[0]
          : "",
        publish_time: postData.publish_time || "",
        is_featured: postData.is_featured || false,
        tags: postData.tags || [],
        categories: postData.categories || [],
        author_name: postData.author_name || "DeshIt-BD Team",
        summary: postData.summary || "",
        meta_description: postData.meta_description || "",
        blog_content: postData.blog_content || "",
        status: postData.status || "Draft",
      });
    }
  }, [isEdit, postData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const toggleCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingImage(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      // Upload to server
      try {
        const uploadResult = await blogPostService.uploadImage(file);
        setFormData((prev) => ({
          ...prev,
          image: {
            url: uploadResult.data.url,
            filename: uploadResult.data.filename,
          },
        }));
      } catch (uploadErr) {
        console.error("Upload error:", uploadErr);
        // If upload fails, still keep the preview but show warning
        alert(
          "Image will be saved locally. Upload to server failed: " +
            uploadErr.message
        );
        setFormData((prev) => ({ ...prev, image: null }));
      }
    } catch (err) {
      alert("Failed to process image: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Rich text editor functions
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const insertHeading = (level) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const content = contentRef.current.innerHTML;

    if (selectedText) {
      const newContent = content.replace(
        selectedText,
        `<h${level}>${selectedText}</h${level}>`
      );
      contentRef.current.innerHTML = newContent;
      handleInputChange("blog_content", contentRef.current.innerText);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      handleInputChange("blog_content", contentRef.current.innerText);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const saveData = {
        ...formData,
        status: "Draft",
        image: formData.imagePreview || null,
      };
      delete saveData.imagePreview;

      if (isEdit && postData._id) {
        await blogPostService.updatePost(postData._id, saveData);
        alert("Draft saved successfully!");
      } else {
        await blogPostService.createPost(saveData);
        alert("Post created as draft!");
      }

      onClose();
    } catch (err) {
      setError(err.message || "Failed to save draft");
      alert(err.message || "Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (!formData.title || !formData.summary || !formData.blog_content) {
        alert(
          "Please fill in all required fields: Title, Summary, and Blog Content"
        );
        setLoading(false);
        return;
      }

      const publishData = {
        ...formData,
        image: formData.imagePreview || null,
      };
      delete publishData.imagePreview;

      if (isEdit && postData._id) {
        await blogPostService.updatePost(postData._id, publishData);
        await blogPostService.publishPost(postData._id);
        alert("Post published successfully!");
      } else {
        await blogPostService.createPost({
          ...publishData,
          status: "Published",
        });
        alert("Post published successfully!");
      }

      onClose();
    } catch (err) {
      setError(err.message || "Failed to publish post");
      alert(err.message || "Failed to publish post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        setLoading(true);
        if (isEdit && postData._id) {
          await blogPostService.deletePost(postData._id);
          alert("Post deleted!");
          onClose();
        }
      } catch (err) {
        alert(err.message || "Failed to delete post");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        <div
          className="flex gap-12 p-6 font-['Space_Grotesk',sans-serif] flex-1"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          {/* Main Content Area */}
          <div className="flex-1 max-w-[816px]">
            {/* Back Button & Title */}
            <div className="mb-6">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex items-center gap-2 p-4 border-0 text-base font-normal cursor-pointer mb-2 disabled:opacity-50"
                style={{ background: "transparent", color: "#6200EE" }}
              >
                ← Back
              </button>

              <h1
                className="text-2xl font-bold p-4 m-0"
                style={{ color: "#4A4A4A" }}
              >
                {isEdit ? `Edit: ${postData?.title}` : "Create New Post"}
              </h1>

              <div className="p-4 text-base" style={{ color: "#4A4A4A" }}>
                {isEdit ? `ID: ${postData?._id}` : "New Blog Post"}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form Container */}
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: "#E5E0E5" }}
            >
              {/* Title and Image */}
              <div className="flex gap-3 mb-6">
                {/* Title Field */}
                <div className="flex-1">
                  <label
                    className="block text-base font-bold p-4 mb-2"
                    style={{ color: "#4A4A4A" }}
                  >
                    title<span style={{ color: "#F62929" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full p-6 text-sm border rounded box-border shadow-[0_6px_12px_rgba(28,0,66,0.02)]"
                    style={{
                      border: "1px solid #DBDBDB",
                      backgroundColor: "white",
                    }}
                    disabled={loading}
                  />
                </div>

                {/* Image Upload */}
                <div className="flex-1">
                  <label
                    className="block text-base font-bold p-4 mb-2"
                    style={{ color: "#4A4A4A" }}
                  >
                    Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() =>
                      !uploadingImage && fileInputRef.current?.click()
                    }
                    className="w-full h-[157px] border rounded flex flex-col items-center justify-center cursor-pointer shadow-[0_6px_12px_rgba(28,0,66,0.02)] relative overflow-hidden"
                    style={{
                      border: "1px solid #DBDBDB",
                      backgroundColor: "white",
                    }}
                  >
                    {formData.imagePreview ? (
                      <>
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : uploadingImage ? (
                      <p className="text-sm" style={{ color: "#131313" }}>
                        Uploading...
                      </p>
                    ) : (
                      <>
                        <Upload size={24} color="#6200EE" />
                        <p
                          className="text-[10px] text-center mt-2 px-4"
                          style={{ color: "#131313" }}
                        >
                          Click to add an image or drag and drop one in this
                          area
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Date, Time, Featured Row */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {/* Publish Date */}
                <div className="flex-1 min-w-[250px]">
                  <label
                    className="block text-base font-bold py-4 mb-2"
                    style={{ color: "#4A4A4A" }}
                  >
                    Publish_on
                  </label>
                  <div className="flex gap-2">
                    <div
                      className="flex-1 flex items-center gap-2 px-4 py-2 border rounded"
                      style={{
                        border: "1px solid #DBDBDB",
                        backgroundColor: "white",
                      }}
                    >
                      <Calendar size={16} color="#4A4A4A" />
                      <input
                        type="date"
                        value={formData.publish_date}
                        onChange={(e) =>
                          handleInputChange("publish_date", e.target.value)
                        }
                        className="text-sm flex-1 border-0 outline-none"
                        style={{ color: "#4A4A4A" }}
                        disabled={loading}
                      />
                    </div>
                    <div
                      className="w-[154px] flex items-center gap-2 px-4 py-2 border rounded"
                      style={{
                        border: "1px solid #DBDBDB",
                        backgroundColor: "white",
                      }}
                    >
                      <Clock size={16} color="#4A4A4A" />
                      <input
                        type="time"
                        value={formData.publish_time}
                        onChange={(e) =>
                          handleInputChange("publish_time", e.target.value)
                        }
                        className="text-sm flex-1 border-0 outline-none"
                        style={{ color: "#4A4A4A" }}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Is Featured */}
                <div className="w-[292px]">
                  <label
                    className="block text-base font-bold py-4 mb-2"
                    style={{ color: "#4A4A4A" }}
                  >
                    is_featured
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleInputChange("is_featured", false)}
                      disabled={loading}
                      className="flex-1 px-4 py-2 text-base font-normal border rounded cursor-pointer disabled:opacity-50"
                      style={{
                        color: "#F62929",
                        backgroundColor: formData.is_featured
                          ? "white"
                          : "#F2F2F2",
                        border: "1px solid #DBDBDB",
                      }}
                    >
                      FALSE
                    </button>
                    <button
                      onClick={() => handleInputChange("is_featured", true)}
                      disabled={loading}
                      className="flex-1 px-4 py-2 text-base font-normal border rounded cursor-pointer disabled:opacity-50"
                      style={{
                        color: "#4A4A4A",
                        backgroundColor: formData.is_featured
                          ? "#F2F2F2"
                          : "white",
                        border: "1px solid #DBDBDB",
                      }}
                    >
                      TRUE
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label
                  className="block text-base font-bold py-4 mb-2"
                  style={{ color: "#4A4A4A" }}
                >
                  tags<span style={{ color: "#F62929" }}>*</span>
                </label>
                <div
                  className="flex gap-2 p-2 border rounded flex-wrap items-center"
                  style={{
                    border: "1px solid #DBDBDB",
                    backgroundColor: "white",
                  }}
                >
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 rounded-sm"
                      style={{ backgroundColor: "#BED38F" }}
                    >
                      <span className="text-base" style={{ color: "#4A4A4A" }}>
                        {tag}
                      </span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        disabled={loading}
                        className="border-0 p-0 cursor-pointer flex disabled:opacity-50"
                        style={{ background: "transparent" }}
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
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    disabled={loading}
                    className="flex-1 min-w-[100px] p-2 border-0 text-base outline-none"
                    style={{ backgroundColor: "transparent" }}
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="mb-6 relative" ref={categoryDropdownRef}>
                <label
                  className="block text-base font-bold py-3 mb-2"
                  style={{ color: "#4A4A4A" }}
                >
                  category<span style={{ color: "#F62929" }}>*</span>
                </label>
                <div
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="p-4 px-6 border rounded text-sm shadow-[0_6px_12px_rgba(28,0,66,0.02)] cursor-pointer flex justify-between items-center"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.29)",
                    backgroundColor: "white",
                    color: "#131313",
                  }}
                >
                  <span>
                    {formData.categories.length > 0
                      ? formData.categories.join(", ")
                      : "Select categories..."}
                  </span>
                  <ChevronDown size={16} />
                </div>

                {showCategoryDropdown && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white border rounded shadow-lg z-10 max-h-60 overflow-auto"
                    style={{ border: "1px solid #DBDBDB" }}
                  >
                    {CATEGORIES.map((category) => (
                      <label
                        key={category}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="mr-3"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Author */}
              <div className="mb-6">
                <label
                  className="block text-base font-bold py-3 mb-2"
                  style={{ color: "#4A4A4A" }}
                >
                  author<span style={{ color: "#F62929" }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) =>
                    handleInputChange("author_name", e.target.value)
                  }
                  disabled={loading}
                  className="w-full py-4 px-6 text-sm border rounded shadow-[0_6px_12px_rgba(28,0,66,0.02)] box-border"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.29)",
                    backgroundColor: "white",
                  }}
                />
              </div>

              {/* Summary */}
              <div className="mb-6">
                <label
                  className="block text-base font-bold py-4 mb-2"
                  style={{ color: "#4A4A4A" }}
                >
                  summary<span style={{ color: "#F62929" }}>*</span>
                </label>
                <textarea
                  placeholder="Write a brief summary..."
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  disabled={loading}
                  className="w-full h-[115px] p-6 text-sm border rounded resize-y box-border shadow-[0_6px_12px_rgba(28,0,66,0.02)] font-['Space_Grotesk',sans-serif]"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.29)",
                    backgroundColor: "white",
                  }}
                />
              </div>

              {/* Meta Description */}
              <div className="mb-6">
                <label
                  className="block text-base font-bold py-4 mb-2"
                  style={{ color: "#4A4A4A" }}
                >
                  meta description
                </label>
                <textarea
                  placeholder="SEO meta description..."
                  value={formData.meta_description}
                  onChange={(e) =>
                    handleInputChange("meta_description", e.target.value)
                  }
                  disabled={loading}
                  className="w-full h-[93px] p-6 text-sm border rounded resize-y box-border shadow-[0_6px_12px_rgba(28,0,66,0.02)] font-['Space_Grotesk',sans-serif]"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.29)",
                    backgroundColor: "white",
                  }}
                />
              </div>

              {/* Blog Content with Rich Text Editor */}
              <div>
                <label
                  className="block text-base font-bold py-4 mb-2"
                  style={{ color: "#4A4A4A" }}
                >
                  Blog Content<span style={{ color: "#F62929" }}>*</span>
                </label>

                {/* Toolbar */}
                <div
                  className="flex items-center gap-[7px] p-2 rounded-t flex-wrap"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid rgba(0, 0, 0, 0.35)",
                  }}
                >
                  <button
                    onClick={() => applyFormat("formatBlock", "<p>")}
                    className="px-2 py-1 border-0 cursor-pointer font-semibold text-lg hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Paragraph"
                  >
                    p
                  </button>
                  <button
                    onClick={() => insertHeading(1)}
                    className="px-2 py-1 border-0 cursor-pointer font-semibold text-lg hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    onClick={() => insertHeading(2)}
                    className="px-2 py-1 border-0 cursor-pointer font-bold text-lg hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => applyFormat("bold")}
                    className="px-2 py-1 border-0 cursor-pointer font-bold hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    onClick={() => applyFormat("italic")}
                    className="px-2 py-1 border-0 cursor-pointer italic hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    onClick={() => applyFormat("underline")}
                    className="px-2 py-1 border-0 cursor-pointer underline hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Underline"
                  >
                    U
                  </button>
                  <button
                    onClick={() => applyFormat("strikeThrough")}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Strikethrough"
                  >
                    S
                  </button>
                  <button
                    onClick={() => applyFormat("insertUnorderedList")}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Bullet List"
                  >
                    •
                  </button>
                  <button
                    onClick={() => applyFormat("insertOrderedList")}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Numbered List"
                  >
                    1.
                  </button>
                  <button
                    onClick={() => applyFormat("justifyLeft")}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Align Left"
                  >
                    ≡
                  </button>
                  <button
                    onClick={() => applyFormat("justifyCenter")}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Align Center"
                  >
                    ≣
                  </button>
                  <button
                    onClick={() => applyFormat("insertHorizontalRule")}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Horizontal Line"
                  >
                    —
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Insert Image"
                  >
                    🖼
                  </button>
                  <button
                    onClick={() => applyFormat("removeFormat")}
                    className="px-2 py-1 border-0 cursor-pointer hover:bg-gray-100"
                    style={{ background: "transparent" }}
                    title="Clear Formatting"
                  >
                    ⋮
                  </button>
                </div>

                {/* Content Area with ContentEditable */}
                <div
                  ref={contentRef}
                  contentEditable={!loading}
                  onInput={handleContentChange}
                  className="w-full min-h-[303px] p-4 text-sm border-t-0 rounded-b box-border font-['Space_Grotesk',sans-serif] outline-none overflow-auto"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.29)",
                    backgroundColor: "white",
                  }}
                  suppressContentEditableWarning
                  dangerouslySetInnerHTML={{ __html: formData.blog_content }}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[412px] flex flex-col gap-2 sticky top-6 h-fit">
            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handlePublish}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border-0 rounded-lg text-base cursor-pointer disabled:opacity-50 hover:opacity-80"
                style={{ backgroundColor: "#E6E6E6", color: "#4A4A4A" }}
              >
                {loading ? "Publishing..." : "+ Publish"}
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 border-0 rounded-lg text-base cursor-pointer disabled:opacity-50 hover:opacity-80"
                style={{ backgroundColor: "#E6E6E6", color: "#4A4A4A" }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

            {/* Draft Status */}
            <div
              className="p-4 rounded-lg flex items-center gap-2"
              style={{ backgroundColor: "#E8F6FB" }}
            >
              <span className="text-base" style={{ color: "#4A4A4A" }}>
                {isEdit ? "Editing existing post" : "Creating new post"}
              </span>
            </div>

            {/* Information Section */}
            {isEdit && postData && (
              <div>
                <div
                  className="p-4 text-base font-normal uppercase"
                  style={{
                    borderBottom: "1px solid #DBDBDB",
                    color: "#4A4A4A",
                  }}
                >
                  INFORMATION
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between p-4">
                    <span
                      className="font-bold text-base"
                      style={{ color: "#4A4A4A" }}
                    >
                      Created
                    </span>
                    <span className="text-sm" style={{ color: "#4A4A4A" }}>
                      {new Date(postData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span
                      className="font-bold text-base"
                      style={{ color: "#4A4A4A" }}
                    >
                      By
                    </span>
                    <span className="text-sm" style={{ color: "#4A4A4A" }}>
                      {postData.author_name}
                    </span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span
                      className="font-bold text-base"
                      style={{ color: "#4A4A4A" }}
                    >
                      Last update
                    </span>
                    <span className="text-sm" style={{ color: "#4A4A4A" }}>
                      {new Date(postData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span
                      className="font-bold text-base"
                      style={{ color: "#4A4A4A" }}
                    >
                      Status
                    </span>
                    <span className="text-sm" style={{ color: "#4A4A4A" }}>
                      {postData.status}
                    </span>
                  </div>
                  <div className="flex justify-between p-4">
                    <span
                      className="font-bold text-base"
                      style={{ color: "#4A4A4A" }}
                    >
                      Views
                    </span>
                    <span className="text-sm" style={{ color: "#4A4A4A" }}>
                      {postData.views || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                
                disabled={loading}
                className="flex items-center gap-3 px-4 py-3 border rounded text-base cursor-pointer disabled:opacity-50 hover:opacity-80"
                style={{
                  backgroundColor: "#F5EDFA",
                  border: "1px solid #DBDBDB",
                  color: "#6200EE",
                }}
              >
                <Pencil size={24} color="#6200EE" />
                Edit the model
              </button>

              <button
               
                disabled={loading}
                className="flex items-center gap-3 px-4 py-3 border rounded text-base cursor-pointer disabled:opacity-50 hover:opacity-80"
                style={{
                  backgroundColor: "#F5EDFA",
                  border: "1px solid #DBDBDB",
                  color: "#6200EE",
                }}
              >
                <Menu size={24} color="#6200EE" />
                Configure the view
              </button>

              {isEdit && (
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex items-center gap-3 px-4 py-3 border rounded text-base cursor-pointer disabled:opacity-50 hover:opacity-90"
                  style={{
                    backgroundColor: "#FCEDE6",
                    border: "1px solid #DBDBDB",
                    color: "#BD371A",
                  }}
                >
                  <Trash size={24} color="#BD371A" />
                  Delete this entry
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;
