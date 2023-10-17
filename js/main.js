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
  formEmoji.textContent = "👤";

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
    form.reset();

    formName.placeholder = randomName();
    formNumber.placeholder = randomPhoneNumber();
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

  const validFormData = (formData) => {
    return formData.get("name") && isPhoneNumber(formData.get("number"));
  };

  // Submit new friend
  form.addEventListener("submit", (e) => {
    // on form submission, prevent default
    e.preventDefault();

    // construct a FormData object, which fires the formdata event
    new FormData(form);
  });

  form.addEventListener("formdata", (e) => {
    // Get the form data from the event object
    const formData = e.formData;

    // Add emoji to formdata
    formData.set("emoji", formEmoji.textContent);

    const messageDiv = document.querySelector("#friend-form-message");

    if (validFormData(formData)) {
      // perform operation with form input
      console.log(
        `New friend ${formData.get("name")} ${formData.get(
          "emoji"
        )} with number ${formData.get("number")}, yay!`
      );

      // Add friend to local storage
      const friendData = storage.insertFriend(...formData.values());

      // Show friend in list
      const friend = new display.Friend(
        ...Object.values(friendData),
        friendsList
      );
      friend.create();

      // Close modal and reset form
      closeModal();
      clearForm();
    } else if (formData.get("name") && formData.get("number")) {
      messageDiv.classList.remove("display-none");

      messageDiv.innerText = `🤔 ${formData.get("number")} is not a number1...`;
      console.log(`${formData.get("number")} is not a number...`);
    } else {
      // TODO Slide down error message
      messageDiv.innerText = `🤓 You need to fill out all fields!`;
      messageDiv.classList.remove("display-none");

      console.log("No new friends for you...");
    }
  });

  // Clear list
  const clear = document.querySelector("#clear-list");

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
      clear.setAttribute("data-before", confirmEmoji);
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
