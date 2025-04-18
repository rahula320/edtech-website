import React from 'react';
import './Careers.css';

function Careers() {
  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Data Science Instructor",
      department: "Data Science",
      location: "Remote / Mumbai",
      type: "Full-time",
      description: "We're looking for an experienced Data Science professional to join our instructor team. The ideal candidate will have industry experience and a passion for teaching.",
      requirements: [
        "5+ years of experience in Data Science or related field",
        "Proven experience with Python, R, and machine learning frameworks",
        "Previous teaching or mentoring experience",
        "Excellent communication and presentation skills",
        "Masters or PhD in Computer Science, Statistics, or related field"
      ]
    },
    {
      id: 2,
      title: "Web Development Mentor",
      department: "Web Development",
      location: "Remote / Bangalore",
      type: "Part-time",
      description: "Join our mentorship team to guide students through their web development journey. You'll provide code reviews, feedback, and 1:1 mentoring sessions.",
      requirements: [
        "3+ years of professional web development experience",
        "Strong knowledge of modern JavaScript, React, and Node.js",
        "Experience mentoring junior developers",
        "Excellent communication and interpersonal skills",
        "Patience and enthusiasm for helping others learn"
      ]
    },
    {
      id: 3,
      title: "Curriculum Developer - Cloud Computing",
      department: "Curriculum",
      location: "Remote",
      type: "Full-time",
      description: "Help us develop comprehensive and industry-relevant cloud computing curriculum. You'll work with our instructional design team to create engaging learning experiences.",
      requirements: [
        "4+ years of experience with major cloud platforms (AWS, Azure, GCP)",
        "Experience with DevOps, Infrastructure as Code, and containerization",
        "Understanding of instructional design principles",
        "Clear technical writing skills",
        "Cloud certifications (AWS, Azure, or GCP) preferred"
      ]
    },
    {
      id: 4,
      title: "Student Success Manager",
      department: "Student Support",
      location: "Delhi",
      type: "Full-time",
      description: "Ensure our students have a successful learning journey by providing guidance, monitoring progress, and implementing retention strategies.",
      requirements: [
        "2+ years in education, customer success, or related field",
        "Strong interpersonal and communication skills",
        "Data-driven approach to problem-solving",
        "Ability to work with diverse student populations",
        "Background in technical education is a plus"
      ]
    },
    {
      id: 5,
      title: "Marketing Specialist - Education",
      department: "Marketing",
      location: "Mumbai / Bangalore",
      type: "Full-time",
      description: "Join our marketing team to help reach and engage prospective students. You'll develop and execute campaigns that showcase our educational programs.",
      requirements: [
        "3+ years of marketing experience, preferably in education",
        "Experience with digital marketing, content creation, and social media",
        "Data analytics skills to measure campaign effectiveness",
        "Creative thinking and excellent writing abilities",
        "Understanding of the education technology landscape"
      ]
    }
  ];

  return (
    <div className="careers-page">
      <div className="careers-hero">
        <div className="careers-hero-content">
          <h1>Join Our Mission to Transform Education</h1>
          <p>We're looking for passionate individuals who want to make a difference in the lives of students around the world. Explore our open positions and become part of our team.</p>
        </div>
      </div>

      <section className="careers-why-join">
        <div className="container">
          <h2>Why Work With Us</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-rocket"></i>
              <h3>Make an Impact</h3>
              <p>Help thousands of students transform their careers and achieve their dreams through education.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-laptop-house"></i>
              <h3>Remote-First Culture</h3>
              <p>Enjoy the flexibility of working remotely with a global team that values work-life balance.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-chart-line"></i>
              <h3>Growth Opportunities</h3>
              <p>Continuous learning, professional development, and clear pathways for career advancement.</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-users"></i>
              <h3>Collaborative Environment</h3>
              <p>Work alongside talented professionals who are passionate about education and technology.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="open-positions">
        <div className="container">
          <h2>Open Positions</h2>
          <div className="job-filters">
            <select className="filter-select">
              <option value="">All Departments</option>
              <option value="Data Science">Data Science</option>
              <option value="Web Development">Web Development</option>
              <option value="Curriculum">Curriculum</option>
              <option value="Student Support">Student Support</option>
              <option value="Marketing">Marketing</option>
            </select>
            <select className="filter-select">
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
            </select>
            <select className="filter-select">
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="job-listings">
            {jobListings.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <span className="job-type">{job.type}</span>
                </div>
                <div className="job-meta">
                  <span><i className="fas fa-building"></i> {job.department}</span>
                  <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button className="apply-button">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-cta">
        <div className="container">
          <h2>Don't See a Role That Fits?</h2>
          <p>We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute.</p>
          <button className="cta-button">Submit Your Resume</button>
        </div>
      </section>
    </div>
  );
}

export default Careers; 