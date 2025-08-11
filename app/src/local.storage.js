import startingPalettes from '../palettes.json';

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageKey = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setPalettes = (newPalettes) => {
  setLocalStorageKey("palettes", newPalettes);
};

export const getPalettes = () => {
  const storedPalettes = getLocalStorageKey("palettes");
  if (!storedPalettes) {
    return {};
  }
  return storedPalettes;
};

export const initializePalettesIfEmpty = () => {
  const storedPalettes = getPalettes();
  if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
    setPalettes(startingPalettes);
  }
};

export const addPalette = (newPalette) => {
  const palettes = getPalettes();
  palettes[newPalette.uuid] = newPalette;
  setPalettes(palettes);
};

export const deletePaletteByID = (id) => {
  const palettes = getPalettes();
  delete palettes[id];
  setPalettes(palettes);

  // removes palette dynamically using DOM manipulation
  const palette = document.getElementById(id);
  if (palette) {
    palette.remove();
  }
};
