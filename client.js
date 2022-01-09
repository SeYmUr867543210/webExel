let countries = {

    turkmenistan: [
        { serviceName: "hotel", price: 20, amount: 5 },
        { serviceName: "zavtrak", price: 5, amount: 2 },
        { serviceName: "obed", price: 7, amount: 4 },
        // { serviceName: "ujyn", price: 10, amount: 3 },
        // { serviceName: "ekskursiya", price: 50, amount: 2 },
        // { serviceName: "trenajornyy zal", price: 15, amount: 5 },
        // { serviceName: "massaj", price: 20, amount: 4 },
    ],
    russia: [
        { serviceName: "hotel", price: 30, amount: 6 },
        { serviceName: "zavtrak", price: 10, amount: 3 },
        { serviceName: "obed", price: 12, amount: 3 },
        { serviceName: "ujyn", price: 9, amount: 3 },
        { serviceName: "ekskursiya", price: 60, amount: 1 },
        { serviceName: "trenajornyy zal", price: 20, amount: 4 },
        { serviceName: "massaj", price: 35, amount: 2 },
    ],
    america: [
        // { serviceName: "hotel", price: 50, amount: 10 },
        // { serviceName: "zavtrak", price: 15, amount: 7 },
        // { serviceName: "obed", price: 20, amount: 9 },
        { serviceName: "ujyn", price: 15, amount: 6 },
        { serviceName: "ekskursiya", price: 100, amount: 4 },
        { serviceName: "trenajornyy zal", price: 30, amount: 2 },
        { serviceName: "massaj", price: 55, amount: 4 },
    ]

}

const serviceKeys = Object.keys(countries.russia[0]);

let allCurs;

async function start() {
    renderCountries()

    renderContent()
    // let chosenCountry = updateLocalStorage("getData");


    allCurs = await getData();// getting api data
    renderTable(allCurs);// rendering table

    renderCurInput(allCurs);
}
start()

function renderCountries() {
    document.querySelector(".country_wrapper")?.remove();

    let countryWrapper = document.createElement("div");
    countryWrapper.setAttribute("class", "country_wrapper");

    let countryParent = document.createElement("select");
    countryParent.setAttribute("class", "countryParent");
    countryWrapper.append(countryParent)

    let chosenCountry = localStorage.countries ? JSON.parse(localStorage.countries) : countries;

    for (let country in chosenCountry) {
        let option = document.createElement("option");
        option.innerHTML = country[0].toUpperCase() + country.substr(1);
        countryParent.append(option);
    }
    document.body.prepend(countryWrapper)

    document.querySelector(".country_wrapper").addEventListener("mouseenter", countryWrappperMouseEnter)
    document.querySelector(".country_wrapper").addEventListener("mouseleave", countryWrappperMouseLeave)
};

//////////////////////////////////////////////////

//mouseenter event
function countryWrappperMouseEnter(event) {

    if (!document.querySelector(".settingsWrapper") && !document.querySelector(".editCountriesInp") && !document.querySelector(".saveOrCancelParent")) {

        let settingsWrapper = document.createElement("div");
        settingsWrapper.setAttribute("class", "settingsWrapper")

        let settingsImg = document.createElement("img")
        settingsImg.setAttribute("id", "settingsImg")
        settingsImg.src = "imgs/settingsImg.png"
        settingsWrapper.append(settingsImg)

        document.querySelector(".country_wrapper").append(settingsWrapper)
        document.querySelector(".settingsWrapper").addEventListener("click", createEditAddDeleteBlock)
    }

}

//mouseleave event
function countryWrappperMouseLeave(event) {
    document.querySelector(".settingsWrapper")?.remove()
    // document.querySelector(".editAddDeleteParent")?.remove()
}


