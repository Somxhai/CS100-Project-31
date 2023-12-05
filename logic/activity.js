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

let activities = [];
const port = "3030";
const ip = `http://${window.location.hostname}:${port}`;
const fetchActivities = async (start = 0) => {
  await fetch(`${ip}/records?start=${start}`, {
    method: "GET",
  }).then(async (response) => {
    if (!response.ok) return;

    const latestActivities = await response.json();
    activities = activities.concat(latestActivities.data);
    addActivitiesToPage(latestActivities.data);
  });
};
const addActivitiesToPage = (activities) => {
  const resultContainer = document.getElementById("result-container");
  for (const i in activities) {
    const activity = activities[i];
    resultContainer.innerHTML += `<section class="activity-container">
			<img class="activity-img" src=\"${ip}/img/${activity.image}\" alt="">
			<p class="title">${activity.title}</p>
			<blockquote>
				${activity.content}
            </blockquote>

			<div class="divider">

			</div>
			<p class="author">เขียนโดย ${activity.name} ชั้นปีที่ ${activity.academic_year}
			</p>
			<p class="date">${activity.date}</p>
		</section>`;
  }
};

const form = document.getElementById("activity-form");

const addYear = () => {
  const academicYear = document.getElementById("academic-year");

  academicYear.innerHTML += "<option selected disabled>เลือกชั้นปี</option>";
  for (let i = 1; i < 7; i++) {
    academicYear.innerHTML += `<option value=\"${i}\">ปี ${i}</option>`;
  }
};

const validateFormData = () => {
  const formData = getFormData();
  const validations = [
    titleValidation(formData.title),
    studentIdValidation(formData.student_id),
    dateValidation(formData.date),
    nameValidation(formData.name),
    academicYearValidation(formData.academic_year),
    contentValidation(formData.content),
    imageValidation(formData.image),
    typeValidation(formData.type),
  ];
  const isOk = validations.every((val) => val);

  return isOk;
};
const getFormData = () => {
  const json = {};
  const formData = new FormData(form);
  for (const [key, value] of formData) {
    json[key] = value;
  }
  return json;
};
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const validateSuccess = validateFormData(event);
  if (!validateSuccess) return;

  const formData = new FormData(event.target);
  console.log(formData.get("title"));
  await fetch(`${ip}/upload`, {
    method: "POST",
    body: formData,
  }).then(async (response) => {
    if (!response.ok) alert("ไม่สามารถบันทึกข้อมูลได้");

    const newActivity = await response.json();
    activities = activities.concat(newActivity.data);
    addActivitiesToPage(newActivity.data);
  });
});
document.addEventListener("DOMContentLoaded", async () => {
  await fetchActivities();
  addYear();
});
