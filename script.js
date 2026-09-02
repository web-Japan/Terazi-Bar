/* =========================================================
   今夜の気分は？ - スクリプト
   1. 背景の「？」をランダム生成
   2. ページロード時のフェードイン発火
   3. ボタン選択時の処理（URLは後から設定するだけでOK）
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. 背景の「？」マークをランダム生成
     --------------------------------------------------------- */
  function generateQuestionMarks() {
    var field = document.getElementById("questionField");
    if (!field) return;

    // 画面の広さに応じて個数を調整（多すぎると重くなるため上限を設ける）
    var area = window.innerWidth * window.innerHeight;
    var count = Math.min(46, Math.max(24, Math.round(area / 26000)));

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var mark = document.createElement("span");
      mark.className = "mark";
      mark.textContent = "？";

      // 位置：画面全体にランダム配置（%指定でレスポンシブ対応）
      var top = Math.random() * 100;
      var left = Math.random() * 100;

      // 大きさ：18px〜92pxの範囲でランダム
      var size = 18 + Math.random() * 74;

      // 角度：-35度〜35度でランダム
      var angle = (Math.random() * 70 - 35).toFixed(1);

      mark.style.top = top + "%";
      mark.style.left = left + "%";
      mark.style.fontSize = size + "px";
      mark.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

      fragment.appendChild(mark);
    }

    field.appendChild(fragment);
  }

  /* ---------------------------------------------------------
     2. ページロード時のフェードイン
     --------------------------------------------------------- */
  function triggerFadeIn() {
    var targets = document.querySelectorAll("[data-fade]");
    targets.forEach(function (el) {
      // 描画確定後にクラスを付与し、アニメーションを発火させる
      requestAnimationFrame(function () {
        el.classList.add("is-visible");
      });
    });
  }

  /* ---------------------------------------------------------
     3. ボタン選択時の処理
     --------------------------------------------------------- */
  // Googleマップ等の遷移先URLは、決まり次第ここに設定するだけでOK。
  // 空文字のままなら遷移せず、選択内容をコンソールに出力するのみ。
  var DESTINATIONS = {
    sing: "",  // 例: "https://maps.app.goo.gl/xxxxxxxx"
    drink: "" // 例: "https://maps.app.goo.gl/yyyyyyyy"
  };

  function handleChoice(key, label) {
    console.log("[選択]", label, "(" + key + ")");

    var url = DESTINATIONS[key];
    if (url) {
      window.location.href = url;
    }
  }

  function initButtons() {
    var singBtn = document.getElementById("btnSing");
    var drinkBtn = document.getElementById("btnDrink");

    if (singBtn) {
      singBtn.addEventListener("click", function () {
        handleChoice("sing", "歌いたい派");
      });
    }

    if (drinkBtn) {
      drinkBtn.addEventListener("click", function () {
        handleChoice("drink", "飲みたい派");
      });
    }
  }

  /* ---------------------------------------------------------
     初期化
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    generateQuestionMarks();
    triggerFadeIn();
    initButtons();
  });
})();
