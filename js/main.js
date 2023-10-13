"use strict";

import * as display from "./display.js";
import * as storage from "./storage.js";

const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

const isPhoneNumber = (value) => {
  const re = /^[\d- ]+$/;
  return re.exec(value) ? true : false;
};
const randomPhoneNumber = () => {
  let number = "";
  while (number.length <= 10) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
};
console.log(randomPhoneNumber());
const extractId = (value) => {
  var re = /^\d+$/;
  var arr = re.exec(value);
  return arr;
};

document.addEventListener("DOMContentLoaded", function (event) {
  // Get friends from localStorage on page load
  const friends = storage.getFriends();

  if (Object.keys(friends).length > 0) {
    for (const id in friends) {
      console.log(`Friend #${id} ${friends[id].name}`);
      display.showFriend(friends[id]);
    }
  } else {
    console.log(`You have no friends 😭`);
  }

  // Handle form submit
  const form = document.querySelector("#friend-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#input-name");
    const number = document.querySelector("#input-number");

    // Testing purposes
    name.value = "John Doe";
    number.value = randomPhoneNumber();

    if (name.value && isPhoneNumber(number.value)) {
      // perform operation with form input
      console.log(`New friend ${name.value} with number ${number.value}, yay!`);

      // Add friend to local storage
      const friend = storage.setFriend(name.value, number.value);
      display.showFriend(friend, true);
      name.value = "";
      number.value = "";
    } else if (name.value && number.value) {
      console.log(`${number.value} is not a number...`);
    } else {
      console.log("No new friends for you...");
    }
  });

  // Clear list
  const clear = document.querySelector("#clear-list");
  clear.dataset.content = "test";
  clear.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmEmoji = "😱 ";
    if (clear.getAttribute("data-before") === confirmEmoji) {
      console.log("Clearing friends");
      storage.clearFriends();
      // Reset link
      clear.setAttribute("data-before", "😭 ");
      clear.innerText = "Clear list";
    } else {
      clear.setAttribute("data-before", "😱 ");
      clear.innerText = "Are you sure?";
    }
  });

  // Delete single friend
  // const deleteButtons = document.querySelectorAll("[id^='drop-friend-']");
  // deleteButtons.forEach((button) => {
  //   button.addEventListener("click", (e) => {
  //     const id = e.target.getAttribute("data-friend-id");
  //     const friendDiv = document.querySelector(`#friend-${id}`);
  //     console.log(friendDiv);
  //     friendDiv.classList.add("slide-up");
  //     setTimeout(() => {
  //       friendDiv.remove();
  //     }, 1000);
  //   });
  // });
});

// setFriend("John Doe", "123456789");
// clearFriends();
