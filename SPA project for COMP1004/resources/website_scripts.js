// JavaScript source code

//---JSON HANDLER---//
class JSONhandler {

    constructor() {

        //cleaner than before
        this.fileUpload();

    }

    //method to handle file uploads
    fileUpload() {

        document.getElementById('fileInput').addEventListener('change', function (event) {

            const file = event.target.files[0];

            if (file && file.type == "application/json") {

                this.readJSON(file);

            }

        }.bind(this));

    }

    //moved from home.html, JSON upload handling
    readJSON(file) {

        localStorage.removeItem('locomotives');

        const reader = new FileReader();

        reader.onload = event => {

            const data = JSON.parse(event.target.result);

            localStorage.removeItem('locomotives')

            var string = JSON.stringify(data);

            localStorage.setItem('locomotives', string);

            //creates the table
            this.createTable();

        };

        reader.readAsText(file);

        fileInput.value = '';

    }

    //pushes a new object onto the JSON array, or creates one if one does not already exist in localStorage and the user does not provide a path to a JSON file
    #push(x) {

        console.clear();

        var retrieved = localStorage.getItem('locomotives');

        if (/*localStorage.getItem('locomotives')*/ retrieved !== null) {

            //retrieves the JSON array
            //var retrieved = localStorage.getItem('locomotives');

            var parsed = JSON.parse(retrieved);

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

            //only fulfilled if JSON file not provided, allows the user to create a fresh file

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

    //moved from home.html, locomotive form input handling
    locoFormHandler() {

        //to control the display of the div tag which displays messages
        var msg = document.getElementById('imageMsgBox');

        msg.style.display = "none";

        let imageID = '';

        //resets the base64 encoded string variable
        var imageData = '';

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

                    locoAddress = locoAddress.padStart(4, '0');

                    console.log(locoAddress);

                }

                //this ensures the address conforms to NEM length standards by following the 'first two, last two' locomotive addressing rule
                //the form already has a max attribute but this prevents users from bypassing it to input invalid data
                if (locoAddress.length > 4) {

                    locoAddress = locoAddress.slice(0, 2) + locoAddress.slice(-2);

                    console.log(locoAddress);

                }

                //formatting to push a JSON object onto the array
                var formJSON = {

                    image: null,
                    address: locoAddress,
                    name: locoName,
                    number: locoNumber

                };

                //lack of image input
                if (!imageData) {

                    imageID = '';

                    //0 will let the createTable function know to display a placeholder image
                    formJSON.image = '0';

                    var string = JSON.stringify(formJSON);

                    this.#push(formJSON);

                    this.createTable();

                } else {

                    imageID = '';

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

                        this.#push(formJSON);

                        this.createTable();

                        imageData = '';

                    }.bind(this);

                }

            }

            //clears the number and string input fields
            form.reset();

            //clears the image input button
            const imageForm = document.getElementById('imageInput');

            imageForm.value = '';

        }.bind(this));

    }

    //method to download the list as a new file
    downloadList() {

        const msgBox = document.getElementById('downloadMsgBox');

        //checks if there's anything in localStorage before proceeding to prevent errors
        if (localStorage.getItem('locomotives') !== null) {

            var parseForLengthCheck = JSON.parse(localStorage.getItem('locomotives'));

            if (parseForLengthCheck.locos.length > 1) {

                msgBox.style.display = "none";

                var retrieved = localStorage.getItem('locomotives');

                //this is somewhat unnecessary as it only helps with formatting the JSON
                var jsonFormatted = JSON.stringify(JSON.parse(retrieved), null, 2);

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

    //method to delete a row on the table by altering the contents of localStorage
    #deleteRow(index) {

        //retrieves and parses the contents of localStorage
        var retrieve = localStorage.getItem('locomotives');

        var parsedObject = JSON.parse(retrieve);

        //removes the item at the current index of local storage since the table is created from the contents of localStorage
        parsedObject.locos.splice(index, 1);

        //appends localStorage
        localStorage.setItem('locomotives', JSON.stringify(parsedObject));

        //refreshes the table
        this.createTable();

    }


    createTable() {

        const placeholder = 'resources/images/placeholder.jpg';

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

                Object.keys(item).forEach((key) => {

                    let cell = row.insertCell();

                    if (key === "image") {

                        let img = document.createElement('img');

                        img.style.width = "80%"; // Adjust as needed

                        img.style.height = "auto";

                        img.style.borderRadius = "0px";

                        //only attempt to fetch an image if item.image is valid
                        if (item.image !== null && item.image !== '0') {

                            const dbRequest = indexedDB.open('ImageDB', 1);
                            dbRequest.onsuccess = function (event) {

                                const db = event.target.result;

                                const transaction = db.transaction('images', 'readonly');

                                const store = transaction.objectStore('images');

                                //item.image is used as the key
                                const getRequest = store.get(item.image);

                                getRequest.onsuccess = function () {

                                    if (getRequest.result) {

                                        const imageData = getRequest.result.data;

                                        //check if imageData is a valid base64 string or URL
                                        if (imageData && imageData.startsWith('data:image')) {

                                            //set image source
                                            img.src = imageData;

                                        } else {

                                            //uses placeholder if the stored data is not valid
                                            img.src = placeholder;

                                        }

                                    } else {

                                        //uses placeholder if no image is found
                                        img.src = placeholder;

                                    }

                                };

                                //error handling
                                getRequest.onerror = function () {

                                    //uses placeholder if the request returns an erro
                                    img.src = placeholder;

                                };

                            };

                            dbRequest.onerror = function () {

                                //uses placeholder if the database is inaccessible
                                img.src = placeholder;

                            };

                        }

                        //prevents the constant index 0 object from appearing in the table
                        if (item.image === null) {

                            img = null; // No image element is created

                        }

                        //differentiates between intentionally null and lack of user image input
                        if (item.image === '0') {

                            img.src = placeholder;

                            //placeholder.jpg has different proportions so it is smaller

                            img.style.width = "30%";

                            img.style.height = "auto";

                            img.style.border = "none";

                        }

                        if (img) {

                            //only append the cell if an image is present
                            cell.appendChild(img);

                        }

                    } else {

                        //prevents other cells from being cleared
                        cell.textContent = item[key];

                    }

                });

                if (index > 0) {

                    //prevents a delete button being generated for index 0
                    let deleteCell = row.insertCell();

                    let deleteButton = document.createElement('button');

                    deleteButton.textContent = "Delete";
                    deleteButton.onclick = function () {

                        this.#deleteRow(index);

                    }.bind(this);

                    deleteCell.appendChild(deleteButton);

                }

            });

            //append the table to the HTML document
            container.appendChild(table);

        }

    }

}

