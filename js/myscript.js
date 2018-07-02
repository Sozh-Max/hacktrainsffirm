$(document).ready(function() {

	$('.gallery_contain').masonry({
		itemSelector: '.gallery_block',
		temSelector: '.gallery_block'
	});

	menuListen();
	





	function menuListen() {
    let lastId;
    let topMenu = $('.navig');
    let topMenuHeight = $('.header').outerHeight();
    let menuItems = topMenu.find('a');
    let scrollItems = menuItems.map(function() {
			let item = $($(this).attr('href'));
			if (item.length) {
				return item;
			}
		});

    menuItems.click(function(e) {
      let href = $(this).attr('href'),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
      $('html, body').stop().animate({
        scrollTop: offsetTop
      }, 800);
      e.preventDefault();
    });

    $(window).scroll(function() {
      let fromTop = $(this).scrollTop() + topMenuHeight;
      let cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop)
          return this;
      });
      cur = cur[cur.length - 1];
      let id = cur && cur.length ? cur[0].id : '';
      if (lastId !== id) {
        lastId = id;
        menuItems
          .parent().removeClass('active')
          .end().filter("[href='#" + id + "']").parent().addClass('active');
      }
    });
  };


});