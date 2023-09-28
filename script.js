    // All items and varieties list
    const jsonList = {
        "varieties": [
          {
            "code": "SIZE",
            "description": "Izmērs",
            "options": [
              {"code": "S", "description": "Small"},
              {"code": "M", "description": "Medium"},
              {"code": "L", "description": "Large"}
            ]
          },
          {
            "code": "COLOR",
            "description": "Krāsa",
            "options": [
              {"code": "RED", "description": "Sarkans"},
              {"code": "BLU", "description": "Zils"},
              {"code": "WHI", "description": "Balts"}
            ]
          },
          {
            "code": "SHOE-SIZE",
            "description": "Apavu izmērs",
            "options": [
              {"code": "37", "description": "37"},
              {"code": "38", "description": "38"},
              {"code": "39", "description": "39"},
              {"code": "40", "description": "40"},
              {"code": "41", "description": "41"},
              {"code": "42", "description": "42"},
              {"code": "43", "description": "43"},
              {"code": "44", "description": "44"}
            ]
          }
        ],
        "items": [
          {
            "code": "0001", 
            "description": "T-krekls Rīga",
            "varieties": [ "COLOR", "SIZE" ]
          },
          {
            "code": "0002", 
            "description": "T-krekls ar saules attēlu",
            "varieties": [ "SIZE" ]
          },
          {
            "code": "1001", 
            "description": "Zābaki 'Great stuff'",
            "varieties": [ "SHOE-SIZE" ]
          },
          {
            "code": "1002", 
            "description": "Čības ar puķītēm",
            "varieties": [ "COLOR", "SHOE-SIZE" ]
          },
          {
            "code": "2001", 
            "description": "Melna lodīšu pildspalva",
            "varieties": []
          }
        ]
      }
    
        // Get elements
        const itemsSelect = document.getElementById('itemsSelect');
        const codeH2 = document.getElementById('selectedItem');
        const colorSelect = document.getElementById("colorSelect");
        const sizeSelect = document.getElementById("sizeSelect");
        const shoeSizeSelect = document.getElementById("shoeSizeSelect");
    
        // Function to update the h1 element with the selected item
        function updateSelectedItemCode() {
          const selectedIndex = itemsSelect.selectedIndex;
          if (selectedIndex !== 0) {
            const selectedCode = itemsSelect.value;
            const colorCode = colorSelect.value;
            const sizeCode = sizeSelect.value;
            const shoeSizeCode = shoeSizeSelect.value;
            // Vai būtu jāveido IF - ja ir papildu varieties, tad parādās piem. .SIZE un attiecīgā izvēlne, nevis uzreiz visi punkti un visas izvēlnes
            codeH2.textContent = 'Preces kods: ' + selectedCode + "." + colorCode + "." + sizeCode + "." + shoeSizeCode;
          } else {
            codeH2.textContent = 'Lūdzu, izvēlaties preci!';
          }
        }
    
        // Filling item select dropdown;
        jsonList.items.forEach(item => {
          const option = document.createElement('option');
          option.value = item.code;
          option.text = item.description;
          itemsSelect.appendChild(option);
        });
    
        // Filling color select dropdown;
        const colorVariety = jsonList.varieties.find(variety => variety.code === "COLOR");
        if (colorVariety) {
            colorVariety.options.forEach(item => {
                const option = document.createElement('option');
              option.value = item.code;
              option.text = item.description;
              colorSelect.appendChild(option);
            })
        }
    
        // Filling shirt size select dropdown;
          const sizeVariety = jsonList.varieties.find(variety => variety.code === "SIZE");
          if (sizeVariety) {
            sizeVariety.options.forEach(item => {
              const option = document.createElement('option');
              option.value = item.code;
              option.text = item.description;
              sizeSelect.appendChild(option);
            });
        }
    
        // Filling shoe size select dropdown;
        const shoeSizeVariety = jsonList.varieties.find(variety => variety.code === "SHOE-SIZE");
          if (shoeSizeVariety) {
            shoeSizeVariety.options.forEach(item => {
              const option = document.createElement('option');
              option.value = item.code;
              option.text = item.description;
              shoeSizeSelect.appendChild(option);
            });
        }
        
        
        // Add an event listener to the select element
        itemsSelect.addEventListener('change', updateSelectedItemCode);
        colorSelect.addEventListener('change', updateSelectedItemCode);
        sizeSelect.addEventListener('change', updateSelectedItemCode);
        shoeSizeSelect.addEventListener('change', updateSelectedItemCode);