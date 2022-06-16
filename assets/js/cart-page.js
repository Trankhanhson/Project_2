var heightHeader = document.querySelector('.site-header').offsetHeight;
document.querySelector('.cartPage-container').style.margin = `${heightHeader}px 0 0`;

/**payments */
var payments = document.querySelectorAll('.payments-item')
var paymentsInput = document.querySelector('.payments-item input')
document.querySelector('.payments-item.active .check').checked = true; 
payments.forEach((payment, index) => {
    payment.onclick = () => {
        document.querySelector('.payments-item.active').classList.remove('active');
        payment.classList.add('active');
        document.querySelector('.payments-item.active .check').checked = true;//khi check vào item thì sẽ check vào input
    }
})

$(".payments-item").each(function(index,value) {
    $(value).click(function(){
        $(".check").each(function(){
            if(this.checked){
                $(".type-payment").text(this.value)
            }
        })
    })
})

