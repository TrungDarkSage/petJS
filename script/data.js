"use strict";

// Dom
const expBtnDom = document.getElementById("export-btn");
const impBtnDom = document.getElementById("import-btn");

// lay du lieu pet de click
const petList = localStorage.getItem("pet-list");
const storePet = (x) => saveToStorage("pet-list", x);
let petArr = petList ? JSON.parse(petList) : [];

// console.log(petArr);

// click exp
// ham save
function saveStaticDataToFile() {
  const myJON = JSON.stringify(petArr);
  let blob = new Blob([myJON], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "data.json");
}
//  click exp
expBtnDom.addEventListener("click", function () {
  //   console.log("aa");
  saveStaticDataToFile();
});

// click imp
var fileUp = document.getElementById("input-file");
impBtnDom.addEventListener("click", function () {
  if (fileUp.files[0]) {
    // doc gia tri file
    const reader = new FileReader();
    reader.readAsText(fileUp.files[0], "UTF-8");
    reader.onload = function (evt) {
      // doi file thanh` arr
      const changeFile = JSON.parse(evt.target.result);
      // console.log(changeFile);
      // ghep 2 arr
      petArr = petArr.concat(changeFile);
      // loc trung` id
      const total = function () {
        for (let i = 0; i < petArr.length; i++) {
          for (let j = i + 1; j < petArr.length; j++) {
            if (petArr[i].idPet === petArr[j].idPet) {
              petArr.splice(i, 1);
            }
          }
        }
        return petArr;
      };
      total();
      console.log(petArr);
      storePet(petArr);
    };
    // load lỗi
    reader.onerror = function () {
      alert("error");
    };
  }
});
