"use strict";

const placeholderNames = [
  "Al Beback",
  "Anita Bath",
  "Anna Sthesia",
  "Art Major",
  "Barb Dwyer",
  "Barb Wire",
  "Barry Cade",
  "Candy Barr",
  "Candy Cane",
  "Connie Lingus",
  "Crystal Ball",
  "Dick Tater",
  "Don Keigh",
  "Hal O'Penyo",
  "Ima Nutt",
  "Justin Time",
  "Justin Time",
  "Luke Warm",
  "Noah Fence",
  "Olive Branch",
  "Penny Loafer",
  "Phil Harmonic",
  "Phil McCavity",
  "Robin Banks",
  "Rusty Bridges",
  "Rusty Keyes",
  "Sandy Beach",
  "Sue Flay",
  "Sue Perb",
  "Terry Cloth",
  "Will Power",
];

/**
 * Checks whether a given value is a valid phone number.
 * This function uses a regular expression to match numeric digits, hyphens, and spaces.
 *
 * @param {string} value - The value to be checked for phone number format.
 * @returns {boolean} - Returns true if the value matches the phone number format, otherwise false.
 */
export const isPhoneNumber = (value) => {
  const re = /^\+?[\d -]+$/;
  return re.exec(value) ? true : false;
};

/**
 * Selects a random element from an array.
 *
 * @param {Array} arr - The array from which to select a random element.
 * @returns {*} - A randomly selected element from the input array.
 */
export const randomInArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

/**
 * Generates a random phone number string consisting of 10 numeric digits.
 *
 * @returns {string} - A randomly generated phone number string.
 */
export const randomPhoneNumber = () => {
  let number = "";
  while (number.length < 10) {
    number += Math.floor(Math.random() * 10);
  }

  return number;
};

/**
 * Removes all non-digit characters, except +, from a string.
 *
 * @param {string} value - The input string containing non-digit characters.
 * @returns {string} - A cleaned number string containing only digits and +.
 */
export const cleanNumber = (value) => {
  let cleaned = "";

  if (value.startsWith("+")) cleaned += "+";

  for (let i of value) {
    // Check if the character is a digit and append it to the cleaned number string.
    if (!isNaN(parseInt(i))) {
      cleaned += i;
    }
  }
  return cleaned;
};

/**
 * Get the current cursor position (X and Y coordinates) from a mouse event.
 *
 * @param {MouseEvent} event - The mouse event from which to extract cursor position.
 * @returns {Object} - An object containing 'x' and 'y' properties representing cursor coordinates.
 */
export const getCursorPos = (event) => {
  let x = event.clientX;
  let y = event.clientY;
  return { x, y };
};

/**
 * Formats a given phone number string with dashes and spaces in a standard format.
 *
 * @param {string} number - The phone number to be formatted.
 * @returns {string} - The formatted phone number with dashes and spaces.
 */
export const formatPhoneNumber = (number) => {
  let formattedNumber = "";
  let padding = -1;
  // Try and add somewhat correct padding for country codes
  if (number.startsWith("+") && number.length > 10) {
    padding = number.length - 10;
  }

  let lineIndex = 4 + padding;

  for (let i = 0; i < number.length; i++) {
    if (number.length > 10 && i === lineIndex) {
      formattedNumber += "-";
    } else if (padding == -1 || (i > lineIndex && i % 2 === 0)) {
      // If paddding -1 to account for number starting with +
      // Add spaces every two digits if line has been added
      formattedNumber += " ";
    }

    formattedNumber += number[i];
    padding -= 1;
  }

  return formattedNumber.trim();
};

/**
 * Generates a random name by selecting one from an array of placeholder names.
 *
 * @returns {string} - A randomly selected placeholder name.
 */
export const randomName = () => {
  return randomInArray(placeholderNames);
};
