import "./BlogTags.css";

interface BlogTagsProps {
    tags: string[];
    onTagClick?: (tag: string) => void;
}

const BlogTags = ({
    tags,
    onTagClick,
}: BlogTagsProps) => {
    return (
        <section className="blog-tags">
            <h3>Tags</h3>

            <div className="tags-container">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        className="tag-item"
                        onClick={() => onTagClick?.(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default BlogTags;