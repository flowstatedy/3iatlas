document.addEventListener("DOMContentLoaded", function() {
    // เลือกทุก section ที่มีคลาส .fade-section
    const sections = document.querySelectorAll('.fade-section');

    // ตั้งค่า Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // ถ้า section นั้นเลื่อนเข้ามาในหน้าจอแล้ว (intersecting)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // เพิ่มคลาส .visible เพื่อเล่นแอนิเมชัน
                observer.unobserve(entry.target); // ให้แสดงครั้งเดียวแล้วหยุดจับตาดู
            }
        });
    }, {
        threshold: 0.15 // เริ่มแสดงผลเมื่อเนื้อหาโผล่มา 15% ของความสูง section
    });

    // นำ observer ไปจับตาดูทุก section ที่เลือกไว้
    sections.forEach(section => {
        observer.observe(section);
    });
});