//creating edit add delete btns
function createEditAddDeleteBlock(event) {

    if (event.target.getAttribute("id") == "settingsImg") {
        document.querySelector("#settingsImg").remove()

        document.querySelector(".editAddDeleteParent")?.remove()
        //parent
        let editAddDeleteParent = document.createElement("div");
        editAddDeleteParent.setAttribute("class", "editAddDeleteParent")

        //edit
        let editImg = document.createElement("img");
        editImg.setAttribute("id", "editImg");
        editImg.src = "imgs/editImg.png"
        editAddDeleteParent.append(editImg)

        //add
        let addImg = document.createElement("img");
        addImg.setAttribute("id", "addImg");
        addImg.src = "imgs/addImg.png"
        editAddDeleteParent.append(addImg)

        //delete
        let deleteImg = document.createElement("img");
        deleteImg.setAttribute("id", "deleteImg");
        deleteImg.src = "imgs/deleteImg.png"
        editAddDeleteParent.append(deleteImg)

        document.querySelector(".settingsWrapper").append(editAddDeleteParent)
        // document.querySelector(".editAddDeleteParent").addEventListener("click", editAddDeleteParentClick)
    } else if (event.target.getAttribute("id") == "editImg") {
        createCountriesInp(event, "edit")
        createSaveOrCancelBlock()
    } else if (event.target.getAttribute("id") == "addImg") {
        // console.log("add")
        createCountriesInp(event, "add")
        createSaveOrCancelBlock()
    } else if (event.target.getAttribute("id") == "deleteImg") {

        let areYouSureToDeleteElem = generateAreYouSureToDeleteTxt()
        createPopupWrapper(areYouSureToDeleteElem)
    }

}

function generateAreYouSureToDeleteTxt() {
    let countryParent = document.querySelector(".countryParent");
    let chosenCountry = countryParent[countryParent.selectedIndex].innerHTML;

    let areYouSureToDelete = document.createElement("div");
    areYouSureToDelete.setAttribute("class", "areYouSureToDelete")
    areYouSureToDelete.innerHTML = `Are you sure,that you want to delete <strong>${chosenCountry.toUpperCase()}</strong>,from list of countries?all country related data will be lost and unrecoverable!`

    return areYouSureToDelete;
}

//click na udalit kartinku
function createPopupWrapper(areYouSureToDeleteElem) {

    document.querySelector(".popupWrapper")?.remove();

    //popupWrapper
    let popupWrapper = document.createElement("div");
    popupWrapper.setAttribute("class", "popupWrapper")

    //popupParent
    let popupParent = document.createElement("div");
    popupParent.setAttribute("class", "popupParent");
    popupParent.append(areYouSureToDeleteElem);//prepending areYouSureToDeleteElem
    popupWrapper.append(popupParent);

    //clsBtn(vnutri popup)
    let clsBtn = document.createElement("div");
    clsBtn.setAttribute("class", "clsBtn")
    popupParent.append(clsBtn);

    //clsBtn img
    let clsBtnImg = document.createElement("img");
    clsBtnImg.src = "imgs/clsBtnImg.png"
    clsBtn.append(clsBtnImg)

    //deleteBtn
    let deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("class", "deleteBtn")
    deleteBtn.innerHTML = "DELETE"
    popupParent.append(deleteBtn)

    document.body.append(popupWrapper);

    document.querySelector(".popupWrapper").addEventListener("click", hidePopupWrapper)
    document.querySelector(".deleteBtn").addEventListener("click", deleteCountry)

}
function hidePopupWrapper(event) {

    if (event.target == this || event.target.tagName == "IMG") {
        document.querySelector(".popupWrapper").classList.add("hidden");
    }
}
function deleteCountry(event) {
    // console.log(event.target)
    let countryParent = document.querySelector(".countryParent");
    let chosenCountry = countryParent[countryParent.selectedIndex].innerHTML.toLowerCase();

    //deleting country
    let deletedCountry = delete countries[chosenCountry];
    //saving changes to localStorage
    localStorage.countries = JSON.stringify(countries)
    //removing popupWrapper
    document.querySelector(".popupWrapper").remove()

    // deleting country from DOM(from countryParent)
    let countryChildren = document.querySelector(".countryParent").children;
    for (let i = 0; i < countryChildren.length; i++) {
        let countryName = countryChildren[i].innerHTML.slice(0, 1).toLowerCase() + countryChildren[i].innerHTML.slice(1);

        if (countryName == chosenCountry) {
            countryChildren[i].remove()
        }

    }
    renderTable()
}


