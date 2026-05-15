// 1. Yangiliklar va Aloqa qismi uchun mukammal Scroll Animatsiyasi
function initScrollAnimations() {
    const newsCards = document.querySelectorAll('.news-card');
    const contactForm = document.querySelector('form');

    newsCards.forEach(card => card.classList.add('news-card-reveal'));
    if(contactForm) contactForm.classList.add('form-reveal');

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        newsCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 50) {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 120); 
            }
        });

        if (contactForm) {
            const formTop = contactForm.getBoundingClientRect().top;
            if (formTop < windowHeight - 100) {
                contactForm.classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);
}
initScrollAnimations();

// 2. Sichqonchaga ergashuvchi fon nuri
const glow = document.querySelector('.cursor-glow');
if(glow) {
    window.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// 3. Bento-kartalarning silliq va sezgirligi pasaytirilgan egilishi (Mild Tilt - Tuzatildi)
const bentoCards = document.querySelectorAll('.bento-card');
bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Bo'luvchi 55 ga oshirildi (Sezgirlik maksimal darajada silliq va xavfsiz qilindi)
        const rotateX = -(y / 55); 
        const rotateY = (x / 55);
        
        card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease-out, border-color 0.3s';
        card.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'border-color 0.3s, box-shadow 0.3s';
    });
});

// 4. Telegram Formani boshqarish
document.getElementById('telegram-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();

    if(phone.length < 9) {
        alert("Iltimos, telefon raqamingizni to'g'ri kiriting!");
        return;
    }

    const token = '8797888989:AAHImBW8hbXx__SOWN09eBUJ1dUr0deQYEo';
    const chatId = '2120869248';
    const text = `🚀 *Texnikum saytidan yangi ariza!*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}\n📅 *Sana:* ${new Date().toLocaleDateString()}`;
    const url = `https://telegram.org{token}/sendMessage`;

    const btn = this.querySelector('button');
    btn.innerText = "Yuborilmoqda...";
    btn.disabled = true;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
    })
    .then(response => {
        if(response.ok) {
            alert("Arizangiz muvaffaqiyatli yuborildi!");
            document.getElementById('telegram-form').reset();
        } else {
            alert("Yuborishda xatolik yuz berdi.");
        }
    })
    .catch(error => console.log('Xatolik:', error))
    .finally(() => {
        btn.innerText = "Arizani yuborish";
        btn.disabled = false;
    });
});
