"use strict";

export const isPhoneNumber = (value) => {
  const re = /^[\d- ]+$/;
  return re.exec(value) ? true : false;
};

export const randomInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const randomPhoneNumber = () => {
  let number = "";
  while (number.length < 10) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
};

export const cleanNumber = (value) => {
  // Remove all non-digit characters from the number
  let cleaned = "";
  for (let i of value) {
    if (!isNaN(parseInt(i))) {
      cleaned += i;
    }
  }
  return cleaned;
};

export const getCursorPos = (event) => {
  let x = event.clientX;
  let y = event.clientY;
  return x, y;
};

export const formatPhoneNumber = (number) => {
  let formattedNumber = "";
  for (let i = 0; i < number.length; i++) {
    if (i == 4) {
      formattedNumber += "-";
    } else if (i > 4 && i % 2 == 0) {
      formattedNumber += " ";
    }
    formattedNumber += number[i];
  }
  return formattedNumber;
};
