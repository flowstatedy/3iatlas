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
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // สลับคลาส active ไปมา (ถ้ามีก็เอาออก ถ้าไม่มีก็ใส่เพิ่ม)
        navLinks.classList.toggle('active');
    });
});

// box slide
const track = document.getElementById('track');
let items = Array.from(document.querySelectorAll('.slide-item'));

// 1. Clone Items เพื่อทำ Infinite Loop
// เราจะ Clone items ชุดเดิมมาต่อท้าย เพื่อให้พื้นที่กว้างพอสำหรับการวน
items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
});

// อัปเดตรายการ items ทั้งหมด (รวมตัว clone)
let allItems = document.querySelectorAll('.slide-item');

// คำนวณความกว้างของ Slide ชุดแรก (Original Set Width)
// เพื่อใช้คำนวณจุดตัด Infinite Loop
const singleSetWidth = items.length * (items[0].offsetWidth + 30); // 30 คือ margin left+right (15+15)
// หมายเหตุ: ถ้าเปลี่ยน margin ใน css ต้องแก้เลข 30 ตรงนี้ด้วย หรือใช้ getComputedStyle ก็ได้

// ตัวแปรสำหรับ Drag Logic
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let startX = 0;
let isClick = true; // เอาไว้เช็คว่าคลิกหรือลาก

// --- Event Listeners ---

// Mouse Events
track.addEventListener('mousedown', dragStart);
track.addEventListener('mouseup', dragEnd);
track.addEventListener('mouseleave', () => {
    if(isDragging) dragEnd();
});
track.addEventListener('mousemove', dragAction);

// Touch Events
track.addEventListener('touchstart', dragStart);
track.addEventListener('touchend', dragEnd);
track.addEventListener('touchmove', dragAction);

// Prevent Context Menu (คลิกขวา)
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

// --- Flip Card Logic (Event Delegation) ---
// ใช้ Event Delegation ที่ track เพื่อจัดการ Slide ทั้งหมดรวมถึงตัว Clone
track.addEventListener('click', function(e) {
    // ถ้าเป็นการลาก (isClick == false) เราจะไม่ทำอะไร
    if (!isClick) return;

    // หา element ที่เป็น card จากจุดที่คลิก
    const card = e.target.closest('.flip-card');
    if (card) {
        card.classList.toggle('is-flipped');
    }
});


// --- Functions ---

function dragStart(event) {
    isDragging = true;
    isClick = true; // สมมติไว้ก่อนว่าเป็นคลิก
    startX = getPositionX(event);
    startPos = getPositionX(event);
    
    // หยุด animation loop เก่า (ถ้ามี)
    cancelAnimationFrame(animationID);
    
    track.style.cursor = 'grabbing';
}

function dragAction(event) {
    if (!isDragging) return;

    const currentPosition = getPositionX(event);
    const diff = currentPosition - startX;

    // ถ้าขยับเกิน 5 pixels ให้ถือว่าเป็นการ "ลาก" ไม่ใช่ "คลิก"
    if (Math.abs(currentPosition - startPos) > 5) {
        isClick = false;
    }

    currentTranslate = prevTranslate + diff;
    
    // เรียกฟังก์ชันวาดผล
    requestAnimationFrame(updateSliderPosition);
}

function dragEnd() {
    isDragging = false;
    track.style.cursor = 'grab';
    
    // บันทึกตำแหน่งล่าสุดไว้ เพื่อลากต่อจากจุดเดิม (Free Scroll ไม่เด้งกลับ)
    prevTranslate = currentTranslate;
    
    // ตรวจสอบขอบเขต Infinite Loop ทันทีที่ปล่อยมือ
    checkInfiniteBoundary();
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function updateSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
    // เช็ค boundary ขณะลากด้วยเพื่อให้เนียนที่สุด
    checkInfiniteBoundary(); 
}


// Handle Resize: คำนวณความกว้างใหม่ถ้าย่อขยายจอ
window.addEventListener('resize', () => {
    // รีเฟรชหน้าเพื่อคำนวณขนาดใหม่ (วิธีง่ายสุดสำหรับ Infinite Scroll แบบ Manual)
    // หรือจะเขียน Logic คำนวณ singleSetWidth ใหม่ตรงนี้ก็ได้
});
// end

// box slide2
let slideIndex = 0;
const slides = document.querySelectorAll('.slide2');
const dots = document.querySelectorAll('.dot2');
const wrapper = document.querySelector('.slider-wrapper2');
const totalSlides = slides.length;
let autoSlideInterval;

// ฟังก์ชันแสดงสไลด์ตาม index
function showSlide(index) {
    // ตรวจสอบขอบเขตของ index (Loop กลับไปหน้าแรกหรือหน้าสุดท้าย)
    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    } else {
        slideIndex = index;
    }

    // คำนวณระยะการเลื่อน (Transform TranslateX)
    const offset = -slideIndex * 100; 
    wrapper.style.transform = `translateX(${offset}%)`;

    // อัปเดตสถานะของจุด (Dots)
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// ฟังก์ชันสำหรับปุ่ม Next/Prev
function moveSlide(step) {
    showSlide(slideIndex + step);
    resetAutoSlide(); // รีเซ็ตเวลาการเล่นอัตโนมัติเมื่อกดปุ่ม
}

// ฟังก์ชันสำหรับกดที่จุด (Dots)
function currentSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// ฟังก์ชันเล่นอัตโนมัติ
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 4000); // เลื่อนทุก 4 วินาที
}

// ฟังก์ชันรีเซ็ตเวลา (เมื่อมีการกดปุ่ม จะเริ่มนับเวลาใหม่ ไม่ให้เลื่อนซ้อนกัน)
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// เริ่มต้นการทำงาน
showSlide(slideIndex);
startAutoSlide();

// (Optional) หยุดเล่นเมื่อเอาเมาส์ไปชี้ที่ Slider
const container = document.querySelector('.slider-container');
container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
container.addEventListener('mouseleave', startAutoSlide);
// end


// สคริป API Web app

const scriptURL = 'https://script.google.com/macros/s/AKfycbygHEWxNk-7Eo91ZZC5sZTJl06_yZBSa7BUW7b6vn610utUiF4WBk49EVf8dIKK1eQcfA/exec';
    
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', e => {
        e.preventDefault(); // ป้องกันเว็บรีเฟรช
        
        // แสดงข้อความว่ากำลังส่ง (Optional)
        const btn = form.querySelector('button');
        const originalBtnText = btn.innerText;
        btn.innerText = "กำลังส่ง...";
        btn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.style.display = "block"; // แสดงข้อความสำเร็จ
                form.reset(); // ล้างแบบฟอร์ม
                btn.innerText = originalBtnText;
                btn.disabled = false;
                
                // ซ่อนข้อความแจ้งเตือนหลัง 5 วินาที
                setTimeout(function(){
                    msg.style.display = "none";
                }, 5000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
                btn.innerText = originalBtnText;
                btn.disabled = false;
            });
    });