//click event
function createCountriesInp(event, editAddDelete) {
    // console.log(addCreateOrEdit)
    //beru stili bloka so stranami i vybrannuyu stranu
    let countryParent = document.querySelector(".countryParent");
    let chosenCountry = countryParent[countryParent.selectedIndex].innerHTML;
    let { x, y, width, height } = countryParent.getBoundingClientRect();

    //sozdayu novyy input i dayu posicyonirovanie na countryParent blok
    let countriesInp = document.createElement("input");
    countriesInp.setAttribute("class", `${editAddDelete}CountriesInp`)
    countriesInp.style = `width: ${width};height: ${height};left: ${x};top: ${y};position: absolute;border-radius: 100px;`

    if (editAddDelete == "edit") {
        countriesInp.value = chosenCountry
    } else if (editAddDelete == "add") {
        countriesInp.placeholder = "type new country name"
    }

    //vstavlyayu ego v body
    document.body.append(countriesInp);
    countriesInp.focus()

    //udalyayu blok gde "edit add delete img" knopki
    document.querySelector(".settingsWrapper").remove()
    // document.querySelector("#settingsImg")?.remove()

}
function createSaveOrCancelBlock() {

    document.querySelector(".saveOrCancelParent")?.remove()

    let saveOrCancelParent = document.createElement("div")
    saveOrCancelParent.setAttribute("class", "saveOrCancelParent");

    let saveImg = document.createElement("img")
    saveImg.setAttribute("id", "saveImg")
    saveImg.src = "imgs/saveImg.png"
    saveOrCancelParent.append(saveImg)

    let cancelImg = document.createElement("img")
    cancelImg.setAttribute("id", "cancelImg")
    cancelImg.src = "imgs/cancelImg.png"
    saveOrCancelParent.append(cancelImg)

    document.querySelector(".country_wrapper").append(saveOrCancelParent)

    document.querySelector(".saveOrCancelParent").addEventListener("click", chooseSaveOrCancel)
}
function chooseSaveOrCancel(event) {

    if (event.target.getAttribute("id") == "saveImg") {

        //esli byl sozdan input redaktirovaniya
        if (document.querySelector(".editCountriesInp")) {
            let editCountriesInp = document.querySelector(".editCountriesInp");

            let countryParent = document.querySelector(".countryParent");
            let chosenCountry = countryParent[countryParent.selectedIndex].innerHTML;

            //changing countries obj data
            let obj = {}
            for (let key in countries) {
                if (key == chosenCountry.toLowerCase()) {
                    var standartKeyName = key; // key
                    var value = countries[key]; // data

                    // deleting data with old key
                    delete countries[standartKeyName];

                    //sozdayu novyy klyuch s nazvaniem iz inputa 
                    obj[editCountriesInp.value.toLowerCase()] = value;

                    continue;
                }
                obj[key] = countries[key]

            }
            //saving changes to localStorage
            countries = obj;
            localStorage.countries = JSON.stringify(countries);


            //navzanie strany privozhu v nizhniy registr i pervuyu bukvu zaglavnoy
            let inpVal = formatCountryParentInpVal(editCountriesInp.value)

            //changing option.innerHTML
            for (let i = 0; i < countryParent.children.length; i++) {
                if (countryParent.children[i].innerHTML == chosenCountry) {
                    countryParent.children[i].innerHTML = inpVal
                }

            }

            document.querySelector(".editCountriesInp").remove()
            document.querySelector(".saveOrCancelParent").remove()
        } else if (document.querySelector(".addCountriesInp")) {//esli byl sozdan input add
            let countryParent = document.querySelector(".countryParent");
            let addCountriesInp = document.querySelector(".addCountriesInp")

            //saving data
            countries[addCountriesInp.value.toLowerCase()] = []
            localStorage.countries = JSON.stringify(countries)

            //removing all selected attributes in countryParent
            for (let i = 0; i < countryParent.children.length; i++) {
                if (countryParent.children[i].getAttribute("selected")) {
                    countryParent.children[i].removeAttribute("selected");
                }
            }

            //navzanie novoy strany privozhu v nizhniy registr i pervuyu bukvu zaglavnoy
            let inpVal = formatCountryParentInpVal(addCountriesInp.value)

            //dobavlyayu novuyu stranu (addCountriesInp.value) k spisku vseh stran
            let newCountry = document.createElement("option");
            newCountry.innerHTML = inpVal;
            newCountry.setAttribute("selected", true)//adding selected attr
            countryParent.append(newCountry);

            //rendering table again
            renderTable()

            //removing save or cancel btns and removing input 
            document.querySelector(".addCountriesInp").remove()
            document.querySelector(".saveOrCancelParent").remove()
        }


    } else if (event.target.getAttribute("id") == "cancelImg") {
        document.querySelector(".editCountriesInp")?.remove()
        document.querySelector(".addCountriesInp")?.remove()
        document.querySelector(".saveOrCancelParent").remove()
    }
}
function formatCountryParentInpVal(val) {
    let toLowerCasedVal = val.toLowerCase();
    let firstBigLetteredVal = toLowerCasedVal.slice(0, 1).toUpperCase() + toLowerCasedVal.slice(1);

    return firstBigLetteredVal;
}
//////////////////////////////////////////////////


