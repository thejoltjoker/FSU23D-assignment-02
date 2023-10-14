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

/**
 *
 *
 * @param {object} attributes
 * @return {element}
 */
const createElem = (element = "div", attributes, parent = null) => {
  const elem = document.createElement(element);
  for (let [attr, value] of Object.entries(attributes)) {
    if (Array.isArray(value)) {
      value = value.join(" ");
    }
    elem[attr] = value;
  }

  // Append child to parent
  if (parent) parent.appendChild(elem);

  return elem;
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

export const populateList = () => {
  // Get friends from storage
  const friends = storage.getFriends();
  const friendsList = document.querySelector("#friends-list");
  if (friends.length > 0) {
    // For each friend add to list
    friends.forEach((f) => {
      console.log(`Friend #${f.id} ${f.name}`);
      console.log(...Object.values(f));
      // showFriend(f);
      const friend = new Friend(...Object.values(f), friendsList);

      friend.create();
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
    document.querySelector(
      `#edit-friend-${currentlyEditing} .emoji`
    ).textContent = "✏️";
  }

  // Keep track of what's currently being edited
  currentlyEditing = id;

  console.log(`Editing friend #${id}`);

  // Get elements
  const nameInput = document.querySelector(`#name-input-${id}`);
  const numberInput = document.querySelector(`#number-input-${id}`);
  const editButton = document.querySelector(`#edit-friend-${id}`);
  const editButtonEmoji = document.querySelector(`#edit-friend-${id} .emoji`);

  // Enable fields
  nameInput.disabled = false;
  numberInput.disabled = false;
  nameInput.focus();

  // Change edit button emoji
  editButtonEmoji.textContent = "✅";

  editButton.onclick = (e) => {
    storage.updateFriend(id, nameInput.value, numberInput.value);
    editButtonEmoji.textContent = "✏️";
    nameInput.disabled = true;
    numberInput.disabled = true;
    currentlyEditing = null;
    // Restore button functionality
    editButton.onclick = (e) => {
      let id;
      if (e.target.className == "emoji") {
        id = e.target.parentElement.getAttribute("data-friend-id");
      } else {
        id = e.target.getAttribute("data-friend-id");
      }
      editFriend(id);
    };
  };
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

export const Friend = class {
  constructor(id, name, number, emoji, parent) {
    let friend = storage.getFriend(id);

    this.id = friend?.id ?? Date.now();
    this.name = friend?.name ?? name;
    this.number = friend?.number ?? number;
    this.emoji = friend?.emoji ?? emoji;
    this.parent = parent;

    this.nameField;
    this.numberField;
  }
  create = () => {
    // Create the friend html structure

    // Container
    this.containerDiv = createElem("div", {
      id: `friend-${this.id}`,
      className: [
        "friend",
        "inline-flex",
        "items-center",
        "p-3",
        "radius-3",
        "transition",
      ],
    });

    // Animate in, gets removed at end of method
    this.containerDiv.classList.add("slide-down");

    // Create the avatar div and add a default emoji
    this.avatarDiv = createElem(
      "div",
      {
        id: `friend-avatar-${this.id}`,
        className: ["avatar", "no-select"],
        textContent: this.emoji,
      },
      this.containerDiv
    );

    // Create the meta div
    const metaDiv = createElem(
      "div",
      {
        className: ["meta", "flex", "flex-col", "ml-3", "grow"],
      },
      this.containerDiv
    );

    // Create input field for name
    const nameHeading = createElem(
      "h3",
      {
        className: ["font-size-5", "mb-2"],
      },
      metaDiv
    );

    this.nameField = createElem(
      "input",
      {
        className: ["transition", "color-gray-5"],
        disabled: true,
        type: "text",
        name: `name-${this.id}`,
        id: `name-input-${this.id}`,
        value: this.name,
      },
      nameHeading
    );

    const numberHeading = createElem(
      "h4",
      {
        className: ["font-size-4", "font-thin"],
      },
      metaDiv
    );

    this.numberField = createElem(
      "input",
      {
        classnumber: ["transition", "color-gray-6"],
        disabled: true,
        type: "text",
        number: `number-${this.id}`,
        id: `number-input-${this.id}`,
        value: formatPhoneNumber(this.number),
      },
      numberHeading
    );

    // Create the button group div and add buttons
    const buttonGroupDiv = createElem(
      "div",
      {
        className: ["button-group", "justify-self-end"],
      },
      this.containerDiv
    );

    this.editButton = createElem(
      "button",
      {
        id: `edit-friend-${this.id}`,
        className: "button",
      },
      buttonGroupDiv
    );
    this.editButton.onclick = (e) => this.edit();

    const editButtonEmoji = createElem(
      "div",
      { className: "emoji", textContent: "✏️" },
      this.editButton
    );

    this.dropButton = createElem(
      "button",
      {
        id: `drop-friend-${this.id}`,
        className: "button",
      },
      buttonGroupDiv
    );
    this.dropButton.onclick = (e) => this.drop();

    const dropButtonEmoji = createElem(
      "div",
      { className: "emoji", textContent: "🗑️" },
      this.dropButton
    );

    // Add friend
    this.parent.appendChild(this.containerDiv);

    // Remove animation class
    setTimeout(() => {
      this.containerDiv.classList.remove("slide-down");
    }, animationDuration);
  };

  edit = () => {
    console.log(`Editing friend #${this.id}`);

    // Get elements
    const editButtonEmoji = this.editButton.querySelector(".emoji");

    // Enable fields
    this.nameField.disabled = false;
    this.numberField.disabled = false;
    this.nameField.focus();

    // Change edit button emoji
    editButtonEmoji.textContent = "✅";

    this.editButton.onclick = (e) => {
      storage.updateFriend(
        this.id,
        this.nameField.value,
        this.numberField.value
      );
      editButtonEmoji.textContent = "✏️";
      this.nameField.disabled = true;
      this.numberField.disabled = true;
      currentlyEditing = null;
      // Restore button functionality
      this.editButton.onclick = (e) => {
        this.edit();
      };
    };
  };

  /**
   * Delete the friend from the list of friends and storage.
   */
  drop = () => {
    // Drop friend from storage
    storage.dropFriend(this.id);

    // Animate container going up
    this.containerDiv.classList.add("slide-up");
    setTimeout(() => {
      // Remove friend from list
      this.containerDiv.remove();
    }, 600);
  };
};
