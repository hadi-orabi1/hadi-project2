import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

/**
 * SocialIcons Component: Reusable set of social media links.
 */
export default function SocialIcons() {
  return (
    <div className="social-icons">
      <a href="https://instagram.com/yourstore" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://facebook.com/yourstore" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://twitter.com/yourstore" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
    </div>
  );
}
