/**search */
var btnSearch = document.querySelector('.header__actions-search')
btnSearch.onclick = function(e) {
    document.querySelector('.header-inner').style.display="none"
    document.querySelector('.search').style.display="flex"
    e.stopPropagation()
}

var mainElement = document.querySelector('.main')
mainElement.onclick = function() {
    document.querySelector('.header-inner').style.display="flex"
    document.querySelector('.search').style.display="none"
}

document.querySelector('.search__input').onclick = function(e) {
    e.stopPropagation()
}

/**header hide */
var siteHeader = document.querySelector('.site-header')
var posBodyOld;
window.addEventListener('scroll', function() {
    let posBodyNew=document.documentElement.scrollTop
    if(posBodyNew>=80) {
        if(posBodyNew > posBodyOld) {
            posBodyOld = posBodyNew
            siteHeader.style.transform = 'translateY(-100%)'
        }
        else {
            posBodyOld = posBodyNew
            siteHeader.style.transform = 'translateY(0px)'
        }
    } 
})

/**display overlay */
var navProduct= document.querySelector('.header__navbar-product')
var aboutCoolMate = document.querySelector('.navbar-item--about-coolmate.header__navbar-item')

function displayModal(){
    let modal = document.querySelector('.modal')
    modal.style.visibility='visible';
    modal.style.opacity = '1'
    document.querySelector('.main').addEventListener('mouseover',function() {
        modal.style.visibility='hidden'
        modal.style.opacity = '0'
    })  
}
navProduct.onmouseover= function(e) {
    displayModal()
    e.stopImmediatePropagation()
}

aboutCoolMate.onmouseover = function(e) {
    displayModal()
    e.stopImmediatePropagation()
}

/**form */
var login = document.querySelector('.form-login')
var register = document.querySelector('.form-register')
var formAccount = document.querySelector('.form-account')
var optionLogin=document.querySelector('.form-option__login')
var optionRegister = document.querySelector('.form-option-register__item')
var btnAccount = document.querySelector('.header__actions-account')
var modalForm = document.querySelector('.modal-form')

login.onclick = function (e) {e.stopPropagation()}
register.onclick = function(e) {e.stopPropagation()}
btnAccount.addEventListener('click',function() {
    login.style.top='50%';
    register.style='top:50%; opacity:0; pointer-events:none;'
    modalForm.style='background-color: rgba(0, 0, 0, 0.5);pointer-events:visible;'
})

optionLogin.onclick = function (e) {
    login.style.opacity='0'
    login.style.pointerEvents = 'none'
    register.style.transition='all 0s'
    register.style.opacity='1'; 
    register.style.pointerEvents = 'visible';
    e.stopPropagation(); 
}

optionRegister.onclick=function (e) {
    login.style.transition='all 0s'
    login.style.opacity='1'
    login.style.pointerEvents = 'visible'
    register.style.opacity='0'; 
    register.style.pointerEvents = 'none';
    e.stopPropagation();
}