//-----CREATE JSON HANDLER CLASS OBJECT-----//

//ensures the definition is global
let JSONhandleClass;

//creates an alias for JSONhandler() only after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    JSONhandleClass = new JSONhandler();
    JSONhandleClass.createTable();
});

//-----HANDLES ALTERING CONTENT-----//
class changeContent {

    //method to switch between div tags
    switchscreen(current) {

        const elements = document.querySelectorAll('.content');

        elements.forEach(element => {

            element.style.display = "none";

        });

        const active = document.getElementById(current);

        active.style.display = "block";

    }

    //method to hide the message boxes by pressing an acknowledge button
    acknowledgeMSG(current) {

        const active = document.getElementById(current);

        active.style.display = "none";

    }

    //method to switch between light and dark mode
    switchTheme(active) {

        if (localStorage.getItem('theme') == null) {

            //sets to light by default
            localStorage.setItem('theme', 'Light');

        } else if (localStorage.getItem('theme') !== null) {

            var getTheme = localStorage.getItem('theme');

            if (getTheme == 'Light') {

                console.log('Light');

                localStorage.setItem('theme', 'Dark');

                document.querySelectorAll('div').forEach(div => {

                    div.style.color = '#FFFFFF';

                    div.style.backgroundColor = '#212121';

                });

            } else if (getTheme == 'Dark') {

                console.log('Dark');

                localStorage.setItem('theme', 'Light');

                document.querySelectorAll('div').forEach(div => {

                    div.style.color = '#000000';

                    div.style.backgroundColor = '#FFFFFF';

                });

            }

        }

    }

}

//-----STANDALONE FUNCTIONS-----//

//creates the table from localStorage


//moved from home.html, refreshes the SPA on load/reload
function refresh() {

    localStorage.removeItem('locomotives');

    document.addEventListener("DOMContentLoaded", () => {

        JSONhandleClass.createTable();

        //also sets the theme based on the current contents of 'theme' in localstorage
        if (localStorage.getItem('theme') == null) {

            localStorage.setItem('theme', 'Light');

        } else if (localStorage.getItem('theme') == 'Dark') {

            document.querySelectorAll('div').forEach(div => {

                div.style.color = '#FFFFFF';

                div.style.backgroundColor = '#212121';

            });

        } else if (localStorage.getItem('theme') == 'Light') {

            document.querySelectorAll('div').forEach(div => {

                div.style.color = '#000000';

                div.style.backgroundColor = '#FFFFFF';

            });

        }

    });

}
