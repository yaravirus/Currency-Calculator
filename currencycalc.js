const BASE_URL ="https://api.exchangerate-api.com/v6";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdowns){
        for(code in countryList){
                let newOption=document.createElement("option");
                newOption.innerText=code;
                newOption.value=code;
                select.append(newOption);
                if(select.name==="from" && code==="USD")
                {
                        newOption.selected="selected";
                }
                else if(select.name==="to" && code==="INR")
                {
                        newOption.selected="selected";
                }
        }
        select.addEventListener("change",(evt)=>{
                updateFlag(evt.target);
        });
}
const updateFlag=(element) => {
        let code=element.value;
        let countryCode=countryList[code];
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src=newSrc;
};
 
btn.addEventListener("click" , async(evt) =>{
        evt.preventDefault();
        let amount=document.querySelector(".amount input");
        let amtVal=amount.value;
        if(amtVal==="" || amtVal<1)
        {
                amtVal=1;
                amount.value="1";
        }
        const URL=`${BASE_URL}/latest/${fromCurr.value}`;
        let response=await fetch(URL);
        let data=await response.json();
        let rate=data[toCurr.value];
        let finalAmount=amtVal*rate;
        msg.innerHTML=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;


});
 
