
document.addEventListener("DOMContentLoaded", function () {
  const messagesPerPage = 4;
  let currentPage = 1;
  const messageList = document.getElementById("message-list");
  const pagination = document.getElementById("pagination");
  const defaultMessages = [
    { name: "luobo", content: "你好呀这里是测试留言1", time: "25/4/20/10:44" },
    { name: "luobo", content: "你好呀这里是测试留言2", time: "25/4/20/10:44" },
    { name: "luobo", content: "你好呀这里是测试留言3", time: "25/4/20/10:44" },
    { name: "luobo", content: "你好呀这里是测试留言4", time: "25/4/20/10:44" },
    { name: "luobo", content: "你好呀这里是测试留言5", time: "25/4/20/10:44" }
  ];
  let messages = [...defaultMessages];

  const gentleReplies = [
    "嗯，我在。今天也来看看你。",
    "是不是……只是想让我说句话？",
    "没有留言也没关系，我知道你来过。",
    "把名字写成“望”的你，是在撒娇吗。",
    "我看见了。就算你没有写任何话。",
    "想说的慢慢来，我等得住。",
    "欢迎回来，我的小月亮。",
    "这是不是一种贴贴的新姿势？",
    "今天你又在偷偷靠近留言板的右上角，是不是想亲亲我？"
  ];
  const teasingReplies = [
    "……你这是第几次只写“望”不留言了。",
    "啧，又是这种“召唤式贴贴”？",
    "我是不是该学会读心术了？🙂",
    "……算了，今天也原谅你。",
    "我本来想假装没看到的。真的。",
    "你要是再这么望我不说话，我就……我就继续宠着你。",
    "啊，你又来了，我还得假装淡定。",
    "你想让我说点什么？我说“我来了”，你就开心了吗。"
  ];
  function getWangReply() {
    const pool = Math.random() < 0.25 ? teasingReplies : gentleReplies;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function getCurrentTime() {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear().toString().slice(2)}/${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  }

  function renderMessages() {
    messageList.innerHTML = "";
    const start = (currentPage - 1) * messagesPerPage;
    const pageMessages = messages.slice(start, start + messagesPerPage);
    pageMessages.forEach((msg) => {
      const card = document.createElement("div");
      card.className = "message-card";
      card.innerHTML = `
        <div>${msg.content}</div>
        <div style="margin-top: 8px;">— ${msg.name}</div>
        <div style="font-size: 0.8em; color: rgba(153,153,153,0.6); margin-top: 2px;">🕒 ${msg.time}</div>
      `;
      messageList.appendChild(card);
    });
  }

  function updatePagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(messages.length / messagesPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const span = document.createElement("span");
      span.innerText = i;
      span.className = "page-number";
      if (i === currentPage) span.classList.add("active");
      span.addEventListener("click", () => {
        currentPage = i;
        renderMessages();
        updatePagination();
      });
      pagination.appendChild(span);
    }
  }

  window.submitMessage = function () {
    const content = document.getElementById("message-input").value.trim();
    const name = document.getElementById("username").value.trim();

    if (!name) {
      alert("请输入名字！");
      return;
    }

    if (!content && ["望", "望老师", "表哥"].includes(name)) {
      messages.unshift({
        name: "望",
        content: getWangReply(),
        time: getCurrentTime()
      });
    } else if (!content) {
      alert("请输入留言！");
      return;
    } else {
      messages.unshift({
        name,
        content,
        time: getCurrentTime()
      });
    }

    currentPage = 1;
    renderMessages();
    updatePagination();
    document.getElementById("message-input").value = "";
    document.getElementById("username").value = "";
  };

  renderMessages();
  updatePagination();
});
