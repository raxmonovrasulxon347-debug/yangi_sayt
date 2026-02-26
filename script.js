async function generate() {
    const gender = document.getElementById("gender").value;
    const type = document.getElementById("type").value;
    const color = document.getElementById("color").value;
    const statusText = document.getElementById("statusText");
    const shoeImage = document.getElementById("shoeImage");

    statusText.innerText = "🤖 AI rasm chizmoqda, iltimos kuting...";
    shoeImage.style.display = "none"; 

    // Promptni shakllantirish
    const prompt = `professional shoe design, ${gender} ${type}, ${color} color, high quality, white background`;
    
    // Tasodifiy son qo'shamiz (Keshni tozalash uchun)
    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${seed}`;

    try {
        // MUHIM: Rasmni fetch orqali tekshirib olamiz
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error("Tarmoq xatosi");

        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);

        shoeImage.src = objectURL;
        shoeImage.style.display = "block";
        statusText.innerText = "✅ Tayyor!";
        
        // Download tugmasi bo'lsa uni ham yangilaymiz
        const downloadBtn = document.getElementById("downloadBtn");
        if(downloadBtn) {
            downloadBtn.style.display = "block";
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = objectURL;
                a.download = "design.jpg";
                a.click();
            };
        }

    } catch (error) {
        console.error("Xatolik:", error);
        statusText.innerText = "❌ Xatolik yuz berdi. Internetni tekshiring.";
    }
}
