'use strict'


// ---------- 📅 Date 📅 --------------
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// const todaysFullDate = `${weekdays[day]} ${date} ${months[month]}, ${year}`;

function printDate() {
    const newDate = new Date();
    const day = newDate.getDay();
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `Added ${weekdays[day]} ${date} ${months[month]}, ${year}`;
}

function printCurrentDate() {
    const newDate = new Date();
    const day = newDate.getDay();
    const date = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    return `${weekdays[day]} ${date} ${months[month]}, ${year}`;
}


// ---------- ⏱ Time ⏱ --------------
function printCurrentTime() {
    const newDate = new Date();
    const minutes = newDate.getMinutes();

    if (minutes >= 0 && minutes <= 9) {
        return `${newDate.getHours()}:0${minutes}`;
    } else {
        return `${newDate.getHours()}:${minutes}`;
    }
}

// ---------- 📥 'Add' To-Do Items 📥 --------------
const addBtnLg = document.getElementById('addBtn');
const addInputLg = document.getElementById('input');
console.log(addInputLg);

const emptyListDisplay = document.querySelector('.empty-list-display');
const listItemContainer = document.querySelector('.list-item-container');
let toDos = 0;
let listedTodos = 0; /* Pending Items */
let prioritisedTodos = 0; /* Prioritised Items */
let completedTodos = 0; /* Completed Items */
let targetItem;
let itemToEdit;

function createNewToDo(listContent) {

    toDos++;
    console.log(toDos);
    /*listedTodos++;*/
    const toDoItemContainer = document.querySelector('.to-do-item-container');

    // Create a new to-do item
    const newToDoItem = document.createElement('div');
    newToDoItem.classList.add('to-do-item');
    toDoItemContainer.appendChild(newToDoItem);

    const newToDoItemBackground = document.createElement('div');
    newToDoItemBackground.classList.add('to-do-item-background');
    newToDoItem.appendChild(newToDoItemBackground);

    const newStarContainer = document.createElement('div');
    newStarContainer.classList.add('star-container');
    newToDoItem.appendChild(newStarContainer);

    const newStarContainerIcon = document.createElement('i');
    newStarContainerIcon.classList.add('fas', 'fa-star');
    newStarContainer.appendChild(newStarContainerIcon);

    const newItemContentMain = document.createElement('div');
    newItemContentMain.classList.add('item-content-main');
    newToDoItem.appendChild(newItemContentMain);

    const newToDoItemCheckbox = document.createElement('div');
    newToDoItemCheckbox.classList.add('to-do-item--checkbox');
    newItemContentMain.appendChild(newToDoItemCheckbox);

    const newToDoItemCheckboxIcon = document.createElement('i');
    newToDoItemCheckboxIcon.classList.add('far', 'fa-circle', 'fa-2x');
    newToDoItemCheckbox.appendChild(newToDoItemCheckboxIcon);
    newToDoItemCheckboxIcon.id = 'checkboxIcon';

    const toDoItemContent = document.createElement('div');
    toDoItemContent.classList.add('to-do-item--content');
    newItemContentMain.appendChild(toDoItemContent);

    const newContentText = document.createElement('div');
    newContentText.classList.add('content-text');
    toDoItemContent.appendChild(newContentText);

    const newContentTextToDo = document.createElement('p');
    newContentTextToDo.classList.add('content-text--to-do');
    newContentText.appendChild(newContentTextToDo);
    newContentTextToDo.textContent = listContent;


    const newContentTextDate = document.createElement('p');
    newContentTextDate.classList.add('content-text--date');
    newContentText.appendChild(newContentTextDate);
    newContentTextDate.textContent = `${printDate()}`;

    const newItemContentIcons = document.createElement('div');
    newItemContentIcons.classList.add('item-content-icons');
    newToDoItem.appendChild(newItemContentIcons);

    const newToDoItemPriority = document.createElement('div');
    newToDoItemPriority.classList.add('to-do-item--priority');
    newItemContentIcons.appendChild(newToDoItemPriority);

    const newToDoItemPriorityIcon = document.createElement('i');
    newToDoItemPriorityIcon.classList.add('far', 'fa-star');
    newToDoItemPriority.appendChild(newToDoItemPriorityIcon);
    newToDoItemPriorityIcon.id = 'prioritiseIcon';

    const newToDoItemEdit = document.createElement('div');
    newToDoItemEdit.classList.add('to-do-item--edit');
    newItemContentIcons.appendChild(newToDoItemEdit);

    const newToDoItemEditIcon = document.createElement('i');
    newToDoItemEditIcon.classList.add('fas', 'fa-edit');
    newToDoItemEdit.appendChild(newToDoItemEditIcon);
    newToDoItemEditIcon.id = 'editIcon';

    const newToDoItemRemove = document.createElement('div');
    newToDoItemRemove.classList.add('to-do-item--remove');
    newItemContentIcons.appendChild(newToDoItemRemove);

    const newToDoItemRemoveIcon = document.createElement('i');
    newToDoItemRemoveIcon.classList.add('fas', 'fa-trash-alt');
    newToDoItemRemove.appendChild(newToDoItemRemoveIcon);
    newToDoItemRemoveIcon.id = 'removeIcon';
}

