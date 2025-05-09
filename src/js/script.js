"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる
  //ローディングアニメーション
  function loading() {
    setTimeout(function () {
      $(".js-loading").addClass("is-hide");
      setTimeout(function () {
        $(".js-loading").remove();
      }, 800);
    }, 2000);
  }
  $(document).ready(loading);
  $(window).on("load", loading);
  //
  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      $(".js-drawer").fadeToggle();
    });

    // ドロワーナビのaタグをクリックで閉じる
    $(".js-drawer a[href]").on("click", function () {
      $(".js-hamburger").removeClass("is-open");
      $(".js-drawer").fadeOut();
    });

    // resizeイベント
    $(window).on("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        $(".js-hamburger").removeClass("is-open");
        $(".js-drawer").fadeOut();
      }
    });
  });
  //
  // ヘッダーのアコーディオン
  $(".js-drawer-accordion").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-open");
  });
  //

  //  ヘッダーのドロワー展開時に背面のスクロールを止める
  var drawer = document.querySelector(".js-drawer");
  var overlay = document.querySelector(".js-header-overlay");

  function openDrawer() {
    drawer.classList.add("is-open");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden"; // ドロワーが開いている間は本体のスクロールを無効にする
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    overlay.style.display = "none";
    document.body.style.overflow = ""; // ドロワーが閉じられたら本体のスクロールを有効にする
  }

  document.querySelector(".js-hamburger").addEventListener("click", function () {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (overlay) {
    overlay.addEventListener("click", closeDrawer);
  } else {
    console.warn("Overlay element not found.");
  }
  //
  //MVのスワイパー
  const mv_swiper = new Swiper(".js-mv-swiper", {
    loop: true,
    speed: 2000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  /////FAQアコーディオン/////
  // アコーディオンのタイトルがクリックされたときの動き
  // FAQのタイトルがクリックされたら開閉する
  $(".js-faq-accordion-title").on("click", function () {
    var $box = $(this).next(".js-faq-accordion-box");

    // 表示/非表示の切り替え
    $box.slideToggle();

    // 「close」クラスで「＋／−」を切り替える
    $(this).toggleClass("close");
  });
});
