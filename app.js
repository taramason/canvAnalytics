$(document).ready(function(){

  function closeAccordion(){
    $(".navitem").removeClass('active')
    $(".dropmenu").slideUp(300).removeClass('open');
  }

  $(".navitem").click(function(e){
    var currentAttrVal = $(this).attr('href');
    if($(e.target).is('.active')) {
      closeAccordion();
    } else {
      closeAccordion();
      $(this).addClass('active');
      $('.dropmenu' + currentAttrVal).slideDown(300).addClass('open');
  }

    e.preventDefault();
  });
});
