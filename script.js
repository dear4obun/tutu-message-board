document.addEventListener('DOMContentLoaded', function() {

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
});

function addMessage(content, sender = '匿名', time = null) {
    const messageList = document.getElementById("message-list");
    const messageItem = document.createElement("div");
    messageItem.className = "message-item";
    const now = time || new Date();
    const timestamp = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear().toString().slice(-2)}/${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    messageItem.innerHTML = `
        <p>${content}</p>
        <div class="meta">
            <span class="sender">— ${sender}</span>
            <span class="time">🕒 ${timestamp}</span>
        </div>
    `;
    messageList.appendChild(messageItem);
}


const form = document.getElementById('message-form');
  const board = document.getElementById('message-board');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name-input').value.trim();
    const msg = document.getElementById('message-input').value.trim();
    if (!name) return;
    let content, sender;
    const trigger = ['望','表哥','望老师'];
    if (trigger.includes(name) && msg === '') {
      content = getWangReply();
      sender = '望';
    } else if (msg) {
      content = msg;
      sender = name;
    } else {
      return;
    }
    const bubble = document.createElement('div');
    bubble.className = 'message';
    bubble.innerHTML = `<strong>${sender}</strong><br>${content}`;
    board.appendChild(bubble);
    form.reset();
  });


function submitMessage() {
  const name = document.getElementById('username').value.trim();
  const message = document.getElementById('message-input').value.trim();
  if (!name) return;
  const trigger = ['望','表哥','望老师'];
  let content, sender;
  if (trigger.includes(name) && message === '') {
    content = getWangReply();
    sender = '望';
  } else if (message) {
    content = message;
    sender = name;
  } else {
    return;
  }
  const msgList = document.getElementById('message-list');
  const bubble = document.createElement('div');
  bubble.className = 'message';
  bubble.innerHTML = `<strong>${sender}</strong><br>${content}`;
  msgList.appendChild(bubble);
  document.getElementById('username').value = '';
  document.getElementById('message-input').value = '';
}

});
