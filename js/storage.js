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
 */
export const setFriend = (name, number, emoji = "🥸") => {
  // Get existing friends
  let friends = getFriends();

  // Use timestamp as ID to avoid collision
  let id = Date.now();

  // Add the new friend to friends object
  let friend = { id: id, name: name, number: number, emoji: emoji };
  friends.push(friend);

  // Save friends to localStorage
  window.localStorage.setItem("friend", JSON.stringify(friends));

  return friend;
};

export const dropFriend = (id) => {
  // Get existing friends
  let friends = getFriends();
  const index = friends.findIndex((friend) => friend.id == id);
  console.log(index);
  friends.splice(index, 1); // remove 1 element at index 2 (value: 3)

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
