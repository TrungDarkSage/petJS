"use strict";
const sidebarDom = document.querySelector("#sidebar");
//  Animation for Sidebar
sidebarDom.addEventListener("click", function () {
  this.classList.toggle("active");
});

// DOM
const breedInputDom = document.getElementById("input-breed");
const typeInputDom = document.getElementById("input-type");
const submitBtnDom = document.getElementById("submit-btn");
const storeBreed = (x) => saveToStorage("breed-list", x);
const petBreed = getFromStorage("breed-list") || []; //JSON.parse(localStorage.getItem("breed-list"))

// Ham hien thi
const renderTableData = function (x) {
  tbody.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td scope="row">${x.indexOf(x[i]) + 1}</td>
    <td>${x[i].breed}</td>
    <td>${x[i].type}</td>
    <td>
    <button type="button" class="btn btn-danger">
    Delete
    </button>
    </td>`;
    tbody.appendChild(row);
  }
  // "click"  "Delete"
  const btnsDelete = document.querySelectorAll(".btn-danger");
  btnsDelete.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      petBreed.splice(i, 1);
      storeBreed(petBreed);
      renderTableData(petBreed);
    });
  });
};
// Tao ham kiem tra du lieu hop le
const validate = function () {
  if (typeInputDom.value === "Select Type" || typeInputDom.value === "")
    return false;
  if (breedInputDom.value === "") return false;
  return true;
};
renderTableData(petBreed);
// click Submit
// Lay duoc du lieu tu input form
submitBtnDom.addEventListener("click", function () {
  const breedData = {
    breed: breedInputDom.value,
    type: typeInputDom.value,
  };
  // Thong bao den nguoi dung neu du lieu khong hop le
  if (typeInputDom.value === "Select Type" || typeInputDom.value === "")
    alert("Please select type");
  if (breedInputDom.value === "Select Breed" || breedInputDom.value === "")
    alert("Please input breed");
  // Kiem tra du lieu hop le bang cach goi ham validate
  validate();
  // Du lieu hop le thi hien thi
  if (validate()) {
    petBreed.push(breedData);
    renderTableData(petBreed);
    storeBreed(petBreed);
    // 5. Xoa cac du lieu vua nhap tren form
    typeInputDom.value = "";
    breedInputDom.value = "";
  }
});
console.log(petBreed);

console.log(tbody);
console.log(tBodyDom);
