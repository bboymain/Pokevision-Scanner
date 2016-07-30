

var disabledPokemons = [];
var coordinates = [];
var startInterval;

var myContainer = document.createElement("div");

var myText = document.createElement("div");
myText.innerHTML = "Click on the Map and then on the 'add' button to add a specific coordinate." + "<br>" +
    "You can add as many as you want. After adding all of your coordinates press 'Start seaching'." + "<br>" +
    "Now lay back and and it scanns every 33 seconds at another coordinate, this loops infinite.";

$(myContainer).append(myText);

var buttonStart = document.createElement("button");
buttonStart.id = "buttonAdd";
buttonStart.innerText = "Start searching";
buttonStart.onclick = function () {
    if (coordinates.length > 0) {
        myTextScanning.innerHTML = "Now scanning, lay back...";
        App.home.markers.center = L.marker({lat: coordinates[0][0], lng: coordinates[0][1]}).addTo(App.home.map);

        App.home.findNearbyPokemon(coordinates[0][0], coordinates[0][1], true);
        console.log("started...");
        startInterval = setInterval(updatePokemon, 33000);
    }
    else {
        alert("Please add coordinates");
    }
};

$(myContainer).append(buttonStart);

var buttonStop = document.createElement("button");
buttonStop.id = "buttonAdd";
buttonStop.innerText = "Stop searching";
buttonStop.onclick = function () {
    myTextScanning.innerHTML = "You stopped scanning...";
    clearInterval(startInterval);
    counterIndex = 1;

};
$(myContainer).append(buttonStop);

var myTextScanning = document.createElement("div");
myTextScanning.innerHTML = "";
$(myContainer).append(myTextScanning);

var linebreak = document.createElement("br");
$(myContainer).append(linebreak);

var buttonAdd = document.createElement("button");
buttonAdd.id = "buttonAdd";
buttonAdd.innerText = "Add";
buttonAdd.onclick = function () {
    addCoordinates()
};
$(myContainer).append(buttonAdd);

var buttonDelete = document.createElement("button");
buttonDelete.id = "buttonAdd";
buttonDelete.innerText = "Delete";
buttonDelete.onclick = function () {
    deleteCoordinates()
};
$(myContainer).append(buttonDelete);

var linebreak = document.createElement("br");
$(myContainer).append(linebreak);

var selectMenu1 = document.createElement("select");
selectMenu1.id = "select1";

var defaultOption = document.createElement("option");
defaultOption.innerText = "No coordinates entered";

$(selectMenu1).append(defaultOption);
$(myContainer).append(selectMenu1);


$(".home-sidebar").prepend(myContainer);


$(myContainer).after("<br>");


function addCoordinates() {
    $(defaultOption).remove();

    var lat = Number(window.location.href.split("@")[1].split(",")[0]);
    var lon = Number(window.location.href.split("@")[1].split(",")[1]);

    var newArray = [lat, lon];
    coordinates.push(newArray);

    var newOption = document.createElement("option");
    newOption.innerText = lat + ", " + lon;
    $(selectMenu1).append(newOption);
    $('#select1 option:last-child').attr('selected', 'selected');
}

function deleteCoordinates() {
    var lat = Number($('#select1 option:selected').val().split(",")[0]);
    var lon = Number($('#select1 option:selected').val().split(",")[1]);
    for (var i = 0; i < coordinates.length; i++) {
        console.log("hi1");
        if (coordinates[i][0] == lat && coordinates[i][1] == lon) {
            coordinates.splice(i, 1);
            break;
        }
    }
    $('#select1 option:selected').remove();
    if ($('#select1 > option').length == 0) {
        $(selectMenu1).append(defaultOption);
    }
}


var counterIndex = 1;

function updatePokemon() {
    if (counterIndex >= coordinates.length) {
        counterIndex = 0;
        console.log("entered...");
    }
    $(".leaflet-marker-pane > img").remove();
    $(".leaflet-shadow-pane > img").remove();

    App.home.markers.center = L.marker({
        lat: coordinates[counterIndex][0],
        lng: coordinates[counterIndex][1]
    }).addTo(App.home.map);

    App.home.findNearbyPokemon(coordinates[counterIndex][0], coordinates[counterIndex][1], true);

    counterIndex = counterIndex + 1;

}





var hiddenPokemon = [6, 10, 11, 28, 37, 43, 44, 63, 67, 80, 97, 98, 100, 101, 102, 111, 114, 115, 122, 128, 137, 138, 145, 150];

for(var i = 0; i < hiddenPokemon.length; i++){
$("li[data-original-index=" + hiddenPokemon[i] + "] a").click();
}
