import jsonList from './example.json' assert { type: 'json'};

// Get elements
//Galvenā izvēlne;
const izvēlne = document.getElementById('itemsSelect');
// Koda teksts;
const precesKods = document.getElementById('selectedItem');
// Konteiners, kurā parādīsies papildu izvēlnes;
const konteiners = document.getElementById('varietiesContainer');


function updateSelectedItemCode() {
    const izvēlētaisIndekss = izvēlne.selectedIndex;
    if (izvēlētaisIndekss !== 0) {
        const izvēlētaisKods = izvēlne.value;
        const datiIzvēlētajāKodā = jsonList.items.find(item => item.code === izvēlētaisKods);
        if (datiIzvēlētajāKodā) {

            // Notīra esošās papildu izvēlnes;
            konteiners.innerHTML = '';

            if (datiIzvēlētajāKodā.varieties.length > 0) {
                datiIzvēlētajāKodā.varieties.forEach(varietyCode => {

                  // Izveido papildu izvēlnes
                  const varietyDropdown = document.createElement('select');
                  varietyDropdown.id = varietyCode;
                  varietyDropdown.name = varietyCode;
                  varietyDropdown.appendChild(new Option(varietyCode));
                  
                  varietyDropdown.addEventListener('change', function() {
                    const selectedValue = this.value;
                

                    // PRECES KODA TEKSTS
                  precesKods.textContent = "Preces kods: " + datiIzvēlētajāKodā.code + "." + selectedValue + ".";
                  });
    
                  // Piepilda ar JSON datiem
                  const varietyData = jsonList.varieties.find(variety => variety.code === varietyCode);
                  varietyData.options.forEach(option => {
                    varietyDropdown.appendChild(new Option(option.description, option.code));
                  });

                  konteiners.appendChild(varietyDropdown);
                });
            } else {
                precesKods.textContent = "Preces kods: " + datiIzvēlētajāKodā.code;
            }
        }
  
    } else {
        precesKods.textContent = "Izvēlies produktu no saraksta!";
    }
}


// Filling item select dropdown;
jsonList.items.forEach(item => {
const option = document.createElement('option');
option.value = item.code;
option.text = item.description;
izvēlne.appendChild(option);
});

// Add an event listener to the select element
izvēlne.addEventListener('change', updateSelectedItemCode);