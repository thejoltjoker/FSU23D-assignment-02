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
    console.log(!isNaN(parseInt(i)));
    if (!isNaN(parseInt(i))) {
      cleaned += i;
    }
  }
  return cleaned;
};

export const formatPhoneNumber = (number) => {
  return (
    number.slice(0, 4) +
    "-" +
    number.slice(4, 6) +
    " " +
    number.slice(6, 8) +
    " " +
    number.slice(8)
  );
};

const extractId = (value) => {
  var re = /^\d+$/;
  var arr = re.exec(value);
  return arr;
};
