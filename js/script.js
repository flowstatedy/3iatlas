// รอให้โหลดหน้าเว็บเสร็จก่อนทำงาน
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Scroll Animations
    // โค้ดส่วนนี้จะคอยจับตาดูว่า element เข้ามาในหน้าจอหรือยัง
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // แสดงผลเมื่อ element โผล่มา 10% ของพื้นที่
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ถ้าโผล่เข้ามาในจอ ให้เติม class 'show' เพื่อเริ่ม Animation
                entry.target.classList.add('show');
                // หยุดจับตาดู element นี้ (เพื่อให้เล่นแค่ครั้งเดียว ไม่เล่นซ้ำตอนเลื่อนขึ้นลง)
                // ถ้าอยากให้เล่นซ้ำ ให้ลบบรรทัด observer.unobserve ออก
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // เลือกทุก element ที่มี class 'hidden'
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // 2. Smooth Scrolling สำหรับลิงก์ใน Navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

const slider = document.querySelector('.slider-container');
let isDown = false;
let startX;
let scrollLeft;
let isDragging = false; // ตัวแปรเช็คว่ากำลังลากอยู่ไหม

// 1. ส่วนของการลาก (Drag to Scroll)
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false; // รีเซ็ตสถานะการลาก
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    // หน่วงเวลาเล็กน้อยเพื่อเคลียร์สถานะการลาก (ป้องกันการ Flip ผิดจังหวะ)
    setTimeout(() => { isDragging = false; }, 10); 
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // ถ้าไม่ได้คลิกค้างไว้ ก็ไม่ต้องทำอะไร
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // *2 คือความเร็วในการเลื่อน
    
    // เช็คว่าเมาส์ขยับไปเยอะพอที่จะเรียกว่า "ลาก" หรือยัง (กันมือสั่น)
    if (Math.abs(walk) > 5) { 
        isDragging = true; 
    }
    
    slider.scrollLeft = scrollLeft - walk;
});

// 2. ส่วนของการ Flip Card (และป้องกันไม่ให้ Flip ตอนลาก)
const cards = document.querySelectorAll('.card2');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // ถ้าสถานะคือ "กำลังลาก" หรือเพิ่งลากเสร็จ ให้หยุดการทำงาน (ไม่ Flip)
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        
        // ถ้าเป็นการคลิกปกติ ให้สลับคลาส is-flipped
        card.classList.toggle('is-flipped');
    });
});


// กำหนดค่าเริ่มต้น ให้แสดงรูปแรก (Index 1)
let slideIndex = 1;
showSlides(slideIndex);

// ฟังก์ชันเมื่อกดปุ่ม Next/Prev
// n = 1 คือถัดไป, n = -1 คือย้อนกลับ
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// ฟังก์ชันแสดงผลรูปภาพ
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  
  // ตรวจสอบเงื่อนไข: ถ้ากดเกินจำนวนรูป ให้กลับไปรูปแรก
  if (n > slides.length) {
    slideIndex = 1;
  }
  
  // ตรวจสอบเงื่อนไข: ถ้ากดย้อนต่ำกว่า 1 ให้ไปรูปสุดท้าย
  if (n < 1) {
    slideIndex = slides.length;
  }
  
  // ซ่อนรูปภาพทั้งหมดก่อน
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  // แสดงเฉพาะรูปภาพปัจจุบัน (slideIndex - 1 เพราะ array เริ่มที่ 0)
  slides[slideIndex - 1].style.display = "block";  
}

// สคริป API

const scriptURL = 'https://script.google.com/macros/s/AKfycbyrrE4Jgflo8rGAtSRKCyP3EaS2EQztQBEFZP4nITCKZuGfc9z3Hudwpu-C3vRXWcmTrg/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
})
