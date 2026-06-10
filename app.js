let tools = [];

async function loadTools() {
    const res = await fetch("tools.json");
    tools = await res.json();
    renderTools(tools);
}

function renderTools(list) {
    const container = document.getElementById("toolList");

    container.innerHTML = list.map(tool => `
        <div class="tool" onclick="openTool('${tool.file}')">
            <h3>${tool.name}</h3>
        </div>
    `).join("");
}

function searchTools() {
    const q = document.getElementById("search").value.toLowerCase();

    const filtered = tools.filter(t =>
        t.name.toLowerCase().includes(q)
    );

    renderTools(filtered);
}

function openTool(file) {
    window.location.href = file;
}

loadTools();
