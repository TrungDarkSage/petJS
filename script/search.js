"use strict";
const sidebarDom = document.querySelector("#sidebar");
//  Animation for Sidebar
sidebarDom.addEventListener("click", function () {
  this.classList.toggle("active");
});

// DOM
const idInputSearch = document.getElementById("input-id");
const nameInputSearch = document.getElementById("input-name");
const typeInputSearch = document.getElementById("input-type");
const breedInputSearch = document.getElementById("input-breed");
const vaccinatedInputSearch = document.getElementById("input-vaccinated");
const dewormedInputSearch = document.getElementById("input-dewormed");
const sterilizedInputSearch = document.getElementById("input-sterilized");
const findBtnDom = document.getElementById("find-btn");
const tBodyDom = document.getElementById("tbody");
// lay du lieu pet
const petList = localStorage.getItem("pet-list");
const storePet = (x) => saveToStorage("pet-list", x);
const petArr = petList ? JSON.parse(petList) : [];
// console.log(petArr[1].idPet);
// console.log(petArr);

// lay breed
const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
  breedInputSearch.innerHTML = "";
  for (let i = 0; i < petBreed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${petBreed[i].breed}</option>`;
    breedInputSearch.appendChild(option);
  }
};
//renderBreed(petBreed);
typeInputSearch.addEventListener("change", function () {
  const optionsValue = petBreed.filter(function (item) {
    if (typeInputSearch.value === "Dog") return item.type === "Dog";
    if (typeInputSearch.value === "Cat") return item.type === "Cat";
    if (typeInputSearch.value === "Select type") return [];
  });
  renderBreed(optionsValue);
});

// search
const searchPet = function () {
  const condition = {
    idCon: idInputSearch.value,
    nameCon: nameInputSearch.value,
    typeCon: typeInputSearch.value,
    breedCon: breedInputSearch.value,
    vacccinCon: vaccinatedInputSearch.checked,
    deworCon: dewormedInputSearch.checked,
    sterCon: sterilizedInputSearch.checked,
  };
  console.log(petArr);
  // console.log(condition);
  const searchArr = petArr.filter(
    (pet) =>
      (pet.idPet.includes(condition.idCon) || !condition.idCon) &&
      (pet.namePet.includes(condition.nameCon) || !condition.nameCon) &&
      (pet.typePet.includes(condition.typeCon) ||
        condition.typeCon == "Select Type") &&
      (pet.breedPet.includes(condition.breedCon) ||
        condition.breedCon == "Select Breed") &&
      condition.vacccinCon === pet.vaccinatedPet &&
      condition.deworCon === pet.dewormedPet &&
      condition.sterCon === pet.sterilizedPet
  );
  console.log(searchArr);

  // ham hien thi
  const renderSearch = function () {
    tBodyDom.innerHTML = "";
    // console.log(tBodyDom);
    // console.log(searchArr[0].idPet);
    for (let i = 0; i < searchArr.length; i++) {
      let vaccinatedText = searchArr[i].vaccinatedPet
        ? "bi bi-check-circle-fill"
        : "bi bi-x-circle-fill";
      let dewormedText = searchArr[i].dewormedPet
        ? "bi bi-check-circle-fill"
        : "bi bi-x-circle-fill";
      let sterilizedText = searchArr[i].sterilizedPet
        ? "bi bi-check-circle-fill"
        : "bi bi-x-circle-fill";

      const row = document.createElement("tr");
      row.innerHTML = `<th scope="row">${searchArr[i].idPet}</th>
      <td>${searchArr[i].namePet}</td>
      <td>${searchArr[i].agePet}</td>
      <td>${searchArr[i].typePet}</td>
      <td>${searchArr[i].weightPet} </td>
      <td>${searchArr[i].lengthPet} </td>
      <td>${searchArr[i].breedPet}</td>
      <td>
      <i class="bi bi-square-fill" style="color: ${searchArr[i].colorPet}"></i>
      </td>
      <td><i class="${vaccinatedText}"></i></td>
      <td><i class="${dewormedText}"></i></td>
      <td><i class="${sterilizedText}"></i></td>
      <td>${searchArr[i].datePet}</td>`;
      tBodyDom.appendChild(row);
    }
  };
  renderSearch();
};

// click search
findBtnDom.addEventListener("click", function () {
  searchPet();
});
