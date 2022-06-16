var heightHeader = $(".site-header").outerHeight();
 $(".all-product-container").css("margin-top", heightHeader);
$(document).ready(function() {
    /**tao id cho cac san pham */
    
    $(".product").each(function(index,value) {
        value.setAttribute("id",`${index}`)
    })

     /**filter*/
     var oldIndex;
     var checkFilter;
     var filterItems=$(".filter-item")
     filterItems.each(function(index,value){
         $(value).click(function(){
             //nếu lần tiếp theo mà click sang option khác thì sẽ phải add thêm class còn không thì remove
             if(index!=oldIndex){
                 checkFilter=false;
                 oldIndex = index;
             }
             filterItems.removeClass("active")
             if(checkFilter){
                 $(value).removeClass("active")
                 checkFilter=false;
             }
             else{
                 $(value).addClass("active")
                 checkFilter=true;
             }
         })
     })


    function checkFilter(className){
        $(`.${className} li`).each(function(index,value){
            $(value).click(function(){
                //gán text của heading bằng text của option vừa nhấn
                $(`.${className} .filter-item__inner span`).text($(this).text());
            })
        })
    }
    checkFilter("filter-size")
    checkFilter("filter-type")
    checkFilter("filter-sort")
    
})

