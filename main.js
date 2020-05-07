function addToTracker() {
    // Get Values from input fields
    const reason = document.getElementById('reason');
    const price = document.getElementById('price');

    if(reason.value === '' || price.value === '') {
        setOutput('Expense could not be added!<br /> Check if inputs are filled out...', false);
        return;
    }

    // Create TR element to append on table
    const element = document.createElement('tr');

    element.innerHTML = `
    <th>${reason.value}</th>
    <th>${price.value}€</th>
    <th><button class="delete" onclick="removeFromTracker()">X</button></th>
    `;
    document.getElementById('tbody').appendChild(element);

    // Update how much money is left for the month
    const left = document.querySelector('.left').firstElementChild;
    left.innerHTML = 'Left: ' + (parseInt(left.innerHTML.split(':')[1]) - price.value) + '€';

    //Send notification message to output element
    setOutput('You have sucessfully added a new expense!', true);

    // reset input forms
    document.getElementById('forms').reset();

}

function removeFromTracker() {
    // Removes your expense from the tracker
    const deleteBtn = document.querySelector('.delete');

    const tr = deleteBtn.parentNode.parentNode;
    const table = tr.parentNode;

    const price = parseInt(tr.firstElementChild.nextSibling.nextSibling.innerHTML.split('€')[0]);

    table.removeChild(tr);
    
    const left = document.querySelector('.left').firstElementChild;
    left.innerHTML = 'Left: ' + (parseInt(left.innerHTML.split(':')[1]) + price) + '€';

    setOutput('You have sucessfully removed an expense!', true);
}

function setOutput(message, status) {
    const output = document.querySelector('.output');

    if (status) 
        output.setAttribute('class', 'sucessful output');
    else
        output.setAttribute('class', 'failed output');

    output.firstElementChild.innerHTML = message;
    setTimeout(() => output.firstElementChild.innerHTML = '', 3000);
}

// Create Click Event for add button
document.getElementById('add').addEventListener('click', addToTracker);