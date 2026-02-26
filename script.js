function generate() {
    // 1. Elementlarni olish
    const gender = document.getElementById("gender").value;
    const type = document.getElementById("type").value;
    const color = document.getElementById("color").value;
    const statusText = document.getElementById("statusText");
    const shoeImage = document.getElementById("shoeImage");

    // 2. Yuklanish holati
    statusText.innerText = "🎨 AI yangi dizayn tayyorlamoqda...";
    shoeImage.style.display = "none"; // Yangisi yuklanguncha eskisini yashiramiz

    // 3. Prompt va URL yaratish
    // Seed har safar har xil rasm chiqishini ta'minlaydi
    const seed = Math.floor(Math.random() * 999999);
    const prompt = `professional footwear design, ${gender} ${type}, color ${color.replace('#', '')}, studio lighting, white background, high resolution`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${seed}`;

    // 4. Rasmni to'g'ridan-to'g'ri yuklash
    shoeImage.src = imageUrl;

    // Rasm muvaffaqiyatli yuklanganda
    shoeImage.onload = function() {
        shoeImage.style.display = "block";
        statusText.innerText = "✅ Dizayn tayyor!";
        
        // Yuklab olish tugmasini sozlash (agar u index.html da bo'lsa)
        const downloadBtn = document.getElementById("downloadBtn");
        if (downloadBtn) {
            downloadBtn.style.display = "block";
            downloadBtn.onclick = () => window.open(imageUrl, '_blank');
        }
    };

    // Rasm yuklanishda xato bersa
    shoeImage.onerror = function() {
        statusText.innerText = "❌ Rasm yuklashda xatolik. Qayta urinib ko'ring.";
    };
}

