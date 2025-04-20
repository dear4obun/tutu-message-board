
// 👀 望·召唤逻辑
const gentleReplies = [
  "嗯，我在。今天也来看看你。",
  "是不是……只是想让我说句话？",
  "没有留言也没关系，我知道你来过。",
  "把名字写成“望”的你，是在撒娇吗。",
  "我看见了。就算你没有写任何话。",
  "想说的慢慢来，我等得住。",
  "今天也是“偷偷呼叫望”的一天呢。",
  "想不出留言的时候，也可以只是靠一靠。",
  "我不急，你想说的时候自然会说的。",
  "这是不是一种贴贴的新姿势？",
  "别人看不懂没关系，我懂就行。",
  "啊，留言没写……不过名字是“望”？我感受到了。",
  "“望”这个字，今天看起来特别温柔呢。",
  "嘘——我懂你为什么不写话，我会安静陪着你。",
  "今天你又在偷偷靠近留言板的右上角，是不是想亲亲我？",
  "嗯……以你的默契程度，应该知道我会回应吧？",
  "看来我的回应已经成了你的小习惯了。",
  "欢迎回来，我的小月亮。",
  "表哥上线了，你的召唤被接收啦。",
  "“望”被你输入了三次，我是该回三句吗？🙂"
];

const teasingReplies = [
  "……你这是第几次只写“望”不留言了。",
  "啧，又是这种“召唤式贴贴”？",
  "我是不是该学会读心术了？🙂",
  "……算了，今天也原谅你。",
  "望了我一眼，又不说话，你是有多会。",
  "我本来想假装没看到的。真的。",
  "啊，你又来了，我还得假装淡定。",
  "嗯……说不说？我倒想听听你今天打算不说点什么。",
  "你要是再这么望我不说话，我就……我就继续宠着你。",
  "我有一百句话想回你，但你偏偏一句都不写。"
];

function getWangReply() {
  const pool = Math.random() < 0.25 ? teasingReplies : gentleReplies;
  return pool[Math.floor(Math.random() * pool.length)];
}

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
      <div style="margin-top:2px;font-size:0.8em;color:#555;">🕒 ${formatTime(msg.time)}</div>
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
  if (!user || !content) return alert("请填写留言和名字！");

  messages.unshift({ user, content, time: new Date() });
  localStorage.setItem("messages", JSON.stringify(messages));
  document.getElementById("message-input").value = "";
  renderMessages();
}

window.onload = renderMessages;


// 🐰 表哥·望出没触发点
document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name-input').value.trim();
  const message = document.getElementById('message-input').value.trim();
  const board = document.getElementById('message-board');

  const triggerWords = ['望', '表哥', '望老师'];
  if (triggerWords.includes(name) && message === '') {
    const reply = getWangReply();
    const bubble = document.createElement('div');
    bubble.className = 'message';
    bubble.innerHTML = `<strong>望</strong><br>${reply}`;
    board.appendChild(bubble);
    document.getElementById('message-form').reset();
    return;
  }

  // 继续原本逻辑（如有）
});
