let offers = [];

function loadInitialOffers() {
    const savedOffers = localStorage.getItem("offers");
    if (savedOffers && JSON.parse(savedOffers).length > 0) {
        offers = JSON.parse(savedOffers);
    } else {
        offers = [
            { id: "firstOffer", title: "20% Off Your Next Purchase", description: "Take advantage of our second offer! Receive a 20% discount on your next purchase and save big on your favorite items.", image: "images/sofaOffer.png" },
            { id: "secondOffer", title: "Seasonal Sale - Up to 50% Off", description: "Get ready for our seasonal sale! Enjoy discounts of up to 50% on select items. Hurry, while supplies last!", image: "images/CoffeeTableOffer.png" },
            { id: "thirdOffer", title: "Holiday Bundle Deals", description: "Get ready for the holidays with our special bundle offers. Buy gift sets at a discounted price and make your holiday shopping easier!", image: "images/wallFrame.png" }
        ];
        saveOffersToLocalStorage();
    }
}

function saveOffersToLocalStorage() {
    localStorage.setItem("offers", JSON.stringify(offers));
}

function deleteSelectedOffers() {
    const selectedOfferIds = offers.filter(offer => document.getElementById(offer.id).checked).map(offer => offer.id);

    if (selectedOfferIds.length === 0) {
        alert("Please select at least one offer.");
        return;
    }

    if (confirm("Are you sure you want to delete the selected offers?")) {
        offers = offers.filter(offer => !selectedOfferIds.includes(offer.id));
        saveOffersToLocalStorage();
        renderOffers();
    }
}

function renderOffers() {
    const offersContainer = document.querySelector(".SellerOffers");
    offersContainer.innerHTML = "";

    offers.forEach(offer => {
        offersContainer.innerHTML += `
            <div class="offer">
                <img src="${offer.image}" alt="${offer.title}">
                <label for="${offer.id}">${offer.title}</label>
                <p>${offer.description}</p>
                <input type="checkbox" id="${offer.id}" name="${offer.title}">
            </div>
        `;
    });

    offersContainer.innerHTML += `
        <div class="DeleteBtn"><button type="button" id="DeleteBtn" onclick="deleteSelectedOffers()">Delete Offer</button></div>
    `;
}

function CheckAddOfferForm(event) {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("OfferTextarea");
    const imageInput = document.getElementById("uploadOfferImage");

    let missing = "";

    if (titleInput.value == "" || titleInput.value == null) {
        missing = "Title";
    }

    if (descriptionInput.value == "" || descriptionInput.value == null) {
        if (missing === "")
            missing = "Description";
        else
            missing += ", Description";
    }

    if (missing !== "") {
        alert(missing + " must be filled.");
        return;
    }

    if (imageInput.files.length === 0) {
        alert("Please upload an image.");
        return;
    }

    const file = imageInput.files[0];
    if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
    }

    const newOfferId = "offer" + (offers.length + 1);

    const newOffer = {
        id: newOfferId,
        title: titleInput.value,
        description: descriptionInput.value,
        image: URL.createObjectURL(imageInput.files[0])
    };

    offers.push(newOffer);
    saveOffersToLocalStorage();
    renderOffers();
    
    titleInput.value = "";
    descriptionInput.value = "";
    imageInput.value = "";
}

window.onload = function() {
    loadInitialOffers();
    renderOffers();
};
