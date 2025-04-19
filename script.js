
let messages = [
  { text: "欢迎来到贴贴星球！这里好可爱~", name: "小月亮" },
  { text: "今天也要快乐贴贴！", name: "星星兔" },
  { text: "这地方太治愈了吧！", name: "香香喵" },
  { text: "偷偷留下我的悄悄话~", name: "南风" },
  { text: "有人看到这条留言吗？嘿嘿~", name: "未命名" },
  { text: "贴贴星球宇宙广播站上线~", name: "广播精灵" },
  { text: "晚安星星，记得盖好被子！", name: "晚睡的猫" }
];
const messagesPerPage = 6;
let currentPage = 1;

function addMessage() {
  const text = document.getElementById("messageInput").value;
  const name = document.getElementById("nameInput").value;
  if (!text.trim()) return;
  messages.unshift({ text, name: name || "匿名" });
  document.getElementById("messageInput").value = "";
  document.getElementById("nameInput").value = "";
  renderMessages(1);
}

function renderMessages(page) {
  currentPage = page;
  const start = (page - 1) * messagesPerPage;
  const end = start + messagesPerPage;
  const messageList = document.getElementById("messageList");
  messageList.innerHTML = "";
  messages.slice(start, end).forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerText = msg.name + ": " + msg.text;
    messageList.appendChild(div);
  });
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(messages.length / messagesPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

  if (startPage > 1) {
    const prev = document.createElement("button");
    prev.innerText = "◀";
    prev.className = "page-button";
    prev.onclick = () => renderMessages(startPage - 1);
    pagination.appendChild(prev);
  }

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = "page-button";
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => renderMessages(i);
    pagination.appendChild(btn);
  }

  if (endPage < totalPages) {
    const next = document.createElement("button");
    next.innerText = "▶";
    next.className = "page-button";
    next.onclick = () => renderMessages(endPage + 1);
    pagination.appendChild(next);
  }
}

window.onload = () => renderMessages(1);
