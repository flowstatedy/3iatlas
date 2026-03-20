document.addEventListener('DOMContentLoaded', () => {
    // 1. ระบบ Hamburger Menu สำหรับมือถือ
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    nav.insertBefore(menuToggle, navLinks);
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. ระบบ Scroll Reveal (ให้เนื้อหาค่อยๆ เฟดขึ้นมาตอนเลื่อนจอ)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-section').forEach(section => {
        observer.observe(section);
    });

    // 3. ระบบ Lightbox (คลิกเพื่อดูรูปภาพขนาดใหญ่เต็มจอ)
    // สร้างโครงสร้าง Lightbox HTML ลงใน Body
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img id="lightbox-img" src="" alt="Zoomed Image">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    // จับ Event การคลิกรูปภาพในหมวดผลงานและการอบรม
    const galleryImages = document.querySelectorAll('.grid-1 img, #training img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src; // ดึง src ของรูปที่คลิกมาใส่ใน Lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // ปิดการเลื่อนหน้าจอชั่วคราว
        });
    });

    // ฟังก์ชันปิด Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // เปิดการเลื่อนหน้าจอตามปกติ
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });
});