modalForm.addEventListener('click',function() {
    register.style.transition='all 0.2s'
    login.style.transition='all 0.2s'
    login.style.opacity='1'
    login.style.pointerEvents = 'visible'
    login.style.top='150%';
    register.style.top='150%';
    modalForm.style='background-color: rgba(0, 0, 0, 0);'
})


     
    /** Khi click vào size thì lấy product ở giao diện chính thêm vào biến cart trong local storage*/
    $('.btn--size').each(function(indexBtn,valueBtn) { 
        $(valueBtn).click(function() {
            
            var id=$(valueBtn).parent().parent().parent().attr("id") //lấy id ở thẻ cha cách button 3 bậc
            var name=$(`#${id} .product-name`).text()
            var img=$(`#${id} .product-img-1`).attr("src") //lấy link ảnh của sản phẩm
            var color=$(`#${id} .product-content__option-item-wrap.active span`).attr("data") //lấy màu được chứa trong data
            var size=$(valueBtn).text()
            var price=convertToNumber($(`#${id} .product-price`).text())
            var item={
                id: id,
                name: name,
                img: img,
                color: color,
                size: size,
                price: price,
                quantity:1,
                discount:0
            }
            addToCart(item) //thêm thông tin vào local storage
        })
    })

    //Hàm chuyển từ số sang chuỗi theo định dạng VND
     function convertVND(number) {
        if(number==0) {return '0đ'}
        var str=JSON.stringify(number);
        var result=""
        var length=str.length
        var count=0
        for(var i=length-1; i>=0; --i) {
            if(count%3==0 && count!=0) {
                result=str[i]+'.'+result
            }
            else {
                result=str[i]+result
            }
            count++
        }
        return result+'đ'
    }

    /**Hàm chuyển chuỗi theo định dạng VND về số */
     function convertToNumber(price) {
        var result =""
        for(var i=0; i<price.length; i++) {
            if(price[i]!="." && price[i]!="đ") {
                result += price[i]
            }
        }
        return JSON.parse(result)
    }

    /** Khi click vào nút thêm giỏ hàng thì lấy product ở giao diện chi tiết vào biến cart trong local storage */
    $('.btn-addCart').click(function() {
        if($(this).text()=="Thêm vào giỏ hàng") {
            var name=$(".content__heading").text()
            var img=$(".product-img__option-item.active img").attr("src")
            var color=$(".content__color-heading b").text()
            var size=$(".btn-size.active").text()
            var price=convertToNumber($(".content__price").text())
            var quantity=JSON.parse($(".product-single__actions .quantity span").text())
            var item={
                id:"detail1",
                name: name,
                img: img,
                color: color,
                size: size,
                price: price,
                quantity:quantity,
                discount:0
            }
            addToCart(item) //thêm thông tin vào local storage
        }
    })
    
    /**hàm thêm thông tin của 1 product vào local storage*/
    function addToCart(item) {
        var list; //list chứa các product trong cart
        if (localStorage.getItem('cart') == null) {
            list = [item];  
        } 
        else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let check = true;
            //tìm trong list xem đã tồn tại product người dùng vừa thêm chưa nếu rồi cộng số lượng lên 1, chưa thid thêm product mới
            for (let x of list) {
                //mỗi product được thêm vào cart có id, color, size khác nhau
                if (x.id == item.id && x.color == item.color && x.size== item.size) {
                    x.quantity += 1;
                    check = false;
                    break;
                }
            }
            if(check){
                list.push(item); 
            } 
        }
        localStorage.setItem('cart', JSON.stringify(list));
        loadMiniCart() //Load thông tin lên mini cart
        displayNotify(item) //Hiện thông báo đã thêm
    }

     /**Hàm load thông tin từ local storage lên mini cart*/
    function loadMiniCart() {
        let list= JSON.parse(localStorage.getItem('cart')) || []
        var str=""
        var length=list.length
        if(length>0) {
            for(let x of list) {
                str+=`<li class="mini-cart__item">
                <a class="mini-cart__link">
                <div class="mini-cart__link-img">
                    <img src="${x.img}" alt="">
                </div>
                <div class="mini-cart__link-content">
                    <p class="mini-cart__link-content-name">${x.name}</p>
                    <p class="mini-cart__link-content-describe">màu ${x.color} ${x.size}</p>
                    <p class="mini-cart__link-content-price">${convertVND(x.price)}</p>
                    <p class="mini-cart__link-content-quantity">x${x.quantity}</p>
                    <span class="mini-cart__item-cancel" onclick="XoaMiniCart('${x.id}','${x.size}','${x.color}')">✕</span>

                </div>
                </a>
            </li>`
            }
            $(".mini-cart__list").html(str)
            $(".header__actions-cart-notify").text(`${length}`)
            $(".added-product").text(`${length}`)
        }
        else {
            $(".mini-cart__list").html('<p class="cart-empty">Không có sản phẩm</p>')
            $(".header__actions-cart-notify").text("0")
            $(".added-product").text("0")
        }                        
    }
    loadMiniCart();

    function XoaMiniCart(id,size,color){
        let list= JSON.parse(localStorage.getItem('cart')) || []
        var index = list.findIndex(x => x.id == id && x.size == size && x.color == color);
        if (index >= 0) {
            list.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(list));
        loadMiniCart();
    }

    /**Hàm hiện thông báo đã thêm sản phẩm mới*/
    function displayNotify(item) {
        $(".notify-added-img img").attr("src",`${item.img}`);//load link ảnh
        $(".notify-added__content-name").text(`${item.name}`)
        $(".notify-added__color").text(`${item.color}`)
        $(".notify-added__size").text(`${item.size}`)
        $(".notify-added__content-price").text(`${convertVND(item.price)}`)
        $(".notify-added").css("transform", "translateX(0px)")//đưa block thông báo dịch chuyển vào trong màn hình
        //block thông báo được thu vào sau 4 giây
        setTimeout(function() {
            $(".notify-added").css("transform", "translateX(calc(100% + 20px))")
        },3000)
    }


    /*Menu-toggle*/
    var modal=$(".modal")
    var menuTogleList=$(".menu-toggle__list")
    $(".menu-toggle").click(function(){
        menuTogleList.css("transform", "translateX(0%)")//đẩy menu ra ngoài
        modal.css({"opacity":"1","pointer-events":"visible","visibility":"visible","z-index":"11"})//hiện lớp modal và z-index=11 cao hơn header
    }) 
    
    $(".menu-toggle__close").click(function(){
        menuTogleList.css("transform", "translateX(-100%)")//đẩy menu vào trong
        modal.css({"opacity":"0","pointer-events":"hidden","visibility":"hidden","z-index":"9"})//ẩn lớp modal
    })

    modal.click(function(){
        menuTogleList.css("transform", "translateX(-100%)")//đẩy menu vào trong
        modal.css({"opacity":"0","pointer-events":"hidden","visibility":"hidden","z-index":"9"})//ẩn lớp modal và không để cho 
    })

    $(".btn-contact").click(function(){
        $(".message").addClass("active")
    })

    $(".hide-message").click(function(){
        $(".message").removeClass("active")
    })
// })