function renderContent() {
    let content = document.createElement("div");
    content.setAttribute("class", "content");

    //contentLeft
    let contentLeft = document.createElement("div");
    contentLeft.setAttribute("class", "contentLeft");

    //stoimost uslug
    let servicePricesTitle = document.createElement("h1");
    servicePricesTitle.setAttribute("class", "servicePricesTitle")
    servicePricesTitle.innerHTML = "СТОИМОСТЬ УСЛУГ"
    contentLeft.append(servicePricesTitle);

    //contentRight
    let contentRight = document.createElement("div");
    contentRight.setAttribute("class", "contentRight");

    //stoimost valyut
    let currencyPricesTitle = document.createElement("h1");
    currencyPricesTitle.setAttribute("class", "servicePrices");
    currencyPricesTitle.innerHTML = "СТОИМОСТЬ ВАЛЮТ";
    contentRight.append(currencyPricesTitle)


    content.append(contentLeft, contentRight);
    document.body.append(content);

}
function updateLocalStorage() {

    if (!localStorage.countries) {
        localStorage.countries = JSON.stringify(countries);
    } else {
        countries = JSON.parse(localStorage.countries)
    }

    let countryParent = document.querySelector(".countryParent");
    let chosenCountryParentCountry = countryParent[countryParent.selectedIndex].innerHTML.toLowerCase();

    let chosenCountry = JSON.parse(localStorage.countries)[chosenCountryParentCountry];

    return chosenCountry

}

let prevEventTarget = {};//  dblEventTarget
let tableIsActive = false;

function renderTable(allCurs) {

    let chosenCountry = updateLocalStorage();

    //esli uje est table i rezultat sum,to udalit
    document.querySelector(".table_wrapper")?.remove();

    let tableWrapper = document.createElement("div");
    tableWrapper.setAttribute("class", "table_wrapper");

    let table = document.createElement("table");
    table.setAttribute("class", "table");
    tableWrapper.append(table)

    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    table.append(thead, tbody);


    //creating trth
    for (let i = 0; i < chosenCountry.length; i++) {
        if (i == 0) {
            let countryKeys = Object.keys(chosenCountry[i]);//getting keys to create trth for table

            let trthParent = document.createElement("tr");//needs only 1 tr block for th
            thead.append(trthParent)
            for (let i = 0; i < countryKeys.length; i++) {
                let th = document.createElement("th");
                th.innerHTML = countryKeys[i];
                trthParent.append(th);
            }

        }

        //creating trtd
        let countryValues = Object.values(chosenCountry[i]);

        let trtdParent = document.createElement("tr");
        if (i == selectedRow && (event?.key == "ArrowDown" || event?.key == "ArrowUp")) {
            trtdParent.style = "background: #6AF8F8;"
        }
        tbody.append(trtdParent)
        for (let i = 0; i < countryValues.length; i++) {
            let td = document.createElement("td");
            td.innerHTML = countryValues[i]
            trtdParent.append(td)
        }

    }

    document.querySelector(".contentLeft").append(tableWrapper)
    showRes(allCurs)
}
document.querySelector(".countryParent").onchange = function tableOnchange(e) {
    //esli pri smene strany nujno udalyat prejnie vybrannyye valyuty
    // document.querySelector(".chosenCurrecies_wrapper")?.remove();

    renderTable(allCurs)

}
async function getData() {
    //exchangerate-api.com
    //https://v6.exchangerate-api.com/v6/82d6f28cf0ef0e13fcc2daa0/latest/USD

    //website    https://www.cbr-xml-daily.ru/
    let data = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    let txtData = await data.text();
    let jsonData = JSON.parse(txtData);

    return jsonData.Valute;

};
async function showRes() {
    let allTds = document.querySelectorAll("tr > td");

    document.querySelector(".addBtn_img")?.remove()
    if (!allTds.length) {
        showAddBtn()
        return
    }

    //umnojayu chisla mejdu soboy
    let multipliedDigsArr = [];//vse umnojennyye chisla
    let twoDigsRes;//resultat umnojeniya dvuh chisel
    for (let i = 0; i < allTds.length; i++) {

        if (!isNaN(allTds[i].innerHTML)) {//if number
            if (twoDigsRes) {
                multipliedDigsArr.push(twoDigsRes * allTds[i].innerHTML)
            } else {
                twoDigsRes = allTds[i].innerHTML
            }
        } else { //if chars
            twoDigsRes = "";
        }
    }
    //pribavlyayu umnojennyye chisla mejdu soboy
    let plusedMultipliedDigs = 0;
    for (let i = 0; i < multipliedDigsArr.length; i++) {
        plusedMultipliedDigs += multipliedDigsArr[i];
    }

    document.querySelector(".convertedRes_wrapper")?.remove();

    let convertedResWrapper = document.createElement("div");
    convertedResWrapper.setAttribute("class", "convertedRes_wrapper");
    let { x, y, width, height } = allTds[allTds.length - 1].getBoundingClientRect();
    convertedResWrapper.style = `position: absolute;left: ${x + (width / 2)}px;top: ${y + height}px;text-align: center;background: lime;float: left;`;

    //chtob v res iznachalno byl  $ i ₽
    let rubCur = allCurs["USD"].Value;

    let res = document.createElement("span");
    res.setAttribute("class", "USDRUB_res");
    res.innerHTML = `${plusedMultipliedDigs}$ / ${(rubCur * plusedMultipliedDigs).toFixed(0)}₽`;


    convertedResWrapper.append(res);
    document.querySelector(".table_wrapper").append(convertedResWrapper)

    if (document.querySelector(".chosenCurrecies_wrapper")) {
        let pricesAndTickersObj = getChosenCurs();
        let convertedCursArr = convertPricesAndTickers(document.querySelector(".USDRUB_res"), pricesAndTickersObj);


        for (let i = 0; i < convertedCursArr.length; i++) {
            let res = document.createElement("span");
            res.setAttribute("class", `${Object.keys(pricesAndTickersObj)[i]}_res`);
            res.innerHTML = ` / ${convertedCursArr[i]}`;

            convertedResWrapper.append(res)
        }
    }


}
function showAddBtn() {
    let contentLeft = document.querySelector(".contentLeft");

    let img = document.createElement("img")
    img.setAttribute("class", "addBtn_img")
    img.src = "imgs/emptyAdd.png"

    contentLeft.append(img)

    img.addEventListener("click", function (event) {
        //ishu stranu kotoraya vybrana
        let countryParent = document.querySelector(".countryParent");
        let countryName = countryParent[countryParent.selectedIndex].innerHTML.toLowerCase();

        //pushu pervyye dannyye v massiv
        countries[countryName].push({ serviceName: "???", price: "0", amount: "0" })

        //sohranyayu v localStorage
        localStorage.countries = JSON.stringify(countries)

        //renderyu table
        renderTable()
    })
}


