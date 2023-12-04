const titleValidation = (title) => {
  const isPass = title !== undefined && title.length !== 0;
  if (!isPass) {
    notifyError("titleError", "โปรดกรอกชื่อกิจกรรม");
  } else {
    notifyError("titleError");
  }
  return isPass;
};

const contentValidation = (content) => {
  const isPass = content != null && content.length !== 0;
  if (!isPass) {
    notifyError("contentError", "เล่ากิจกรรมให้เราฟังหน่อยไหม");
  } else {
    notifyError("contentError");
  }
  return isPass;
};

const imageValidation = (image) => {
  const isPass = image !== undefined;
  if (!isPass) {
    notifyError("imageError", "โปรดระบุรูปภาพ");
  } else {
    notifyError("imageError");
  }
  return isPass;
};

const academicYearValidation = (academicYear) => {
  const isPass = academicYear != null;
  if (!isPass) {
    notifyError("academicYearError", "โปรดระบุชั้นปี");
  } else {
    notifyError("academicYearError");
  }
  return isPass;
};

const studentIdValidation = (studentId) => {
  const isPass = studentId !== undefined && studentId.length === 10;
  if (!isPass) {
    notifyError("studentIdError", "โปรดกรอกรหัสนักศึกษาท่ถูกต้อง");
  } else {
    notifyError("studentIdError");
  }
  return isPass;
};

const dateValidation = (dateString) => {
  const currentDateTime = Date.now();
  const selectDateTime = new Date(dateString);

  const isPass = selectDateTime <= currentDateTime;
  if (!isPass) {
    notifyError("dateError", "เลือกวันที่ถูกต้อง");
  } else {
    notifyError("dateError");
  }
  return isPass;
};
const spaceBetween = (str) => {
  const regex = /^(\S+\s{1}\S+)$/;
  return regex.test(str);
};
const nameValidation = (name) => {
  const isPass = name !== undefined && spaceBetween(name);
  if (!isPass) {
    notifyError("nameError", "โปรดใส่ชื่อให้ถูกต้อง");
  } else {
    notifyError("nameError");
  }
  return isPass;
};

const typeValidation = (type) => {
  const isPass = type !== undefined;
  if (!isPass) {
    notifyError("typeError", "โปรดระบุประเภทกิจกรรม");
  } else {
    notifyError("typeError");
  }
  return isPass;
};

const notifyError = (id, message) => {
  const errorElement = document.getElementById(id);
  if (errorElement == null) return;
  errorElement.innerHTML = message ?? "";
};

export {
  titleValidation,
  contentValidation,
  notifyError,
  dateValidation,
  nameValidation,
  typeValidation,
  imageValidation,
  academicYearValidation,
  studentIdValidation,
};
