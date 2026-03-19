/* ตัวแปรสีโทนน้ำเงินละมุน */
:root {
    --bg-color: #f0f7ff;
    --primary-blue: #2563eb;
    --secondary-blue: #60a5fa;
    --text-dark: #1e293b;
    --text-light: #64748b;
    --glass-bg: rgba(255, 255, 255, 0.65);
    --glass-border: rgba(255, 255, 255, 0.4);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Kanit', sans-serif;
    scroll-behavior: smooth;
}

body {
    background-color: var(--bg-color);
    color: var(--text-dark);
    /* สร้างพื้นหลังลวดลายจุด (Polka dot) และตรึงไว้ */
    background-image: radial-gradient(var(--secondary-blue) 1px, transparent 1px);
    background-size: 30px 30px;
    background-attachment: fixed;
    line-height: 1.6;
}

/* Navigation */
nav {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--glass-border);
    z-index: 1000;
}

.logo {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-blue);
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
}

.nav-links a {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 400;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: var(--primary-blue);
}

/* Section ทั่วไป */
section {
    padding: 100px 20px 40px;
    max-width: 900px;
    margin: 0 auto;
    min-height: 50vh;
}

/* Glass Card Style */
.glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
    transition: transform 0.3s ease;
}

.glass-card:hover {
    transform: translateY(-5px);
}

h2 {
    color: var(--primary-blue);
    margin-bottom: 20px;
    font-size: 2rem;
    border-bottom: 2px solid var(--secondary-blue);
    display: inline-block;
    padding-bottom: 5px;
}

/* Hero Section */
#hero {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100vh;
    padding-top: 0;
}

.gradient-text {
    font-size: 4rem;
    background: linear-gradient(45deg, var(--primary-blue), #06b6d4);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
}

.profile-image-placeholder {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(135deg, #eff6ff, #bfdbfe);
    border: 5px solid white;
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-light);
    font-size: 0.9rem;
}

/* Grid Layouts */
.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
}

.grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.portfolio-item {
    background: rgba(255, 255, 255, 0.5);
    padding: 20px;
    border-radius: 10px;
    border: 1px solid white;
    text-align: center;
}

/* Timeline */
.timeline {
    border-left: 3px solid var(--secondary-blue);
    padding-left: 20px;
}

.timeline-item {
    margin-bottom: 20px;
    position: relative;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -29px;
    top: 5px;
    width: 15px;
    height: 15px;
    background: var(--primary-blue);
    border-radius: 50%;
    border: 3px solid white;
}

/* Form */
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contact-form input, .contact-form textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #bae6fd;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.8);
    font-family: 'Kanit', sans-serif;
    outline: none;
}

.contact-form button {
    padding: 12px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'Kanit', sans-serif;
    transition: background 0.3s;
}

.contact-form button:hover {
    background: #1d4ed8;
}

footer {
    text-align: center;
    padding: 30px;
    color: var(--text-light);
}

/* Animation Classes */
.fade-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-section.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
    .grid-2 { grid-template-columns: 1fr; }
    .gradient-text { font-size: 2.5rem; }
    nav { flex-direction: column; padding: 10px; }
    .nav-links { flex-wrap: wrap; justify-content: center; margin-top: 10px; }
}
