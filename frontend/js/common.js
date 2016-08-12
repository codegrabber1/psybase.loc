jQuery(document).ready(function($){
// svg fallback (для старих браузерів, які не читають svg. Мають бути png-копії svg файлів у тій же директорії)
if(!Modernizr.svg){
  $("img[src*='svg']").attr("src", function(){
    return $(this).attr("src").replace(".svg",".png");
    });
}

});// end ready