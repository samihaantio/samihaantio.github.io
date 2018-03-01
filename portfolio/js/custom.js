$(document).ready(function(){
  var wow = new WOW(
    {
      boxClass:     'wowload',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true        // act on asynchronously loaded content (default is true)
    }
  );
  wow.init();

  setTimeout(function() {
    spellingText();
  }, 1500);

  // BOOTSTRAP 4 Affix Navbar
  var toggleAffix = function(affixElement, scrollElement, wrapper) {
    var height = affixElement.outerHeight(),
        top = wrapper.offset().top;
    if (scrollElement.scrollTop() >= top){
        wrapper.height(height);
        affixElement.addClass("affix");
    }else {
        affixElement.removeClass("affix");
        wrapper.height('auto');
    }
  };

  $('[data-toggle="affix"]').each(function() {
    var ele = $(this),
        wrapper = $('<div></div>');
    ele.before(wrapper);
    $(window).on('scroll resize', function() {
        toggleAffix(ele, $(this), wrapper);
    });
    // init
    toggleAffix(ele, $(window), wrapper);
  });

  // Skills Chart
  var index=0;
  $(document).scroll(function(){
    var top = $('#skills').height()-$(window).scrollTop();
    if(top<-300){
      if(index==0){	
        $('.chart').easyPieChart({
          easing: 'easeOutBounce',
          onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          }
        });
      }
      index++;
    }
  })

  // Filtering
  $(".filter-button").click(function(){
    var value = $(this).attr('data-filter');
    
    if(value == "all"){
      $('.filter').show('1000');
    }
    else{
      $(".filter").not('.'+value).hide('3000');
      $('.filter').filter('.'+value).show('3000');
    }
  });

  if ($(".filter-button").removeClass("active")) {
  $(this).removeClass("active");
  }
  $(this).addClass("active");

});

function spellingText(){

  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);

}

  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 200 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }
  
    setTimeout(function() {
    that.tick();
    }, delta);

  };

  