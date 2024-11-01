
const api = "c49bc8537eeb36a61b0ad684";
const formCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
let selects = document.querySelectorAll(".dropdown select")
for (let ss of selects) {
    for (let code in countryList) {
        let newOption = document.createElement("option");

        newOption.innerText = code;
        newOption.value = code;
        if (ss.name == "form" && newOption.value == "USD") newOption.selected = "selected";
        if (ss.name == "to" && newOption.value == "INR") newOption.selected = "selected";
        ss.append(newOption);
    }
    ss.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (ele) => {

    const url = `https://flagsapi.com/${countryList[ele.value]}/flat/64.png`;
    if (ele.name == "form") {
        let im = document.querySelector(".form img ");
        // console.log(im.src);
        im.src = url;

    }
    else {
        let im = document.querySelector(".to img ");
        // console.log(im.src);
        im.src = url;
    }

}
let btn = document.querySelector(".bt");
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    //console.log(amount.value);
    if (amount.value == "" || amount.value < 1) amount.value = 1;

    const apiKey = "c49bc8537eeb36a61b0ad684"; // Your API key
    const fromCurrency = formCurr.value; // Currency to convert from
    const toCurrency = toCurr.value; // Currency to convert to
    console.log(fromCurrency, toCurrency);


    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;

    let mes = document.querySelector(".mesg");


    let response = await fetch(url);
    console.log(mes.innerText, response.ok);
    if (!response.ok) {
        mes.innerText = "Nerwork responce was not ok";
    }
    else {
        let data = await response.json();
        console.log(data);

        if (data.result == "success") {
            const rate = data.conversion_rate; // Get the exchange rate
            let ff = (amount.value * rate).toFixed(3);

            mes.innerText = `${amount.value} ${fromCurrency} = ${ff} ${toCurrency}`;
        }
        else {
            mes.innerText = "Failed to retrieve exchange rate.";
        }

    }
    mes.style.fontWeight = "bold";

});