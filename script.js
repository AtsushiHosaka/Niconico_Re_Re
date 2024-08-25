document.getElementById('submit-comment').addEventListener('click', function() {
    const commentText = document.getElementById('comment-input').value;
    if (commentText) {
        createComment(commentText);
        document.getElementById('comment-input').value = '';
    }
});

const video = document.getElementById('video');

function createComment(text) {
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerText = text;

    const commentContainer = document.getElementById('comment-container');
    commentContainer.appendChild(comment);

    // ランダムなY座標を設定
    const containerHeight = commentContainer.clientHeight;
    const commentHeight = comment.offsetHeight;
    const maxY = containerHeight - commentHeight;
    const randomY = Math.floor(Math.random() * 12) * maxY / 12;
    comment.style.top = `${randomY}px`;

    const moveComment = () => {
        if (video.paused) {
            comment.style.transform = `translateX(-${comment.getBoundingClientRect().right}px)`;
        }

        const checkPosition = setInterval(() => {
            if (comment.getBoundingClientRect().right < 0) {
                clearInterval(checkPosition);
                commentContainer.removeChild(comment);
            }
        }, 100);
    }

    moveComment();
}

function randomComment() {
    const comments = [
        "88888888888888888888888",
        "うぽつ",
        "かわいい",
        "ノノノノノノノノ",
        "おめでたい",
        "ktkr",
        "wktk",
        "めでたすぎ",
        "ニコニコ復活しててくさ",
        "うぽつ",
        "なう(07/14 18:00:00)",
        "秋葉原スクールからきた人~ノ",
        "＼(^o^)／",
        "(∩´∀｀)∩ﾜｰｲ",
        "((o(´∀｀)o))ﾜｸﾜｸ",
        "おめでとー！！！",
        "マジか！！！",
        "ノノノノノノノノ",
        "スゴー！！！！！！",
        "めでたい",
        "ワハハハハハハハハハハハ",
        "にこにこ(^O^)"
    ];

    const randomIndex = Math.floor(Math.random() * comments.length);
    const randomText = comments[randomIndex];
    createComment(randomText);

    const randomInterval = Math.random() * 400 + 200; // 0.1秒から2.1秒のランダムな間隔
    setTimeout(randomComment, randomInterval);
}

video.addEventListener('play', function() {
    randomComment();
});

function specialComments() {
    const currentPage = window.location.pathname.split('/').pop();
    let comments = [];

    if (currentPage === 'rokuura.html') {
        comments = [
            "フライングおたおめ！！！！！22歳になる前ラストに死ぬほど飲んでいこう(しまとー)",
            "ろくうら先生お誕生日おめでとうございます！！！！！これからもイラスト楽しみにしております！！（ふたば）",
            "誕生日おめでとうございます！！！映像教えてほしいです！！一緒に飲みましょう（せい）",
            "お誕生日おめでとうござます！！今度イラストのかきかた教えてください（╹◡╹）よろしくお願いします！！！！！（らい）",
            "お誕生日おめでとう！！！気づいたらベテランだね、、、、健気な高校生だったのに、、、、この1年も素敵な一年に！（がはく）",
            "お誕生日おめでとうござます!!いつも可愛いイラスト描いててすごいです..!いい一年にしてください！（いのべえ）"
        ];
    } else if (currentPage === 'toppo.html') {
        comments = [
            "アフターおたおめ！！！！！22歳になったからには死ぬほど飲んでいこう(しまとー)",
            "ハッピーバースデー！！！！なんでもやさんのとっぽ！尊敬してます！！！（ふたば）",
            "誕生日おめでとうございます！！！就活お世話になってます！！これからもお世話にならせてください（せい）",
            "お誕生日おめでとうーーーー！！まじで笑いのツボすぎて愛しかない(๑>◡<๑)これからもたくさんツボりましょう （らい）",
            "ハピバデ!あっぱれ!ジャパニーズ!（がはく）",
            "お誕生日おめでとうございます！！！つよつよエンジニアになってください！（いのべえ）"
        ];
    }

    if (comments.length > 0) {
        let index = 0;
        const interval = setInterval(() => {
            createComment(comments[index]);
            index++;
            if (index >= comments.length) {
                clearInterval(interval);
            }
        }, 2000);
    }
}

specialComments();