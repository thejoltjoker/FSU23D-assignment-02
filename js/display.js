import * as storage from "./storage.js";
import { cleanNumber, formatPhoneNumber, isPhoneNumber } from "./utility.js";
import { emojis } from "./emoji.js";
const animationDuration = 500;
// TODO Create modal class

/**
 * Creates a new HTML element with the specified attributes and appends it to a parent element.
 *
 * @param {string} element - The HTML tag name of the element to create (default is "div").
 * @param {object} attributes - An object containing the element's attributes and their values.
 * @param {HTMLElement} parent - The parent element to which the created element will be appended (optional).
 *
 * @returns {HTMLElement} - The newly created HTML element with the specified attributes.
 */
export const createElem = (element = "div", attributes, parent = null) => {
  const elem = document.createElement(element);

  // Set values for all given attributes
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

/**
 * Populates the list of friends in the HTML with data retrieved from storage.
 */
export const populateList = () => {
  // Get friends from storage
  const friends = storage.getFriends(); // Assuming 'storage' is defined elsewhere
  const friendsList = document.querySelector("#friends-list");

  if (friends.length > 0) {
    // For each friend, add them to the list
    friends.forEach((f) => {
      console.log(`Friend #${f.id} ${f.name}`);
      const friend = new Friend(...Object.values(f), friendsList);
      friend.create();
    });
  } else {
    console.log(`You have no friends 😭`);
  }
};

/**
 * Clear all friends from the #friends-list
 */
export const clearList = () => {
  // Get friends from storage
  const friendsList = document.querySelector("#friends-list");
  friendsList.innerHTML = "";
};

/**
 * EmojiPicker class for displaying and selecting emojis in a box.
 *
 * @class EmojiPicker
 * @param {Function} callback - A callback function to be invoked when an emoji is picked.
 */
export const EmojiPicker = class {
  /**
   * Creates a new EmojiPicker instance and displays the emoji picker UI.
   * @constructor
   * @param {Function} callback - A callback function to be invoked when an emoji is picked.
   */
  constructor(callback) {
    this.callback = callback;
    this.show();
  }

  /**
   * Displays the emoji picker user interface.
   */
  show = () => {
    // Create UI elements
    this.pickerDiv = createElem(
      "div",
      {
        id: "emoji-picker",
        className: [
          "artboard",
          "p-4",
          "m-2",
          "shadow-sm",
          "z-50",
          "max-width-lg",
        ],
      },
      document.querySelector("body")
    );
    const ul = createElem("ul", { className: ["flex"] }, this.pickerDiv);

    // Add emojis
    emojis.forEach((emoji) => {
      let elem = createElem(
        "li",
        {
          textContent: emoji,
          className: ["transition", "text-center", "ar-square"],
        },
        ul
      );
      elem.onclick = (e) => {
        const selectedEmoji = e.target.textContent;
        this.pick(selectedEmoji);
      };
    });

    // Move to center
    this.pickerDiv.style.left = (() => {
      let margin = (window.innerWidth - this.pickerDiv.offsetWidth) / 2;
      margin -= parseInt(window.getComputedStyle(this.pickerDiv).margin);
      return `${margin}px`;
    })();
  };

  /**
   * Picks an emoji, triggers the callback, and closes the picker.
   * @param {string} emoji - The selected emoji.
   */
  pick = (emoji) => {
    this.close();
    if (this.callback) {
      this.callback(emoji);
    }
  };

  /**
   * Closes the emoji picker UI by removing it from the document.
   */
  close = () => {
    this.pickerDiv.remove();
  };
};

export const Friend = class {
  constructor(id, name, number, emoji, parent) {
    this.id = id || `${Date.now()}`;
    this.name = name;
    this.number = number;
    this.emoji = emoji;

    this.parent = parent;

    this.nameField;
    this.numberField;
  }

  /**
   * Enable editing of friend by enabling input fields and changing buttons.
   */
  #enableEditing = () => {
    // Enable fields
    this.nameField.disabled = false;
    this.numberField.disabled = false;

    // Change hover background color
    this.containerDiv.classList.add("friend-editable");

    // Change edit button emoji
    this.editButton.querySelector(".emoji").textContent = "✅";
    this.dropButton.querySelector(".emoji").textContent = "❌";

    // Add pink ring to avatar
    this.avatarDiv.classList.add("avatar-editable");

    // Set focus to name field
    this.nameField.focus();
  };

  /**
   * Disable editing of friend by disabling input fields and resetting buttons.
   */
  #disableEditing = () => {
    // Disable fields
    this.nameField.disabled = true;
    this.numberField.disabled = true;

    // Change hover background color
    this.containerDiv.classList.remove("friend-editable");

    // Add pink ring to avatar
    this.avatarDiv.classList.remove("avatar-editable");

    this.numberField.value = formatPhoneNumber(
      cleanNumber(this.numberField.value)
    );

    this.avatarDiv.onclick = null;

    this.#resetButtons();
  };

  /**
   * Reset buttons to their original state, visually and functionally.
   */
  #resetButtons = () => {
    const editButtonEmoji = this.editButton.querySelector(".emoji");
    const dropButtonEmoji = this.dropButton.querySelector(".emoji");
    editButtonEmoji.textContent = "✏️";
    dropButtonEmoji.textContent = "🗑️";
    // Restore button functionality
    this.editButton.onclick = (e) => {
      e.preventDefault();
      this.edit();
    };
    // Restore button functionality
    this.dropButton.onclick = (e) => {
      e.preventDefault();
      this.drop();
    };
  };

  /**
   * Create the HTML structure for the friend.
   */
  create = () => {
    // Container
    this.containerDiv = createElem("div", {
      id: `friend-${this.id}`,
      className: [
        "friend",
        "inline-flex",
        "items-center",
        "p-2",
        "p-md-3",
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

    const metaForm = createElem(
      "form",
      {
        id: `friend-form-${this.id}`,
        className: ["meta", "flex", "flex-row", "grow", "items-center"],
        method: "post",
      },
      this.containerDiv
    );
    // Create the meta div
    const metaDiv = createElem(
      "div",
      {
        className: ["meta", "flex", "flex-col", "grow", "mx-2", "mx-sm-3"],
      },

      metaForm
    );

    // Create input field for name
    this.nameField = createElem(
      "input",
      {
        className: [
          "transition",
          "color-gray-5",
          "mb-1",
          "mb-md-2",
          "font-size-4",
          "font-size-sm-5",
          "font-size-lg-6",
        ],
        disabled: true,
        type: "text",
        name: `name-${this.id}`,
        id: `name-input-${this.id}`,
        value: this.name,
        ariaLabel: "Name",
      },
      metaDiv
    );

    this.numberField = createElem(
      "input",
      {
        className: [
          "transition",
          "color-gray-6",
          "font-thin",
          "font-size-3",
          "font-size-sm-4",
          "font-size-lg-4",
        ],
        disabled: true,
        type: "tel",
        name: `number-${this.id}`,
        id: `number-input-${this.id}`,
        value: formatPhoneNumber(this.number),
        ariaLabel: "Number",
      },
      metaDiv
    );

    // Create the button group div and add buttons
    const buttonGroupDiv = createElem(
      "div",
      {
        className: ["button-group", "justify-self-end"],
      },
      metaForm
    );

    this.editButton = createElem(
      "button",
      {
        id: `edit-friend-${this.id}`,
        className: ["button", "py-3", "px-2", "px-md-3"],
      },
      buttonGroupDiv
    );
    this.editButton.onclick = (e) => {
      e.preventDefault();
      this.edit();
    };

    // eslint-disable-next-line no-unused-vars
    const editButtonEmoji = createElem(
      "div",
      { className: "emoji", textContent: "✏️" },
      this.editButton
    );

    this.dropButton = createElem(
      "button",
      {
        id: `drop-friend-${this.id}`,
        className: ["button", "py-3", "px-2", "px-md-3"],
      },
      buttonGroupDiv
    );

    this.dropButton.onclick = (e) => {
      e.preventDefault();
      this.drop();
    };

    // eslint-disable-next-line no-unused-vars
    const dropButtonEmoji = createElem(
      "div",
      { className: "emoji", textContent: "🗑️" },
      this.dropButton
    );

    // Add friend
    this.parent.appendChild(this.containerDiv);

    // Set the correct sliding distance to avoid choppy animation
    document.documentElement.style.setProperty(
      "--slide-down-distance",
      `-${this.containerDiv.offsetHeight}px`
    );

    // Remove animation class
    setTimeout(() => {
      this.containerDiv.classList.remove("slide-down");
    }, animationDuration);
  };

  /**
   * Edit friend. Updates the friend in storage by getting the form values.
   */
  edit = () => {
    console.log(`Editing friend #${this.id}`);

    this.#enableEditing();

    this.avatarDiv.onclick = () => {
      // In your other class
      // eslint-disable-next-line no-unused-vars
      const picker = new EmojiPicker((emoji) => {
        this.avatarDiv.textContent = emoji;
      });
    };

    this.editButton.onclick = (e) => {
      e.preventDefault();
      // Validate data

      if (this.nameField.value != "" && isPhoneNumber(this.numberField.value)) {
        storage.updateFriend(
          this.id,
          this.nameField.value,
          this.numberField.value,
          this.avatarDiv.textContent
        );
        this.#disableEditing();
      } else {
        this.nameField.placeholder = "Can't be blank";
        this.numberField.placeholder = "Can't be blank";
      }
    };

    this.dropButton.onclick = (e) => {
      e.preventDefault();
      this.nameField.value = this.name;
      this.numberField.value = formatPhoneNumber(this.number);
      this.avatarDiv.textContent = this.emoji;

      this.#disableEditing();
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
    }, animationDuration);
  };
};

/**
 * @param {HTMLElement} content
 */

export const Modal = class {
  constructor(content) {
    this.modalContainer = createElem(
      "div",
      {
        classList: [
          "modal-container",
          "flex",
          "items-center",
          "transition",
          "display-none",
        ],
      },
      "body"
    );
    this.modalContent = createElem(
      "div",
      {
        classList: [
          "modal-content",
          "flex",
          "artboard",
          "radius-4",
          "shadow-lg",
          "mx-auto",
          "p-3",
        ],
      },
      this.modalContainer
    );
  }

  show = () => {
    this.modalContainer.classList.add("fade-in");
    this.modalContainer.classList.remove("display-none");

    setTimeout(() => {
      this.modalContainer.classList.remove("fade-in");
    }, animationDuration);
  };

  hide = () => {
    this.modalContainer.classList.add("fade-out");
    setTimeout(() => {
      this.modalContainer.classList.add("display-none");
      this.modalContainer.classList.remove("fade-out");
    }, animationDuration);
  };

  // Testing stuff
  // showModal();

  // const testArea = document.querySelector("#test-area");
  // const emojiPicker = new display.EmojiPicker(testArea);
};

export const NewFriendModal = class {
  // <form >
  //   <div class="mb-2 font-bold color-gray-4">
  //     <label for="name">Name</label>
  //   </div>
  //   <div id="friend-form-name" class="mb-4 font-size-5">
  //     <div class="emoji z-30">👤</div>
  //     <input
  //       type="text"
  //       name="name"
  //       id="input-name"
  //       class="transition"
  //     />
  //   </div>

  //   <div class="mb-2 font-bold color-gray-4">
  //     <label for="number">Number</label>
  //   </div>
  //   <div class="mb-4 font-size-5">
  //     <input
  //       type="tel"
  //       name="number"
  //       id="input-number"
  //       class="transition"
  //     />
  //   </div>
  //   <div
  //     id="friend-form-message"
  //     class="display-none text-center pb-4 transition"
  //   >
  //     &nbsp;
  //   </div>
  //   <button
  //     type="submit"
  //     id="save-button"
  //     class="button p-2 font-size-4 font-bold transition"
  //   >
  //     😻 Save 😻
  //   </button>
  // </form>

  create = () => {
    this.mainDiv = createElem("div", { classList: ["flex", "flex-col"] });
    const wavingHandDiv = createElem(
      "div",
      {
        classList: ["text-center", "font-size-7", "mt-6", "pb-6", "no-select"],
      },
      this.mainDiv
    );
    const h2 = createElem(
      "h2",
      {
        classList: ["text-center", "mb-6", "font-bold"],
        innerText: "✨ New friend, yay ✨",
      },
      this.mainDiv
    );
    const form = createElem(
      "form",
      {
        id: "friend-form",
        method: "post",
        classList: ["flex", "flex-col"],
      },
      this.mainDiv
    );

    // Create the "Name" section
    const nameSection = createElem(
      "div",
      {
        classList: ["mb-2", "font-bold", "color-gray-4"],
      },
      form
    );
    const nameLabel = createElem(
      "label",
      { for: "name", textContent: "Name" },
      nameSection
    );

    const nameInputSection = createElem(
      "div",
      {
        id: "friend-form-name",
        classList: ["mb-4", "font-size-5"],
      },
      form
    );

    const nameEmoji = createElem(
      "div",
      {
        classList: ["emoji", "z-30"],
        textContent: "👤",
      },
      nameInputSection
    );

    const nameInput = createElem(
      "input",
      {
        type: "text",
        name: "name",
        id: "input-name",
        class: "transition",
      },
      nameInputSection
    );

    // Create the number section
    const numberSection = createElem("div", {
      classList: ["mb-2", "font-bold", "color-gray-4"],
    },form);
    const numberLabel = createElem("label", { for: "number" });
    numberLabel.textContent = "Number";
    numberSection.appendChild(numberLabel);

    const numberInputSection = createElem("div", {
      classList: ["mb-4", "font-size-5"],
    });
    const numberInput = createElem(
      "input",
      {
        type: "tel",
        name: "number",
        id: "input-number",
        class: "transition",
      },
      numberInputSection
    );

    numberInputSection.appendChild(numberInput);

    // Create the "Message" section
    const messageSection = createElem("div", {
      id: "friend-form-message",
      classList: ["display-none", "text-center", "pb-4", "transition"],
    });
    messageSection.textContent = " ";

    // Create the "Save" button
    const saveButton = createElem("button", {
      type: "submit",
      id: "save-button",
      class: ["button", "p-2", "font-size-4", "font-bold", "transition"],
    });
    saveButton.textContent = "😻 Save 😻";


    form.appendChild(nameSection);
form.appendChild(nameInputSection);
form.appendChild(numberSection);
form.appendChild(numberInputSection);
form.appendChild(messageSection);
form.appendChild(saveButton);
  };

  
};
