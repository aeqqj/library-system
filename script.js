const inventoryForm = document.getElementById("inventory-form");
const inputBook = document.getElementById("input-book");
const inventoryList = document.getElementById("inventory-list");
const noItem = document.getElementById("no-item"); // displays if there are no items in the table.

let inventory = [];

function fetchJSON() {
    fetch("./data/library.json")
        .then (response => {
            if (!response.ok) {
                throw new Error("wadafak");
            }
            return response.json();
        })
        .then (data => {
            inventory = data;
            renderBooks();
        })
        .catch (error => {
            console.error("Error fetching data", error);
        })
}


function renderBooks() {
    inventoryList.innerHTML = "";

    if (inventory.length === 0) {
        noItem.style.display = "block";
    } else {
        noItem.style.display = "none";
    }

    inventory.forEach((book, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.status}</td>
            <td>
                <button class="removeBtn" data-index="${index}">Remove</button>
            </td>
        `;
        inventoryList.appendChild(row);
    });

    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", removeBook);
    })
}

function addBook(e) {
    e.preventDefault();

    let name = inputBook.value.trim();

    if (name === "") {
        alert("Please add the name of your book");
        return;
    };

    const newBook = {
        "id": inventory[inventory.length - 1].id + 1,
        "title": name,
        "status": "available"
    };

    inventory.push(newBook);
    renderBooks();

    inputBook.value = "";
}

function removeBook(e) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (confirm("Remove this item?")) {
        inventory.splice(index, 1);
        renderBooks();
    }
}

fetchJSON();

inventoryForm.addEventListener("submit", addBook);
