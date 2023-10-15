"use strict";

import * as display from "./display.js";
import * as storage from "./storage.js";
import { randomPhoneNumber, isPhoneNumber, randomName } from "./utility.js";

const animationDuration = 500;
// TODO Create new contact class

document.addEventListener("DOMContentLoaded", () => {
  // Get friends from localStorage on page load
  const friendsList = document.querySelector("#friends-list");
  display.populateList();
  const formName = document.querySelector("#input-name");
  const formNumber = document.querySelector("#input-number");
  const formEmoji = document.querySelector("#friend-form-name .emoji");

  // Add placeholders
  formName.placeholder = randomName();
  formNumber.placeholder = randomPhoneNumber();

  // Add emoji picker
  formEmoji.onclick = () => {
    // In your other class
    // eslint-disable-next-line no-unused-vars
    const picker = new display.EmojiPicker((emoji) => {
      formEmoji.textContent = emoji;
    });
  };

  // Handle form submit
  const form = document.querySelector("#friend-form");
  const addFriendLink = document.querySelector("#add-friend");
  const modalContainer = document.querySelector(".modal-container");

  const clearForm = () => {
    let name = randomName();
    let number = randomPhoneNumber();

    formName.value = "";
    formNumber.value = "";
    formName.placeholder = name;
    formNumber.placeholder = number;
    formEmoji.textContent = "👤";
  };

  const showModal = () => {
    modalContainer.classList.add("fade-in");
    modalContainer.classList.remove("display-none");

    // Add emoji picker

    setTimeout(() => {
      modalContainer.classList.remove("fade-in");
      formName.focus();
    }, animationDuration);
  };

  const closeModal = () => {
    modalContainer.classList.add("fade-out");
    setTimeout(() => {
      modalContainer.classList.add("display-none");
      modalContainer.classList.remove("fade-out");
    }, animationDuration);
  };

  // Submit new friend
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const messageDiv = document.querySelector("#friend-form-message");

    if (formName.value && isPhoneNumber(formNumber.value)) {
      let emoji = formEmoji.textContent;

      // perform operation with form input
      console.log(
        `New friend ${formName.value} ${emoji} with number ${formNumber.value}, yay!`
      );

      // Add friend to local storage
      const friendData = storage.insertFriend(
        formName.value,
        formNumber.value,
        emoji
      );

      console.log(...Object.values(friendData));
      const friend = new display.Friend(
        ...Object.values(friendData),
        friendsList
      );
      friend.create();

      closeModal();
      clearForm();
    } else if (formName.value && formNumber.value) {
      messageDiv.classList.remove("display-none");

      messageDiv.innerText = `🤔 ${formNumber.value} is not a number1...`;
      console.log(`${formNumber.value} is not a number...`);
    } else {
      // TODO Slide down error message
      messageDiv.innerText = `🤓 You need to fill out all fields!`;
      messageDiv.classList.remove("display-none");

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

  // Show modal
  addFriendLink.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  // Close modal if click outside
  modalContainer.addEventListener("click", (e) => {
    if (e.target == modalContainer) {
      closeModal();
    }
  });

  // Testing stuff
  // showModal();

  // const testArea = document.querySelector("#test-area");
  // const emojiPicker = new display.EmojiPicker(testArea);
});
