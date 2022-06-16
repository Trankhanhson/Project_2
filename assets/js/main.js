var heightHeader = document.querySelector('.site-header').offsetHeight;
document.querySelector('.site-homepage').style.margin = `${heightHeader}px 0 0`;


/*BÁN CHẠY NHẤT*/
const bestsellerItems = document.querySelectorAll('.bestseller__navbar-item')
const bestsellerContents = document.querySelectorAll('.bestseller__content')

const bestsellerItemActive = document.querySelector('.bestseller__navbar-item.active')
const line=document.querySelector('.line')
line.style.left = bestsellerItemActive.offsetLeft + 'px'


bestsellerItems.forEach((bestsellerItem,index) =>{
    bestsellerItem.onclick=function(){
        document.querySelector('.bestseller__navbar-item.active').classList.remove('active')
        document.querySelector('.bestseller__content.active').classList.remove('active')
        line.style.left = this.offsetLeft + 'px'

        bestsellerContents[index].classList.add('active')
        this.classList.add('active')
    }
})

/**product */
// product-options one
function changeProduct(product){
    const arrayElement = document.querySelectorAll(`#${product} .product-content__option-item-wrap`)
    arrayElement.forEach((poductOption)=>{
    poductOption.onclick=function(){
        document.querySelector(`#${product} .product-content__option-item-wrap.active`).classList.remove('active')

        this.classList.add('active')
        let array=JSON.parse($(this).attr('data'))
        const img1 = document.querySelector(`#${product} .product-img-1`)
        const img2 = document.querySelector(`#${product} .product-img-2`)
        img1.src = './assets/img/' +  array[0]
        img2.src = './assets/img/' +  array[1]
    }
})
}
changeProduct('macHangNgay-1')
changeProduct('macHangNgay-2')
changeProduct('macHangNgay-3')
changeProduct('macHangNgay-4')
changeProduct('QuanLotNam-1')
changeProduct('QuanLotNam-2')
changeProduct('QuanLotNam-3')
changeProduct('QuanLotNam-4')
changeProduct('MacTheThao-1')
changeProduct('MacTheThao-2')
changeProduct('MacTheThao-3')
changeProduct('MacTheThao-4')


/**slide */
var slideMain=document.querySelector('.slide-main')
var width = document.querySelector('.slide-img img').offsetWidth
var btnSlideRight = document.querySelector('.next-wrap-right')
var btnSlideLeft = document.querySelector('.next-wrap-left')
var positionX = 0 //số translateX của slide main
var currentSlide = 0 //index của slide hiện tại
var slideImgs = document.querySelectorAll('.slide-img')
var slideIndexItem = document.querySelectorAll('.slide__index-item')
var slideLine =document.querySelector('.slide__index-line')
var slideIndexLine = 0

slideLine.style.width=`${slideIndexItem[0].offsetWidth}px`//xét width cho index line

function clickBtnRight(){
    //mỗi lần số lượng ảnh sẽ thay đổi lên phải lấy lại mỗi khi click
    var slideImgInner=document.querySelectorAll('.slide-img__inner')

    if(currentSlide>=(slideIndexItem.length - 1)){ //khi người dùng giảm slide đi thì source không bị thay đổi     
        for(var i=0; i<slideImgInner.length; i++){
            //lấy src ảnh cần để them vào tiếp theo
            if((currentSlide-(slideIndexItem.length - 1))==i){
                var src = slideImgInner[i].getAttribute('src')
                slideMain.insertAdjacentHTML('beforeend',`<a href="#"  class="slide-img"><img class="slide-img__inner" src='${src}' alt=""></a>`)                              
                positionX-=width;
                break;
            }           
        }                             
    }
    else{
        positionX-=width;
    }
    currentSlide+=1;
    slideMain.style.transform=`translateX(${positionX}px)`
    // nếu Index của slide vẫn chưa đến phần tử cuối cùng
    if(slideIndexLine < slideIndexItem.length-1){
        slideIndexLine+=1
    }
    else{
        slideIndexLine=0
    }
    slideLine.style.left=slideIndexItem[slideIndexLine].offsetLeft + 'px'
}


function clickBtnLeft(){
    clearInterval(intervalRight)
    var slideImgInner=document.querySelectorAll('.slide-img__inner')
    
    if(currentSlide<=0){    
        positionX+=width; 
        var src = slideImgInner[slideIndexItem.length-1].getAttribute('src')
         slideMain.style.left=-(width*(-currentSlide+1))+'px';// vi khi  thêm vào đầu thì nó sẽ thế ảnh ở vị trí đầu và và thêm một khoảng trống bằng width
        //vì vậy phải dịch về âm width *(currentSlide+1)
        slideMain.insertAdjacentHTML("afterbegin",`<a href="#"  class="slide-img"><img class="slide-img__inner" src='${src}' alt=""></a>`)                                                                     
    }
    else{
        positionX+=width;       
    }
    currentSlide-=1;
    slideMain.style.transform=`translateX(${positionX}px)`

    if(slideIndexLine >0){
        slideIndexLine-=1
    }
    else{
        slideIndexLine=slideIndexItem.length-1
    }
    slideLine.style.left=slideIndexItem[slideIndexLine].offsetLeft + 'px'
}

btnSlideRight.addEventListener('click', clickBtnRight)
btnSlideLeft.addEventListener('click' ,clickBtnLeft )
var intervalRight=setInterval(clickBtnRight,6000)

/**coolmate basis */
var basisImgs= document.querySelectorAll('.coolmate-basis__content-link')
var widthBasisImg = basisImgs[0].offsetWidth


window.addEventListener('scroll', function(){

    if(document.documentElement.scrollTop >=1600){
                    basisImgs[0].style.left=(0*widthBasisImg)+'px'
                    basisImgs[0].style.opacity='1'

                setTimeout(()=>{
                    basisImgs[1].style.transition='all 0.6s'
                    basisImgs[1].style.left=(1*widthBasisImg)+'px'
                    basisImgs[1].style.opacity='1'
                    
                    
                },400)
                setTimeout(()=>{
                    basisImgs[1].style.transition='all 0.5s'
                    basisImgs[2].style.left=(2*widthBasisImg)+'px'
                    basisImgs[2].style.opacity='1'
                    
                },800)
                setTimeout(()=>{
                    basisImgs[1].style.transition='all 0.4s'
                    basisImgs[3].style.left=(3*widthBasisImg)+'px'
                    basisImgs[3].style.opacity='1'
                    
                },1200)
                setTimeout(()=>{
                    basisImgs[1].style.transition='all 0.3s'
                    basisImgs[4].style.left=(4*widthBasisImg)+'px'
                    basisImgs[4].style.opacity='1'
                },1600)
                                       
    }
})
window.addEventListener('scroll', function(){
    
})



















