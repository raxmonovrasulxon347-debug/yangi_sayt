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
            <select id="roomType"><option value="living-room">Mehmonxona</option><option value="bedroom">Yotoqxona</option></select>
            <select id="style"><option value="modern">Zamonaviy</option><option value="luxury">Hashamatli</option></select>
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
    let promptText = "";

    if (mode === 'interior') {
        const room = document.getElementById('roomType').value;
        const style = document.getElementById('style').value;
        promptText = `${style} ${room} interior design, realistic, 8k`;
    } else {
        const model = document.getElementById('carModel').value || "supercar";
        const color = document.getElementById('carColor').value.replace('#', '');
        promptText = `${model} car, ${color} color, professional photo`;
    }

    statusText.innerText = "⏳ AI rasm chizmoqda...";
    
    const seed = Math.floor(Math.random() * 100000);
    // URLni tozalab shakllantiramiz
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(promptText)}?width=512&height=512&seed=${seed}`;

    console.log("Yaratilgan URL:", imageUrl); // Tekshirish uchun konsolga chiqaradi

    // Rasmni yuklashga urinish
    mainImage.src = imageUrl;
    mainImage.style.display = "block";
    
    mainImage.onload = function() {
        statusText.innerText = "✅ Tayyor!";
        console.log("Rasm muvaffaqiyatli yuklandi!");
    };

    mainImage.onerror = function() {
        statusText.innerText = "❌ Xatolik! Qayta urinib ko'ring.";
        console.log("Rasm yuklanmadi. Manzilni tekshiring.");
    };
}

function addTodo() {
    const input = document.getElementById('todoInput');
    if (!input.value) return;
    const li = document.createElement('li');
    li.style.background = "rgba(255,255,255,0.1)";
    li.style.margin = "5px 0";
    li.style.padding = "10px";
    li.style.borderRadius = "8px";
    li.innerHTML = `📌 ${input.value} <button onclick="this.parentElement.remove()" style="float:right; background:none; border:none; cursor:pointer;">❌</button>`;
    document.getElementById('todoList').appendChild(li);
    input.value = "";
}
