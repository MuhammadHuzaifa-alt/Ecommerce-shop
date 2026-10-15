import "./ContactInfo.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <section className="contact-info">
      <div className="contact-info-container">

        <div className="info-header">
          <span>Get in Touch</span>
          <h2>Visit Our Office</h2>
          <p>
            We'd love to hear from you. Reach us through any of the
            following channels or visit our office during business hours.
          </p>
        </div>

        <div className="info-grid">

          {/* Address */}

          <div className="info-card">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>

            <h3>Office Address</h3>

            <p>
              ShopHub Headquarters
            </p>

            <p>
              Blue Area, Islamabad,
              Pakistan
            </p>
          </div>

          {/* Phone */}

          <div className="info-card">
            <div className="info-icon">
              <FaPhoneAlt />
            </div>

            <h3>Phone</h3>

            <p>+92 300 1234567</p>

            <p>+92 51 1234567</p>
          </div>

          {/* Email */}

          <div className="info-card">
            <div className="info-icon">
              <FaEnvelope />
            </div>

            <h3>Email</h3>

            <p>support@shophub.com</p>

            <p>sales@shophub.com</p>
          </div>

          {/* Hours */}

          <div className="info-card">
            <div className="info-icon">
              <FaClock />
            </div>

            <h3>Business Hours</h3>

            <p>Mon - Fri : 9:00 AM - 6:00 PM</p>

            <p>Saturday : 10:00 AM - 4:00 PM</p>
          </div>

        </div>

        {/* Social */}

        <div className="social-section">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

          </div>

        </div>

        {/* Google Map */}

        <div className="map-container">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Islamabad,Pakistan&output=embed"
            loading="lazy"
          />

        </div>

      </div>
    </section>
  );
};

export default ContactInfo;