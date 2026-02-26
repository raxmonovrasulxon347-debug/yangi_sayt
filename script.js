function switchProject(type) {
    const uiArea = document.getElementById('ui-area');
    const statusText = document.getElementById('statusText');
    const mainImage = document.getElementById('mainImage');
    const todoList = document.getElementById('todoList');

    // Tozalash
    uiArea.innerHTML = '';
    mainImage.style.display = 'none';
    todoList.style.display = 'none';

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
            <button onclick="generateAI('interior')">Dizayn yaratish</button>
        `;
    } else if (type === 'car') {
        statusText.innerText = "🏎️ AI Car Customizer";
        uiArea.innerHTML = `
            <input type="text" id="carModel" placeholder="Mashina modeli (masal: BMW M4)">
            <input type="color" id="carColor" value="#ff0000">
            <button onclick="generateAI('car')">Tyuning qilish</button>
        `;
    } else if (type === 'todo') {
        statusText.innerText = "✅ Smart Todo List";
        uiArea.innerHTML = `
            <input type="text" id="todoInput" placeholder="Yangi vazifa...">
            <button onclick="addTodo()">Qo'shish</button>
        `;
        todoList.style.display = 'block';
    }
}

async function generateAI(mode) {
    const mainImage = document.getElementById('mainImage');
    const statusText = document.getElementById('statusText');
    let prompt = "";

    if (mode === 'interior') {
        const room = document.getElementById('roomType').value;
        const style = document.getElementById('style').value;
        prompt = `Professional interior design, ${style} ${room}, 8k, realistic lighting`;
    } else {
        const model = document.getElementById('carModel').value;
        const color = document.getElementById('carColor').value;
        prompt = `Hyper-realistic car photo, ${model}, customized with ${color} color, cinematic view, 8k`;
    }

    statusText.innerText = "🤖 AI ishlamoqda...";
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true`;
    
    mainImage.src = imageUrl;
    mainImage.onload = () => {
        mainImage.style.display = "block";
        statusText.innerText = "✅ Tayyor!";
    };
}

function addTodo() {
    const input = document.getElementById('todoInput');
    if (input.value === "") return;
    const li = document.createElement('li');
    li.innerText = "📌 " + input.value;
    li.style.textAlign = "left";
    li.style.padding = "5px";
    document.getElementById('todoList').appendChild(li);
    input.value = "";
}