//////////////////////////////////////////////////////////////////
//creating inputs and rendering it
async function renderCurInput(allCurs) {

    //sozdayu input
    let curInpWrapper = document.createElement("div");
    curInpWrapper.setAttribute("class", "curInpWrapper");

    let inp = document.createElement("input");
    inp.setAttribute("class", "curInp");
    inp.placeholder = "type tickerName"


    //vvod inputa i resultat shojyh tickerov
    inp.addEventListener("input", function (event) {
        //beru dannyye vseh tikerov,chtob pri vvode v input daval podskazku
        let tickersArr = Object.keys(allCurs);

        let tickersByChars = findTickerFromArray(tickersArr, event.target.value.toUpperCase());

        createPopupTickersWindow(tickersByChars)
    })


    //blur ot inputa
    inp.addEventListener("blur", function (event) {
        //optional chaining
        document.querySelector(".tickersWrapper")?.remove();
    })

    curInpWrapper.append(inp)
    document.querySelector(".contentRight").append(curInpWrapper);
}

function findTickerFromArray(array, tickerCharsStartWith) {

    let tickersByChars = []
    for (let i = 0; i < array.length; i++) {
        if (array[i].startsWith(tickerCharsStartWith)) {
            tickersByChars.push(array[i])
        }

    }
    return tickersByChars;
}
//sozdayu vsplyvayushee okno inputa s tickerami kotoryye shojy
function createPopupTickersWindow(tickersByChars) {
    // console.log(tickersByChars)

    if (document.querySelector(".tickersWrapper")) {
        document.querySelector(".tickersWrapper").remove()
    }

    let tickersWrapper = document.createElement("div");
    tickersWrapper.setAttribute("class", "tickersWrapper")

    for (let i = 0; i < tickersByChars.length; i++) {
        let tickerInWindow = document.createElement("div");
        tickerInWindow.setAttribute("class", "tickerInWindow")
        tickerInWindow.innerHTML = tickersByChars[i];
        tickersWrapper.append(tickerInWindow);
    }
    document.querySelector(".curInpWrapper").append(tickersWrapper)


    //esli vysota obshego kollichestva shojyh tickerov > fix vysoty ego wrappera
    if (document.querySelector(".tickerInWindow") && document.querySelector(".tickerInWindow").getBoundingClientRect().height * tickersByChars.length > tickersWrapper.getBoundingClientRect().height) {
        tickersWrapper.style = `overflow-y: scroll;`
    }


    tickersWrapper.addEventListener("mousedown", function (event) {
        document.querySelector(".curInp").value = "";
        showCurPrice(event.target.innerHTML)
    })
}
//pokazyvayu vsyu informacyyu o vybrannoy valyute
async function showCurPrice(ticker) {

    let { Name, CharCode, Value, Nominal } = allCurs[ticker];

    if (!document.querySelector(".chosenCurrecies_wrapper")) {
        let chosenCurreciesWrapper = document.createElement("div");
        chosenCurreciesWrapper.setAttribute("class", "chosenCurrecies_wrapper");

        document.querySelector(".contentRight").append(chosenCurreciesWrapper)
    } else {
        let yesOrNot = checkDidIchooseItBefore(ticker);
        if (yesOrNot == "yes") {
            return;
        }
    }

    let chosenTickerWrapper = document.createElement("div");
    chosenTickerWrapper.setAttribute("class", `${CharCode}_wrapper`);

    let img = document.createElement("img");
    img.src = `imgs/flags/${CharCode}.png`
    chosenTickerWrapper.append(img)

    let curName = document.createElement("span");
    curName.innerHTML = Name;
    chosenTickerWrapper.append(curName);

    let tickerName = document.createElement("span");
    tickerName.innerHTML = ` (${CharCode}) `;
    tickerName.setAttribute("class", "tickerName")
    chosenTickerWrapper.append(tickerName);

    let price = document.createElement("span");
    price.setAttribute("class", "price")
    price.innerHTML = ` - ${(Value / Nominal).toFixed(3)} руб.` + "<hr>";
    chosenTickerWrapper.append(price);

    document.querySelector(".chosenCurrecies_wrapper").append(chosenTickerWrapper);
    showRes()
}

