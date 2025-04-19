
let messages = [];
const messagesPerPage = 6;
let currentPage = 1;

function addMessage() {
  const text = document.getElementById("messageInput").value;
  const name = document.getElementById("nameInput").value;
  if (!text.trim()) return;
  messages.unshift({ text, name: name || "匿名" });
  document.getElementById("messageInput").value = "";
  document.getElementById("nameInput").value = "";
  renderMessages(currentPage);
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
