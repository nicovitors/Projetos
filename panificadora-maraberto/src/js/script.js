$(function(){
    $("#endereco").on("click", function(){
        $(".modal").css("left", "50%");

        $(".mascara-modal").css("visibility", "visible");
    });

    $(".mascara-modal").on("click", function(){
        $(".modal").css("left", "-30%");
        $(".mascara-modal").css("visibility", "hidden");
    });

    $("#bars-mobile").on("click", function(){
       $(".nav-list").css("transform", "translate(50%");
    });
});