function getChosenCurs() {

    let curChildren = document.querySelector(".chosenCurrecies_wrapper").children;


    let pricesAndTickersObj = {};
    let tickerName, price;
    for (let i = 0; i < curChildren.length; i++) {

        for (let j = 0; j < curChildren[i].children.length; j++) {

            if (curChildren[i].children[j].classList.contains('tickerName')) {
                tickerName = curChildren[i].children[j].innerHTML.slice(2, curChildren[i].children[j].innerHTML.length - 2);

            } else if (curChildren[i].children[j].classList.contains('price')) {
                price = curChildren[i].children[j].innerHTML.substr(2, curChildren[i].children[j].innerHTML.length - 11).trim()
            }
            tickerName && price ? pricesAndTickersObj[tickerName] = price : false;
        }


    }
    return pricesAndTickersObj;
}
function checkDidIchooseItBefore(ticker) {

    let allChosenCurs = document.querySelector(".chosenCurrecies_wrapper").children;

    for (let i = 0; i < allChosenCurs.length; i++) {
        if (ticker == allChosenCurs[i].getAttribute("class").split("_")[0]) {
            return "yes";
        }
    }
}

function convertPricesAndTickers(resPrice, pricesAndTickers) {
    //vernut massiv strok.(resultat vychisleniya i simvol.) k primeru ["1232.32$","3421.33#"]
    // console.log(((usdRes * rubCur) / cenaVybrannoyValyuty).tofixed(3) + label)
    //ili
    // console.log((rubRes / cenaVybrannoyValyuty).tofixed(3) + label)

    // console.log(pricesAndTickers)


    let tickersArr = {
        'AUD': "$", 'AZN': "₼", 'GBP': "£", 'AMD': "Դ", 'BYN': "byn", 'BGN': "bgn", 'BRL': "R$", 'HUF': "ƒ", 'HKD': "$", 'DKK': "dkk", 'USD': "$", 'EUR': "€", 'INR': "₹", 'KZT': "〒", 'CAD': "$", 'KGS': "kgs", 'CNY': "¥", 'MDL': "mdl", 'NOK': "nok", 'PLN': "Zł	", 'RON': "ron", 'XDR': "xdr", 'SGD': "$", 'TJS': "tjs", 'TRY': "₺", 'TMT': "tmt", 'UZS': "uzs", 'UAH': "₴", 'CZK': "Kč", 'SEK': "sek", 'CHF': "₣", 'ZAR': "R", 'KRW': "₩", 'JPY': "¥"
    };


    //converting res price to chosen currency price
    let usdRes = resPrice.innerHTML.split("$")[0]; // 138 - res dollarov
    let rubRes = resPrice.innerHTML.split("/")[1].replace("₽", "").trim()//10164 - res rubley
    let rubCur = allCurs.USD.Value;//73.651 руб.

    let convertedCurs = [];
    for (let ticker in pricesAndTickers) {
        let chosenCurPrice = pricesAndTickers[ticker];
        convertedCurs.push((usdRes * rubCur / chosenCurPrice).toFixed(3) + tickersArr[ticker]);
    }
    return convertedCurs;
}


