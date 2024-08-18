
let input = document.getElementsByClassName("input")[0];
let searchBtn = document.getElementsByClassName("searchBtn")[0];
let card = document.querySelector(".card");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let cardDetail = document.getElementsByClassName("cardDetail")[0];

function cardFormat(element, image, phone_name, brand) {
    console.log("card format", element);
    let div = `
        <div class="cards">
            <img src="${image}" alt="${phone_name}">
            <h1>${phone_name}</h1>
            <h2>${brand}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <button class="showDetails" onClick="showDetailsPage('${element.image}', '${element.phone_name}', '${element.brand}', '${element.slug}')">SHOW DETAILS</button>
        </div>
    `;
    return div;
}

let dataDetail;
let dataCount = 0;

async function fetchData() {
    dataCount = 0;
    card.innerHTML = "";  
    cardDetail.style.display = "none";
    let query = input.value.toLowerCase();

    let fetched = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
    dataDetail = await fetched.json();

    // Filter phones based on the search query
    let filteredData = dataDetail.data.filter(phone => phone.phone_name.toLowerCase().includes(query));

    if (filteredData.length === 0) {
        notFound();
        return;
    }

    filteredData.forEach((element, index) => {
        if (index < 5) {
            card.innerHTML += cardFormat(element, element.image, element.phone_name, element.brand);
            dataCount++;
        }
    });
}

function nextPage() {
    console.log("next");
    let i = dataCount + 5;
    if (i >= dataDetail.data.length) {
        i = dataDetail.data.length - 1;
    }
    card.innerHTML = "";

    dataDetail.data.forEach((element, index) => {
        if (index < i && index >= dataCount) {
            console.log("ele is", index);
            card.innerHTML += cardFormat(element, element.image, element.phone_name, element.brand);
            dataCount++;
        }
    });
}

function prevPage() {
    console.log("prev");
    let i = dataCount - 5;
    if (i < 0) {
        i = 0;
    }
    card.innerHTML = "";
    dataDetail.data.forEach((element, index) => {
        if (index >= i && index < dataCount) {
            console.log("ele is", index);
            card.innerHTML += cardFormat(element, element.image, element.phone_name, element.brand);
            console.log("done...");
            dataCount--;
        }
    });
}

function showDetailsPage(image, phoneName, brand, slug) {
    console.log(image, phoneName, brand, slug);
    let div = `
        <div class="cards">
            <img src="${image}" alt="${phoneName}">
            <h1>${phoneName}</h1>
            <h2>${brand}</h2>
            <p>${slug}</p>
            <button class="close">CLOSE</button>
        </div>
    `;
    div.className = "card1";

    cardDetail.innerHTML = div;
    cardDetail.style.display = "block";
    let closeButton = cardDetail.querySelector(".close");
    console.log("going to click close clicked", closeButton);
    closeButton.addEventListener("click", () => {
        cardDetail.innerHTML = "";
        cardDetail.style.display = "none";
    });
}

function notFound() {
    let divNot = `<h1>No Mobile Phone Found in this Store</h1>`;
    card.innerHTML = divNot;
}

searchBtn.addEventListener("click", fetchData);
next.addEventListener("click", nextPage);
prev.addEventListener("click", prevPage);

fetchData();

