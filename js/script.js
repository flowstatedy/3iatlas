document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Navigation
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Fade-in Animation on Scroll
    const sections = document.querySelectorAll('.fade-section');
    
    const options = {
        threshold: 0.15 // เริ่มแสดงผลเมื่อเนื้อหาโผล่มา 15%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. ปรับขนาดรูปภาพใน Portfolio อัตโนมัติ (กันภาพตัด)
    // สำหรับ Layout แบบ Pinterest รูปจะจัดเรียงตามความสูงจริงของไฟล์
    const portfolioImages = document.querySelectorAll('#portfolio img');
    portfolioImages.forEach(img => {
        img.addEventListener('load', () => {
            // Re-layout logic can be added here if using a library like Isotope
            // But with CSS 'columns', it handles automatically.
        });
    });
});
