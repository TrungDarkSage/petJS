//  DOM & x
"use strict";
const houseBtnDom = document.querySelector(".bi-house");
const abouttnDom = document.querySelector(".bi-file-earmark-person");

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
// const BmiBtnDom = document.querySelector("#bmi-btn");
const tBodyDom = document.getElementById("tbody");

// const petArr = [];
const petList = localStorage.getItem("pet-list");
const storePet = (x) => saveToStorage("pet-list", x);
const petArr = petList ? JSON.parse(petList) : [];
// console.log(petList);

const sidebarDom = document.querySelector("#sidebar");
//  Animation for Sidebar
sidebarDom.addEventListener("click", function () {
  this.classList.toggle("active");
});
// Ham kiem tra data true
const validatePet = function () {
  //  idPet
  if (!idInputDom.value) return false;
  for (let a = 0; a < tBodyDom.rows.length; a++) {
    if (idInputDom.value === tBodyDom.rows[a].cells[0].textContent)
      return false;
  }
  // Form
  if (!nameInputDom.value) return false;
  if (typeInputDom.value === "Select Type") return false;
  if (breedInputDom.value === "Select Breed") return false;
  if (ageInputDom.value < 1 || ageInputDom.value > 15) return false;
  if (weightInputDom.value < 1 || weightInputDom.value > 15) return false;
  if (lengthInputDom.value < 1 || lengthInputDom.value > 100) return false;
  return true;
};
// Ham hien thi
const renderTableData = function (petArr) {
  tBodyDom.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let vaccinatedText = petArr[i].vaccinatedPet
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let dewormedText = petArr[i].dewormedPet
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let sterilizedText = petArr[i].sterilizedPet
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].idPet}</th>
    <td>${petArr[i].namePet}</td>
    <td>${petArr[i].agePet}</td>
    <td>${petArr[i].typePet}</td>
    <td>${petArr[i].weightPet} </td>
    <td>${petArr[i].lengthPet} </td>
    <td>${petArr[i].breedPet}</td>
    <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].colorPet}"></i>
    </td>
    <td><i class="${vaccinatedText}"></i></td>
    <td><i class="${dewormedText}"></i></td>
    <td><i class="${sterilizedText}"></i></td>
    <td>${petArr[i].petBmi}</td>
    <td>${petArr[i].datePet}</td>
    <td>
        <button type="button" class="btn btn-danger">
      Delete
      </button>
    </td>`;
    tBodyDom.appendChild(row);
  }
  // // ham delete tham khảo (ko liên quan)
  // document.querySelectorAll(".btn-danger").onclick = function () {
  //   deleteRow(r);
  // };
  // function deleteRow(r) {
  //   console.log(r);
  //   let i = r.parentNode.rowIndex - 1;
  //   if (confirm("Are you sure?")) {
  //     tableBodyEl.deleteRow(i);
  //     petArr.splice(i, 1);
  //   }
  // }
  // renderTableData(petArr);

  // Click delete
  let deleteBtnDom = document.querySelectorAll(".btn-danger");
  for (let i = 0; i < petArr.length; i++) {
    // console.log(deleteBtnDom);
    deleteBtnDom[i].addEventListener("click", function () {
      // console.log(deleteBtnDom);
      const confirmDelete = confirm("Are you sure ?");
      if (confirmDelete) {
        petArr.splice(i, 1);
        storePet(petArr);
        renderTableData(petArr);
      }
    });
  }
};

// click submit
submitBtnDom.addEventListener("click", function () {
  // add data
  const data = {
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
  //  idPet
  if (!idInputDom.value) alert("ID must unique - Ex: Pxxx");
  for (let a = 0; a < tBodyDom.rows.length; a++) {
    if (idInputDom.value === tBodyDom.rows[a].cells[0].textContent)
      alert("ID must unique - Ex: Pxxx");
  }
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
  if (validatePet()) {
    alert("Submit Successfully!");
    // add data
    petArr.push(data);
    // display
    renderTableData(petArr);
    storePet(petArr);
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

//  Hien thi cac thu cung khoe manh
// Chon thu cung khoe manh
let healthyPetArr = [];
const healthyBtnDom = document.getElementById("healthy-btn");
const healthyPet = function () {
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].vaccinatedPet === true &&
      petArr[i].dewormedPet === true &&
      petArr[i].sterilizedPet === true
    ) {
      healthyPetArr.push(petArr[i]);
    }
    renderTableData(healthyPetArr);
  }
};
// click healBtn
healthyBtnDom.addEventListener("click", function () {
  if (healthyBtnDom.textContent === "Show All Pet") {
    renderTableData(petArr);
    healthyBtnDom.textContent = "Show Healthy Pet";
  } else {
    healthyPetArr = [];
    healthyPet();
    healthyBtnDom.textContent = "Show All Pet";
  }
});

// // BMI
// let petBmi = "?";
// // click BMIbtn
// BmiBtnDom.addEventListener("click", function () {
//   for (let i = 0; i < petArr.length; i++) {
//     if (petArr[i].typePet === "Dog") {
//       petArr[i].petBmi =
//         // lam tron 2 so
//         Math.round(
//           ((petArr[i].weightPet * 703) / petArr[i].lengthPet ** 2) * 100
//         ) / 100;
//     } else {
//       petArr[i].petBmi =
//         Math.round(
//           ((petArr[i].weightPet * 886) / petArr[i].lengthPet ** 2) * 100
//         ) / 100;
//     }
//   }
//   renderTableData(petArr);
// });

// Lay breed-list tu Storage
const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
  breedInputDom.innerHTML = "";
  for (let i = 0; i < petBreed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${petBreed[i].breed}</option>`;
    breedInputDom.appendChild(option);
  }
};
//renderBreed(petBreed);
typeInputDom.addEventListener("change", function () {
  const optionsValue = petBreed.filter(function (item) {
    if (typeInputDom.value === "Dog") return item.type === "Dog";
    if (typeInputDom.value === "Cat") return item.type === "Cat";
    if (typeInputDom.value === "Select type") return [];
  });
  renderBreed(optionsValue);
});
