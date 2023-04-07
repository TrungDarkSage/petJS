"use strict";
const sidebarDom = document.querySelector("#sidebar");
//  Animation for Sidebar
sidebarDom.addEventListener("click", function () {
  this.classList.toggle("active");
});

const idInputDom = document.getElementById("input-id");
const nameInputDom = document.getElementById("input-name");
const ageInputDom = document.getElementById("input-age");
const typeInputDom = document.getElementById("input-type");
const weightInputDom = document.getElementById("input-weight");
const lengthInputDom = document.getElementById("input-length");
const colorInputDom = document.getElementById("input-color-1");
const breedInputDom = document.getElementById("input-breed");
const vaccinatedInputDom = document.getElementById("input-vaccinated");
const dewormedInputDom = document.getElementById("input-dewormed");
const sterilizedInputDom = document.getElementById("input-sterilized");
const submitBtnDom = document.getElementById("submit-btn");
const tBodyDom = document.getElementById("tbody");
const petList = localStorage.getItem("pet-list");
const storePet = (x) => saveToStorage("pet-list", x);
const petArr = petList ? JSON.parse(petList) : [];

// lay breedpet cho form dưới
const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
  breedInputDom.innerHTML = "";
  for (let i = 0; i < petBreed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${petBreed[i].breed}</option>`;
    breedInputDom.appendChild(option);
  }
};

// lay pet
const petEdit = getFromStorage("pet-list");
// console.log(petEdit);
const renderEdit = function (petEdit) {
  tBodyDom.innerHTML = "";
  for (let i = 0; i < petEdit.length; i++) {
    let vaccinatedText = petEdit[i].vaccinatedPet
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let dewormedText = petEdit[i].dewormedPet
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let sterilizedText = petEdit[i].sterilizedPet
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petEdit[i].idPet}</th>
    <td>${petEdit[i].namePet}</td>
    <td>${petEdit[i].agePet}</td>
    <td>${petEdit[i].typePet}</td>
    <td>${petEdit[i].weightPet} </td>
    <td>${petEdit[i].lengthPet} </td>
    <td>${petEdit[i].breedPet}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petEdit[i].colorPet}"></i>
    </td>
    <td><i class="${vaccinatedText}"></i></td>
    <td><i class="${dewormedText}"></i></td>
    <td><i class="${sterilizedText}"></i></td>
    <td>${petEdit[i].datePet}</td>
    <td>
    <button type="button" class="btn-warning ">
    Edit
      </button>
    </td>`;
    tBodyDom.appendChild(row);
  }
};
renderEdit(petEdit);

// click edit
const containerDom = document.querySelector("#container-form");
const editBtnDom = document.querySelectorAll(".btn-warning");
editBtnDom.forEach(function (btn, i) {
  // console.log(editBtnDom);
  editBtnDom[i].addEventListener("click", function () {
    containerDom.classList.remove("hide");
    // console.log(idInputDom);
    idInputDom.value = `${petEdit[i].idPet}`;
    nameInputDom.value = `${petEdit[i].namePet}`;
    ageInputDom.value = `${petEdit[i].agePet}`;
    typeInputDom.value = `${petEdit[i].typePet}`;
    weightInputDom.value = `${petEdit[i].weightPet}`;
    lengthInputDom.value = `${petEdit[i].lengthPet}`;
    colorInputDom.value = `${petEdit[i].colorPet}`;

    // breed
    typeInputDom.addEventListener("change", function () {
      const optionsValue = petBreed.filter(function (item) {
        if (typeInputDom.value === "Dog") return item.type === "Dog";
        if (typeInputDom.value === "Cat") return item.type === "Cat";
        if (typeInputDom.value === "Select type") return [];
      });
      renderBreed(optionsValue);
    });

    vaccinatedInputDom.value = `${petEdit[i].vaccinatedPet}`;
    dewormedInputDom.value = `${petEdit[i].dewormedPet}`;
    sterilizedInputDom.value = `${petEdit[i].sterilizedPet}`;

    // submit
    // ham validate
    const validatePetEdit = function () {
      //  idPet
      // if (!idInputDom.value) return false;
      // for (let a = 0; a < tBodyDom.rows.length; a++) {
      //   if (idInputDom.value === tBodyDom.rows[a].cells[0].textContent)
      //     return false;
      // }
      // Form
      if (!nameInputDom.value) return false;
      if (typeInputDom.value === "Select Type") return false;
      if (breedInputDom.value === "Select Breed") return false;
      if (ageInputDom.value < 1 || ageInputDom.value > 15) return false;
      if (weightInputDom.value < 1 || weightInputDom.value > 15) return false;
      if (lengthInputDom.value < 1 || lengthInputDom.value > 100) return false;
      return true;
    };
    submitBtnDom.addEventListener("click", function () {
      // add data
      const dataEdit = {
        idPet: idInputDom.value,
        namePet: nameInputDom.value,
        agePet: parseInt(ageInputDom.value),
        typePet: typeInputDom.value,
        weightPet: weightInputDom.value,
        lengthPet: lengthInputDom.value,
        colorPet: colorInputDom.value,
        breedPet: breedInputDom.value,
        vaccinatedPet: vaccinatedInputDom.checked,
        dewormedPet: dewormedInputDom.checked,
        sterilizedPet: sterilizedInputDom.checked,
        // petBmi: petBmi,
        datePet: new Date(),
      };
      // validate

      //  idPet duoc giu nguyen
      // if (!idInputDom.value) alert("ID must unique - Ex: Pxxx");
      // for (let a = 0; a < tBodyDom.rows.length; a++) {
      //   if (idInputDom.value === tBodyDom.rows[a].cells[0].textContent)
      //     alert("ID must unique - Ex: Pxxx");
      // }

      // Input form
      if (!nameInputDom.value) alert("Please check Pet name !");
      if (ageInputDom.value < 1 || ageInputDom.value > 15)
        alert("Age must be between 1 and 15!");
      if (weightInputDom.value < 1 || weightInputDom.value > 15)
        alert("Weight must be between 1 and 15! Note: kg");
      if (lengthInputDom.value < 1 || lengthInputDom.value > 100)
        alert("Length must be between 1 and 100! Note: m");
      if (typeInputDom.value == "Select Type") alert("Please select Type!");
      if (breedInputDom.value == "Select Breed") alert("Please select Breed!");

      //    display table;
      if (validatePetEdit()) {
        alert("Submit Successfully!");
        console.log(i);
        console.log(dataEdit);
        // add data
        petArr.splice(i, 1, dataEdit);
        petEdit.splice(i, 1, dataEdit);
        // display
        storePet(petArr);
        // renderTableData(petArr);
        renderEdit(petEdit);
        // clear Input sau khi submit
        const clearInput = () => {
          idInputDom.value = "";
          ageInputDom.value = "";
          nameInputDom.value = "";
          typeInputDom.value = "Select Type";
          weightInputDom.value = "";
          lengthInputDom.value = "";
          colorInputDom.value = "#000000";
          breedInputDom.value = "Select Breed";
          vaccinatedInputDom.checked = false;
          dewormedInputDom.checked = false;
          sterilizedInputDom.checked = false;
          tBodyDom.value = "";
        };
        clearInput();
      }
    });
  });
});
