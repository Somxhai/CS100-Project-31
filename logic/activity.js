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

const ip = "http://3.94.255.158";

const fetchActivities = async (start = 0) => {
  await fetch(`${ip}/records?start=${start}`, {
    method: "GET",
  }).then(async (response) => {
    const latestActivities = await response.json();
    addActivitiesToPage(latestActivities.data);
  });
};
fetchActivities();
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

document.addEventListener("DOMContentLoaded", async () => {
  addYear();
});

const form = document.getElementById("activity-form");

const addYear = () => {
  const academicYear = document.getElementById("academic-year");

  academicYear.innerHTML += "<option selected disabled>เลือกชั้นปี</option>";
  for (let i = 1; i < 7; i++) {
    academicYear.innerHTML += `<option value=\"${i}\">ปี ${i}</option>`;
  }
};

const getValueFromElement = (id) => {
  const element = document.getElementById(id);
  if (id === "image" && element) return element.files;
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
  const validations = [
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
  const isOk = validations.every((val) => val);

  return isOk;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const validateSuccess = validateFormData(event);
  if (!validateSuccess) return;
  const json = {};
  const formData = new FormData(event.target);
  for (const [value, key] of formData) {
    json[key] = value;
  }
  await fetch(`${ip}/upload`, {
    method: "POST",
    body: formData,
  }).then(async (response) => {
    if (response.status === 200) {
      try {
        const newActivity = await response.json();
        activities = activities.concat(newActivity.data);
        addActivitiesToPage(newActivity.data);
      } catch {}
    }
  });
});