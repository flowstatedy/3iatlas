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
    function flipCard(element) {
    // สลับคลาส 'is-flipped' ใส่เข้าไปใน element ที่ถูกคลิก
    element.classList.toggle('is-flipped');
    
    // (เสริม) ถ้าต้องการให้ Debug ดูว่าคลิกทำงานไหม ให้เปิดบรรทัดล่างนี้
    // console.log("Card flipped!"); 
    }
    
    /* --- script.js --- */

// ฟังก์ชันเดิมสำหรับ Flip Card
function flipCard(element) {
    element.classList.toggle('is-flipped');
}

// --- ส่วนที่เพิ่มใหม่: Auto Infinite Loop ---
document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById('sliderTrack');
    const originalCards = Array.from(track.children);
    
    // ตั้งค่าความกว้างของการ์ด 1 ใบ (กว้าง 230 + margin ซ้ายขวา 20 = 250px)
    // ถ้าคุณแก้ขนาดใน CSS อย่าลืมมาแก้ตรงนี้ด้วยครับ
    const cardWidthWithMargin = 250; 

    // คำนวณความกว้างรวมของชุดข้อมูลจริง
    const singleSetWidth = originalCards.length * cardWidthWithMargin;

    // 1. สั่ง Clone การ์ดทุกใบ แล้วเอาไปต่อท้าย (เพื่อให้ Loop เนียน)
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        // cloneNode(true) จะก๊อปปี้ onclick มาด้วย ดังนั้นคลิก Flip ได้เหมือนตัวจริง
        track.appendChild(clone);
    });

    // 2. คำนวณความกว้างของ Track ทั้งหมด (ชุดจริง + ชุด Clone)
    const totalTrackWidth = singleSetWidth * 2;

    // 3. ส่งค่าตัวแปรไปให้ CSS ใช้งาน
    // --slider-total-width: ความกว้างรางทั้งหมด
    document.documentElement.style.setProperty('--slider-total-width', `${totalTrackWidth}px`);
    // --slider-scroll-distance: ระยะที่จะเลื่อน (เท่ากับความกว้างชุดจริง 1 ชุด แล้ววนกลับ)
    document.documentElement.style.setProperty('--slider-scroll-distance', `-${singleSetWidth}px`);
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