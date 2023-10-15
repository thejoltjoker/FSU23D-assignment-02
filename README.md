<p align="center" style="font-size:4rem;">
  <img src="./img/waving-hand.png" align="center" style="max-width:100px;">
</p>  
<h1 align="center">
  <b>Friends 4 Ever</b>
</h1>
<h2 align="center" style="font-weight:300;font-size: 1.2rem;">FSU23D Assignment #2</h2>
<p align="center">
  A little web app for storing contacts.
  <br />
  <a href="https://thejoltjoker.github.io/FSU23D-assignment-02"><b>Website</b></a>
</p>

This is the repository for the contact list app assignment, made during the Full Stack Developer course at Medieinstitutet.

## 📖 About

Friends 4 Ever is a simple web app developed using HTML, SCSS and JavaScript. Is is the first individual assignment of the FSU23D course. The website showcases skills in front-end web development, such as HTML, CSS and JavaScript.

## 🏆 Bragging points
- No external libraries used. 
- Custom CSS framework built using SCSS.
- Data persist across sessions by using local storage.


## 🤓 Assignment
### 🏗️ Subtask 1: Structure
The components that create new contacts should consist of:

✅ A text field where the user can enter a name

✅ A text field where the user can enter a phone number

✅ A button to create a new contact
The contact list should consist of

✅ Multiple contacts (if the user has added contacts, otherwise empty)

✅ Filled text fields for both name and phone number. Both fields should be disabled by default.

**In addition to the contact information, there should also be buttons associated with the contact to:**

✅ Edit contact information

✅ Delete contact

### 🖱️ Subtask 2: Interaction

Implement appropriate functionality in the application using JavaScript. Based on the following scenarios:

#### 👤 Scenario 1 (Create Contact)

✅ The user enters a name and phone number in their respective fields.

✅ The user clicks on the create button.

✅ The contact is added to the contact list.

#### ✏️ Scenario 2 (Edit Contact)

✅ Both text fields for the contact are locked by default, i.e., the information cannot be edited (disabled).

✅ The user clicks the 'Edit' button to edit an added contact.

✅ Contact details can now be edited.

✅ The user edits the contact information.

✅ The user clicks the same button again to save the information.

✅ The contact's text fields become locked and cannot be edited.

✅ This process can be repeated multiple times.

#### 🗑️ Scenario 3 (Delete Contact)

✅ The user clicks the 'delete' button, which removes the contact from the list.

### 🎨 Subtask 3: Design (not mandatory)

✅ Apply a suitable framework and/or custom CSS to achieve an attractive design for your application. You might consider using a framework like Bootstrap.

### ☢️ Hard Mode

✅ The user should not be able to create a contact without filling in both text fields.

✅ An existing contact should not be changed to an empty contact without information. A contact that has had information should not become a contact without information.

✅ Display appropriate error messages if someone tries to save empty contacts. The message should be displayed via HTML. Alert messages are not allowed.

✅ Refactor the code into functions. The code that deletes a contact, changes a contact, and validates a contact should be rewritten into functions. This means at least three functions for these purposes.

✅ Create a new button "Delete List" that deletes all contacts in the list. It can be placed next to the "Create" button.