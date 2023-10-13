"use strict";

import * as display from "./display.js";
import * as storage from "./storage.js";
import { randomEmoji } from "./emoji.js";
import { randomPhoneNumber, isPhoneNumber } from "./utility.js";

document.addEventListener("DOMContentLoaded", function (event) {
  // Get friends from localStorage on page load
  display.populateList();

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
      let emoji = randomEmoji();
      // perform operation with form input
      console.log(
        `New friend ${name.value} ${emoji} with number ${number.value}, yay!`
      );

      // Add friend to local storage
      const friend = storage.insertFriend(name.value, number.value);
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

      // Clear ui
      display.clearList();
      display.populateList();
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
