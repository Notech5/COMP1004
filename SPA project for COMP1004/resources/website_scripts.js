// JavaScript source code

//---JSON FUNCTIONS---//

//Accesses and reads the JSON file, and then creates the table
function readJSON() {

    console.clear();

    fetch('C:/Users/noahm/Desktop/website project/resources/json/locos.json')
        .then(response => response.json())
        .then(data => {
            
            console.log(data)

            createTable(data.locos);

        })

        .catch(error => console.error('Error loading JSON:', error));

}

//Creates the table
function createTable(data) {

    const container = document.getElementById('table-container');

    container.innerHTML = "";

    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    // Append the table head and body to table
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    // Creating table head
    let row = tableHead.insertRow();
    Object.keys(data[0]).forEach(key => {
        let th = document.createElement('th');
        th.textContent = key.toUpperCase();
        row.appendChild(th);
    });

    // Creating table body
    data.forEach(item => {
        let row = tableBody.insertRow();
        Object.values(item).forEach(value => {
            let cell = row.insertCell();
            cell.textContent = value;
        });
    });

    // Append the table to the HTML document
    container.appendChild(table);
    
}

//---SWITCH FUNCTIONS---//

//Switches to the home div
function home() {

    switchscreen('home');

}

//Switches to the class180 div
function class180() {

    switchscreen('class180');

}

//Switches to the file upload screen div
function fileScreen() {

    switchscreen('uploadScreen');

}

//Switches to the json list div
function listScreen() {

    switchscreen("ListScreen");
    
}

//Function to switch between div tags
function switchscreen(current) {

    const elements = document.querySelectorAll('.content');

    elements.forEach(element => {

        element.style.display = "none";

    })

    const active = document.getElementById(current);

    active.style.display = "block";

}









//---OLD CODE---//

/*
function fileScreen() {

    var x = document.getElementById("uploadScreen");

    const homeID = 'uploadScreen';

    const elements = document.querySelectorAll('div');

    elements.forEach(element => {

        if (element.id != homeID) {

            element.style.display = "none";

            x.style.display = "block";

        }

    });

}
*/

/*function class180() {

    var x = document.getElementById("class180");

    const homeID = 'class180';

    const elements = document.querySelectorAll('div');

    elements.forEach(element => {

        if (element.id != homeID) {

            element.style.display = "none";

            x.style.display = "block";

        }

    });

}
*/


/*
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
*/


/*
function listScreen() {

    var x = document.getElementById("ListScreen");

    var y = document.getElementById("table-container");

    const homeID = 'ListScreen';

    const tableContainer = 'table-container';

    const elements = document.querySelectorAll('div');

    elements.forEach(element => {

        if (element.id != homeID && element.id != tableContainer) {

            element.style.display = "none";

        }

    });

    x.style.display = "block";

    y.style.display = "block";

}
*/

