document.addEventListener("DOMContentLoaded", function () {
  const accessToken = process.env.FIGMA_ACCESS_TOKEN;

  // Ensure accessToken is provided
  if (!accessToken) {
    console.error("Figma API access token not provided.");
    return;
  }

  const fileKey = "OKO1bBHWqzfPhFtPPJSMpv";

  const backgroundElement = document.getElementById("background");
  // Authenticate with Figma API
  const headers = {
    "X-Figma-Token": accessToken,
  };

  // Get File Information
  fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((fileInfo) => {
      const pages = fileInfo.document.children;
      const nodes = pages[1].children[0].children;
      console.log(nodes);
      // Extract layer names
      const layerNames = nodes.map((node) => node.name);
      console.log(layerNames);
      // Local image filenames (ensure they match your layer names)
      const localImages = layerNames.map((name) => `${name}.png`);
      console.log(layerNames, localImages);

      // Generate <img> tags for matched images
      localImages.forEach((image, i) => {
        console.log(i, nodes[i]);
        const img = document.createElement("img");
        img.src = `/images/${image}`;
        img.alt = image;
        img.className = "canvas-image";
        backgroundElement.appendChild(img);
        img.style.left = nodes[i].absoluteBoundingBox.x / 10 + "%";
        img.style.top = nodes[i].absoluteBoundingBox.y / 10 + "%";
        img.style.width = nodes[i].absoluteBoundingBox.width / 10 + "%";
      });
    })
    .catch((error) => {
      console.error("Error fetching node information:", error);
    });
});
