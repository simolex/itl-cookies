const mainAction = () => {
    const mainButton = document.getElementById("main-action-button");
    mainButton.addEventListener("click", () => {
        const productsSection = document.getElementById("products");
        productsSection.scrollIntoView({ behavior: "smooth" });
    });
};

const menuActions = () => {
    const linksMenu = document.querySelectorAll(".menu-item > a");
    linksMenu.forEach((anchor) =>
        anchor.addEventListener("click", (e) => {
            const nameLink = e.target.dataset.link;
            const section = document.getElementById(nameLink);
            section.scrollIntoView({ behavior: "smooth" });
        })
    );
};

const selectCookie = () => {
    const buttonsProduct = document.querySelectorAll(".products-item .button");
    const product = document.getElementById("product");

    buttonsProduct.forEach((button) =>
        button.addEventListener("click", () => {
            const order = document.getElementById("order");
            const productDetails = button.closest(".products-item-details");
            product.value = productDetails.querySelector(".products-item-title").innerText;
            order.scrollIntoView({ behavior: "smooth" });
        })
    );
};

const changeCurrency = () => {
    const priceSlots = document.querySelectorAll(".products-item-price");
    const currency = document.getElementById("change-currency");
    const exchanges = [
        { type: "$", rate: 1 },
        { type: "₽", rate: 90 },
        { type: "Br", rate: 3 },
        { type: "€", rate: 1.1 },
        { type: "¥", rate: 6.9 },
    ];
    const countExch = exchanges.length;

    const setPrices = (currencyIndex) => {
        currencyIndex = +currencyIndex;
        priceSlots.forEach((slot) => {
            slot.innerText = `${(+slot.dataset.basePrice * exchanges[currencyIndex].rate).toFixed(
                1
            )} ${exchanges[currencyIndex].type}`;
        });
    };

    let savedCurrency = localStorage.getItem("currentCurrency");
    if (!savedCurrency) {
        savedCurrency = 0;
    }
    setPrices(savedCurrency);
    currency.dataset.currency = savedCurrency;
    currency.innerText = exchanges[savedCurrency].type;

    currency.addEventListener("click", function (e) {
        let currencyIndex = +e.target.dataset.currency;

        currencyIndex = (currencyIndex + 1) % countExch;
        localStorage.setItem("currentCurrency", currencyIndex);

        e.target.dataset.currency = currencyIndex;
        e.target.innerText = exchanges[currencyIndex].type;

        setPrices(currencyIndex);
    });
};

const validateOrder = () => {
    const product = document.getElementById("product");
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");

    const sendOrder = document.getElementById("send-order");
    sendOrder.addEventListener("click", function (e) {
        let hasError = false;

        e.preventDefault();
        [product, name, phone].forEach((item) => {
            if (!item.value) {
                item.style.borderColor = "red";
                hasError = true;
            } else {
                item.style.borderColor = "";
            }
        });

        if (!hasError) {
            [product, name, phone].forEach((item) => {
                item.value = "";
            });
            setTimeout(() => {
                alert("Спасибо за заказ!\nМенеджер скоро с вам свяжется.");
            }, 60);
        }
    });
};

mainAction();
menuActions();
selectCookie();
changeCurrency();
validateOrder();
