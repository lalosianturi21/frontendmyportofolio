import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_h6i055h', 'template_r596eum', form.current, 'n2qVOOwl2AhovvL9S')
      .then(
        () => {
          setStatusMessage('Message sent successfully! ✅');
          form.current.reset(); // Mengosongkan form setelah berhasil
        },
        (error) => {
          setStatusMessage('Failed to send message. ❌');
          console.error('Error:', error.text);
        }
      );
  };

  return (
    <main>
      <section className="contact section" id="contact">
        <h2 className="section-title">Contact</h2>

        <div className="contact__container bd-grid">
          <form ref={form} onSubmit={sendEmail} className="contact__form">
            <input type="text" placeholder="Name" name="user_name" className="contact__input" required />
            <input type="email" placeholder="Email" name="user_email" className="contact__input" required />
            <textarea name="message" cols="30" rows="10" className="contact__input" required></textarea>
            <button type="submit" className="contact__button button">Send</button>
          </form>

          {/* Menampilkan status pesan */}
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
      </section>
    </main>
  );
};

export default Contact;
