import React from "react";
import "../Assets/Footer.css";
import { QRCodeCanvas } from "qrcode.react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
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

        <div className="qr-section">
          <p>Scan to visit:</p>
          <QRCodeCanvas value="https://yourstore.com" size={100} />
        </div>
      </div>

      <div className="footer-bottom">
        <p><span className="green-title">© 2025 Online Bookstore</span>. All rights reserved.</p>
        <a href="https://yourstore.com" target="_blank" rel="noopener noreferrer">
          Visit our store →
        </a>
      </div>
    </footer>
  );
}
