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

// TODO Add JSDoc
export const slideDown = (element) => {
  const offsetHeight = element.offsetHeight;
  console.log(offsetHeight);
  // Apply the new margin-top value with a negative sign
  element.style.marginTop = `-${offsetHeight}px`;
};

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
export const randomName = () => {
  return randomInArray(placeholderNames);
};
