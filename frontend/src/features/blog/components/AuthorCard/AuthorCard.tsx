import "./AuthorCard.css";

export interface Author {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface AuthorCardProps {
  author: Author;
}

const AuthorCard = ({ author }: AuthorCardProps) => {
  return (
    <article className="author-card">
      <div className="author-image">
        <img
          src={author.image}
          alt={`${author.name}, ${author.role}`}
        />
      </div>

      <div className="author-content">
        <span className="author-role">
          {author.role}
        </span>

        <h3>{author.name}</h3>

        <p>{author.bio}</p>
      </div>
    </article>
  );
};

export default AuthorCard;