// Loyihalarni almashtirish funksiyasi
function switchProject(type) {
    const uiArea = document.getElementById('ui-area');
    const statusText = document.getElementById('statusText');
    const mainImage = document.getElementById('mainImage');
    const todoList = document.getElementById('todoList');

    // Tozalash
    uiArea.innerHTML = '';
    if(mainImage) mainImage.style.display = 'none';
    if(todoList) todoList.style.display = 'none';

    if (type === 'interior') {
        statusText.innerText = "🏠 AI Interior Designer";
        uiArea.innerHTML = `
            <select id="roomType">
                <option value="living room">Mehmonxona</option>
                <option value="bedroom">Yotoqxona</option>
            </select>
            <select id="style">
                <option value="modern">Zamonaviy</option>
                <option value="minimalist">Minimalist</option>
            </select>
            <br>
            <button class="gen-btn" onclick="generateAI('interior')">Dizayn yaratish</button>
        `;
    } else if (type === 'car') {
        statusText.innerText = "🏎️ AI Car Customizer";
        uiArea.innerHTML = `
            <input type="text" id="carModel" placeholder="Mashina modeli (masalan: BMW M4)">
            <input type="color" id="carColor" value="#ff0000">
            <br>
            <button class="gen-btn" onclick="generateAI('car')">Tyuning qilish</button>
        `;
    } else if (type === 'todo') {
        statusText.innerText = "✅ Smart Todo List";
        uiArea.innerHTML = `
            <input type="text" id="todoInput" placeholder="Yangi vazifa...">
            <button class="gen-btn" onclick="addTodo()">Qo'shish</button>
        `;
        todoList.style.display = 'block';
    }
}

// Rasm yaratish funksiyasi
async function generateAI(mode) {
    const mainImage = document.getElementById('mainImage');
    const statusText = document.getElementById('statusText');
    let prompt = "";

    if (mode === 'interior') {
        const room = document.getElementById('roomType').value;
        const style = document.getElementById('style').value;
        prompt = `Professional interior design, ${style} ${room}, 8k, realistic lighting, white background`;
    } else if (mode === 'car') {
        const model = document.getElementById('carModel').value || "Supercar";
        const color = document.getElementById('carColor').value;
        prompt = `Hyper-realistic car photo, ${model}, ${color} color body, cinematic view, 8k, high resolution`;
    }

    statusText.innerText = "🤖 AI rasm chizmoqda, kuting...";
    
    // Tasodifiy son (seed) har safar yangi rasm chiqishi uchun
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1080&height=720&nologo=true&seed=${seed}`;

    // Rasmni yuklash
    mainImage.src = imageUrl;
    mainImage.style.display = "block";
    
    mainImage.onload = () => {
        statusText.innerText = "✅ Tayyor!";
    };
    
    mainImage.onerror = () => {
        statusText.innerText = "❌ Xatolik! Qayta urinib ko'ring.";
    };
}

// Todo qo'shish funksiyasi
function addTodo() {
    const input = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    if (input.value.trim() === "") return;
    
    const li = document.createElement('li');
    li.innerHTML = `<span>📌 ${input.value}</span> <button onclick="this.parentElement.remove()">❌</button>`;
    todoList.appendChild(li);
    input.value = "";
}
