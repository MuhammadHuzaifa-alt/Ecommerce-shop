import "./ContactForm.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const ContactForm = () => {
  return (
    <section className="contact-form-section">
      <div className="contact-form-container">

        {/* Left Side */}

        <div className="contact-details">

          <span className="contact-label">
            Contact Us
          </span>

          <h2>We're here to help</h2>

          <p>
            Have a question about your order, payment,
            delivery, or account? Fill out the form and our
            support team will respond as soon as possible.
          </p>

          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <div>
              <h4>Email</h4>
              <span>support@shophub.com</span>
            </div>
          </div>

          <div className="detail-item">
            <FaPhoneAlt className="detail-icon" />
            <div>
              <h4>Phone</h4>
              <span>+92 300 1234567</span>
            </div>
          </div>

          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <div>
              <h4>Office</h4>
              <span>Islamabad, Pakistan</span>
            </div>
          </div>

        </div>

        {/* Right Side */}

        <div className="contact-form-card">

          <form>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                />
              </div>

            </div>

            <div className="form-group">
              <label>Message</label>

              <textarea
                rows={6}
                placeholder="Write your message..."
              />
            </div>

            <button className="submit-btn">
              <FaPaperPlane />
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;