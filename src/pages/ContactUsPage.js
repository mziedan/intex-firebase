const ContactUsPage = () => {
  const handleContactFormSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const message = event.target.elements[2].value;
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        alert("Message sent successfully!");
        event.target.reset();
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message.");
    }
  };
  return `
    <section class="contact-us">
      <h2>Contact Us</h2>
      <div class="contact-details">
        <p>Email: info@training.com</p>
        <p>Phone: +1234567890</p>
        <p>Address: 123 Training St, City, Country</p>
      </div>
      <div class="map">
        <h3>Map (Placeholder)</h3>
      </div>
      <form class="contact-form" id="contact-form">
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
};
const handleContactUsPage = () => {
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
export {ContactUsPage, handleContactUsPage};