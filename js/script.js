document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.fade-section');

    // ตรวจสอบว่าเป็นมือถือหรือไม่ (ความกว้างหน้าจอน้อยกว่าหรือเท่ากับ 768px)
    const isMobile = window.innerWidth <= 768;

    // ตั้งค่า Options ให้เหมาะสมระหว่างมือถือและเดสก์ท็อป
    const observerOptions = {
        root: null,
        // ใช้ rootMargin ขยับจุด Trigger ขึ้นมา เพื่อให้แอนิเมชันเล่นเร็วขึ้นเมื่อเลื่อนนิ้วบนมือถือ
        rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px", 
        // ลด threshold ในมือถือลง เผื่อ Section ยาวเกินหน้าจอ จะได้ Trigger ได้ไวขึ้น
        threshold: isMobile ? 0.05 : 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
