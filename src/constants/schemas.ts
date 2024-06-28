// TODO: currently only validating the English && Hindi alphabets
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[\u0900-\u097F])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\u0900-\u097F!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
