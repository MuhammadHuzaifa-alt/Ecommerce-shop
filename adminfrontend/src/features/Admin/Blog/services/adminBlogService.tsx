import axios from "axios";

// ==========================================================
// API
// ==========================================================

const BLOG_API_URL = "/api/admin/blogs/";

const CATEGORY_API_URL = "/api/admin/blog-categories/";


// ==========================================================
// TYPES
// ==========================================================

export interface BlogCategory {
  id: number;
  name: string;
}

export interface AdminBlog {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string | null;
  category: BlogCategory;
  author: string;
  date: string;
  tags?: string[];
  views?: number;
  readTime?: number;
}

export interface BlogFormData {
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  date: string;
  tags: string;
  readTime: string;
  image?: File | null;
}


// ==========================================================
// GET ALL BLOGS
// ==========================================================

export const getAdminBlogs = async (): Promise<AdminBlog[]> => {
  const response = await axios.get(BLOG_API_URL);

  return response.data;
};


// ==========================================================
// GET SINGLE BLOG
// ==========================================================

export const getAdminBlog = async (
  id: number
): Promise<AdminBlog> => {
  const response = await axios.get(
    `${BLOG_API_URL}${id}/`
  );

  return response.data;
};


// ==========================================================
// CREATE BLOG
// ==========================================================

export const createAdminBlog = async (
  blog: BlogFormData
): Promise<AdminBlog> => {

  const formData = new FormData();

  formData.append("title", blog.title);
  formData.append("description", blog.description);
  formData.append("content", blog.content);

  // Category ID
  formData.append(
    "category_id",
    String(blog.category)
  );

  formData.append("author", blog.author);
  formData.append("date", blog.date);

  // Convert tags into valid JSON
  const tags = blog.tags
    ? blog.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  formData.append(
    "tags",
    JSON.stringify(tags)
  );

  formData.append(
    "readTime",
    blog.readTime || "0"
  );

  if (blog.image) {
    formData.append(
      "image",
      blog.image
    );
  }

  console.log("CREATE BLOG FORM DATA:");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await axios.post(
    BLOG_API_URL,
    formData
  );

  return response.data;
};
// ==========================================================
// UPDATE BLOG
// ==========================================================

export const updateAdminBlog = async (
  id: number,
  blog: BlogFormData
): Promise<AdminBlog> => {

  const formData = new FormData();

  formData.append(
    "title",
    blog.title
  );

  formData.append(
    "description",
    blog.description
  );

  formData.append(
    "content",
    blog.content
  );

  // Category ID
  formData.append(
    "category_id",
    String(blog.category)
  );

  formData.append(
    "author",
    blog.author
  );

  formData.append(
    "date",
    blog.date
  );

  // Convert comma-separated tags into JSON array
  const tags = blog.tags
    ? blog.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  formData.append(
    "tags",
    JSON.stringify(tags)
  );

  formData.append(
    "readTime",
    blog.readTime || "0"
  );

  // Only send image if a new image was selected
  if (blog.image) {
    formData.append(
      "image",
      blog.image
    );
  }

  const response = await axios.put(
    `${BLOG_API_URL}${id}/`,
    formData
  );

  return response.data;
};

// ==========================================================
// DELETE BLOG
// ==========================================================

export const deleteAdminBlog = async (
  id: number
): Promise<void> => {

  await axios.delete(
    `${BLOG_API_URL}${id}/`
  );
};


// ==========================================================
// GET BLOG CATEGORIES
// ==========================================================

export const getAdminBlogCategories =
  async (): Promise<BlogCategory[]> => {

    const response = await axios.get(
      CATEGORY_API_URL
    );

    console.log(
      "CATEGORY API RESPONSE:",
      response.data
    );

    return response.data;
  };