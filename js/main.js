//get elements
let errorMessage = document.getElementById('error-message');
const nameInput = document.getElementById('name-input');
const telInput = document.getElementById('tel-input');
const createContactBtn = document.getElementById('create-btn');
const deleteContactListBtn = document.getElementById('delete-all-btn');
deleteContactListBtn.style.display = 'none';
const contactList = document.getElementById('contact-list');


//create contact
createContactBtn.addEventListener('click', function(e){
    e.preventDefault();
    
    //validation
    if(!validateForm(nameInput, telInput)){
        return;
    }

    //create elements and get info from input
    const contactInfo = document.createElement('li');
    contactInfo.className = 'contact-info';

    const nameInfo = createInput('text', nameInput.value, 'added-name');
    const telInfo = createInput('tel', telInput.value, 'added-tel');

    const editBtn = createButton('Ändra', 'edit-button', editContact);
    const saveBtn = createButton('Spara', 'save-button', saveContact);
    saveBtn.style.display = 'none';
    const deleteBtn = createButton('Radera', 'delete-button', deleteContact);

    //add all elements
    contactList.appendChild(contactInfo);
    contactInfo.append(nameInfo, telInfo, editBtn, saveBtn, deleteBtn);

    //clear input 
    nameInput.value = '';
    telInput.value = ''; 

    showOrHideDeleteBtn()
})


//delete contact list
deleteContactListBtn.addEventListener('click', function(){
    let text = `Är du säker att du vill radera?`
    if (confirm(text) === true) {
        contactList.replaceChildren();
    } else {
        return;
    }
    showOrHideDeleteBtn();
})



/**********************Functions********************/
// create input
function createInput(type, value, className) {
    const inputField = document.createElement('input')
    inputField.type = type;
    inputField.value = value;
    inputField.className = className;
    inputField.disabled = true;
    return inputField;
}

// create button
function createButton(innerText, className, event) {
    const button = document.createElement('button');
    button.innerText = innerText;
    button.className = className;
    button.addEventListener('click', event);
    return button; 
}


// validation 
function validateForm(nameInput, telInput) {
    const name = nameInput.value.trim();
    const tel = telInput.value.trim();
    if(!name || !tel) {
        getErrorMessage(`Fyll i fälten "Namn" och "Telefon".`);
        return false;
    }
    if (!checkIfTelNumber(tel)) {
        return false;
    } 
    getErrorMessage('');
    return true;
}


function checkIfTelNumber(input) {
    // allow + in front, space and - between numbers(not in the end)
    const telPattern = /^\+?[0-9]+(?:[\s\-][0-9]+)*$/;  
    if (!telPattern.test(input)) {
        getErrorMessage(`Felaktigt telefonnumner!`);
        return false;
    }
        return true;
  }

function getErrorMessage(message) {
    errorMessage.innerText = message;
}


// edit one contact
function editContact(e) {
    const contactInfo =  e.target.parentNode;
    changeButton(contactInfo, true);
}

// save one contact
function saveContact(e) {
    e.preventDefault();
    const contactInfo =  e.target.parentNode;
    if(!validateForm(nameInfo, telInfo)){
        return;
    }
    changeButton(contactInfo, false);
}

//show edit button or save button
function changeButton(contactInfo, isEditing) {
    contactInfo.children[0].disabled = !isEditing;
    contactInfo.children[1].disabled = !isEditing;
    contactInfo.children[2].style.display = isEditing?'none':'inline';
    contactInfo.children[3].style.display = isEditing?'inline':'none';
}

// delete one contact
function deleteContact(e){
    e.target.parentNode.remove();
    showOrHideDeleteBtn();
}

// to show or hide delete-all-button
function showOrHideDeleteBtn() {
    if (contactList.children.length > 0) {
        deleteContactListBtn.style.display = 'inline';
    } else {
        deleteContactListBtn.style.display = 'none';
    }
    changeCreateBtnSize(); 
}


/*************** media queries***************/
function changeCreateBtnSize() {
    if (smallScreen.matches && deleteContactListBtn.style.display === 'none') {
        createContactBtn.style.gridColumn = `1/span 2`;
    } else {
        createContactBtn.style.gridColumn = ''; //back to default setting
    }
}

let smallScreen = window.matchMedia('(max-width: 768px)') 
smallScreen.addEventListener('change', changeCreateBtnSize); //check when change screen size
changeCreateBtnSize(); 