///////table tag
// let prevEventTarget = {};//  dblEventTarget
// let tableIsActive = false;

let tableReadyToCopy = false;
let tableReadyToEdit = false;
///////select tag
let countryIsActive = false;
let countryReadyToCopy = false;

let selectedRow;

document.body.addEventListener("click", function ({ target }) {
    //esli click byl na TD(table)
    if (target.tagName == "TD") {
        {
            // //esli proshlyy kliknutyy elem shoj na seychashnoy klik elem
            // if (target == prevEventTarget.elem) {

            //     //esli pri pervom klike ne bylo stiley u elementa
            //     if (!prevEventTarget.ownStyles) {
            //         prevEventTarget.elem.parentElement.removeAttribute("style")
            //         prevEventTarget = {};
            //         // return;
            //     } else {
            //         // prevEventTarget.elem.parentElement.style = prevEventTarget.ownStyles;
            //     }
            //tableIsActive = false;
            // }
        }

        if (tableIsActive && selectedRow == target.parentElement.rowIndex - 1) {
            tableIsActive = false;
            target.parentElement.style.background = null;
            prevEventTarget = {}

        } else if (target != prevEventTarget.elem) {//esli klick na novyy element tablicy

            //novyy kliknutyy element bez stiley
            if (prevEventTarget.elem && !prevEventTarget.ownStyles) {
                prevEventTarget.elem.parentElement.removeAttribute("style")
                prevEventTarget = {};
            } else {
                // eventTargetObj.elem.parentElement.style = eventTargetObj.ownStyles;
            }

            tableIsActive = true;
            selectedRow = target.parentElement.rowIndex - 1;

            //saving clicked element and its styles
            prevEventTarget.elem = target;
            prevEventTarget.ownStyles = target.parentElement.style.cssText;

            //selecting elem
            target.parentElement.style = "background: #6AF8F8";
        }
    }
    // else if (event.target.classList.contains("countryParent")) {
    //     countryIsActive = true;
    //     console.log(event.target)
    // }

})
document.body.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.code == "KeyC") {
        if (tableIsActive) {
            tableReadyToCopy = true
        }
        // else if (countryIsActive) {
        //     countryReadyToCopy = true;
        // }
    }


    changeTableRowsPos(event)


    if (tableIsActive) {
        let [tableRowsArr, tableRow, rowIdx, eventTargetIdx] = getAllTableRows()

        if (event.key == "Delete") {//deleting a row from a table
            if (prevEventTarget.elem && tableIsActive && prevEventTarget.elem.tagName == "TD") {
                tableIsActive = false;

                //udalyayu element s obyekta massiva
                tableRowsArr.splice(rowIdx, 1);

                //sohranyayu izmeneniya v localStorage
                localStorage.countries = JSON.stringify(countries);

                //pererisovyvayu tablicu
                renderTable(allCurs)
            }
        } else if (event.ctrlKey && event.code == "KeyV" && tableReadyToCopy && tableIsActive) {//pushing copied row to a table

            tableRowsArr.push(tableRow);

            tableIsActive = false;
            tableReadyToCopy = false;

            //sohranyayu izmeneniya v localStorage
            localStorage.countries = JSON.stringify(countries);

            //pererisovyvayu tablicu
            renderTable(allCurs)
        } else if (event.code == "Enter" && tableReadyToEdit) {//editing table
            let inp = document.querySelector(".editInp");

            //TUT SDELAT PROVERKU NA INPUTY,ESLI ONI PUSTYYE TO NE SOHRANYAT
            if (inp.value) {
                tableRowsArr[rowIdx][serviceKeys[eventTargetIdx]] = inp.value;
            }


            tableReadyToEdit = false
            inp.remove();

            //sohranyayu izmeneniya v localStorage
            localStorage.countries = JSON.stringify(countries);

            //pererisovyvayu tablicu
            renderTable(allCurs)

        }

    }
    // else if (countryIsActive) {
    //     console.log("country")
    // }


})