function checkListedToDos() {
    if (toDos > 0) {
        emptyListDisplay.style.display = 'none';
        listItemContainer.style.display = 'flex';
    } else {
        emptyListDisplay.style.display = 'flex';
        listItemContainer.style.display = 'none';
    }
}

document.addEventListener('keydown', (e) => {
    const pressed = e.key;
    
    if ((addInputLg === document.activeElement) && (pressed === 'Enter')) {
        if (addInputLg.value != '') {
            console.log("hi");
            addToDo();
    
        }
    }
});

function addToDo() {

    if (addInputLg.value != '') {
        createNewToDo(addInputLg.value);
        checkListedToDos();
        addInputLg.value = '';
    }

}

addBtnLg.addEventListener('click', addToDo);


function completeToDoItem(item, icon) {

    item.classList.add('item-complete');
    icon.classList.remove('far', 'fa-circle');
    icon.classList.add('fas', 'fa-check-circle');
    icon.removeAttribute('id');

    if (item.classList.contains('item-priority')) {
        listedTodos--;
        prioritisedTodos--;
        completedTodos++;
        
    } else {
        listedTodos--;
        completedTodos++;
    }
}

function prioritiseToDoItem(item, icon) {

    if (item.classList.contains('item-complete')) {
        // Nothing happens
    } else {
        if (item.classList.contains('item-priority')) {
            item.classList.remove('item-priority');
            icon.classList.add('far');
            icon.classList.remove('fas');
            icon.style.color = '#808080';
            prioritisedTodos--;
        } else {
            item.classList.add('item-priority');
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = 'var(--color-primary)';
            prioritisedTodos++;

        }
    }
}

function openEditItemModal() {
    openSettingsInnerModal();
    smallModalHeader.innerHTML = '<span class="highlight">Edit</span> Your To-Do Item';
    smallModalP1.innerHTML = 'You can edit your to-do item below:';
    smallModalP2.style.display = 'none';
    smallModalInput.style.display = 'flex';
    smallModalInput.placeholder = 'Edit Your To-Do Item...';
    smallModalInput.value = itemToEdit.textContent;
    smallModalBtnMain.classList.remove('btn-negative');
    smallModalBtnMain.classList.add('btn-primary');
    smallModalBtnMain.textContent = 'Edit';

    settingsModalBox.classList.add('edit-item-active');
}

function openDeleteItemModal() {
    openSettingsInnerModal();
    smallModalHeader.innerHTML = '<span class="highlight-negative">Delete</span> Your To-Do Item?';
    smallModalP1.innerHTML = 'You will be unable to recover your data once it has been deleted.';
    smallModalP2.innerHTML = 'Are you sure?';
    smallModalInput.style.display = 'none';
    smallModalBtnMain.classList.add('btn-negative');
    smallModalBtnMain.classList.remove('btn-primary');
    smallModalBtnMain.textContent = 'Delete';

    settingsModalBox.classList.add('delete-item-active');
}

