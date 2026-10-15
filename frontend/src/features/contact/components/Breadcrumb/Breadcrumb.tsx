import "./Breadcrumb.css";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <section className="breadcrumb">
      <div className="breadcrumb-container">

        {items.map((item, index) => (
          <div
            className="breadcrumb-item"
            key={index}
          >
            {item.path ? (
              <Link to={item.path}>
                {item.label}
              </Link>
            ) : (
              <span className="active">
                {item.label}
              </span>
            )}

            {index !== items.length - 1 && (
              <FaChevronRight className="separator" />
            )}
          </div>
        ))}

      </div>
    </section>
  );
};

export default Breadcrumb;