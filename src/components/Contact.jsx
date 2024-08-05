import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const ContactForm = () => {
  const h2Ref = useRef(null); // Ref for h2
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  const h2Animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { duration: 1000 },
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const templateParams = {
      name: formData.name,
      user_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        'service_ueigjld',
        'template_88cv7ic',
        templateParams,
        'VWNebOgIYa__KjLMN'
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          alert('Failed to send message. Please try again later.');
        }
      );

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <animated.h2 ref={h2Ref} className="h2" style={h2Animation}>
        Let's get in touch!
      </animated.h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            placeholder="Enter your name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            placeholder="Enter your email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            placeholder="Enter your message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <div ref={inViewRef}></div> {/* This is where you use the ref for inView */}
    </div>
  );
};

export default ContactForm;
