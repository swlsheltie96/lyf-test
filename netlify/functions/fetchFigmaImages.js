let fetch;
try {
  fetch = require("node-fetch");
} catch (err) {
  fetch = require("node-fetch").default;
}

exports.handler = async function (event, context) {
  console.log("hello...");

  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  const fileKey = "OKO1bBHWqzfPhFtPPJSMpv";

  if (!accessToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Figma API access token not provided." }),
    };
  }

  const headers = {
    "X-Figma-Token": accessToken,
  };

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching file information: ${response.statusText}`);
    }

    const fileInfo = await response.json();
    const pages = fileInfo.document.children;
    const nodes = pages[1].children[0].children;

    // Extract layer names
    const layerNames = nodes.map((node) => node.name);

    // Local image filenames (ensure they match your layer names)
    const localImages = layerNames.map((name) => `${name}.png`);

    // Generate image data for response
    const imagesData = localImages.map((image, i) => ({
      alt: image,
      style: {
        left: nodes[i].absoluteBoundingBox.x / 10 + "%",
        top: nodes[i].absoluteBoundingBox.y / 10 + "%",
        width: nodes[i].absoluteBoundingBox.width / 10 + "%",
      },
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ layerNames, imagesData }),
    };
  } catch (error) {
    console.error("Error fetching node information:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
