// src/components/About.jsx
import React from 'react';
import "../style/about.css";

const About = () => {
  return (
    <main className='about'>
    <div className="about-container playfair-display">
      <h2>About Inkly</h2>
      <p className="about-intro">
        Welcome to <strong>Inkly</strong> – your trusted platform to buy and sell books with ease!
      </p>

      <p>
        At Inkly, we believe that books should never go unread. Our mission is to create a
        seamless experience for students, readers, and book enthusiasts to exchange knowledge
        through affordable and accessible books.
      </p>

      <p>
        Whether you're looking to declutter your shelf or find your next great read, Inkly connects
        you with a community that values literature and learning. We support sustainable reading
        habits and aim to reduce paper waste by promoting book reuse.
      </p>

      <p>
        Thank you for being a part of the Inkly journey. Let’s build a more informed and sustainable world together — one book at a time.
      </p>
    </div>
    </main>
  );
};

export default About;
