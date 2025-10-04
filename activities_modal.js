// ============================
//    写真モーダル機能
// ============================

// 写真モーダルを開く関数
function openActivityModal(element) {
  const img = element.querySelector('img');

  // モーダルに情報を設定
  const title = img.getAttribute('data-title') || 'タイトル不明';
  const description = img.getAttribute('data-desc') || '説明がありません';
  const imageSrc = img.getAttribute('src');

  // jQueryを使用してモーダルに情報をセット
  $('#modalTitle').text(title);
  $('#modalDescription').text(description);
  $('#modalImage').attr('src', imageSrc).attr('alt', title);

  // モーダルを表示
  $('#activityModal').modal('show');

  // アクセシビリティ: フォーカスをモーダルに移動
  $('#activityModal').on('shown.bs.modal', function () {
    $(this).find('.close').focus();
  });
}

// モーダルが閉じられたときのクリーンアップ
$(document).ready(function () {
  $('#activityModal').on('hidden.bs.modal', function () {
    $(this).find('#modalImage').attr('src', '');
  });

  // ESCキーでモーダルを閉じる
  $(document).on('keydown', function (e) {
    if (e.keyCode === 27) { // ESCキー
      $('#activityModal').modal('hide');
    }
  });
});
