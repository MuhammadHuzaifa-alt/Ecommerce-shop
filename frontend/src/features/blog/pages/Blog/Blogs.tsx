import { useMemo, useState } from "react";

import "./blog.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import SearchBlog from "../../components/SearchBlog";
import BlogCategory from "../../components/BlogCategory";
import BlogGrid from "../../components/BlogGrid";
import RecentPosts from "../../components/RecentPosts";

import { useBlogData } from "../../hooks/useBlogData";

const Blog = () => {
    const {
        blogs,
        categories,
        loading,
        error,
    } = useBlogData();

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState<number | null>(null);

    const filteredBlogs = useMemo(() => {
        const searchText = search
            .trim()
            .toLowerCase();

        return blogs.filter((blog) => {
            const matchesSearch =
                !searchText ||
                blog.title
                    .toLowerCase()
                    .includes(searchText) ||
                blog.description
                    .toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                selectedCategory === null ||
                blog.category?.id === selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        blogs,
        search,
        selectedCategory,
    ]);

    const recentPosts = useMemo(() => {
        return blogs.slice(0, 3);
    }, [blogs]);

    if (loading) {
        return (
            <>
                <Navbar />

                <main
                    className="blog-loading"
                    aria-live="polite"
                >
                    Loading blogs...
                </main>

                <Footer />
            </>
        );
    }

    if (error) {
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

                    <p>{error}</p>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="blog-page">
                <section className="blog-hero">
                    <h1>
                        E-Commerce Blog
                    </h1>

                    <p>
                        Shopping guides, trends
                        and product reviews.
                    </p>

                    <SearchBlog
                        onSearch={setSearch}
                    />
                </section>

                <section className="blog-container">
                    <aside
                        className="blog-sidebar"
                        aria-label="Blog sidebar"
                    >
                        <BlogCategory
                            categories={categories}
                            selectedCategory={
                                selectedCategory
                            }
                            onCategoryChange={
                                setSelectedCategory
                            }
                        />

                        <RecentPosts
                            posts={recentPosts}
                        />
                    </aside>

                    <div className="blog-content">
                        <header className="blog-header">
                            <div>
                                <h2>
                                    Latest Articles
                                </h2>

                                <p aria-live="polite">
                                    {
                                        filteredBlogs.length
                                    }{" "}
                                    {
                                        filteredBlogs.length ===
                                        1
                                            ? "Article"
                                            : "Articles"
                                    }{" "}
                                    Found
                                </p>
                            </div>
                        </header>

                        {filteredBlogs.length >
                        0 ? (
                            <BlogGrid
                                blogs={
                                    filteredBlogs
                                }
                            />
                        ) : (
                            <div className="no-blogs">
                                <h3>
                                    No Articles Found
                                </h3>

                                <p>
                                    Try another
                                    search or
                                    category.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="newsletter">
                    <h2>
                        Subscribe To Our
                        Newsletter
                    </h2>

                    <p>
                        Receive the latest
                        shopping tips and
                        exclusive offers.
                    </p>

                    <form
                        className="newsletter-form"
                        onSubmit={(event) =>
                            event.preventDefault()
                        }
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email address"
                        />

                        <button type="submit">
                            Subscribe
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default Blog;