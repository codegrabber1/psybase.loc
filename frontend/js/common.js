jQuery(document).ready(function($){
// svg fallback (для старих браузерів, які не читають svg. Мають бути png-копії svg файлів у тій же директорії)
// if(!Modernizr.svg){
//   $("img[src*='svg']").attr("src", function(){
//     return $(this).attr("src").replace(".svg",".png");
//     });
// }

// top menu

  $(".sf-menu").superfish();
  $(".sf-menu").after("<div id='my-menu'>");
  $(".sf-menu").clone().appendTo("#my-menu");
  $("#my-menu").find("*").attr('style', '');
  $("#my-menu").find("ul").removeClass("sf-menu");
  $("#my-menu").mmenu({
    extensions : [ 'widescreen', 'theme-dark', 'pageshadow', 'effect-menu-slide', 'effect-listitems-slide' ],
    navbar: {
      title: "Psybase"
    }
  });

  var api = $("#my-menu").data("mmenu");
  api.bind("closed", function(){
    $(".toggle-mnu").removeClass("on");
  });

  $(".mobile-mnu").click(function(){
   var mmAPI = $("#my-menu").data("mmenu");
   mmAPI.open();
   var thiss = $(this).find(".toggle-mnu");
   thiss.toggleClass("on");
   $(".main-mnu").slideToggle();
        return false;
   });// end top menu
$('.signin').on('click', function(){
    $('.ui.modal')
        .modal({
            onApprove: function(){},
            //allowMultiple: true,
            blurring: true
        })
        .modal('show');
});
$('.ui.checkbox').checkbox();
$(".ui.form").form({
  on:'blur',
  inline : true,
  fields:{
    name:{
     identifier:"name",
     rules:[{
        type:"empty",
        prompt:'Please enter a value'
     }]
    },
    pass:{
     identifier:"pass",
     rules:[{
      type:"empty",
      prompt:'Please enter a value'
      }]
    }
  }
    });
$(".ui.dropdown").dropdown();
var owl = $(".owl-carousel");
owl.owlCarousel({
    navigation: false,
    autoPlay: 5000,
    stopOnHover: true,
    singleItem: true,
    slideSpeed: 300,
    items: 1,
    pagination: true
});
});// end ready
