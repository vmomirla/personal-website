!(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader").delay(100).fadeOut("slow", function () {
        $(this).remove();
      });
    }
  });

  // Hero typed animation
  if ($(".typed").length) {
    var typed_strings = $(".typed").data("typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000,
    });
  }

  // Smooth scroll for nav links and .scrollto elements
  $(document).on("click", ".nav-menu a, .scrollto", function (e) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top;
        $("html, body").animate(
          { scrollTop: scrollto },
          1200,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("bx-menu bx-x");
        }

        return false;
      }
    }
  });

  // Smooth scroll on page load with hash in URL
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $("html, body").animate(
          { scrollTop: scrollto },
          1200,
          "easeInOutExpo"
        );
      }
    }
  });

  // Mobile nav toggle
  $(document).on("click", ".mobile-nav-toggle", function (e) {
    $("body").toggleClass("mobile-nav-active");
    $(".mobile-nav-toggle i").toggleClass("bx-menu bx-x");
  });

  // Close mobile nav on outside click
  $(document).click(function (e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("mobile-nav-active")) {
        $("body").removeClass("mobile-nav-active");
        $(".mobile-nav-toggle i").addClass("bx-menu").removeClass("bx-x");
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find("li").removeClass("active");
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
    });

    if (
      $(window).scrollTop() + $(window).height() >=
      $(document).height() - 100
    ) {
      main_nav.find('a[href="#contact"]').parent("li").addClass("active");
    }

    if ($(this).scrollTop() < 100) {
      main_nav.find("li:first").addClass("active");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1200, "easeInOutExpo");
    return false;
  });

  // Init AOS
  $(window).on("load", function () {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
    });
  });
})(jQuery);
