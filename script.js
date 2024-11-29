// script.js

// Login functionality
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Please enter valid credentials");
    }
});

// Display products on the home page
const products = [
    { id: 1, name: "Product 1", description: "Description of Product 1" },
    { id: 2, name: "Product 2", description: "Description of Product 2" },
    { id: 3, name: "Product 3", description: "Description of Product 3" },
];

function displayProducts() {
    const productContainer = document.getElementById("product-list");
    if (productContainer) {
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <button onclick="window.location.href='bidding.html'">Bid Now</button>
            `;
            productContainer.appendChild(productDiv);
        });
    }
}

displayProducts();

// Bidding functionality
let bids = JSON.parse(localStorage.getItem("bids")) || [];

function displayBids() {
    const bidList = document.getElementById("bidList");
    bidList.innerHTML = "";

    const sortedBids = bids.sort((a, b) => b.amount - a.amount);
    sortedBids.forEach(bid => {
        const bidItem = document.createElement("div");
        bidItem.className = "bid-item";
        bidItem.innerText = `Bid: $${bid.amount} by ${bid.user}`;
        bidList.appendChild(bidItem);
    });
}

document.getElementById("biddingForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const bidAmount = parseFloat(document.getElementById("bidAmount").value);
    const user = `User ${Math.floor(Math.random() * 100) + 1}`;

    if (bidAmount) {
        bids.push({ user, amount: bidAmount });
        localStorage.setItem("bids", JSON.stringify(bids));

        document.getElementById("bidAmount").value = "";
        displayBids();
    }
});

// Countdown Timer for Bidding
const biddingTimeLimit = 60;
let timeRemaining = biddingTimeLimit;
let countdown;

function startCountdown() {
    const timerDisplay = document.getElementById("timer");

    countdown = setInterval(() => {
        timeRemaining -= 1;

        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeRemaining <= 0) {
            clearInterval(countdown);
            document.getElementById("biddingForm").style.display = "none";
            handleEndOfBidding();
        }
    }, 1000);
}

function handleEndOfBidding() {
    if (bids.length > 0) {
        const highestBid = bids.sort((a, b) => b.amount - a.amount)[0];

        localStorage.setItem("highestBid", JSON.stringify(highestBid));
        alert(`Bidding ended! Redirecting ${highestBid.user} to the payment page.`);
        window.location.href = "payment.html";
    } else {
        alert("No bids were placed.");
    }
}

// Initialize bidding display and start countdown
displayBids();
startCountdown();

// Payment functionality
document.getElementById("paymentForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Payment processed successfully!");
});
