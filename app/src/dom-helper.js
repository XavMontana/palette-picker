import { v4 as generateUUID } from "uuid";
import { addPalette, deletePaletteByID, getPalettes } from "./local.storage.js";

export const renderPalette = (palette) => {
  const paletteList = document.querySelector("#palette-list");
  
  const paletteItem = document.createElement("li");
  paletteItem.id = palette.uuid;
  paletteItem.className = "palette-item";
  
  const paletteContent = document.createElement("div");
  paletteContent.className = "palette";
  
  // Palette title
  const paletteTitle = document.createElement("h3");
  paletteTitle.className = "palette-title";
  paletteTitle.textContent = palette.title;
  paletteContent.appendChild(paletteTitle);
  
  // Color swatches
  palette.colors.forEach((color, index) => {
    const colorRow = document.createElement("div");
    colorRow.className = "color-row";
    
    const colorSwatch = document.createElement("div");
    colorSwatch.className = "color-swatch";
    colorSwatch.style.backgroundColor = color;
    colorSwatch.style.border = "2px solid #000";
    
    // Add text example overlay
    const textExample = document.createElement("span");
    textExample.className = "text-example";
    textExample.textContent = "Text Example";
    textExample.style.color = "#000";
    colorSwatch.appendChild(textExample);
    
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "Copy";
    copyButton.dataset.color = color;
    copyButton.addEventListener("click", handleCopyColor);
    
    const hexCode = document.createElement("span");
    hexCode.className = "hex-code";
    hexCode.textContent = color;
    
    colorRow.appendChild(colorSwatch);
    colorRow.appendChild(copyButton);
    colorRow.appendChild(hexCode);
    paletteContent.appendChild(colorRow);
  });
  
  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete Palette";
  deleteButton.addEventListener("click", () => {
    deletePaletteByID(palette.uuid);
  });
  paletteContent.appendChild(deleteButton);
  
  // Temperature banner
  const temperatureBanner = document.createElement("div");
  temperatureBanner.className = "temperature-banner";
  temperatureBanner.textContent = palette.temperature;
  
  // Set banner color based on temperature
  switch (palette.temperature) {
    case "warm":
      temperatureBanner.style.backgroundColor = "#8B0000";
      break;
    case "cool":
      temperatureBanner.style.backgroundColor = "#00008B";
      break;
    default:
      temperatureBanner.style.backgroundColor = "#808080";
  }
  
  paletteContent.appendChild(temperatureBanner);
  paletteItem.appendChild(paletteContent);
  paletteList.appendChild(paletteItem);
};

export const handleCopyColor = async (e) => {
  const button = e.target;
  const color = button.dataset.color;
  
  try {
    await navigator.clipboard.writeText(color);
    button.textContent = "Copied hex!";
    
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1000);
  } catch (err) {
    console.error("Failed to copy color:", err);
  }
};

export const handleFormSubmit = (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const color1 = document.querySelector("#color1").value;
  const color2 = document.querySelector("#color2").value;
  const color3 = document.querySelector("#color3").value;
  const temperature = formData.get("temperature");
  
  if (!title) {
    alert("Please enter a palette title");
    return;
  }
  
  const newPalette = {
    uuid: generateUUID(),
    title: title,
    colors: [color1, color2, color3],
    temperature: temperature
  };
  
  addPalette(newPalette);
  renderPalette(newPalette);
  
  // Clear the form
  e.target.reset();
  document.querySelector("#neutral").checked = true;
  document.querySelector("#color1").value = "#ffffff";
  document.querySelector("#color2").value = "#ffffff";
  document.querySelector("#color3").value = "#ffffff";
};

export const renderAllPalettes = () => {
  const palettes = getPalettes();
  const paletteList = document.querySelector("#palette-list");
  paletteList.innerHTML = ""; // Clear existing palettes
  
  Object.values(palettes).forEach(palette => {
    renderPalette(palette);
  });
};
