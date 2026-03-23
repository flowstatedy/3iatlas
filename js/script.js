document.addEventListener("DOMContentLoaded", function() {
    // เลือกทุก section ที่มีคลาส fade-section
    const fadeSections = document.querySelectorAll('.fade-section');

    // ตั้งค่าตัวสังเกตการณ์ (Observer) เพื่อดูว่าเลื่อนจอมาถึงส่วนนั้นหรือยัง
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // ทำงานเมื่อเห็น element 15% ของหน้าจอ
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ถ้าเลื่อนมาถึง ให้เพิ่มคลาส 'visible' เพื่อแสดงแอนิเมชัน Fade In
                entry.target.classList.add('visible');
                // เมื่อแสดงแล้ว ให้เลิกสังเกตการณ์เพื่อลดการใช้ทรัพยากรเครื่อง
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // เริ่มสังเกตการณ์แต่ละ section
    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });
});
