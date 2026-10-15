import "./CommentCard.css";

import { FaStar } from "react-icons/fa";

export interface Comment {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    content: string;
    date: string;
}

interface CommentCardProps {
    comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
    const stars = Array.from(
        { length: comment.rating },
        (_, index) => index
    );

    return (
        <article className="comment-card">
            <img
                src={comment.avatar}
                alt={comment.name}
                className="comment-avatar"
            />

            <div className="comment-content">
                <div className="comment-header">
                    <div>
                        <h4>{comment.name}</h4>

                        <time>{comment.date}</time>
                    </div>

                    <div
                        className="comment-rating"
                        aria-label={`Rating: ${comment.rating} out of 5`}
                    >
                        {stars.map((star) => (
                            <FaStar
                                key={star}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                </div>

                <p>{comment.content}</p>
            </div>
        </article>
    );
};

export default CommentCard;