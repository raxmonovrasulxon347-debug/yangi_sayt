async function generate() {
    // Elementlarni aniqlab olamiz
    const gender = document.getElementById("gender").value;
    const type = document.getElementById("type").value;
    const color = document.getElementById("color").value;
    const statusText = document.getElementById("statusText");
    const shoeImage = document.getElementById("shoeImage");
    const downloadBtn = document.getElementById("downloadBtn");

    // Yuklanish jarayonini boshlaymiz
    statusText.innerText = "🤖 AI siz uchun maxsus dizayn chizmoqda...";
    statusText.style.color = "#00d2ff";
    shoeImage.style.opacity = "0.5"; // Rasm yuklanguncha xiralashtirib turamiz

    // AI uchun matnli vazifa (Prompt) tayyorlaymiz
    const prompt = `Hyper-realistic professional shoe photography, ${gender} ${type} sneakers, primary color ${color}, trend-setting design, cinematic lighting, high resolution, white studio background, 8k`;
    
    // Pollinations AI rasm generatori manzili (Bepul va API kalit shart emas)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

    // Rasmni yuklash
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        shoeImage.src = imageUrl;
        shoeImage.style.display = "block";
        shoeImage.style.opacity = "1";
        statusText.innerText = "✅ Tabriklaymiz! Yangi dizayn tayyor.";
        statusText.style.color = "#4CAF50";
        
        // Yuklab olish tugmasini ko'rsatish
        if (downloadBtn) {
            downloadBtn.style.display = "inline-block";
        }

        // Agar 3D model bo'lsa, uning rangini ham moslashtiramiz
        if (typeof update3DColor === "function") {
            update3DColor(color);
        }
    };

    img.onerror = () => {
        statusText.innerText = "❌ Kechirasiz, rasm yuklashda xatolik yuz berdi. Qayta urinib ko'ring.";
        statusText.style.color = "#ff4b2b";
    };
}

// Rasm yuklab olish funksiyasi
function downloadImage() {
    const shoeImage = document.getElementById("shoeImage");
    const link = document.createElement("a");
    link.href = shoeImage.src;
    link.download = "raxmonov-shoe-design.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
