import * as storage from "./storage.js";
import { cleanNumber, formatPhoneNumber } from "./utility.js";

let currentlyEditing;
const animationDuration = 500;

const deleteFriend = (id) => {
  const friendDiv = document.querySelector(`#friend-${id}`);
  console.log(friendDiv);
  friendDiv.classList.add("slide-up");

  storage.dropFriend(id);
  setTimeout(() => {
    friendDiv.remove();
  }, 600);
};

export const populateList = () => {
  // Get friends from storage
  const friends = storage.getFriends();

  if (friends.length > 0) {
    // For each friend add to list
    friends.forEach((friend) => {
      console.log(`Friend #${friend.id} ${friend.name}`);
      showFriend(friend);
    });
  } else {
    console.log(`You have no friends 😭`);
  }
};

export const clearList = () => {
  // Get friends from storage
  const friendsList = document.querySelector("#friends-list");
  friendsList.innerHTML = "";
};

/**
 * Edit a friend in the ui.
 *
 * @param {string} id The id of the friend.
 */
export const editFriend = (id) => {
  if (currentlyEditing) {
    document.querySelector(`#name-input-${currentlyEditing}`).disabled = true;
    document.querySelector(`#number-input-${currentlyEditing}`).disabled = true;
    document.querySelector(`#edit-friend-${currentlyEditing}`).textContent =
      "✏️";
  }

  // Keep track of what's currently being edited
  currentlyEditing = id;

  console.log(`Editing friend #${id}`);

  // Get elements
  const nameInput = document.querySelector(`#name-input-${id}`);
  const numberInput = document.querySelector(`#number-input-${id}`);
  const editButton = document.querySelector(`#edit-friend-${id}`);

  // Enable fields
  nameInput.disabled = false;
  numberInput.disabled = false;
  nameInput.focus();

  // Change edit button emoji
  editButton.textContent = "✅";

  editButton.onclick = (e) => {
    storage.updateFriend(id, nameInput.value, numberInput.value);
    editButton.textContent = "✏️";
    nameInput.disabled = true;
    numberInput.disabled = true;
    currentlyEditing = null;
    // Restore button functionality
    editButton.onclick = (e) => {
      editFriend(e.target.getAttribute("data-friend-id"));
    };
  };
};
const createButton = (friendId, divId, emoji, onClick) => {
  const buttonElem = document.createElement("button");
  buttonElem.classList.add("button");
  buttonElem.id = divId;
  buttonElem.setAttribute("data-friend-id", friendId);

  const emojiElem = document.createElement("div");
  buttonElem.appendChild(emojiElem);
  emojiElem.className = "emoji";
  emojiElem.textContent = emoji;

  buttonElem.onclick = (e) => {
    let id;
    if (e.target.className == "emoji") {
      id = e.target.parentElement.getAttribute("data-friend-id");
    } else {
      id = e.target.getAttribute("data-friend-id");
    }
    onClick(id);
  };
  return { buttonElem, emojiElem };
};
export const showFriend = (friend, animate = false) => {
  // TODO cleanup
  // Deconstruct friend
  const { id, name, number, emoji } = friend;

  // Create the main container div element
  const friendDiv = document.createElement("div");
  friendDiv.classList.add(
    "friend",
    "inline-flex",
    "items-center",
    "p-3",
    "radius-3",
    "transition"
  );
  if (animate) {
    friendDiv.className += " slide-down";
  }
  friendDiv.id = `friend-${id}`;
  // friendDiv.setAttribute("data-friend-id", id);

  // Create the avatar div and add an image
  const avatarDiv = document.createElement("div");
  avatarDiv.classList.add("avatar", "no-select");
  // TODO Add emoji
  // const avatarImg = document.createElement("img");
  // avatarImg.src = "https://thispersondoesnotexist.com/";
  // avatarImg.alt = "Avatar";
  // avatarImg.className = "radius-50";
  // avatarDiv.appendChild(avatarImg);

  // Create the meta div
  const metaDiv = document.createElement("div");
  metaDiv.classList.add("meta", "flex", "flex-col", "ml-3", "grow");

  // Create input field for name
  const nameHeading = document.createElement("h3");
  nameHeading.classList.add("font-size-5", "mb-2");
  const nameInput = document.createElement("input");
  nameInput.classList.add("transition", "color-gray-5");
  nameInput.disabled = true;
  nameInput.type = "text";
  nameInput.name = `name-${id}`;
  nameInput.id = `name-input-${id}`;
  nameInput.value = name;

  const numberHeading = document.createElement("h4");
  numberHeading.classList.add("font-size-4", "font-thin");
  const numberInput = document.createElement("input");
  numberInput.classList.add("transition", "color-gray-6");
  numberInput.disabled = true;
  numberInput.type = "text";
  numberInput.name = `number-${id}`;
  numberInput.id = `number-input-${id}`;
  numberInput.value = formatPhoneNumber(number);

  // Add elements
  nameHeading.appendChild(nameInput);
  numberHeading.appendChild(numberInput);
  metaDiv.appendChild(nameHeading);
  metaDiv.appendChild(numberHeading);

  // Create the button group div and add buttons
  const buttonGroupDiv = document.createElement("div");
  buttonGroupDiv.classList.add("button-group", "justify-self-end");

  const { buttonElem: editButton, emojiElem: editButtonEmoji } = createButton(
    id,
    `edit-friend-${id}`,
    "✏️",
    editFriend
  );

  const { buttonElem: dropButton, emojiElem: dropButtonEmoji } = createButton(
    id,
    `drop-friend-${id}`,
    "🗑️",
    deleteFriend
  );

  buttonGroupDiv.appendChild(editButton);
  buttonGroupDiv.appendChild(dropButton);

  // Append the elements to the main container
  friendDiv.appendChild(avatarDiv);
  friendDiv.appendChild(metaDiv);
  friendDiv.appendChild(buttonGroupDiv);

  // Add the entire friendDiv to the document body or any desired location
  const friendsList = document.querySelector("#friends-list");

  // Add friend
  friendsList.appendChild(friendDiv);

  // Remove animation class
  setTimeout(() => {
    friendDiv.classList.remove("slide-down");
  }, 600);
};
