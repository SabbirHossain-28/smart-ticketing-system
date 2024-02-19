document.getElementById('scrollToSection').addEventListener('click',function(){
    document.getElementById('ticket-purchasing').scrollIntoView({behavior:"smooth"})
})

const allTicketSelectBtn=document.getElementsByClassName('ticket-select-btn');

for(let ticketSelectBtn of allTicketSelectBtn){
    let clicked=true;
    let count=0;
    ticketSelectBtn.addEventListener('click',function(e){
        const innerTextValue=this.innerText;
        addToCart(innerTextValue)

        const totalCurrentSeatQuantity=document.getElementById('current-seat-quantity');
        let totalCurrentSeatQuantityNum=parseInt(totalCurrentSeatQuantity.innerText);
        totalCurrentSeatQuantityNum-=1;
        totalCurrentSeatQuantity.innerText=totalCurrentSeatQuantityNum;
        
        const totalSoldSeat=document.getElementById('sold-seat');
        let totalSoldSeatNum=parseInt(totalSoldSeat.innerText);
        totalSoldSeatNum+=1;
        totalSoldSeat.innerText=totalSoldSeatNum;
        count=totalSoldSeatNum;
        
        if(clicked){
            ticketSelectBtn.style.backgroundColor='#1DD100'
            ticketSelectBtn.style.color='white'
            ticketSelectBtn.style.cursor='not-allowed'
            ticketSelectBtn.disabled=true;
        }

        if (totalCurrentSeatQuantityNum ===4) {
            for(let disabledCurrentSeat of allTicketSelectBtn)
            disabledCurrentSeat.disabled = true;
            alert('You can select maximum 4 tickets');
        }

// Calling the function for active next button
        activateNextButton(count);
    })
}

function activateNextButton(count) {
    const inputNumber = document.getElementById('input-number');
    const nextButton = document.getElementById('btn-next');

    inputNumber.addEventListener('input', function () {
        const inputValue = inputNumber.value.trim();
        const isNumeric = /^\d+$/.test(inputValue);
        if (isNumeric && count >= 1) {
            nextButton.removeAttribute('disabled');
            inputNumber.classList.add('outline-double', 'outline-4','outline-[#1DD100]');
           
        } 
        else {
            nextButton.setAttribute('disabled', 'disabled');
            inputNumber.classList.add('outline-double', 'outline-4','outline-red-500')
        }
    });
}

function addToCart(value) {
    let cartContainer = document.getElementById('cart-container');
    let div = document.createElement('div');
    div.classList.add("flex", "justify-between");

    let p1 = document.createElement('p');
    p1.innerText = `${value}`;

    let p2 = document.createElement('p');
    p2.innerText = 'Economy';

    let p3 = document.createElement('p');
    p3.innerText = `550`;

    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    cartContainer.appendChild(div);
    let childList = cartContainer.children;
    let childListNum = childList.length;

    let multipliedValue = 550 * childListNum;
    let totalCost = document.getElementById('total-cost');
    totalCost.innerText = multipliedValue;

    let grandTotal = document.getElementById('grand-total');
    grandTotal.innerText = multipliedValue;


// Apply coupon code
    if (childListNum >= 4) {
        const applyBtn = document.getElementById('apply-btn');
        applyBtn.removeAttribute('disabled');
        applyBtn.addEventListener('click', function () {
            let couponInputField = document.getElementById('coupon-input-field');
            let couponInputFieldValue = couponInputField.value.trim();

            // Validation for apply coupon code 15%
            if (couponInputFieldValue === 'NEW15' && childListNum===4) {
                let currentGrandTotal = parseInt(grandTotal.innerText); // Parsing innerText instead of the element itself
                let discountedGrandTotal = currentGrandTotal * 0.85; // Applying 15% discount
                grandTotal.innerText = discountedGrandTotal;

                let discountedAmount=currentGrandTotal*0.15;
                let discountContainer=document.getElementById('discount-container');
                let div=document.createElement('div');
                let p1=document.createElement('p');
                let p2=document.createElement('p');
                p1.innerText=`Discount amount`;
                p2.innerText=`BDT ${discountedAmount}`;

                
                div.appendChild(p1);
                div.appendChild(p2);
                
                div.classList.add('text-[#030712]', 'font-semibold','flex','justify-between','my-4')
                discountContainer.appendChild(div);
                
                document.getElementById('coupon-field-container').classList.add('hidden');
            }

            // // Validation for apply coupon code 20%
            else if(couponInputFieldValue === 'Couple 20' && childListNum===4){
                let currentGrandTotal = parseInt(grandTotal.innerText); // Parsing innerText instead of the element itself
                let discountedGrandTotal = currentGrandTotal * 0.8; // Applying 20% discount
                grandTotal.innerText = discountedGrandTotal;

                let discountedAmount=currentGrandTotal*0.2;

                let discountContainer=document.getElementById('discount-container');
                let div=document.createElement('div');
                let p1=document.createElement('p');
                let p2=document.createElement('p');
                p1.innerText=`Discount amount`;
                p2.innerText=`BDT ${discountedAmount}`;

                
                div.appendChild(p1);
                div.appendChild(p2);
                
                div.classList.add('text-[#030712]', 'font-semibold','flex','justify-between','my-4')
                discountContainer.appendChild(div)


                document.getElementById('coupon-field-container').classList.add('hidden')
            }
            else{
                couponInputField.classList.add('outline', 'outline-offset-2','outline-red-500');
                alert('Wrong Coupon Code');
                
            }
        })
    }
}
