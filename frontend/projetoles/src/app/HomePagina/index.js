// pages/index.js
import React from 'react';
import styles from '../HomePagina/HomePagina.module.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Livraria Aurora</div>
        <nav className="nav">
          <span>Carrinho</span>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Western Canada</h1>
          <p>by Jack Altman</p>
          <p>
            From the ocean-and-mountain backdrop of Vancouver to the exalting
            landscapes of the Rockies, from the flower gardens of Victoria to Alberta's
            barren Badlands.
          </p>
        </div>
        <div className="featured-books">
          <img src="/images/book1.jpg" alt="Canada" />
          <img src="/images/book2.jpg" alt="Paris" />
          <img src="/images/book3.jpg" alt="Cuba" />
          <img src="/images/book4.jpg" alt="Vietnam" />
        </div>
      </section>

      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="book-grid">
          <div className="book-card">
            <img src="/images/book5.jpg" alt="Book Title" />
            <p>Book Title</p>
            <p>$18</p>
          </div>
          <div className="book-card">
            <img src="/images/book6.jpg" alt="Book Title" />
            <p>Book Title</p>
            <p>$24</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