function checkClickedIcon(e) {
    const clickedIcon = e.target;

    const clickedParent = clickedIcon.parentElement;
    const clickedGrandparent = clickedParent.parentElement;
    const clickedToDoItem = clickedGrandparent.parentElement;

    if (clickedIcon.id === 'checkboxIcon') {
        completeToDoItem(clickedToDoItem, clickedIcon);
    } else if (clickedIcon.id === 'prioritiseIcon') {
        prioritiseToDoItem(clickedToDoItem, clickedIcon);
    } else if (clickedIcon.id === 'editIcon') {
        if (clickedToDoItem.classList.contains('item-complete')) {
            // Nothing happens
        } else {
            targetItem = clickedToDoItem;
            itemToEdit = clickedToDoItem.querySelector('.content-text--to-do');
            openEditItemModal();
        }
    } else if (clickedIcon.id === 'removeIcon') {
        targetItem = clickedToDoItem;
        openDeleteItemModal();
    }
}

document.addEventListener('click', checkClickedIcon);



// ---------- 📝 'Settings' Inner Modal 📝 --------------
const settingsInnerModal = document.querySelector('.settings-inner-modal');
const settingsInnerContainer = document.querySelector('.settings-inner-container');
const settingsModalBox = document.querySelector('.settings-inner-container--box');

const modalCloseBtn = document.querySelectorAll('.close-inner-modal-container');
const modalCancelBtn = document.querySelectorAll('.modal-cancel-btn');


const smallModalHeader = document.getElementById('smallModalHeader');
const smallModalP1 = document.getElementById('smallModalP1');
const smallModalP2 = document.getElementById('smallModalP2');
const smallModalInput = document.getElementById('smallModalInput');
const smallModalBtnMain = document.getElementById('smallModalBtnMain');

function openSettingsInnerModal() {
    console.log("B");
    settingsInnerModal.style.display = 'flex';
    settingsInnerContainer.style.display = 'flex';
    settingsInnerContainer.classList.add('active');

    // Close modal on outside click
    if (settingsInnerContainer.classList.contains('active')) {
        settingsInnerContainer.addEventListener('click', (e) => {
            const clicked = e.target;

            if (clicked.classList.contains('settings-inner-container')) {
                closeSettingsInnerModal();
            }
        });
    }

    //settingsModal.classList.remove('settings-modal-active');
}

function closeSettingsInnerModal() {
    settingsInnerModal.style.display = 'none';
    settingsInnerContainer.style.display = 'none';
    settingsInnerContainer.classList.remove('active');
    smallModalInput.value = '';

    //settingsModal.classList.add('settings-modal-active');
}

modalCloseBtn.forEach((closeBtn) => {
    closeBtn.addEventListener('click', closeSettingsInnerModal);
});

modalCancelBtn.forEach((cancelBtn) => {
    cancelBtn.addEventListener('click', closeSettingsInnerModal);
});


// Submit decision on click
smallModalBtnMain.addEventListener('click', () => {
    if (settingsModalBox.classList.contains('edit-username-active')) {
        // Change Username
        if (smallModalInput.value != '') {
            username = smallModalInput.value;
            //recentActivityType = 'edit-username';
            //recentActivityItem = smallModalInput.value;
            closeSettingsInnerModal();
        }
    } else if (settingsModalBox.classList.contains('edit-list-name-active')) {
        // Change List Name
        if (smallModalInput.value != '') {
            listName = smallModalInput.value;
            //recentActivityType = 'edit-list-name';
            //recentActivityItem = smallModalInput.value;
            closeSettingsInnerModal();

        }
    } else if (settingsModalBox.classList.contains('reset-list-active')) {
        // Reset List
        resetList();
    } else if (settingsModalBox.classList.contains('add-to-do-active')) {
        // Add Item to List (Small Screen)
        if (smallModalInput.value !== '') {
            addToDo();
        }
    } else if (settingsModalBox.classList.contains('edit-item-active')) {
        if (smallModalInput.value != '') {
            // Edit Item
            itemToEdit.textContent = smallModalInput.value;

            settingsModalBox.classList.remove('edit-item-active');
            closeSettingsInnerModal();
        }
    } else if (settingsModalBox.classList.contains('delete-item-active')) {
        // Delete Item
        if (targetItem.classList.contains('item-priority')) {
            if (targetItem.classList.contains('item-complete')) {
                // Nothing happens
            } else {
                listedTodos--;
                prioritisedTodos--;
            }
        } else if (targetItem.classList.contains('item-complete')) {
            // Nothing happens
        } else {
            listedTodos--;
        }

        targetItem.remove();
        toDos--;
        closeSettingsInnerModal();
        checkListedToDos();
    }
});