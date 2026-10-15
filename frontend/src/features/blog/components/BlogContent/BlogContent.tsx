import "./BlogContent.css";

export interface BlogContentData {
  title: string;
  content: string;
}

interface BlogContentProps {
  blog: BlogContentData;
}

const BlogContent = ({ blog }: BlogContentProps) => {
  const paragraphs = blog.content
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="blog-content-article">
      <h1 className="blog-title">
        {blog.title}
      </h1>

      <div className="blog-content-body">
        {paragraphs.map((paragraph, index) => (
          <p key={`${paragraph}-${index}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};

export default BlogContent;