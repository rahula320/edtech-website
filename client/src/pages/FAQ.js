import React, { useState, useEffect } from 'react';
import './FAQ.css';

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Reset active FAQ when category changes
  useEffect(() => {
    setActiveFaq(null);
  }, [activeCategory]);
  
  // Smooth scroll to categories when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      animatedElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  const faqData = {
    'general': [
      {
        question: "What is ACMYX?",
        answer: "ACMYX is an educational platform offering industry-aligned technical programs with a focus on practical skills development. We provide beginner-friendly curriculum, hands-on projects, and mentorship from industry professionals."
      },
      {
        question: "Are your programs suitable for beginners?",
        answer: "Yes, our programs are designed to be beginner-friendly. We start with the fundamentals and gradually progress to more advanced concepts, making them accessible to learners with no prior experience."
      },
      {
        question: "How are the programs structured?",
        answer: "Each program runs for 8 weeks with sessions primarily on weekends. The curriculum includes theoretical concepts, practical exercises, real-world projects, mentor sessions, and assessments to ensure comprehensive learning."
      },
      {
        question: "What happens if I miss a session?",
        answer: "All sessions are recorded and available for you to watch at your convenience. Additionally, mentors are available to help you catch up and answer any questions you might have."
      },
      {
        question: "Do I get a certificate after completing a program?",
        answer: "Yes, you will receive an industry-recognized certificate upon successful completion of your program, which you can add to your resume and LinkedIn profile."
      }
    ],
    'programs': [
      {
        question: "What programs do you offer?",
        answer: "We offer 12 technical programs: Data Science & Analytics, Artificial Intelligence, Machine Learning with Python, Cloud Computing, Web Development, Embedded Systems, Internet of Things (IoT), AutoCAD, Cyber Security, DevOps, Android Development, and iOS Development."
      },
      {
        question: "How long are the programs?",
        answer: "All our programs run for 8 weeks, with classes held on weekends to accommodate working professionals and students."
      },
      {
        question: "What kind of projects will I work on?",
        answer: "You'll work on real-world, industry-relevant projects that help you build a strong portfolio. These projects are designed to apply the concepts learned during the program and simulate actual workplace scenarios."
      },
      {
        question: "Do you provide course materials?",
        answer: "Yes, we provide comprehensive learning materials, including lecture slides, code samples, readings, and additional resources to support your learning journey."
      },
      {
        question: "Are the programs updated regularly?",
        answer: "Yes, we constantly update our curriculum to ensure it aligns with industry trends and the latest technologies. As a student, you'll always have access to the most current content."
      }
    ],
    'learning': [
      {
        question: "How much time should I dedicate each week?",
        answer: "We recommend dedicating 2-3 hours during weekends for live sessions, plus an additional 2-3 hours for self-study and project work to get the most out of the program."
      },
      {
        question: "Is there mentor support available?",
        answer: "Yes, you will have access to experienced industry mentors who provide guidance, feedback, and support throughout your learning journey."
      },
      {
        question: "Are the programs completely hands-on?",
        answer: "Absolutely! The programs are designed to be highly practical with approximately 60% of the time dedicated to hands-on projects and real-world applications."
      },
      {
        question: "Can I access the course materials after completing the program?",
        answer: "Yes, you'll have lifetime access to all the course materials, including any future updates to the curriculum."
      },
      {
        question: "How do assessments work?",
        answer: "Assessments include quizzes, hands-on exercises, project submissions, and a final capstone project. These are designed to test your understanding and application of the concepts learned."
      }
    ],
    'pricing': [
      {
        question: "What are the different pricing plans?",
        answer: "We offer three plans: Self-Paced (₹3,499), Mentor-Led (₹4,999), and Advanced (₹8,999). Each plan varies in the level of support, project complexity, and additional services provided."
      },
      {
        question: "What's included in the Self-Paced Plan?",
        answer: "The Self-Paced Plan (₹3,499) includes basic-level projects, 16+ hours of live sessions, one-on-one doubt sessions, industry certification, and mentor support."
      },
      {
        question: "What's included in the Mentor-Led Plan?",
        answer: "The Mentor-Led Plan (₹4,999) includes everything in the Self-Paced Plan, plus guided projects with mentor feedback, 24+ hours of live sessions, and placement guidance including resume and mock interview assistance."
      },
      {
        question: "What's included in the Advanced Plan?",
        answer: "The Advanced Plan (₹8,999) includes everything in the Mentor-Led Plan, plus industry capstone projects, extended sessions with guest experts, priority access to doubt sessions, co-branded certification with industry partners, dedicated mentorship, exclusive referrals, and mock interviews with HR."
      },
      {
        question: "Is there a refund policy?",
        answer: "If you have concerns about your enrollment, please contact our support team within the first week of starting the program for assistance with potential refunds or other issues."
      }
    ],
    'career': [
      {
        question: "Do you provide career support?",
        answer: "Yes, depending on your pricing plan, we provide career guidance, resume review, interview preparation, and networking opportunities to help you transition into your desired role."
      },
      {
        question: "Do you offer job placements or internships?",
        answer: "We don't guarantee job placements, but our Advanced Plan includes exclusive referrals, 1:1 career coaching, and mock interviews with HR professionals to maximize your chances of securing opportunities."
      },
      {
        question: "Will I be job-ready after completing a program?",
        answer: "Our programs are designed to equip you with industry-relevant skills. While your job readiness will also depend on your prior background and effort put into the program, our practical approach and career support aim to prepare you for entry-level positions in your chosen field."
      },
      {
        question: "How can I showcase my projects to employers?",
        answer: "We guide you in creating a professional portfolio that showcases your projects. Additionally, we provide tips on how to effectively present your work during interviews and networking events."
      },
      {
        question: "Can I list ACMYX certification on my resume/LinkedIn?",
        answer: "Absolutely! We encourage you to add your ACMYX certification to your resume and LinkedIn profile. Many of our students have reported that their certification helped them stand out to potential employers."
      }
    ],
    'technical': [
      {
        question: "What technical requirements do I need to participate?",
        answer: "You'll need a computer with a reliable internet connection, a modern web browser, and potentially specific software depending on your chosen program. Detailed requirements are provided before the start of each program."
      },
      {
        question: "Do I need to install specific software?",
        answer: "Yes, depending on your program, you may need to install specific software or tools. We provide detailed installation guides and technical support to help you set up your development environment."
      },
      {
        question: "What happens if I encounter technical difficulties during the program?",
        answer: "Our technical support team is available to assist you with any issues you may encounter. You can reach out through email or during dedicated support hours."
      },
      {
        question: "Can I access the course materials on my mobile device?",
        answer: "Yes, our learning platform is mobile-responsive, allowing you to access course materials on your smartphone or tablet. However, for hands-on exercises and projects, a desktop or laptop computer is recommended."
      },
      {
        question: "Do you provide cloud environments for practice?",
        answer: "For certain programs like Cloud Computing and DevOps, we provide access to cloud environments for practice. For other programs, we guide you in setting up free tier accounts with relevant services."
      }
    ]
  };

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our programs, pricing, and learning experience</p>
        </div>
      </section>
      
      <section className="faq-content">
        <div className="container">
          <div className="faq-categories">
            <button 
              className={`category-button ${activeCategory === 'general' ? 'active' : ''}`}
              onClick={() => setActiveCategory('general')}
            >
              <i className="fas fa-info-circle"></i> General
            </button>
            <button 
              className={`category-button ${activeCategory === 'programs' ? 'active' : ''}`}
              onClick={() => setActiveCategory('programs')}
            >
              <i className="fas fa-graduation-cap"></i> Programs
            </button>
            <button 
              className={`category-button ${activeCategory === 'learning' ? 'active' : ''}`}
              onClick={() => setActiveCategory('learning')}
            >
              <i className="fas fa-book-reader"></i> Learning Experience
            </button>
            <button 
              className={`category-button ${activeCategory === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveCategory('pricing')}
            >
              <i className="fas fa-tags"></i> Pricing & Plans
            </button>
            <button 
              className={`category-button ${activeCategory === 'career' ? 'active' : ''}`}
              onClick={() => setActiveCategory('career')}
            >
              <i className="fas fa-briefcase"></i> Career Support
            </button>
            <button 
              className={`category-button ${activeCategory === 'technical' ? 'active' : ''}`}
              onClick={() => setActiveCategory('technical')}
            >
              <i className="fas fa-laptop-code"></i> Technical
            </button>
          </div>
          
          <div className="faq-list animate-on-scroll">
            <h2>
              {activeCategory === 'general' && 'General Questions'}
              {activeCategory === 'programs' && 'Programs & Curriculum'}
              {activeCategory === 'learning' && 'Learning Experience'}
              {activeCategory === 'pricing' && 'Pricing & Plans'}
              {activeCategory === 'career' && 'Career Support'}
              {activeCategory === 'technical' && 'Technical Requirements'}
            </h2>
            
            <div className="faq-items">
              {faqData[activeCategory].map((faq, index) => (
                <div 
                  key={index}
                  className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                >
                  <div 
                    className="faq-question"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="toggle-icon">
                      <i className={`fas ${activeFaq === index ? 'fa-minus' : 'fa-plus'}`}></i>
                    </span>
                  </div>
                  <div className={`faq-answer ${activeFaq === index ? 'active' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="faq-contact animate-on-scroll">
            <h2>Still have questions?</h2>
            <p>If you couldn't find the answer to your question, feel free to reach out to us directly.</p>
            <div className="contact-buttons">
              <a href="mailto:acmyxteams@gmail.com" className="contact-button email">
                <i className="fas fa-envelope"></i> Email Us
              </a>
              <a href="/contact" className="contact-button contact-page">
                <i className="fas fa-phone-alt"></i> Contact Page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ; 