// 活動ページ用JavaScript 

// ページが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function () {

  // 1. スクロールでフェードイン表示
  function checkFadeIn() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(function (element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // 要素が画面に入ったら表示
      if (elementTop < windowHeight - 100) {
        element.classList.add('is-visible');
      }
    });
  }

  // スクロール時にチェック
  window.addEventListener('scroll', checkFadeIn);
  // 最初に一度チェック
  checkFadeIn();


  // 2. カードのホバー効果
  const cards = document.querySelectorAll('.activity-card');

  cards.forEach(function (card) {
    // マウスが乗ったとき
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px)';
    });

    // マウスが離れたとき
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });


  // 3. 統計数字のカウントアップ
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  function animateStats() {
    // 一度だけ実行
    if (hasAnimated) return;

    const statsSection = document.querySelector('.stats-section');
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // 統計セクションが見えたらアニメーション開始
    if (sectionTop < windowHeight - 100) {
      hasAnimated = true;

      statNumbers.forEach(function (element) {
        const targetNumber = parseInt(element.textContent);
        let currentNumber = 0;

        // 0から目標数字まで少しずつ増加
        const timer = setInterval(function () {
          currentNumber++;
          element.textContent = currentNumber;

          // 目標に達したら停止
          if (currentNumber >= targetNumber) {
            clearInterval(timer);
          }
        }, 100);
      });
    }
  }

  // スクロール時に統計アニメーションをチェック
  window.addEventListener('scroll', animateStats);


  // 5. ナビゲーションのスムーズスクロール
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
