document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ลูกเล่น Smooth Scrolling สำหรับเวลากดเมนูแล้วค่อยๆ เลื่อนลงมา
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. ลูกเล่น Intersection Observer สำหรับแสดงแอนิเมชัน Fade-in เมื่อเลื่อนจอมาถึง (UX นิยมใช้)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // องค์ประกอบต้องโผล่มา 15% ถึงจะเริ่มแอนิเมชัน
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ใส่คลาส .visible เพื่อให้ CSS แสดงผล (Fade In)
                entry.target.classList.add('visible');
                // พอแสดงแล้วให้เลิกจับตาดู เพื่อไม่ให้เปลืองทรัพยากร
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // เลือกทุก section ที่มีคลาส .fade-section มาจับเข้าแอนิเมชัน
    const fadeSections = document.querySelectorAll('.fade-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });
});
