import jsonList from './example.json' assert { type: 'json'};

//Galvenā izvēlne;
const mainDropdown = document.getElementById('itemsSelect');
// Koda teksts;
const itemCodeTitle = document.getElementById('selectedItem');
// Konteiners, kurā parādīsies papildu izvēlnes;
const varietyDropdownContainer = document.getElementById('varietiesContainer');
const selectedDropdownValues = {};

function clearVarietyDropdowns() {
    // Notīra esošās papildu izvēlnes;
    varietyDropdownContainer.innerHTML = '';
}

// Izveido papildus izvēlnes
function createVarietyDropdown(varietyCode, varietyData, selectedItemData) {
    const varietyDropdown = document.createElement('select');
    varietyDropdown.id = varietyCode;
    varietyDropdown.name = varietyCode;
    varietyDropdown.appendChild(new Option(varietyCode));
  
    varietyData.options.forEach(option => {
      varietyDropdown.appendChild(new Option(option.description, option.code));
    });
  
    varietyDropdown.addEventListener('change', function() {
      selectedDropdownValues[varietyCode] = this.value;
      updateCodeText(selectedItemData);
    });
  
    varietyDropdownContainer.appendChild(varietyDropdown);
    selectedDropdownValues[varietyCode] = "";
  }

    // Piepilda mainDropdown ar select opcijām
  function populateMainDropdown() {
    jsonList.items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.code;
      option.text = item.description;
      mainDropdown.appendChild(option);
    });
  }

    // Uzslēdz event listener uz katrām izmaiņām;
  function initialize() {
    mainDropdown.addEventListener('change', updateSelectedItemCode);
    mainDropdown.addEventListener('change', updateCodeText);
    populateMainDropdown();
  }

  // Pārbauda vai izvēlas visas vērtības un atgriež kodu, ja tam nav papildu izvēlnes;
  function updateSelectedItemCode() {
    const selectedIndex = mainDropdown.selectedIndex;
    if (selectedIndex !== 0) {
      const selectedItemCode = mainDropdown.value;
      const selectedItemData = jsonList.items.find(item => item.code === selectedItemCode);
      if (selectedItemData) {
        clearVarietyDropdowns();
        if (selectedItemData.varieties.length > 0) {
          selectedItemData.varieties.forEach(varietyCode => {
            const varietyData = jsonList.varieties.find(variety => variety.code === varietyCode);
            createVarietyDropdown(varietyCode, varietyData, selectedItemData);
          });
        } else {
          itemCodeTitle.textContent = "Preces kods: " + selectedItemData.code;
        }
      }
    } else {
      itemCodeTitle.textContent = "Izvēlies produktu no saraksta!";
    }
  }
  
  // Ģenerē preces kodu atkarībā no precei pieejamajām opcijām;
  function updateCodeText(selectedItem) {
    const selectedVarietyValues = Object.values(selectedDropdownValues);
    const allValuesSelected = selectedVarietyValues.every(value => value !== '');
    
    if (allValuesSelected) {
      const codeText = `${selectedItem.code}.${selectedVarietyValues.join('.')}`;
      itemCodeTitle.textContent = "Preces kods: " + codeText;
    } else {
      itemCodeTitle.textContent = "Lūdzu, izvēlieties visas vērtības!";
    }
}
  
  initialize();


// NESAKĀRTOTS
// function updateSelectedItemCode() {
//     const selectedIndex = mainDropdown.selectedIndex;
//     if (selectedIndex !== 0) {
//         const selectedItemCode = mainDropdown.value;
//         const selectedItemData = jsonList.items.find(item => item.code === selectedItemCode);
//         if (selectedItemData) {
//             mainDropdown.addEventListener('change', updateSelectedItemCode);
            
//             // Notīra esošās papildu izvēlnes;
//             varietyDropdownContainer.innerHTML = '';

//             if (selectedItemData.varieties.length > 0) {
//                 selectedItemData.varieties.forEach(varietyCode => {

//                   // Izveido papildus izvēlnes
//                   const varietyDropdown = document.createElement('select');
//                   varietyDropdown.id = varietyCode;
//                   varietyDropdown.name = varietyCode;
//                   varietyDropdown.appendChild(new Option(varietyCode));
    
//                   // Piepilda ar JSON datiem
//                   const varietyData = jsonList.varieties.find(variety => variety.code === varietyCode);
//                   varietyData.options.forEach(option => {
//                     varietyDropdown.appendChild(new Option(option.description, option.code));
//                   });

//                   varietyDropdown.addEventListener('change', function() {
//                     selectedDropdownValues[varietyCode] = this.value;
//                     updateCodeText(selectedItemData);
//                 });

//                   varietyDropdownContainer.appendChild(varietyDropdown);
//                   selectedDropdownValues[varietyCode] = "";
//                 });
//             } else {
//                 itemCodeTitle.textContent = "Preces kods: " + selectedItemData.code;
//             }
//         }
//     } else {
//         itemCodeTitle.textContent = "Izvēlies produktu no saraksta!";
//     }
// }

// // PRECES KODA TEKSTS
// function updateCodeText(selectedItem) {
//     const selectedVarietyValues = Object.values(selectedDropdownValues);
//     const allValuesSelected = selectedVarietyValues.every(value => value !== '');
    
//     if (allValuesSelected) {
//         const codeText = `${selectedItem.code}.${selectedVarietyValues.join('.')}`;
//         itemCodeTitle.textContent = "Preces kods: " + codeText;
//     } else {
//         itemCodeTitle.textContent = "Lūdzu, izvēlieties visas vērtības!";
//     }
// }

// // Filling mainDropdown;
// jsonList.items.forEach(item => {
// const option = document.createElement('option');
// option.value = item.code;
// option.text = item.description;
// mainDropdown.appendChild(option);
// });

// // Add an event listener to the select element
// mainDropdown.addEventListener('change', updateSelectedItemCode);
// mainDropdown.addEventListener("change", updateCodeText);