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

/*Không thể sử dụng hàm xóa khi đặt ở base.js*/
function XoaMiniCart(id,size,color){
    let list= JSON.parse(localStorage.getItem('cart')) || []
    var index = list.findIndex(x => x.id == id && x.size == size && x.color == color);
    if (index >= 0) {
        list.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(list));
    loadMiniCart();
}

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