// JavaScript source code

//---JSON FUNCTIONS---//

//Accesses and reads the JSON file, and then creates the table


//new readJSON function which makes use of fileReader
function readJSON(file) {

    localStorage.clear();

    const reader = new FileReader();

    reader.onload = event => {

        const data = JSON.parse(event.target.result);
        storage(data);  // Store the data
        createTable();  // Create the table with the data

    };

    reader.readAsText(file);

}




//the original readJSON function which used the fetch command

/*
function readJSON(x) {

    console.clear();

    fetch(x)
        .then(response => response.json())
        .then(data => {

            //delete data.locos[1];

            //delete data.locos[4];

            //for debugging
            console.log(data)

            //for debugging
            console.log(data.locos.length);

            //function to store the data in localstorage after reading it from the file
            storage(data);

            //creates the table after JSON read
            createTable();

        })

        .catch(error => console.error('Error loading JSON:', error));

}
*/





function createTable() {

    if (localStorage.length > 0) {
        //retrieved loco data from localStorage 
        var retrieveLocos = localStorage.getItem('locomotives');
        var parsedObject = JSON.parse(retrieveLocos);
        const data = parsedObject.locos;

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
}



//---SWITCH FUNCTIONS---//

//Switches to the home div
function home() {

    switchscreen('home');

}

//Switches to the class180 div
//not used
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

//---LOCALSTORAGE AND JSON HANDLING---//

//reads data from the JSON file and stores it in localStorage
function storage(data) {

    //only stores the data if localstorage is empty to prevent erasure of user data
    if (localStorage.length == 0) {

        localStorage.clear();

        var string = JSON.stringify(data);

        localStorage.setItem('locomotives', string);

        //debugging code
        var testRetrieve = localStorage.getItem('locomotives');

        var parsedObject = JSON.parse(testRetrieve);

        console.log(parsedObject.locos[1]);

    }

}

//pushes a new object onto the JSON array, or creates one if one does not already exist in localStorage and the user does not provide a path to a JSON file
function push(x) {

    console.clear();

    if (localStorage.length != 0) {

        //retrieves the JSON array
        var retrieve = localStorage.getItem('locomotives');
        var parsed = JSON.parse(retrieve);

        //for debugging
        console.log(parsed);

        let newObject = x;

        //pushes the new object
        parsed.locos.push(newObject);

        //for debugging
        console.log(parsed);

        //updates localstorage
        var store = JSON.stringify(parsed);
        localStorage.setItem('locomotives', store);


    } else {

        /* 
        
        This condition will be fulfilled if the user does not provide a JSON file

        This will allow the user to create an entirely new list using localStorage which can then be downloaded as a JSON file without the user having to select a file,
        allowing the program to both edit existing lists AND create entirely new ones

        */

        //creates the array
        var newArray = {

            locos: []

        };

        //creates an index zero for the locos array so that the createtable function doesn't break (it needs at least one object to be present in the array at all times)
        var indexZero = {

            address: null,
            name: null,
            number: null
            
        }

        newArray.locos.push(indexZero);

        /*
        var string = JSON.stringify(newArray);
        
        localStorage.setItem('locomotives', string);

        var retrieve = localStorage.getItem('locomotives');
        var parsed = JSON.parse(retrieve);
        */

        //for debugging
        console.log(newArray);

        let newObject = x;

        //pushes the new object
        newArray.locos.push(newObject);

        //for debugging
        console.log(newArray);

        //updates localstorage
        var store = JSON.stringify(newArray);
        localStorage.setItem('locomotives', store);

    }

}

//---OLD CODE---//

/*
const form = document.getElementById('myForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // 1: get form data
    const formData = new FormData(form);
    // 2: store form data in object
    const jsonObject = Object.fromEntries(formData);
    // 3: convert form data object to a JSON string
    const jsonString = JSON.stringify(jsonObject);

    console.log(jsonString); // '{"name":"John","email":"john@example.com","age":"30"}'
});

*/

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


//Creates the table
/*
function createTable(data) {

    //checks if there is no array
    if (!Array.isArray(data.locos)) {

        console.log("Error: This is not an array")

    }

    //checks if there is no data present
    if (Array.isArray(data) && data.length === 0) {

        console.log("Error: No data present")

    }

    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');

    // Append the table head and body to the table
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    // Creating table head
    let row = tableHead.insertRow();
    Object.keys(data.locos[0]).forEach(key => {
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

    const container = document.getElementById('table-container');

    // Append the table to the HTML document
    
}
*/



