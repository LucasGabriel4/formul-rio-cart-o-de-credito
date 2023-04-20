
   const inputCvvCode = document.getElementById('inputCvvCode')


   const maskCvvCode = {
        mask: '000'
    }

    const maskCvv = IMask(inputCvvCode, maskCvvCode);


    


    const inputValidityDate = document.getElementById('inputValidityDate')


    const maskValidityDate = {

        mask: 'MM{/}YY',
        blocks: {

            YY: {
                mask: IMask.MaskedRange,
                from: String(new Date().getFullYear()).slice(2),
                to: String(new Date().getFullYear() + 10).slice(2)
            },
        
            MM: {
               mask: IMask.MaskedRange,
               from: 1,
               to: 12
            }
        }
    }

    const maskValidity = IMask(inputValidityDate, maskValidityDate)


    const inputNumberCard = document.getElementById('inputNumberCard')

    const maskNumberCard ={
        mask: [
            {
                mask: '0000 0000 0000 0000',
                regex: /^4\d{0,15}/,
                cardtype: 'visa'
        
             },
        
             {
                mask: '0000 0000 0000 0000',
                regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
                cardtype: 'mastercard'
             },
        
             {
                mask: '0000 0000 0000 0000',
                cardtype: 'default',
             },
            ],
        
            dispatch: function (appended, dynamicMasked){
               const number = (dynamicMasked.value + appended).replace(/\D/g, '')
               const foundMask = dynamicMasked.compiledMasks.find(function(item){
                  return number.match(item.regex);
               })

                console.log(foundMask)
               return foundMask;
            }
    }


    const maskNumber = IMask(inputNumberCard, maskNumberCard)
   











    const addBtn = document.getElementById('add-card')
 
    addBtn.addEventListener('click',() => {
     
    })

   document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        validateFields();
        validateName()

       
    
   })


// resetar input com focus e validar erro caso input sem preencher
   const inputfields = document.querySelectorAll('input[placeholder]')

   inputfields.forEach((field) => {
    field.addEventListener('focusin',(e) => {
        field.style.border = '';
        field.parentNode.querySelector('#error').textContent = '';
    })
   })

   function validateFields(){
     inputfields.forEach((field) => {
        if(field.value === ''){
            field.style.border = '2px solid red';
            field.parentNode.querySelector('#error').textContent = 'Preencha o campo';
        }
        
     })
   }



   // campo nome completo

        const inputNamePerson = document.getElementById('inputNameCard');
        const personName = document.getElementById('person-name')
        const errorName = document.querySelector('#fieldName > #error')
    
        inputNamePerson.addEventListener('input', setNamePerson)
    
        function setNamePerson(){
            if(inputNamePerson.value.length === 0){
            personName.innerText = "Seu nome aqui";
            }else{
            personName.innerText = inputNamePerson.value;
            }
        }
   
        function validateName(){
            const name = inputNamePerson.value;
            const amount = name.split(' ').length;
            const namesSplit = name.split(' ');
            if(amount == 4){
                for(let i = 0; i < amount ; i++){
                   if(namesSplit[i].match(/^[A-Z]{1}[a-z]{1,}/)){
                        resetInvalidField(inputNamePerson);
                   }else{
                       applyInvalidField(inputNamePerson)
                   }
                }
            }else{
                applyInvalidField(inputNamePerson)
            }
        }


        function applyInvalidField(input){
            input.style.border = '2px solid red';
          
             if(input.value === ''){
                errorName.textContent = 'preencha o campo';
             }else{
                errorName.textContent = 'nome completo invalído';
             }
        } 

        function resetInvalidField(input){
           input.style.border = '1px solid #374151';
           errorName.textContent = '';
        }


     


    // codigo cvv no cartao
 



// campo cvv code 

    const creditCard = document.getElementById('creditCard')
    const backCard = document.getElementById('backOfcard')
    inputCvvCode.addEventListener('focus', backOfcard)
    inputCvvCode.addEventListener('blur', frontCard)
 
    function backOfcard(){
      if(creditCard){
         creditCard.style.display = "none";
         backCard.style.display = "block"
      }
    }
   
    function frontCard(){
      if(backCard){
        creditCard.style.display = "block";
        backCard.style.display = "none"
      }
    }
  
      maskCvv.on('accept', () => {
            updateCvvCode(maskCvv.value)
        })

        function updateCvvCode(code){
            const codeCvv = document.getElementById('codeCvv');


            if(code.length === 0){
                codeCvv.innerText = '* * *';
            }else{
                codeCvv.innerText = code;
            }
        }

   

 
  
  
// campo data de validade


        maskValidity.on('accept', () => {
            updateValidityDate(maskValidity.value)  
         })
     
     
         function updateValidityDate(date){
             const validityDate = document.getElementById('validityDate')
     
             if(date.length === 0){
                 validityDate.innerText = '00/00'
             }else{
                 validityDate.innerText = date;
             }
         }
     
    

   


// campo numero cartão

    maskNumber.on('accept', () => {
        const cardType = maskNumber.masked.currentMask.cardtype;
        checkCard(cardType)
        updateNumberCard(maskNumber.value)
     })
 
 
     function updateNumberCard(number){
         const numberCard = document.getElementById('numberCard')
 
 
         if(number.length === 0){
             numberCard.innerText = '**** **** **** ****'
         }else{
             numberCard.innerText = number;
         }
     }
 
    
 
     function checkCard(type){
         const logoCard = document.getElementById('logo')
         const errorNumberCard = document.querySelector("#fieldNumberCard > #error");
 
          
 
         const colorType = {
             visa: '#9333EA',
             mastercard: '#ef991b',
             default: '#cccccc52'
         }
 
         if(type !== 'visa' && type !== 'mastercard'){
            errorNumberCard.textContent = 'Insira um número de cartão válido';
         }else{
             errorNumberCard.textContent = '';
         }
 
         
         
         if(type === 'mastercard'){
            creditCard.style.background = colorType[type]
            backCard.style.background = colorType[type]
            logoCard.setAttribute('src', `assets/${type}.svg`)
         }else if(type === 'visa'){
             creditCard.style.background = colorType[type];
             backCard.style.background = colorType[type]
             logoCard.setAttribute('src', `assets/${type}.svg`)
         }else{
             creditCard.style.background = colorType[type];
             backCard.style.background = colorType[type]
             logoCard.setAttribute('src', ``)
         }
 
      
     }

   

