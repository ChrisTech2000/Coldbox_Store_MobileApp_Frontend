// TODO: currently validating the English or Hindi alphabets
export const passwordRegex =
  // eslint-disable-next-line no-misleading-character-class
  /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z\u0900-\u097F])[a-zA-Z\u0900-\u097F\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;

export const stripSpacesRegex = /\s+/g;
