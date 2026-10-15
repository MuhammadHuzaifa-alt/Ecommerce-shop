import { useState } from "react";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaWhatsapp,
    FaLink,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import "./ShareButtons.css";

interface ShareButtonsProps {
    url: string;
    title: string;
}

const ShareButtons = ({
    url,
    title,
}: ShareButtonsProps) => {
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "Facebook",
            className: "facebook",
            icon: <FaFacebookF aria-hidden="true" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: "X",
            className: "twitter",
            icon: <FaXTwitter aria-hidden="true" />,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        },
        {
            name: "LinkedIn",
            className: "linkedin",
            icon: <FaLinkedinIn aria-hidden="true" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: "WhatsApp",
            className: "whatsapp",
            icon: <FaWhatsapp aria-hidden="true" />,
            url: `https://wa.me/?text=${encodeURIComponent(
                `${title} ${url}`
            )}`,
        },
    ];

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    };

    return (
        <section className="share-buttons">
            <h3>Share This Article</h3>

            <div className="share-list">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`share-btn ${link.className}`}
                    >
                        {link.icon}
                        <span>{link.name}</span>
                    </a>
                ))}

                <button
                    type="button"
                    className="share-btn copy"
                    onClick={handleCopy}
                >
                    <FaLink aria-hidden="true" />
                    <span>
                        {copied ? "Copied!" : "Copy Link"}
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ShareButtons;