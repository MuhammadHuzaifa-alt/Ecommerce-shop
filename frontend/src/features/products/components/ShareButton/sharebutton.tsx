import { useState } from "react";
import { FaShareAlt, FaCheck } from "react-icons/fa";
import "./sharebutton.css";

interface ShareButtonProps {
  productName: string;
  productUrl?: string;
  icon?: React.ReactNode;
  text?: string;
}

const ShareButton = ({
  productName,
  productUrl = window.location.href,
  icon,
  text,
}: ShareButtonProps) => {

  const [copied, setCopied] = useState(false);

  const handleShare = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {

    // Prevent ProductCard click
    e.preventDefault();
    e.stopPropagation();

    // Native Share
    if (navigator.share) {

      try {

        await navigator.share({
          title: productName,
          text: `Check out this product: ${productName}`,
          url: productUrl,
        });

        return;

      } catch {

        // User cancelled sharing

      }

    }

    // Copy URL
    try {

      await navigator.clipboard.writeText(productUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {

      console.error("Unable to copy link", error);

    }

  };

  return (

    <button
      className="share-btn"
      onClick={handleShare}
      aria-label="Share Product"
    >

      {copied ? <FaCheck /> : icon ?? <FaShareAlt />}

      {text && <span>{copied ? "Copied" : text}</span>}

    </button>

  );

};

export default ShareButton;