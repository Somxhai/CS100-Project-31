import {
  titleValidation,
  studentIdValidation,
  dateValidation,
  nameValidation,
  academicYearValidation,
  contentValidation,
  imageValidation,
  typeValidation,
} from "./validation.js";
const form = document.getElementById("activity-form");

const addYear = () => {
  const academicYear = document.getElementById("academic-year");

  academicYear.innerHTML += `<option selected disabled>เลือกชั้นปี</option>`;
  for (let i = 1; i < 7; i++) {
    academicYear.innerHTML += `<option value=\"${i}\">ปี ${i}</option>`;
  }
};
addYear();

const getValueFromElement = (id) => {
  const element = document.getElementById(id);
  if (id == "image" && element) return element.files;
  if (element) return element.value;
};

const validateFormData = () => {
  const title = getValueFromElement("title");
  const studentId = getValueFromElement("studentId");
  const date = getValueFromElement("date");
  const name = getValueFromElement("name");
  const content = getValueFromElement("content");
  const academicYear = getValueFromElement("academic-year");
  const image = getValueFromElement("image");
  const type = getValueFromElement("type"); // formal, casual
  let validations = [
    titleValidation(title),
    studentIdValidation(studentId),
    dateValidation(date),
    nameValidation(name),
    academicYearValidation(academicYear),
    contentValidation(content),
    imageValidation(image[0]),
    typeValidation(type),
    studentIdValidation(studentId),
  ];
  let isOk = validations.every(() => true);

  return isOk;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const validateSuccess = validateFormData(event);
  if (validateSuccess) {
    // fetch to database
  }
});
