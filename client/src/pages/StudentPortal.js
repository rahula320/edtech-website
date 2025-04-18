import React, { useState } from 'react';
import './StudentPortal.css';

function StudentPortal() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showMockData, setShowMockData] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLoginError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'demo@example.com' && password === 'password') {
      setLoginError('');
      setShowMockData(true);
    } else {
      setLoginError('Invalid credentials. Use demo@example.com / password to access demo mode.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setActiveTab('login');
    setEmail('');
    setPassword('');
    setName('');
    alert('Registration successful! Please log in with your credentials.');
  };

  const handleLogout = () => {
    setShowMockData(false);
    setEmail('');
    setPassword('');
  };

  // Mock data for demo purposes
  const mockCourses = [
    {
      id: 1,
      title: 'Data Science Essentials',
      progress: 68,
      nextLesson: 'Introduction to Regression Analysis',
      instructor: 'Dr. Sarah Johnson',
      dueAssignments: 2
    },
    {
      id: 2,
      title: 'Web Development with React',
      progress: 42,
      nextLesson: 'Managing State with Redux',
      instructor: 'Michael Chen',
      dueAssignments: 1
    },
    {
      id: 3,
      title: 'Python Programming',
      progress: 89,
      nextLesson: 'Advanced Object-Oriented Concepts',
      instructor: 'Dr. Robert Smith',
      dueAssignments: 0
    }
  ];

  const mockAssignments = [
    {
      id: 1,
      title: 'Data Cleaning Project',
      course: 'Data Science Essentials',
      dueDate: '2023-07-15',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Exploratory Data Analysis Report',
      course: 'Data Science Essentials',
      dueDate: '2023-07-20',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'React Shopping Cart Implementation',
      course: 'Web Development with React',
      dueDate: '2023-07-18',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Python Classes Assignment',
      course: 'Python Programming',
      dueDate: '2023-07-08',
      status: 'Completed'
    }
  ];

  const mockUpcomingEvents = [
    {
      id: 1,
      title: 'Live Session: Data Visualization with Matplotlib',
      date: '2023-07-16',
      time: '10:00 AM - 12:00 PM',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Workshop: Building a Portfolio Website',
      date: '2023-07-19',
      time: '2:00 PM - 4:00 PM',
      instructor: 'Michael Chen'
    },
    {
      id: 3,
      title: 'Python Project Feedback Session',
      date: '2023-07-22',
      time: '11:00 AM - 12:30 PM',
      instructor: 'Dr. Robert Smith'
    }
  ];

  if (showMockData) {
    return (
      <div className="student-dashboard">
        <header className="dashboard-header">
          <div className="dashboard-brand">
            <i className="fas fa-graduation-cap"></i> EdTech Student Portal
          </div>
          <div className="user-menu">
            <span className="user-greeting">Welcome, Demo Student</span>
            <button className="logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </header>

        <div className="dashboard-container">
          <aside className="dashboard-sidebar">
            <nav className="sidebar-nav">
              <ul>
                <li className="active">
                  <i className="fas fa-tachometer-alt"></i> Dashboard
                </li>
                <li>
                  <i className="fas fa-book"></i> My Courses
                </li>
                <li>
                  <i className="fas fa-tasks"></i> Assignments
                </li>
                <li>
                  <i className="fas fa-calendar-alt"></i> Schedule
                </li>
                <li>
                  <i className="fas fa-chart-line"></i> Progress
                </li>
                <li>
                  <i className="fas fa-comments"></i> Discussion
                </li>
                <li>
                  <i className="fas fa-question-circle"></i> Help Center
                </li>
              </ul>
            </nav>
          </aside>

          <main className="dashboard-main">
            <div className="welcome-banner">
              <div className="welcome-content">
                <h1>Welcome back, Demo Student!</h1>
                <p>Track your progress, stay on top of assignments, and continue your learning journey.</p>
              </div>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-book"></i>
                </div>
                <div className="stat-content">
                  <h3>3</h3>
                  <p>Active Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="stat-content">
                  <h3>3</h3>
                  <p>Pending Assignments</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <div className="stat-content">
                  <h3>1</h3>
                  <p>Certificates Earned</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-content">
                  <h3>3</h3>
                  <p>Upcoming Events</p>
                </div>
              </div>
            </div>

            <div className="dashboard-row">
              <section className="in-progress-courses">
                <div className="section-header">
                  <h2>Courses In Progress</h2>
                  <a href="#" className="view-all">View All</a>
                </div>
                <div className="courses-list">
                  {mockCourses.map(course => (
                    <div className="course-card" key={course.id}>
                      <div className="course-header">
                        <h3>{course.title}</h3>
                        <div className="course-instructor">
                          <i className="fas fa-user"></i> {course.instructor}
                        </div>
                      </div>
                      <div className="course-progress">
                        <div className="progress-label">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-value" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="course-info">
                        <div className="next-lesson">
                          <i className="fas fa-play-circle"></i> Next: {course.nextLesson}
                        </div>
                        <div className="due-assignments">
                          <i className="fas fa-clipboard-check"></i> {course.dueAssignments} assignments due
                        </div>
                      </div>
                      <button className="continue-button">Continue Learning</button>
                    </div>
                  ))}
                </div>
              </section>

              <div className="dashboard-sidebar-widgets">
                <section className="upcoming-deadlines">
                  <h2>Upcoming Deadlines</h2>
                  <ul className="deadlines-list">
                    {mockAssignments.filter(a => a.status === 'Pending').map(assignment => (
                      <li key={assignment.id}>
                        <div className="deadline-header">
                          <span className="deadline-course">{assignment.course}</span>
                          <span className="deadline-date">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="deadline-title">
                          <i className="fas fa-file-alt"></i> {assignment.title}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="upcoming-events">
                  <h2>Upcoming Events</h2>
                  <ul className="events-list">
                    {mockUpcomingEvents.map(event => (
                      <li key={event.id}>
                        <div className="event-date">
                          <i className="fas fa-calendar-day"></i> {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">
                          <i className="fas fa-clock"></i> {event.time}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="student-portal">
      <div className="portal-container">
        <div className="portal-header">
          <h1><i className="fas fa-graduation-cap"></i> Student Portal</h1>
          <p>Access your courses, assignments, and track your progress</p>
        </div>
        
        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={activeTab === 'login' ? 'active' : ''} 
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
            <button 
              className={activeTab === 'register' ? 'active' : ''} 
              onClick={() => handleTabChange('register')}
            >
              Register
            </button>
          </div>
          
          {activeTab === 'login' ? (
            <div className="auth-form">
              <form onSubmit={handleLogin}>
                {loginError && <div className="auth-error">{loginError}</div>}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-icon-wrapper">
                    <i className="fas fa-envelope"></i>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-icon-wrapper">
                    <i className="fas fa-lock"></i>
                    <input 
                      type="password" 
                      id="password" 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                <button type="submit" className="auth-button">Log In</button>
              </form>
              <div className="demo-credentials">
                <p>For demo: use <strong>demo@example.com</strong> / <strong>password</strong></p>
              </div>
            </div>
          ) : (
            <div className="auth-form">
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-icon-wrapper">
                    <i className="fas fa-user"></i>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Enter your full name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="reg-email">Email</label>
                  <div className="input-icon-wrapper">
                    <i className="fas fa-envelope"></i>
                    <input 
                      type="email" 
                      id="reg-email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="reg-password">Password</label>
                  <div className="input-icon-wrapper">
                    <i className="fas fa-lock"></i>
                    <input 
                      type="password" 
                      id="reg-password" 
                      placeholder="Create a password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="terms-agreement">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                </div>
                <button type="submit" className="auth-button">Register</button>
              </form>
            </div>
          )}
        </div>
        
        <div className="portal-features">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-laptop-code"></i>
            </div>
            <h3>Access Your Courses</h3>
            <p>View all your enrolled courses and continue learning right where you left off.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3>Track Assignments</h3>
            <p>Stay on top of your assignments with due dates, submissions, and feedback.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Monitor Progress</h3>
            <p>Track your course completion and performance with intuitive progress visuals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Connect & Collaborate</h3>
            <p>Engage with instructors and fellow students through discussion forums.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPortal; 