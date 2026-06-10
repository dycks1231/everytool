const GITHUB_USER = "dycks1231";
const GITHUB_REPO = "everytool";
const TOOLS_PATH = "tools";

let tools = [];

async function loadTools() {
    const res = await fetch(
        `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${TOOLS_PATH}`
    );
    const files = await res.json();

    tools = files
        .filter(f => f.name.endsWith(".html"))
        .map(f => ({
            name: f.name
                .replace(".html", "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase()),
            file: `${TOOLS_PATH}/${f.name}`
        }));

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
