$(document).ready(function () {
  var fadeInElements = $('.fade-in');

  function checkFadeIn() {
    var windowHeight = $(window).height();
    var scrollPosition = $(window).scrollTop();

    fadeInElements.each(function () {
      var elementPosition = $(this).offset().top;
      if (elementPosition < scrollPosition + windowHeight - 100) { //要素が画面の下端より100px上に来た時に表示
        $(this).addClass('is-visible');
      }
    });
  }

  checkFadeIn();
  $(window).on('scroll', checkFadeIn);
  // 作品カード用のインタラクション機能
  initWorksInteraction();
});

// 作品カードのインタラクション機能を初期化
function initWorksInteraction() {
  // カードホバー効果の強化
  $('.work').hover(
    function() {
      // マウスオーバー時
      $(this).find('.work-img img').css('transform', 'scale(1.05)');
    },
    function() {
      // マウスアウト時
      $(this).find('.work-img img').css('transform', 'scale(1)');
      $(this).find('.tags span').css('transform', 'scale(1)');
    }
  );

	//マウスオーバーで2枚目の画像を表示
  $('.img-change').hover(
    function() {
      $(this).find('img:first-child').hide();
      $(this).find('img:last-child').show();
    },
    function() {
      $(this).find('img:first-child').show();
      $(this).find('img:last-child').hide();
    }
  );

  // スムーズスクロール機能
  $('a[href^="#"]').click(function() {
    var target = $(this.hash);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 800);
      return false;
    }
  });

  // 遅延フェードイン効果
  $('.work').each(function(index) {
    $(this).css('animation-delay', (index * 0.2) + 's');
  });
}