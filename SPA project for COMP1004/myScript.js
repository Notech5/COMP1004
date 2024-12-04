// JavaScript source code


//simple function to toggle content
function myFunction() {

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