function changeTableRowsPos(event) {

    if (tableIsActive && event.code == "ArrowUp" || event.code == "ArrowDown") {
        let [tableRowsArr, tableRow, rowIdx, eventTargetIdx] = getAllTableRows();

        try {
            //peremeshayu element tablicy vverh
            if (event.code == "ArrowUp") {

                // //vyrezayu item kliknutyy
                // let deletedItem = tableRowsArr.splice(rowIdx, 1);
                // //vstavlyayu etot item na nujnuy pozicyyu
                // tableRowsArr.splice(rowIdx - 1, 0, ...deletedItem);

                shift(tableRowsArr, selectedRow, true)
                selectedRow--


            } else if (event.code == "ArrowDown") {//peremeshayu element tablicy vniz
                //vyrezayu item kliknutyy
                // let deletedItem = tableRowsArr.splice(rowIdx, 1)
                // //vstavlyayu etot item na nujnuy pozicyyu
                // tableRowsArr.splice(rowIdx + 1, 0, ...deletedItem);

                shift(tableRowsArr, selectedRow, false)
                selectedRow++
            }
        } catch (error) {
            return;
        }


        //sohranyayu izmeneniya v localStorage
        localStorage.countries = JSON.stringify(countries);

        //pererisovyvayu tablicu
        renderTable()

    }

}
function shift(arr, i, up = false) {
    const j = up ? i - 1 : i + 1
    if (j < 0 || j > arr.length - 1) throw new Error('that is impossible')
    arr.splice(i, 0, ...arr.splice(j, 1))
    return arr
}
function getAllTableRows() {
    //ishu stranu s kotoroy kopiruyu element
    let countryParent = document.querySelector(".countryParent");
    let chosenCountryParentCountry = countryParent[countryParent.selectedIndex].innerHTML.toLowerCase();

    //vse elementy tablicy pomeshayu v massiv,chtob nayti index vydelennogo elementa
    let tableChindren = [...document.querySelector("tbody").children];
    //nahoju index stroki tablicy na kotoruyu byl sdelat click (vydelennogo elementa)

    if (prevEventTarget.elem) {
        var { cellIndex, parentElement: { rowIndex } } = prevEventTarget.elem;
    }


    //nahoju index stroki tablicy na kotoruyu byl sdelat click (vydelennogo elementa)
    // let rowIdx = tableChindren.indexOf(prevEventTarget.elem.parentElement) - 1;
    //vse elementy stroki pomeshayu v massiv ,chtob nayti idx elementa na kotoryy byl sdelan klick
    // let rowChildren = [...prevEventTarget.elem.parentElement.children];
    //nahoju index elementa na kotoryy byl sdelan click 
    // let eventTargetIdx = rowChildren.indexOf(prevEventTarget.elem);



    //vozvrashayu ORIGINALNYY MASSIV S NAYDENNYMI ELEMENTAMI: vsehDeteyTablicy,vydelennogoRebenkaTablicy,indexVydelennogoRebenkaTablicy
    return [countries[chosenCountryParentCountry], countries[chosenCountryParentCountry][rowIndex - 1], rowIndex - 1, cellIndex]
}
document.body.addEventListener("dblclick", function (event) {


    if (event.target.tagName == "TD") {

        document.querySelector(".editInp")?.remove();

        let editInp = document.createElement("input");
        editInp.setAttribute("class", "editInp");

        //restricting input only for letters
        if (isNaN(event.target.innerHTML)) {
            editInp.setAttribute("onkeypress", "return /[a-z]/i.test(event.key)")
        } else {//restricting input only for nums
            editInp.setAttribute("oninput", "validateEditNumInp(this)");
        }

        prevEventTarget.elem = event.target;
        tableReadyToEdit = true;
        tableIsActive = true;

        let { x, y, width, height } = event.target.getBoundingClientRect()//editingTdStyles

        //!!!tut sdelat provverku esli dbl click proizoshel na td element,v kotorom bukvy,to sozdat input tolko dlya bukv,esli dbl click proizoshel na td elem,gde cyfry to input tolko dlya cyfr.esli vvedenyy format ne budet sovpadat s inputom davay opoveshenie izchezayushee .pozicyonirovanie x/y doljno byt na tom je urovne ,gde proishodit redaktirovanie


        editInp.value = event.target.innerHTML;
        editInp.style = `text-align: center;position: absolute; width: ${width};height: ${height};left: ${x};top: ${y};outline: none;border: 0;`

        document.body.append(editInp);

        editInp.focus();
        document.querySelector(".editInp").addEventListener("blur", function editInpBlur(event) {
            if (tableReadyToEdit) {
                document.querySelector(".editInp")?.remove();
            }
        })
    }

})
function validateEditNumInp(inp) {
    inp.value = inp.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}










