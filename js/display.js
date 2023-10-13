import * as storage from "./storage.js";
const deleteFriend = (id) => {
  const friendDiv = document.querySelector(`#friend-${id}`);
  console.log(friendDiv);
  friendDiv.classList.add("slide-up");

  storage.dropFriend(id);
  setTimeout(() => {
    friendDiv.remove();
  }, 600);
};

export const reloadFriends = () => {
  // TODO
};
// TODO: displayFriend
export const showFriend = (friend, animate = false) => {
  if (friend) {
    // Show friend in html
    // Create the main container div element
    const friendDiv = document.createElement("div");
    friendDiv.className =
      "friend flex flex-row items-center p-3 radius-3 transition";
    if (animate) {
      friendDiv.className += " slide-down";
    }
    friendDiv.id = `friend-${friend.id}`;
    // friendDiv.setAttribute("data-friend-id", friend.id);

    // Create the avatar div and add an image
    const avatarDiv = document.createElement("div");
    avatarDiv.className = "avatar";
    const avatarImg = document.createElement("img");
    avatarImg.src = "https://thispersondoesnotexist.com/";
    avatarImg.alt = "Avatar";
    avatarImg.className = "radius-50";
    avatarDiv.appendChild(avatarImg);

    // Create the meta div
    const metaDiv = document.createElement("div");
    metaDiv.className = "meta flex flex-col ml-3 grow";

    // Create and append the name and number headings
    const nameHeading = document.createElement("h2");
    nameHeading.className = "name mb-2";
    nameHeading.textContent = friend.name;
    const numberHeading = document.createElement("h3");
    numberHeading.className = "number muted";
    numberHeading.textContent = friend.number;
    const idParagraph = document.createElement("p");
    numberHeading.className = "number muted";
    numberHeading.textContent = friend.id;
    metaDiv.appendChild(nameHeading);
    metaDiv.appendChild(numberHeading);
    metaDiv.appendChild(idParagraph);

    // Create the button group div and add buttons
    const buttonGroupDiv = document.createElement("div");
    buttonGroupDiv.className = "button-group justify-self-end";

    const editButton = document.createElement("button");
    editButton.className = "button";
    editButton.id = `edit-friend-${friend.id}`;
    editButton.setAttribute("data-friend-id", friend.id);
    editButton.textContent = "✏️";

    const dropButton = document.createElement("button");
    dropButton.className = "button";
    dropButton.id = `drop-friend-${friend.id}`;
    dropButton.setAttribute("data-friend-id", friend.id);
    dropButton.textContent = "🗑️";

    dropButton.addEventListener("click", (e) => {
      deleteFriend(e.target.getAttribute("data-friend-id"));
    });

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
  }
};
