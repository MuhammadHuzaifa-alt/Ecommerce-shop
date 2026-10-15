import { useParams } from "react-router-dom";

import "./BlogDetails.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import BlogImage from "../../components/BlogImage";
import BlogContent from "../../components/BlogContent";
import BlogTags from "../../components/BlogTags";
import ShareButtons from "../../components/ShareButtons";
import AuthorCard from "../../components/AuthorCard";
import RelatedBlogs from "../../components/RelatedBlogs";

import useBlogDetails from "../../hooks/useBlogDetails";

const BlogDetails = () => {
    const { id } =
        useParams<{ id: string }>();

    const {
        blog,
        relatedBlogs,
        loading,
        error,
    } = useBlogDetails(id);

    if (loading) {
        return (
            <>
                <Navbar />

                <main
                    className="blog-loading"
                    aria-live="polite"
                >
                    Loading article...
                </main>

                <Footer />
            </>
        );
    }

    if (error || !blog) {
        return (
            <>
                <Navbar />

                <main
                    className="blog-error"
                    role="alert"
                >
                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error ||
                            "Blog not found."}
                    </p>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="blog-details">
                <nav
                    className="breadcrumb"
                    aria-label="Breadcrumb"
                >
                    <span>Home</span>

                    <span aria-hidden="true">
                        /
                    </span>

                    <span>Blog</span>

                    <span aria-hidden="true">
                        /
                    </span>

                    <span>
                        {blog.title}
                    </span>
                </nav>

                <article>
                    <BlogImage
                        image={blog.image}
                        title={blog.title}
                    />

                    <div className="blog-meta">
                        <span className="category">
                            {blog.category
                                ?.name ??
                                "Uncategorized"}
                        </span>

                        <time
                            dateTime={
                                blog.date
                            }
                        >
                            {blog.date}
                        </time>

                        {blog.readTime !=
                            null && (
                            <span>
                                {
                                    blog.readTime
                                }{" "}
                                min read
                            </span>
                        )}

                        {blog.views !=
                            null && (
                            <span>
                                {blog.views}{" "}
                                Views
                            </span>
                        )}
                    </div>

                    <BlogContent
                        blog={{
                            title:
                                blog.title,
                            content:
                                blog.content,
                        }}
                    />

                    {blog.tags.length >
                        0 && (
                            <BlogTags
                                tags={blog.tags.map(
                                    (tag) => tag.name
                                )}
                        />
                    )}

                    <ShareButtons
                        url={
                            window.location
                                .href
                        }
                        title={
                            blog.title
                        }
                    />

                    <AuthorCard
                        author={{
                            id: 0,
                            name:
                                blog.author,
                            role:
                                "Blog Author",
                            image: "",
                            bio: "",
                        }}
                    />

                    {relatedBlogs.length >
                        0 && (
                        <RelatedBlogs
                            blogs={
                                relatedBlogs
                            }
                        />
                    )}

                    <section
                        className="comments-section"
                        aria-labelledby="comments-title"
                    >
                        <h2 id="comments-title">
                            Customer
                            Comments
                        </h2>

                        <p>
                            Comments will
                            appear here.
                        </p>
                    </section>
                </article>
            </main>

            <Footer />
        </>
    );
};

export default BlogDetails;