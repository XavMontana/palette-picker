import "./style.css";
import { initializePalettesIfEmpty } from "./local.storage.js";
import { handleFormSubmit, renderAllPalettes } from "./dom-helper.js";

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize palettes if empty
  initializePalettesIfEmpty();
  
  // Render all existing palettes
  renderAllPalettes();
  
  // Set up form submission handler
  const form = document.querySelector("#palette-form");
  form.addEventListener("submit", handleFormSubmit);
});
