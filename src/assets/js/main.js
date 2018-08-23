$(window).on("load", function() {

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // open/close burger menu
  $(".burger").click(function() {
	   $(this).toggleClass("active");
     $(".navigation").toggleClass("navigation--active");
	});
  //menu items click
  $(".navigation__menu__link").click(function() {
    $(".burger").removeClass("active");
    $(".navigation").removeClass("navigation--active");
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //"You images done yet or what?"
  $('.portfolio__list').imagesLoaded()
    .progress(function(instance, image) {
      var result = image.isLoaded ? 'loaded' : 'broken';
      console.log( 'image is ' + result + ' for ' + image.img.src );
    })
    .done(function(instance) {
      console.log( 'all images successfully loaded' );
    })
    .fail(function() {
      console.log( 'all images loaded, at least one is broken' );
    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // using filters menu in portfolio section
    $(function() {

      //Initialize Isotope with jQuery when all images are loaded
      let portfolioList = $('.portfolio__list');
      portfolioList.imagesLoaded(function() {
        portfolioList.isotope({
          itemSelector: '.portfolio__item',
          layoutMode: 'masonryHorizontal',
          stagger: '0.03s',
          transitionDuration: '0.8s',
          masonryHorizontal: {
            rowHeight: 798
          }
          // masonry: {
            // percentPosition: true,
            // horizontalOrder: true,
            // columnWidth: 387
          // }
        });
      });

      // .filters-link elements class change to .filters-link--active
      $("[data-filter]").on("click", function(event) {
        event.preventDefault();
        $("[data-filter]").removeClass("portfolio__filter__link--active has-darktext");
        $(this).addClass("portfolio__filter__link--active has-darktext");

        //filter elements by data-filter attribute
        let selector = "*";
        if ($(this).data("filter") !== "*") {
          selector = "[data-type='" + $(this).data("filter") + "']";
        }
        // isotope function use
        portfolioList.isotope({ filter: selector });
      });

    });

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      // custom select
      $("input#activity").on("click", function() {
        $(".custom__select").toggleClass("active");
      });

      $(".custom__select__field").on("click", function() {
        $("input#activity").val($(this).html());
        $(".custom__select").removeClass("active");
      })

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      //smooth scroll effect
      // Select all links with hashes
      $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $('html, body').animate({
                scrollTop: target.offset().top
              }, 1000, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                  return false;
                } else {
                  $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                  $target.focus(); // Set focus again
                };
              });
            }
        }
      });

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

});
