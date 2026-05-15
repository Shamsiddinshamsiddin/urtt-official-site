document.getElementById('telegram-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Sayt qayta yuklanishini oldini oladi

  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;

  const token = '8797888989:AAHImBW8hbXx__SOWN09eBUJ1dUr0deQYEo';
  const chatId = '2120869248';
  
  const text = `🚀 *Texnikum saytidan yangi ariza!*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

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
      alert("Arizangiz muvaffaqiyatli yuborildi!");
      document.getElementById('telegram-form').reset(); // Formani tozalash
    } else {
      alert("Xatolik yuz berdi.");
    }
  })
  .catch(error => console.log('Xatolik:', error));
});
