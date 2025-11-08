
import "../style/contactus.css";

const ContactUs = () => {
  return (
    <main className="contactus">
    <div className="contact-container playfair-display">
      <h2>Contact Us</h2>
      <p className="contact-subtitle">We'd love to hear from you! Please fill out the form below.</p>
      
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="5" placeholder="Your Message" required></textarea>
        <button type="submit" className="contact-btn">Send Message</button>
      </form>
    </div>
    </main>
  );
};

export default ContactUs;
