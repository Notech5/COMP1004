// JavaScript source code


import data from './resources/locos.json' with { type: 'json' };
console.log(data);


function displayTable(data) {
    // Get the container element where the table will be displayed
    const container = document.getElementById('table_container');

    container.innerHTML = "";

    // Create a table element
    const table = document.createElement('table');
    /*table.classList.add('locomotive-table'); // Optional: Add a class for styling*/

    // Create the table header
    const header = table.createTHead();
    const headerRow = header.insertRow();
    // Add header cells based on the keys in the first object of the JSON data
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });

    // Create the table body and add rows for each locomotive in the JSON data
    const body = table.createTBody();
    data.forEach(loco => {
        const row = body.insertRow();
        Object.values(loco).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });

    // Append the table to the container
    container.appendChild(table);
}

// Call the function to display the table with the data
displayTable(data);



// Add the new locomotive and update the table
















//simple function to toggle content

function switchDiv() {

    //x gets the div tag with the id 'home'
    var x = document.getElementById('home');

    if (x.style.display === "none") {

        x.style.display = "block";

    } else {

        x.style.display = "none";

    }

    //y gets the div tag with the id 'class180'
    var y = document.getElementById("class180");

    if (y.style.display === "none") {

        y.style.display = "block";

    } else {

        y.style.display = "none";

    }

}

//function which selects all div elements, checks their id, and sets the style.display attribute to 'none' for all div elements whose id is not 'home'
function home() {

    var x = document.getElementById("home");

    const homeID = 'home';

    const elements = document.querySelectorAll('div');

    elements.forEach(element => {

        if (element.id != homeID) {

            element.style.display = "none";

            x.style.display = "block";

        }

    });

}









