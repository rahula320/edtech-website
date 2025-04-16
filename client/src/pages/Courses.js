import React from 'react';
import './Courses.css';

function Courses() {
  const courseCategories = [
    { id: 1, name: 'Development', count: 42 },
    { id: 2, name: 'Data Science', count: 36 },
    { id: 3, name: 'Artificial Intelligence', count: 28 },
    { id: 4, name: 'Machine Learning', count: 24 },
    { id: 5, name: 'Web Development', count: 18 },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      category: 'Development',
      duration: '12 weeks',
      level: 'Intermediate',
      rating: 4.8,
      reviews: 2405,
      price: 599,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      tag: 'Bestseller'
    },
    {
      id: 2,
      title: 'Artificial Intelligence Fundamentals',
      category: 'Artificial Intelligence',
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.9,
      reviews: 1834,
      price: 699,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      tag: 'New'
    },
    {
      id: 3,
      title: 'Machine Learning Masterclass',
      category: 'Machine Learning',
      duration: '8 weeks',
      level: 'All Levels',
      rating: 4.7,
      reviews: 1567,
      price: 499,
      originalPrice: 899,
      image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
      tag: 'Popular'
    },
    {
      id: 4,
      title: 'Web Development Bootcamp',
      category: 'Web Development',
      duration: '6 weeks',
      level: 'Beginner',
      rating: 4.6,
      reviews: 1209,
      price: 399,
      originalPrice: 699,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80',
      tag: 'Beginner Friendly'
    },
    {
      id: 5,
      title: 'Advanced Machine Learning Concepts',
      category: 'Machine Learning',
      duration: '8 weeks',
      level: 'Advanced',
      rating: 4.9,
      reviews: 987,
      price: 549,
      originalPrice: 899,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      tag: 'Advanced'
    },
    {
      id: 6,
      title: 'Deep Learning with Artificial Intelligence',
      category: 'Artificial Intelligence',
      duration: '9 weeks',
      level: 'Intermediate',
      rating: 4.7,
      reviews: 1102,
      price: 499,
      originalPrice: 899,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
      tag: 'High Demand'
    }
  ];

  return (
    <div className="courses-page">
      <section className="courses-hero">
        <h1>💻 Explore Diverse Domains in Computer Science</h1>
        <p>Discover the perfect course to advance your skills and career</p>
        <div className="search-container">
          <input type="text" placeholder="Search for courses..." />
          <button className="search-button">Search</button>
        </div>
      </section>

      <section className="courses-domain-highlight">
        <h2>Our Specialized Domains</h2>
        <p>Master the most in-demand skills with our industry-aligned programs</p>
        <div className="domain-cards">
          <div className="domain-highlight-card">
            <h3>Artificial Intelligence</h3>
            <p>Learn how AI is revolutionizing industries and gain the skills to build intelligent systems</p>
            <button className="book-now-btn">Book Now</button>
          </div>
          <div className="domain-highlight-card">
            <h3>Machine Learning</h3>
            <p>Master algorithms and statistical models that enable computers to improve with experience</p>
            <button className="book-now-btn">Book Now</button>
          </div>
          <div className="domain-highlight-card">
            <h3>Web Development</h3>
            <p>Build responsive, dynamic websites and web applications with modern frameworks</p>
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      </section>

      <section className="courses-content">
        <div className="courses-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="category-list">
              {courseCategories.map(category => (
                <li key={category.id}>
                  <span>{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <input type="range" min="0" max="1000" className="range-slider" />
              <div className="price-inputs">
                <input type="number" placeholder="Min" min="0" max="1000" />
                <input type="number" placeholder="Max" min="0" max="1000" />
              </div>
            </div>
          </div>
          
          <div className="filter-section">
            <h3>Level</h3>
            <div className="checkbox-group">
              <label><input type="checkbox" /> Beginner</label>
              <label><input type="checkbox" /> Intermediate</label>
              <label><input type="checkbox" /> Advanced</label>
              <label><input type="checkbox" /> All Levels</label>
            </div>
          </div>
        </div>
        
        <div className="courses-list">
          <div className="courses-header">
            <h2>Featured Courses</h2>
            <div className="sort-options">
              <label>Sort by:</label>
              <select>
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="courses-grid">
            {featuredCourses.map(course => (
              <div className="course-card" key={course.id}>
                <div className="course-image">
                  <span className="course-tag">{course.tag}</span>
                  <img src={course.image} alt={course.title} />
                </div>
                <div className="course-content">
                  <span className="course-category">{course.category}</span>
                  <h3>{course.title}</h3>
                  <div className="course-details">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="course-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">{course.rating}</span>
                    <span className="reviews">({course.reviews} reviews)</span>
                  </div>
                  <div className="course-price">
                    <span className="price">${course.price}</span>
                    <span className="original-price">${course.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pagination">
            <button className="pagination-arrow">←</button>
            <button className="pagination-number active">1</button>
            <button className="pagination-number">2</button>
            <button className="pagination-number">3</button>
            <span className="pagination-dots">...</span>
            <button className="pagination-number">12</button>
            <button className="pagination-arrow">→</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses; 