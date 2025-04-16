// src/components/Footer.js
const Footer = () => {
  return `
    <footer>
      <div class='contact-info'>
        <h3>Contact Us</h3>
        <p>Email: info@training.com</p>
        <p>Phone: +1234567890</p>
        <p>Address: 123 Training St, City, Country</p>
      </div>
      <form class='contact-form'>
        <h3>Contact Form</h3>
        <input type='text' placeholder='Your Name'>
        <input type='email' placeholder='Your Email'>
        <textarea placeholder='Your Message'></textarea>
        <button type='submit'>Send</button>
      </form>
      <div class='map'>
        <h3>Map (Placeholder)</h3>
      </div>
      <nav>
        <ul>
            <li><a href='#/privacy-policy'>Privacy Policy</a></li><li><a href='#/terms-conditions'>Terms & Conditions</a></li>
        </ul>
      </nav>
      <div class='copyright'>
        <p>&copy; 2023 Offline Training Company</p>
      </div>
    </footer>
  `;
};

export default Footer;