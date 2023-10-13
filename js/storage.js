import { randomEmoji } from "./emoji.js";
import { cleanNumber } from "./utility.js";

/**
 * Retrieves the list of friends from local storage.
 * @returns {Array} An array of friend objects, or an empty array if there are no friends.
 */
export const getFriends = () => {
  // Get friends from local storage
  const friends = window.localStorage.getItem("friend");

  // Return friends or empty list
  if (friends) {
    return JSON.parse(friends);
  }
  return [];
};

/**
 * Adds a new friend to the list and stores it in local storage.
 * @param {string} name - The name of the friend.
 * @param {string} number - The number of the friend.
 * @param {string} emoji - The emoji associated with the friend.
 * @returns {object} An object with friend attributes.
 */
export const insertFriend = (name, number, emoji) => {
  // Get existing friends
  let friends = getFriends();

  // Use timestamp as ID to avoid collision
  let id = Date.now().toString();

  // Use random emoji if not given
  // emoji = emoji || randomEmoji();

  // Clean phone number
  number = cleanNumber(number);

  // Add the new friend to friends object
  let friend = { id: id, name: name, number: number, emoji: emoji };
  friends.push(friend);

  // Save friends to localStorage
  window.localStorage.setItem("friend", JSON.stringify(friends));

  return friend;
};

/**
 * Updates an existing friend in the list and stores it in local storage.
 * @param {string} id - The id of the friend.
 * @param {string} name - The name of the friend.
 * @param {string} number - The number of the friend.
 * @param {string} emoji - The emoji associated with the friend.
 * @returns {object} An object with friend attributes.
 */
export const updateFriend = (id, name, number, emoji) => {
  // Get existing friends
  let friends = getFriends();

  // Add the new friend to friends object
  let friend = {
    id: id,
    name: name,
    number: cleanNumber(number),
    emoji: emoji,
  };

  const index = friends.findIndex((friend) => friend.id == id);

  // Update friend in array
  friends[index] = friend;

  // Save friends to localStorage
  window.localStorage.setItem("friend", JSON.stringify(friends));

  return friend;
};

/**
 * Delete an existing friend from local storage.
 * @param {string} id - The id of the friend.
 */
export const dropFriend = (id) => {
  // Get existing friends
  let friends = getFriends();
  const index = friends.findIndex((friend) => friend.id == id);

  // Delete friend from array
  friends.splice(index, 1);

  // Save friends to localStorage
  window.localStorage.setItem("friend", JSON.stringify(friends));
};

/**
 * Clears the list of friends by setting the local storage to an empty list.
 */
export const clearFriends = () => {
  // Set the friends local storage to an empty list
  window.localStorage.setItem("friend", JSON.stringify([]));
};
