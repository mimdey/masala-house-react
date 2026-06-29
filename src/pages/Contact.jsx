function Contact() {
  return (
    <main className="page-section container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">Visit us or send us a message.</p>

      <div className="row g-4">
        <div className="col-md-6">
          <form className="contact-box">
            <h2 className="text-warning mb-3">Send a Message</h2>

            <label className="form-label">Name</label>
            <input className="form-control mb-3" type="text" placeholder="Enter your name" required />

            <label className="form-label">Email</label>
            <input className="form-control mb-3" type="email" placeholder="Enter your email" required />

            <label className="form-label">Message</label>
            <textarea className="form-control mb-3" rows="5" placeholder="Write your message" required></textarea>

            <button className="btn btn-warning fw-bold" type="submit">
              Submit
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <div className="contact-box">
            <h2 className="text-warning mb-3">Our Location</h2>
            <iframe
              title="Masala House Location"
              src="https://www.google.com/maps?q=New%20York%20City&output=embed"
              className="map-frame"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;