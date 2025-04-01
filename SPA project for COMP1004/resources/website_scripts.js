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

        createTable();  //create the table with the data

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

//function to switch between light and dark theme
function switchTheme(active) {

    if (localStorage.getItem('theme') == null) {

        //sets to light by default
        localStorage.setItem('theme', 'Light');

    } else if (localStorage.getItem('theme') !== null) {

        var getTheme = localStorage.getItem('theme');

        if (getTheme == 'Light') {

            console.log('Light');

            localStorage.setItem('theme', 'Dark');

           //document.getElementById(active).setAttribute('style', 'color: #FFFFFF; background-color: #212121;')

           // document.getElementById(active).setAttribute('style', 'color: #FFFFFF;')

            document.querySelectorAll('div').forEach(div => {

                div.style.color = '#FFFFFF';
                div.style.backgroundColor = '#212121';

            });

        } else if (getTheme == 'Dark') {

            console.log('Dark');

            localStorage.setItem('theme', 'Light');

            //document.getElementById(active).setAttribute('style', 'color: #000000; background-color: #FFFFFF;')

            //document.getElementById(active).setAttribute('style', 'color: #000000;')

            document.querySelectorAll('div').forEach(div => {

                div.style.color = '#000000';
                div.style.backgroundColor = '#FFFFFF';

            });

        }

    }

}

//-----FORM HANDLERS-----/

//moved from home.html, locomotive form input handling
function locoFormHandler() {

    //to control the display of the div tag which displays messages
    var msg = document.getElementById('imageMsgBox');

    msg.style.display = "none";

    //resets the base64 encoded string variable
    var imageData = '';

    imageID = '';

    //filereader to input images
    document.getElementById('imageInput').addEventListener('change', function (event) {

        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = function (e) {

            //stores the base64 string in imageData
            imageData = e.target.result;

        };

        reader.readAsDataURL(file);

    });

    //locomotive name, number, and address form handling
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function (event) {

        event.preventDefault();

        //address handling
        var locoAddress = document.getElementById('addressInput').value;

        //gets the input number
        var locoNumber = document.getElementById('numberInput').value;

        //the form already has a min attribute but this prevents users from bypassing it to input invalid data
        if (locoNumber[0] == '-') {

            locoNumber = locoNumber.slice(1);

        }

        //prevents the user entering negative addresses by removing the - symbol
        //once again the form has a min attribute but this serves as an extra check
        if (locoAddress[0] == '-') {

            locoAddress = locoAddress.slice(1);

            console.log(locoAddress);

        }

        //name handling
        var locoName = document.getElementById('nameInput').value;

        //checks if the field is empty
        if (locoName == '') {

            locoName = 'N/A';

        }

        if (locoAddress !== '' && locoNumber !== '') {

            //pads the locomotive address with 0s to allow compatibility between long and short adresses within the list
            if (locoAddress.length < 4) {

                /*
                var zero = '0';
    
                var numOfZeros = 4 - locoAddress.length;
    
                locoAddress = zero.repeat(numOfZeros) + locoAddress;
                */

                locoAddress = locoAddress.padStart(4, '0');

                console.log(locoAddress);

            }

            //this ensures the address conforms to NEM length standards by following the 'first two, last two' locomotive addressing rule
            //the form already has a max attribute but this prevents users from bypassing it to input invalid data
            if (locoAddress.length > 4) {

                locoAddress = locoAddress.slice(0, 2) + locoAddress.slice(-2);

                console.log(locoAddress);

            }









            var formJSON = {

                image: null,
                address: locoAddress,
                name: locoName,
                number: locoNumber

            };

            //only triggered if the user inputs an image
            if (imageData == '') {

                imageID = '';
                //allows the user to add locos without choosing an image

                //0 will let the createTable function know to display a placeholder image
                formJSON.image = '0';

                var string = JSON.stringify(formJSON);

                push(formJSON);

                createTable();                

            } else {

                imageID = '';

                imageData = '';

                //generates a unique ID for the image
                imageID = Date.now().toString();

                const dbRequest = indexedDB.open('ImageDB', 1);
                dbRequest.onupgradeneeded = function (e) {

                    const db = e.target.result;

                    //checks if there is an existing store called images
                    if (!db.objectStoreNames.contains('images')) {

                        //creates one if no store is present
                        db.createObjectStore('images', { keyPath: 'id' });

                    }

                };

                //stores the image data and id, appends the image value of formJSON, then pushes it to localStorage and refreshes the table
                dbRequest.onsuccess = function (e) {

                    const db = e.target.result;

                    const store = db.transaction('images', 'readwrite').objectStore('images');

                    store.put({ id: imageID, data: imageData });

                    //store imageID in formJSON
                    formJSON.image = imageID;

                    console.log('Image saved with ID:', imageID);

                    var string = JSON.stringify(formJSON);

                    push(formJSON);

                    createTable();

                }

            }

        }

        //clears the number and string input fields
        form.reset();

        //clears the image input button
        imageForm = document.getElementById('imageInput');

        imageForm.value = '';

    });

}

//moved from home.html, JSON upload handling
function chooseJSON() {

    document.getElementById('fileInput').addEventListener('change', function (event) {

        const file = event.target.files[0];

        if (file) {

            readJSON(file);

        }

    });

}

//moved from home.html, refreshes the SPA on load/reload
function refresh() {

    localStorage.removeItem('locomotives');

    document.addEventListener("DOMContentLoaded", () => {

        createTable();
        localStorage.setItem('theme', 'Light');

    });

}

//function to hide the message boxes by pressing an acknowledge button
function acknowledgeMSG(current) {

    const active = document.getElementById(current);

    active.style.display = "none";

}

//---SWITCH FUNCTIONS---//

//function to switch between div tags
function switchscreen(current) {

    const elements = document.querySelectorAll('.content');

    elements.forEach(element => {

        element.style.display = "none";

    });

    const active = document.getElementById(current);

    active.style.display = "block";

}