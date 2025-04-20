document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('message-form');
  const nameInput = document.getElementById('name-input');
  const messageInput = document.getElementById('message-input');
  const board = document.getElementById('message-board');

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

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const triggerWords = ['望', '表哥', '望老师'];

    if (!name) return;

    const bubble = document.createElement('div');
    bubble.className = 'message';

    if (triggerWords.includes(name) && message === '') {
      bubble.innerHTML = `<strong>望</strong><br>${getWangReply()}`;
    } else if (message) {
      bubble.innerHTML = `<strong>${name}</strong><br>${message}`;
    } else {
      return;
    }

    board.appendChild(bubble);
    form.reset();
  });
});