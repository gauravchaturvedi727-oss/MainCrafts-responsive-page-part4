const submissionContainer = document.getElementById("submissionContainer");

const total = document.getElementById("total");
const search = document.getElementById("search");
const clearAll = document.getElementById("clearAll");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function displayContacts(data) {

    submissionContainer.innerHTML = "";

    if (total) {
        total.textContent = data.length;
    }
    if (data.length === 0) {
        submissionContainer.innerHTML = "<h2>No Submissions Found!</h2>";
        return;
    }

    data.forEach((contact, index) => {

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${contact.name}</h3>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Message:</strong></p>
            <p>${contact.message}</p>
            <p><strong>Date:</strong> ${contact.date || "Not Available"}</p>
            <button class="delete-btn" data-index="${index}">
                Delete
            </button>
        `;
        submissionContainer.appendChild(card);
    });

}

displayContacts(contacts);


if (search) {

    search.addEventListener("keyup", function () {
        const value = search.value.toLowerCase();
        const filtered = contacts.filter(contact =>
            contact.name.toLowerCase().includes(value)
        );
        displayContacts(filtered);
    });

}

submissionContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        contacts.splice(index, 1);
        localStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
        );
        displayContacts(contacts);
    }
});


if (clearAll) {
    clearAll.addEventListener("click", function () {
        if (confirm("Delete all submissions?")) {
            localStorage.removeItem("contacts");
            contacts = [];
            displayContacts(contacts);
        }
    });
}