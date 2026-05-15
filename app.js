// 1. Scroll Animatsiyasi (Reveal on Scroll)
const reveals = document.querySelectorAll('.bento-card, .news-card, form');

function revealOnScroll() {
    reveals.forEach(element => {
        element.classList.add('reveal');
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 2. Telegram Formani xatosiz boshqarish
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
    
    // Xato tuzatildi: URL manzili to'g'ri shaklga keltirildi
    const url = `https://telegram.org{token}/sendMessage`;

    const btn = this.querySelector('button');
    btn.innerText = "Yuborilmoqda...";
    btn.disabled = true;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        if(response.ok) {
            alert("Arizangiz muvaffaqiyatli yuborildi! Tez orada aloqaga chiqamiz.");
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
// 3. Sichqonchaga ergashuvchi nur effekti (Mouse Tracker)
const glow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// 4. Bento-kartalarning sichqoncha harakatiga qarab egilishi (Tilt Effect)
const cards = document.querySelectorAll('.bento-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        
        // Egilish darajasini hisoblash
        card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});
