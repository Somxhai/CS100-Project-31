const imageInput = document.getElementById("image");
const resetImageButton = document.getElementById("resetImage");
const displayImage = () => {
  const file = imageInput.files[0];
  setPreviewImage(file);
};

const setPreviewImage = (file) => {
  const preview = document.getElementById("image-display");
  const reader = new FileReader();
  if (file) {
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      preview.src = imageUrl;
    };
    reader.readAsDataURL(file);
    return;
  }
  preview.src = "";
};

const resetImage = () => {
  imageInput.value = "";
  setPreviewImage(null);
};

resetImageButton.addEventListener("click", () => resetImage());
imageInput.addEventListener("change", () => displayImage());
document.addEventListener("DOMContentLoaded", () => {
  displayImage();
});
