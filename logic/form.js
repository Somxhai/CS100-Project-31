const form = document.getElementById("activity-form");
const imageInput = document.getElementById("image");
const validateFormData = (event) => {
  const formData = new FormData(event.target);

  const title = formData.get("title");
  const studentId = formData.get("studentId");
  const date = formData.get("date");
  const name = formData.get("name");
  const content = formData.get("content");
  const image = formData.get("image");
  const type = formData.get("type"); // formal, casual

  let validatePass = true;
  // validation
  if (title.length == 0) {
    notifyError("titleError", "โปรดกรอกชื่อกิจกรรม");
    validatePass = false;
  }

  if (studentId.length != 10) {
    notifyError("studentIdError", "โปรดกรอกรหัสนักศึกษา");
    validatePass = false;
  } else if (isNaN(parseInt(studentId))) {
    notifyError("studentIdError", "โปรดกรอกรหัสนักศึกษาที่ถูกต้อง");
    validatePass = false;
  }
  if (content.length == 0) {
    notifyError("contentError", "โปรดกรอกเนื้อหา");
  }

  const currentDateTime = new Date();
  const selectDateTime = new Date(date);
  if (selectDateTime > currentDateTime) {
    notifyError("dateError", "เลือกวันเวลาที่ถูกต้อง");
    validatePass = false;
  }
  const spaceBetween = (str) => {
    const regex = /^(\S+\s{1}\S+)$/;
    return regex.test(str);
  };
  if (name.length == 0 || !spaceBetween(name)) {
    notifyError("nameError", "โปรดใส่ชื่อให้ถูกต้อง");
    validatePass = false;
  }
  if (type.length == 0) {
    notifyError("typeError", "โปรดระบุประเภทกิจกรรม");
    validatePass = false;
  }
  return validatePass;
};

const notifyError = (id, message) => {
  const errorElement = document.getElementById(id);
  errorElement.innerHTML = message;
};

const displayImage = (inputId, previewId) => {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;
      preview.src = imageUrl;
    };

    reader.readAsDataURL(file);
  }
};

imageInput.addEventListener("change", (event) => {
  displayImage(event.target.id, "image-display");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const validateSuccess = validateFormData();
  if (validateSuccess) {
    // fetch to database
  }
});
