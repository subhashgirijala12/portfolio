// Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  FaLinkedin, FaEnvelope, FaPhone, FaDownload,
  FaRobot, FaCode, FaGithub, FaDatabase, FaLinux, FaGraduationCap,
  FaBriefcase, FaCertificate, FaMapMarkerAlt, FaExternalLinkAlt
} from 'react-icons/fa';
import './Home.css';
import profilePhoto from './assets/profile.jpg';
import tWorksLogo from './assets/tworks-logo.png';
import mascotImg from './assets/mascot.png'; 
import waterQualityImg from './assets/water-quality.png';
import portfolioImg from './assets/portfolio.png';
import ushodayaImg from './assets/ushodaya.png';



// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

const card3DVariants = {
  hidden: { opacity: 0, rotateY: -15, z: -100 },
  visible: {
    opacity: 1,
    rotateY: 0,
    z: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// --- 3D Tilt Card Hook ---
const useTilt = () => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }
  };

  return { ref, handleMouseMove, handleMouseLeave };
};

// --- Floating Particles Background ---
const ParticlesBackground = () => {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// --- 3D Tilt Card Component ---
const TiltCard = ({ children, className }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  return (
    <div
      ref={ref}
      className={`tilt-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// --- Project Card with Image ---
const ProjectCard = ({ icon: Icon, title, description, tags, imgPlaceholder, imgSrc }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  return (
    <motion.div
      className="project-card"
      ref={ref}
      variants={card3DVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-image-wrapper">
        <div className="project-image-placeholder">
          <div className="project-img-overlay" />
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="project-img"
            />
          ) : (
            <Icon size={64} className="project-icon" />
          )}
        </div>
        <div className="project-img-shine" />
      </div>
      <div className="project-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tags">
          {tags.map((tag, i) => <span key={i}>{tag}</span>)}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      const mascot = document.querySelector('.navbar-mascot');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (mascot) mascot.style.animation = 'none';
      } else {
        navbar.classList.remove('scrolled');
        if (mascot) mascot.style.animation = '';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="portfolio-container">

      {/* ─── Scroll Progress Bar ─── */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* ─── Animated Background ─── */}
      <ParticlesBackground />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* ─── Navbar ─── */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-bracket">&lt;</span>
            Deepak
            <span className="logo-bracket">/&gt;</span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {['home','about','education','experience','projects','skills','certifications','contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setIsMenuOpen(false)}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>

          <button
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <img
          src={mascotImg}
          alt=""
          className="navbar-mascot"
          draggable={false}
          aria-hidden="true"
        />

      {/* ─── Hero Section ─── */}
      <header id="home" className="hero-section">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Profile Photo with 3D ring */}
          <motion.div
            className="profile-photo-wrapper"
            variants={{
              hidden: { opacity: 0, scale: 0.7, rotateY: -30 },
              visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 1.2, delay: 0.3, ease: "easeOut" } }
            }}
          >
            <div className="profile-ring-outer" />
            <div className="profile-ring-inner" />
            <div className="profile-glow" />
            <img
              src={profilePhoto}
              alt="Girijala Deepak Naga Subhash"
              className="profile-photo"
            />
            {/* Floating tech badges around photo */}
            <div className="tech-badge tech-badge-1">React</div>
            <div className="tech-badge tech-badge-2">ROS</div>
            <div className="tech-badge tech-badge-3">Node.js</div>
            <div className="tech-badge tech-badge-4">Python</div>
          </motion.div>

          <motion.div className="hero-text" variants={itemVariants}>
            <div className="hero-greeting">Hello, There! 👋</div>
            <h1>
              <span className="name-line-1">Girijala Deepak Naga Subhash</span>
              <span className="name-line-2"></span>
            </h1>
            <h2 className="title">
              <span className="title-text">Full-Stack Developer</span>
              <span className="title-dot">◆</span>
              <span className="title-text">Robotics Enthusiast</span>
            </h2>
            <p className="location">
              <FaMapMarkerAlt className="location-icon" />
              <span>Hyderabad, Telangana</span>
              <span className="location-sep">|</span>
              <span>Bhimavaram, AP</span>
            </p>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/deepak-naga-subhash-girijala-ba517431a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
               <a href="https://github.com/subhashgirijala12" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="mailto:deepakgirijala96@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
              <a href="tel:+919396115678" aria-label="Phone">
                <FaPhone />
              </a>
            </div>

            <div className="hero-buttons">
              <a href="/DeepakCV.pdf" download="Deepak_Girijala_Resume.pdf" className="btn primary">
                <FaDownload /> Download Resume
              </a>
              <a href="#contact" className="btn secondary">Get in Touch</a>
            </div>

            {/* Stats row */}
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">9</span><span className="stat-label">Months Exp</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">3</span><span className="stat-label">Projects</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">4</span><span className="stat-label">Certifications</span></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll</span>
        </div>
      </header>

      {/* ─── About Section ─── */}
      <motion.section
        id="about"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className="section-title"><span>About</span> Me</h2>
        <div className="about-content">
          <div className="about-text-block">
            <p>
              Full-stack developer with hands-on experience building modern web applications using
              <strong> React, Node.js, Express & MySQL</strong>. Passionate about clean code, system design,
              and robotics simulation using ROS. Comfortable in Linux environments and familiar with
              basic machine learning models (Decision Trees, KNN).
            </p>
          </div>

          <div className="about-columns">
            <TiltCard className="about-column">
              <div className="column-icon"><FaCode size={28} /></div>
              <h3>Key Strengths</h3>
              <ul>
                <li>Strong problem-solving & debugging skills</li>
                <li>Building scalable RESTful APIs & services</li>
                <li>Quick learner of new technologies & tools</li>
                <li>Effective team communication & collaboration</li>
              </ul>
            </TiltCard>
            <TiltCard className="about-column">
              <div className="column-icon"><FaRobot size={28} /></div>
              <h3>Interests</h3>
              <ul>
                <li>Robotics & embedded systems</li>
                <li>Travelling & exploring new places</li>
                <li>Competitive programming & problem solving</li>
                <li>Gaming & tech hardware</li>
                <li>Videography & editing</li>
              </ul>
            </TiltCard>
          </div>
        </div>
      </motion.section>

      {/* ─── Education ─── */}
      <motion.section
        id="education"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className="section-title"><FaGraduationCap className="title-icon" /> Education</h2>
        <div className="timeline">
          {[
            {
              degree: "B.Tech – Computer Science & Engineering",
              grade: "70%",
              school: "DNR College of Engineering and Technology (JNTUK), Bhimavaram",
              years: "2021 – 2025",
            },
            {
              degree: "Intermediate",
              grade: "58.5%",
              school: "Aditya Junior College, Bhimavaram",
              years: "2019 – 2021",
            },
            {
              degree: "SSC",
              grade: "56.4%",
              school: "Vishnu School, Bhimavaram",
              years: "2018 – 2019",
            },
          ].map((edu, i) => (
            <motion.div className="timeline-item" key={i} variants={itemVariants}>
              <div className="timeline-dot"><span>{i + 1}</span></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{edu.degree}</h3>
                  <span className="grade-badge">{edu.grade}</span>
                </div>
                <p className="timeline-inst">{edu.school}</p>
                <span className="timeline-year">{edu.years}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── Experience ─── */}
      <motion.section
        id="experience"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className="section-title"><FaBriefcase className="title-icon" /> Experience</h2>

        <div className="company-banner">
            <img src={tWorksLogo} alt="tWorks" className="company-logo" />
            <div className="company-banner-divider" />
            <div className="company-banner-text">
              <span className="company-banner-label">Currently working at</span>
              <span className="company-banner-name">TWorks, Hyderabad</span>
            </div>
          </div>
        <div className="timeline">
          {[
            {
              role: "Senior Trainee Developer",
              company: "T-Works, Hyderabad",
              period: "July 2025 – Present",
              type: "Full-time",
              points: [
                "Developing full-stack applications with React, Node.js & Express",
                "Designing & implementing RESTful APIs & backend services",
                "Database management & optimization with MySQL",
                "Collaborating in agile teams to deliver production-ready features",
              ],
            },
            {
              role: "Intern – Robotics Simulation",
              company: "T-Works, Hyderabad",
              period: "July 2025 – Dec 2025",
              type: "Internship",
              points: [
                "Developed ROS Noetic packages using C++ and Python on Ubuntu",
                "Worked with ROS nodes, topics, services, and debugging tools (rqt, rosbag)",
                "Testing and validation of robotics simulation environments",
              ],
            },
          ].map((exp, i) => (
            <motion.div className="timeline-item exp-item" key={i} variants={itemVariants}>
              <div className="timeline-dot exp-dot"><FaBriefcase size={10} /></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <span className={`exp-type-badge ${exp.type === 'Full-time' ? 'full' : 'intern'}`}>{exp.type}</span>
                </div>
                <p className="timeline-inst">{exp.company}</p>
                <ul>
                  {exp.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
                <span className="timeline-year">{exp.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── Projects ─── */}
      <motion.section
        id="projects"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className="section-title">Projects<span></span></h2>
        <div className="projects-grid">
          <ProjectCard
            icon={FaDatabase}
            title="Water Quality Prediction"
            description="Machine learning web application to classify water potability using Decision Tree and KNN algorithms. Full-stack implementation with Django, SQLite, HTML/CSS/JS."
            tags={["Python", "Django", "Scikit-learn", "Machine Learning", "SQLite"]}
            imgSrc={waterQualityImg}  
          />
          <ProjectCard
            title="Developer Portfolio"
            description="A modern, fully responsive personal portfolio built with React, featuring 3D tilt animations, particle systems, scroll-triggered effects, and a dynamic navbar mascot. Designed with a deep space dark theme and smooth micro-interactions throughout."
            tags={['React', 'Framer Motion', 'CSS3', 'Vite', 'Responsive']}
            icon={FaCode}
            imgSrc={portfolioImg}
          />
          <ProjectCard
            icon={FaDatabase}
            title="Ushodaya Bankers"
            description="A full-stack gold loan management system for a local banking business. Features secure admin login with bcrypt & OTP-based password reset, loan creation, real-time interest calculation, and payment tracking — with a GSAP-animated landing page."
            tags={["Python", "Flask", "MySQL", "HTML/CSS"]}
            imgSrc={ushodayaImg}
          />
          {/* Add more <ProjectCard> components here */}
        </div>
        <p className="projects-note">✦ More projects coming soon</p>
      </motion.section>

      {/* ─── Skills ─── */}
      <motion.section
        id="skills"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className="section-title">Technical <span>Skills</span></h2>
        <div className="skills-grid">
          {[
            { title: "Programming", icon: <FaCode />, tags: ["C", "C++", "Python", "JavaScript"], color: "gold" },
            { title: "Web Development", icon: <FaLinux />, tags: ["React", "Node.js", "Express", "HTML", "CSS"], color: "cyan" },
            { title: "Databases", icon: <FaDatabase />, tags: ["MySQL", "SQLite"], color: "purple" },
            { title: "Tools & Others", icon: <FaRobot />, tags: ["Linux", "Git", "ROS"], color: "orange" },
          ].map((category, index) => (
            <motion.div
              key={index}
              className={`skill-category skill-${category.color}`}
              variants={card3DVariants}
            >
              <div className="skill-header">
                <div className="skill-icon-wrap">{category.icon}</div>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-tags">
                {category.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    className="skill-tag"
                    whileHover={{ scale: 1.1, y: -4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >{tag}</motion.span>
                ))}
              </div>
              <div className="skill-card-glow" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─── Certifications ─── */}
      <motion.section
        id="certifications"
        className="section certifications-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className="section-title"><FaCertificate className="title-icon" /> Certifications</h2>
        <div className="cert-grid">
          {[
            {
              title: "Python Programming",
              issuer: "Coign Consultants Pvt. Ltd.",
              href: "https://drive.google.com/file/d/1EAOBoUV1G8akC143CW5Qcanvks0u5X-a/view?usp=sharing",
              emoji: "🐍",
            },
            {
              title: "Machine Learning",
              issuer: "Technoedz Career Services Pvt. Ltd.",
              href: "https://drive.google.com/file/d/103g6oOgDu_IY0vcRVFeYWSb8DkpiHVAv/view?usp=drive_link",
              emoji: "🤖",
            },
            {
              title: "Full Stack Python Development",
              issuer: "Talent Shine India Pvt. Ltd.",
              href: "https://drive.google.com/file/d/1EAOBoUV1G8akC143CW5Qcanvks0u5X-a/view?usp=drive_link",
              emoji: "🌐",
            },
            {
              title: "Industrial Automation, PLC & SCADA",
              issuer: "Enrun India Pvt. Ltd.",
             
              emoji: "⚙️",
            },
          ].map((cert, i) => (
            <motion.a
              key={i}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card"
              variants={card3DVariants}
              whileHover={{ y: -8, rotateY: 5 }}
              style={{ textDecoration: 'none' }}
            >
              <div className="cert-emoji">
                {cert.emoji}
              </div>
              <div className="cert-info">
                <h4>{cert.title}</h4>
                <span>{cert.issuer}</span>
              </div>
              <FaExternalLinkAlt className="cert-link-icon" />
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* ─── Contact ─── */}
      <motion.section
        id="contact"
        className="section contact-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <h2 className="section-title">Let's <span>Connect</span></h2>
        <p className="contact-text">
          Currently open to full-time opportunities, interesting robotics/web projects,
          and collaborations in Hyderabad / remote.
        </p>

        <div className="contact-cards">
          {[
            { icon: <FaEnvelope size={32} />, label: "Email", value: "deepakgirijala96@gmail.com", href: "mailto:deepakgirijala96@gmail.com" },
            { icon: <FaPhone size={32} />, label: "Phone", value: "+91 93961 15678", href: "tel:+919396115678" },
            { icon: <FaLinkedin size={32} />, label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/in/deepak-naga-subhash-girijala-ba517431a" },
          ].map((c, i) => (
            <TiltCard key={i} className="contact-card">
              <div className="contact-icon-wrap">{c.icon}</div>
              <h3>{c.label}</h3>
              <a href={c.href} target={c.label === "LinkedIn" ? "_blank" : undefined} rel="noopener noreferrer">
                {c.value}
              </a>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>Deepak<span className="logo-bracket">/&gt;</span>
          </div>
          <p>© {new Date().getFullYear()} Girijala Deepak Naga Subhash · Built with React</p>
          <div className="footer-links">
            <a href="mailto:deepakgirijala96@gmail.com">Email</a>
            <a href="tel:+919396115678">+91 93961 15678</a>
            <a href="https://www.linkedin.com/in/deepak-naga-subhash-girijala-ba517431a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#home">Back to Top ↑</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
