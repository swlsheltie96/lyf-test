document.addEventListener("DOMContentLoaded", function () {
  console.log("hello...");
  const backgroundElement = document.getElementById("background");

  // Fetch data from the server-side function
  fetch("/.netlify/functions/fetchfigmaimages")
    .then((response) => response.json())
    .then((data) => {
      const { layerNames, imagesData } = data;

      console.log(layerNames, imagesData);

      // Generate <img> tags for matched images
      imagesData.forEach((imageData) => {
        const img = document.createElement("img");
        img.src = `/src/images/${imageData.alt}`;
        img.alt = imageData.alt;
        img.className = "canvas-image";
        backgroundElement.appendChild(img);
        img.style.left = imageData.style.left;
        img.style.top = imageData.style.top;
        img.style.width = imageData.style.width;
      });
    })
    .catch((error) => {
      console.error("Error fetching image data:", error);
    });
});
