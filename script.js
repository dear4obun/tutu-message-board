
document.addEventListener("DOMContentLoaded", function() {
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

  
  const messagesPerPage = 4;
  const pagination = document.querySelector(".pagination");
  function updatePagination() {
    const messages = document.querySelectorAll(".message-card");
    const pages = Math.ceil(messages.length / messagesPerPage);
    pagination.innerHTML = "";
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(pages, start + 4);
    for (let i = start; i <= end; i++) {
      const span = document.createElement("span");
      span.innerText = i;
      span.className = "page-number";
      if (i === currentPage) span.classList.add("active");
      span.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
        updatePagination();
      });
      pagination.appendChild(span);
    }
  }
  function showPage(page) {
    const messages = document.querySelectorAll(".message-card");
    messages.forEach((msg, i) => {
      msg.style.display = (i >= (page - 1) * messagesPerPage && i < page * messagesPerPage) ? "block" : "none";
    });
  }
  let currentPage = 1;
  showPage(currentPage);
  updatePagination();


  window.submitMessage = function() {
    const name = document.getElementById('username').value.trim();
    const message = document.getElementById('message-input').value.trim();
    const container = document.getElementById('message-list');
    if (!name) return;

    let content, sender;
    if (['望', '望老师', '表哥'].includes(name) && message === '') {
      content = getWangReply();
      sender = '望';
    } else if (message) {
      content = message;
      sender = name;
    } else {
      return;
    }

    const bubble = document.createElement('div');
    bubble.className = 'message-card';
    bubble.innerHTML = `<strong>${sender}</strong><br>${content}`;
    container.appendChild(bubble);

    document.getElementById('username').value = '';
    document.getElementById('message-input').value = '';
  };
});
