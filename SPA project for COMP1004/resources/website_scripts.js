// JavaScript source code

//---JSON FUNCTIONS---//

/*
readJSON accesses and reads the contents of the JSON file,
then stores its contents in localStorage where they can be
manipulated
*/
function readJSON(file) {

    localStorage.removeItem('locomotives');

    const reader = new FileReader();

    reader.onload = event => {

        const data = JSON.parse(event.target.result);

        localStorage.removeItem('locomotives')

        var string = JSON.stringify(data);

        localStorage.setItem('locomotives', string);



        //storage(data);  //store the data
        createTable();  //create the table with the data


        const nameLabel = document.querySelector('label[for="fileInput"]');

        console.log(nameLabel);

        //nameLabel.textContent = 'File Loaded: ' + fileInput.files[0].name;

    };

    reader.readAsText(file);

    fileInput.value = '';

}

//creates the table from localStorage
function createTable() {

    //checks if there's a key 'locomotives' in localStorage before proceeding to prevent errors
    if (localStorage.getItem('locomotives') !== null) {

        //retrieved loco data from localStorage
        var retrieveLocos = localStorage.getItem('locomotives');
        var parsedObject = JSON.parse(retrieveLocos);
        const data = parsedObject.locos;

        const container = document.getElementById('table-container');
       
        container.innerHTML = "";

        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');

        //append the table head and body to table
        table.appendChild(tableHead);
        table.appendChild(tableBody);

        //creating table head
        let row = tableHead.insertRow();
        Object.keys(data[0]).forEach(key => {

            let th = document.createElement('th');
            th.textContent = key.toUpperCase();
            row.appendChild(th);

        });

        //creating table body
        data.forEach((item, index) => {

            let row = tableBody.insertRow();
            Object.values(item).forEach(value => {
                let cell = row.insertCell();
                cell.textContent = value;

            });


            if (index > 0) {

                let deleteCell = row.insertCell();
                let deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";

                //deleteButton.classList.add('delete-btn');
                deleteButton.onclick = function () {

                    deleteRow(index);

                };

                deleteCell.appendChild(deleteButton);

            }


        });

        //append the table to the HTML document
        container.appendChild(table);

    }

}

//function to delete a row on the table by altering the contents of localStorage
function deleteRow(index) {

    //retrieves and parses the contents of localStorage
    var retrieve = localStorage.getItem('locomotives');
    var parsedObject = JSON.parse(retrieve);

    //removes the item at the current index of local storage since the table is created from the contents of localStorage
    parsedObject.locos.splice(index, 1);

    //appends localStorage
    localStorage.setItem('locomotives', JSON.stringify(parsedObject));

    //refreshes the table
    createTable();

}

//---LOCALSTORAGE AND JSON HANDLING---//

//reads data from the JSON file and stores it in localStorage
function storage(data) {

    //only stores the data if localstorage is empty to prevent erasure of user data
    if (localStorage.getItem('locomotives') == null) {

        localStorage.removeItem('locomotives');

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

    if (localStorage.getItem('locomotives') !== null) {

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
        This condition will only be fulfilled if the user does not provide a JSON file

        This will allow the user to create an entirely new list using localStorage which can then be downloaded as a JSON file without the user having to select a file,
        allowing the program to both edit existing lists AND create entirely new ones
        */

        //creates the array
        var newArray = {

            locos: []

        };

        //ensures the array always has at least 1 object
        var indexZero = {

            image: null,
            address: null,
            name: null,
            number: null
              
        }

        //finishes setting up the formatting
        newArray.locos.push(indexZero);

        //for debugging
        console.log(newArray);

        //pushes the new object
        newArray.locos.push(x);

        //for debugging
        console.log(newArray);

        //updates localstorage
        var store = JSON.stringify(newArray);
        localStorage.setItem('locomotives', store);

    }

}

//function to download the list as a new file
function downloadList() {

    const msgBox = document.getElementById('downloadMsgBox');

    //checks if there's anything in localStorage before proceeding to prevent errors
    if (localStorage.getItem('locomotives') !== null) {

        var retrieved = localStorage.getItem('locomotives');
        //var string = JSON.stringify(retrieved);

        var parseForLengthCheck = JSON.parse(retrieved);

        if (parseForLengthCheck.locos.length > 1) {


            msgBox.style.display = "none";

            //this is somewhat unnecessary as it only helps with formatting the JSON
            jsonFormatted = JSON.stringify(JSON.parse(retrieved), null, 2);

            const blob = new Blob([jsonFormatted], { type: "application/json" });

            const link = document.createElement('a');

            //set the download attribute with a filename
            link.download = 'Locomotive-List.json';

            //create a URL for the Blob and set it as the href attribute
            link.href = window.URL.createObjectURL(blob);

            //append the link to the body (required for Firefox)
            document.body.appendChild(link);

            //programmatically click the link to trigger the download
            link.click();

            //remove the link from the document
            document.body.removeChild(link);

        } else {

            msgBox.style.display = "block";

        }

    //if there's nothing in localStorage it will let the user know they cannot download the list
    } else {

        msgBox.style.display = "block";

    } 

}


function theme() {

    localStorage.setItem('theme', 'Light');

}

//---SWITCH FUNCTIONS---//

//switches to the home div
function home() {

    switchscreen('home');

}

//switches to the class180 div
//not used
function class180() {

    switchscreen('class180');

}

//switches to the file upload screen div
function fileScreen() {

    switchscreen('uploadScreen');

}

//switches to the json list div
function listScreen() {

    switchscreen("ListScreen");

}

//function to switch between div tags
function switchscreen(current) {

    const elements = document.querySelectorAll('.content');

    elements.forEach(element => {

        element.style.display = "none";

    })

    const active = document.getElementById(current);

    active.style.display = "block";

}


























//-----OLD CODE-----//

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




//-----OLD CODE FROM HOME.HTML-----//

//this is the old code which allowed the user to define the path to the file

/*
const form2 = document.getElementById('JSONPath');

form2.addEventListener('submit', function (event) {
    event.preventDefault();

    var path = document.getElementById('pathInput').value;

    //checks if the field is empty

    if (path == '') {

        const element = document.getElementById('message-box');

        element.style.display = "block";

    } else if (path != '') {

        const cleartable = document.getElementById('table-container');
        cleartable.innerHTML = "";

        localStorage.removeItem('locomotives');

        readJSON(path);

        createTable();

        const element = document.getElementById('message-box');

        element.style.display = "none";

    }

});
*/

/*
< !---
    <div id="message-box" style="display:none">

        <p>Please enter a valid path</p>

    </div>
--->


        < !---
        <form id="JSONPath">

            <label for="nameInput">JSON file path:</label><br>
            <input type="text" id="pathInput" name="name" /><br />

            <button type="submit">Submit</button>
        </form><br />
-->
*/