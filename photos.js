//フェードイン表示
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
});


// ここから写真ページ用JavaScript

$(document).ready(function () {
  // 写真モーダル機能の初期化
  initPhotoModal();

  // キーボードナビゲーション
  initKeyboardNavigation();

  // 遅延ロード機能
  initLazyLoading();
});

// 写真モーダル機能
function openModal(element) {
  var $img = $(element).find('img');
  var $modal = $('#photoModal');

  // モーダルに情報を設定
  var title = $img.attr('data-title') || 'タイトル不明';
  var description = $img.attr('data-desc') || '説明がありません';
  var imageSrc = $img.attr('src');

  $modal.find('#modalTitle').text(title);
  $modal.find('#modalDescription').text(description);
  $modal.find('#modalImage').attr('src', imageSrc).attr('alt', title);

  // モーダルを表示
  $modal.modal('show');

  // アクセシビリティ: フォーカスをモーダルに移動
  $modal.on('shown.bs.modal', function () {
    $modal.find('.close').focus();
  });
}

function initPhotoModal() {
  // モーダルが閉じられたときのクリーンアップ
  $('#photoModal').on('hidden.bs.modal', function () {
    $(this).find('#modalImage').attr('src', '');
  });
}

// キーボードナビゲーション
function initKeyboardNavigation() {
  var $photoItems = $('.photo-item');
  var currentIndex = -1;

  // 写真アイテムにフォーカス可能属性を追加
  $photoItems.attr('tabindex', '0');

  // キーボードイベント
  $(document).on('keydown', function (e) {
    if ($('#photoModal').hasClass('in')) {
      // モーダルが開いている場合のキーボードナビゲーション
      if (e.keyCode === 27) { // ESCキー
        $('#photoModal').modal('hide');
      }
    } else {
      // ギャラリーでのキーボードナビゲーション
      switch (e.keyCode) {
        case 37: // 左矢印
          if (currentIndex > 0) {
            currentIndex--;
            focusPhotoItem(currentIndex);
          }
          e.preventDefault();
          break;
        case 39: // 右矢印
          if (currentIndex < $photoItems.length - 1) {
            currentIndex++;
            focusPhotoItem(currentIndex);
          }
          e.preventDefault();
          break;
        case 13: // Enterキー
          if (currentIndex >= 0) {
            openModal($photoItems.eq(currentIndex)[0]);
          }
          break;
      }
    }
  });

  // 写真アイテムがクリックまたはフォーカスされたときのインデックス更新
  $photoItems.on('focus click', function () {
    currentIndex = $photoItems.index(this);
  });
}

function focusPhotoItem(index) {
  var $photoItems = $('.photo-item');
  if (index >= 0 && index < $photoItems.length) {
    $photoItems.eq(index).focus();

    // スムーズスクロール
    $('html, body').animate({
      scrollTop: $photoItems.eq(index).offset().top - 100
    }, 300);
  }
}

// 遅延ロード機能（パフォーマンス向上）
function initLazyLoading() {
  var $images = $('.photo-item img');

  // Intersection Observer APIが使用可能な場合
  if ('IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var $img = $(entry.target);
          var src = $img.attr('src');

          // 画像の読み込み完了時にフェードイン
          $img.on('load', function () {
            $(this).addClass('loaded');
          });

          observer.unobserve(entry.target);
        }
      });
    });

    $images.each(function () {
      imageObserver.observe(this);
    });
  }
}

// タッチスワイプ対応（モバイル用）
function initTouchSwipe() {
  var startX = 0;
  var startY = 0;

  $('#photoModal .modal-body').on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].clientX;
    startY = e.originalEvent.touches[0].clientY;
  });

  $('#photoModal .modal-body').on('touchend', function (e) {
    var endX = e.originalEvent.changedTouches[0].clientX;
    var endY = e.originalEvent.changedTouches[0].clientY;

    var diffX = startX - endX;
    var diffY = startY - endY;

    // 水平スワイプの場合
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // 左スワイプ（次の画像）
        navigatePhoto('next');
      } else {
        // 右スワイプ（前の画像）
        navigatePhoto('prev');
      }
    }

    // 下スワイプでモーダルを閉じる
    if (diffY < -100) {
      $('#photoModal').modal('hide');
    }
  });
}

// 写真ナビゲーション
function navigatePhoto(direction) {
  var $currentImg = $('#modalImage');
  var currentSrc = $currentImg.attr('src');
  var $photoItems = $('.photo-item img');
  var currentIndex = -1;

  // 現在の画像のインデックスを見つける
  $photoItems.each(function (index) {
    if ($(this).attr('src') === currentSrc) {
      currentIndex = index;
      return false;
    }
  });

  if (currentIndex !== -1) {
    var newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % $photoItems.length;
    } else {
      newIndex = currentIndex === 0 ? $photoItems.length - 1 : currentIndex - 1;
    }

    var $newImg = $photoItems.eq(newIndex);
    openModal($newImg.closest('.photo-item')[0]);
  }
}

// CSS トランジションのサポート
function addLoadedClass() {
  $('.photo-item img').each(function () {
    var $img = $(this);
    if (this.complete) {
      $img.addClass('loaded');
    } else {
      $img.on('load', function () {
        $(this).addClass('loaded');
      });
    }
  });
}
