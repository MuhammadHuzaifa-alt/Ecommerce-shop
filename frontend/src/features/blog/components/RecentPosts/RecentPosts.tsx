import "./RecentPosts.css";

import { Link } from "react-router-dom";

export interface RecentPost {
    id: number;
    title: string;
    image: string;
    date: string;
}

interface RecentPostsProps {
    posts: RecentPost[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
    return (
        <section className="recent-posts">
            <h3>Recent Posts</h3>

            {posts.map((post) => (
                <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="recent-post"
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                    />

                    <div>
                        <h4>{post.title}</h4>

                        <time>{post.date}</time>
                    </div>
                </Link>
            ))}
        </section>
    );
};

export default RecentPosts;