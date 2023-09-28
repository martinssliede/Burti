fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById("options");
    

    data.options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
});

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault;

    const selectedOption = document.getElementById("options").value;
    console.log("Selected option is: ", selectedOption);
});