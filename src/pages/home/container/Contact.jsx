import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toastify

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_h6i055h', 'template_r596eum', form.current, 'n2qVOOwl2AhovvL9S')
      .then(
        () => {
          toast.success('✅ Message sent successfully!', {
            position: 'top-right',
            autoClose: 3000, // Notifikasi menghilang dalam 3 detik
          });
          form.current.reset(); // Reset form setelah berhasil
        },
        (error) => {
          toast.error('❌ Failed to send message.', {
            position: 'top-right',
            autoClose: 3000,
          });
          console.error('Error:', error.text);
        }
      );
  };

  return (
    <main>
      <section className="contact section" id="contact">
        <h2 className="section-title">Contact</h2>

        <div className="contact__container bd-grid">
          <div className="form-contact">
            <form ref={form} onSubmit={sendEmail} className="contact__form">
              <input type="text" placeholder="Name" name="user_name" className="contact__input" required />
              <input type="email" placeholder="Email" name="user_email" className="contact__input" required />
              <textarea name="message" cols="30" rows="10" className="contact__input" required></textarea>
              <button type="submit" className="contact__button button">Send</button>
            </form>
          </div>
        </div>

        {/* Tambahkan ToastContainer agar notifikasi bisa ditampilkan */}
        <ToastContainer />
      </section>
    </main>
  );
};

export default Contact;
