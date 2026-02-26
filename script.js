function switchProject(type) {
    const uiArea = document.getElementById('ui-area');
    const statusText = document.getElementById('statusText');
    const mainImage = document.getElementById('mainImage');
    const todoList = document.getElementById('todoList');

    uiArea.innerHTML = '';
    if(mainImage) mainImage.style.display = 'none';
    if(todoList) todoList.style.display = 'none';

    if (type === 'interior') {
        statusText.innerText = "🏠 AI Interior Designer";
        uiArea.innerHTML = `
            <select id="roomType"><option value="living room">Mehmonxona</option><option value="bedroom">Yotoqxona</option></select>
            <select id="style"><option value="modern">Zamonaviy</option><option value="minimalist">Minimalist</option></select>
            <br><button class="gen-btn" onclick="generateAI('interior')">Dizayn yaratish</button>`;
    } else if (type === 'car') {
        statusText.innerText = "🏎️ AI Car Customizer";
        uiArea.innerHTML = `
            <input type="text" id="carModel" placeholder="Masalan: BMW M4">
            <input type="color" id="carColor" value="#ff0000">
            <br><button class="gen-btn" onclick="generateAI('car')">Tyuning qilish</button>`;
    } else if (type === 'todo') {
        statusText.innerText = "✅ Smart Todo List";
        uiArea.innerHTML = `
            <input type="text" id="todoInput" placeholder="Yangi vazifa...">
            <button class="gen-btn" onclick="addTodo()">Qo'shish</button>`;
        todoList.style.display = 'block';
    }
}

function generateAI(mode) {
    const mainImage = document.getElementById('mainImage');
    const statusText = document.getElementById('statusText');
    let prompt = "";

    if (mode === 'interior') {
        prompt = `professional interior, ${document.getElementById('roomType').value}, ${document.getElementById('style').value} style, 8k`;
    } else {
        prompt = `car ${document.getElementById('carModel').value || "supercar"}, color ${document.getElementById('carColor').value}, realistic`;
    }

    statusText.innerText = "⏳ AI rasm chizmoqda...";
    
    // Tasodifiy son keshni tozalash uchun juda muhim
    const seed = Math.floor(Math.random() * 99999);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=${seed}`;

    // RASMNI TO'G'RIDAN-TO'G'RI YUKLASH (Eng muhim joyi!)
    mainImage.src = imageUrl;
    mainImage.style.display = "block";
    
    mainImage.onload = function() {
        statusText.innerText = "✅ Tayyor!";
    };

    mainImage.onerror = function() {
        // Agar xato bersa, qayta urinib ko'rish uchun linkni o'zgartiramiz
        statusText.innerText = "⚠️ Yuklanmoqda, kuting...";
        setTimeout(() => { mainImage.src = imageUrl; }, 2000); 
    };
}

function addTodo() {
    const input = document.getElementById('todoInput');
    if (!input.value) return;
    const li = document.createElement('li');
    li.innerHTML = `📌 ${input.value} <button onclick="this.parentElement.remove()">❌</button>`;
    document.getElementById('todoList').appendChild(li);
    input.value = "";
}
