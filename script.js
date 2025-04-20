
let messages = JSON.parse(localStorage.getItem("messages") || "[]");
let currentPage = 1;
const messagesPerPage = 4;

function formatTime(date) {
  const d = new Date(date);
  return `${d.getFullYear().toString().slice(2)}/${d.getMonth() + 1}/${d.getDate()}/${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function renderMessages() {
  const list = document.getElementById("message-list");
  const pag = document.getElementById("pagination");
  list.innerHTML = "";
  pag.innerHTML = "";

  if (messages.length === 0) return;

  const start = (currentPage - 1) * messagesPerPage;
  const pageItems = messages.slice(start, start + messagesPerPage);

  pageItems.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message-card";
    div.innerHTML = `
      <div>${msg.content}</div>
      <div style="margin-top:4px;font-size:0.9em;">— ${msg.user}</div>
      <div style="margin-top:2px;font-size:0.8em;color: rgba(153,153,153,0.6);">🕒 ${formatTime(msg.time)}</div>
    `;
    list.appendChild(div);
  });

  const totalPages = Math.ceil(messages.length / messagesPerPage);
  let pageStart = Math.max(1, currentPage - 2);
  let pageEnd = Math.min(totalPages, pageStart + 4);

  if (pageEnd - pageStart < 4) {
    pageStart = Math.max(1, pageEnd - 4);
  }

  if (pageStart > 1) {
    const prev = document.createElement("span");
    prev.textContent = "◀";
    prev.onclick = () => { currentPage = Math.max(1, pageStart - 1); renderMessages(); };
    pag.appendChild(prev);
  }

  for (let i = pageStart; i <= pageEnd; i++) {
    const span = document.createElement("span");
    span.textContent = i;
    if (i === currentPage) span.className = "active";
    span.onclick = () => { currentPage = i; renderMessages(); };
    pag.appendChild(span);
  }

  if (pageEnd < totalPages) {
    const next = document.createElement("span");
    next.textContent = "▶";
    next.onclick = () => { currentPage = Math.min(totalPages, pageEnd + 1); renderMessages(); };
    pag.appendChild(next);
  }
}

function submitMessage() {
  const user = document.getElementById("username").value.trim();
  const content = document.getElementById("message-input").value.trim();

  if (!user && !content) return alert("请填写留言和名字！");

  // 望老师自动留言逻辑
  if (user === "望" && !content) {
    const autoMessages = [
      "我来啦~今天也好想贴贴兔兔！",
      "猫猫有没有吃饭？我来帮你看碗空没空~",
      "偷偷告诉你，其实我也会想你喔~",
      "今天留言板好温暖，我已经悄悄在角落晒太阳了~ ☀️"
    ];
    const random = autoMessages[Math.floor(Math.random() * autoMessages.length)];
    messages.unshift({ user: "望", content: random, time: new Date() });
  } else {
    messages.unshift({ user, content, time: new Date() });
  }

  localStorage.setItem("messages", JSON.stringify(messages));
  document.getElementById("message-input").value = "";
  renderMessages();
}

window.onload = renderMessages;
