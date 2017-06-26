
window.onload = function(){ 
    main('http://swapi.co/api/planets');
    nextPage();
    previousPage();
    modalBodyDelete();
}


function nextPage(){
    document.getElementById("next").addEventListener("click", function(){
        var url= document.getElementById("next").getAttribute("class");
        var table = document.getElementById("mytable");
        table.innerHTML=""
        main(url);   
    });
}


function previousPage(){
    document.getElementById("previous").addEventListener("click", function(){
        var url= document.getElementById("previous").getAttribute("class");
        var table = document.getElementById("mytable");
        table.innerHTML=""
        main(url);
    }); 
}


function modalBodyDelete(){
    $('#myModal').on('hidden.bs.modal', function() {
        var table = document.getElementById("modaltable");
        table.innerHTML=""
    });    
}


function nextAndPreviousPages(data){
    var nextUrl = data["next"];
    var nextbutton = document.getElementById("next");
    nextbutton.setAttribute("class", nextUrl);
    
    var prevUrl = data["previous"];
    var prevbutton = document.getElementById("previous");           
    prevbutton.setAttribute("class", prevUrl);
    /*if (prevUrl === null) {
        document.getElementById("previous").setAttribute("disabled","disabled");
    } 
    else {
        document.getElementById("previous").removeAttribute("disabled");
        }*/
}


function createTableWithData(data) {
    for (var i = 0; i < 10; i++) {              
    var planetName = data['results'][i]["name"];
    var planetDiameterRaw = data['results'][i]["diameter"];
    var planetDiameter = planetDiameterRaw + " km"
    var planetClimate = data['results'][i]["climate"];
    var planetTerrain = data['results'][i]["terrain"];
    var waterPercentage = data['results'][i]["surface_water"];
    var populationRaw = data['results'][i]["population"];
    function numberWithSpace(populationRaw) {
        return populationRaw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    var population = numberWithSpace(populationRaw)
    var row = document.createElement("tr")
    row.setAttribute("id", i);
    document.getElementById("mytable").appendChild(row);

    var planetData = [planetName, planetDiameter,planetClimate, planetTerrain, waterPercentage, population]
    for (let j = 0; j < planetData.length; j++){
        var cell = document.createElement("td");
        var text = document.createTextNode(planetData[j]);
        row.appendChild(cell);
        cell.appendChild(text);
        document.getElementById(i).appendChild(cell);
    }

    var residents = data['results'][i]["residents"];
    if (residents.length === 0){
        var cell = document.createElement("td");
        var text = document.createTextNode("No known residents");
        row.appendChild(cell);
        cell.appendChild(text);
        document.getElementById(i).appendChild(cell);
    }   
    else {
        var residentsButton = document.createElement("button");
        residentsButton.setAttribute("type", "button")
        residentsButton.setAttribute("class", "residentsbutton btn btn-default btn-md" )
        residentsButton.setAttribute("id", "modalbutton")
        residentsButton.setAttribute("data-toggle", "modal" )
        residentsButton.setAttribute("data-target", "#myModal" )
        residentsButton.setAttribute("adat", residents )

        var text = document.createTextNode(residents.length + " residents");
        row.appendChild(cell);
        residentsButton.appendChild(text)
        document.getElementById(i).appendChild(residentsButton);
        }                                  
    }       
}

function residentsListing() {
    var persons = this.getAttribute("adat");
    var allPersonsAsUrls = persons.split(",");
    //var listofnames = [];

    for (let UrlOfResident = 0; UrlOfResident < allPersonsAsUrls.length; UrlOfResident++) {                     
        let residentrequest = new XMLHttpRequest();
        var personsUrl = allPersonsAsUrls[UrlOfResident]
        residentrequest.open('GET', personsUrl, true);
        residentrequest.onload = function() {

            if (residentrequest.status >= 200 && residentrequest.status < 400) { // successful response
                var infoOfPersons = JSON.parse(residentrequest.responseText);
                var nameOfPerson = infoOfPersons["name"]
                var heightOfPersonraw = infoOfPersons["height"]
                var heightOfPerson = (heightOfPersonraw/100) + ' m'
                var massOfPersonRaw = infoOfPersons["mass"]
                function formatedMass(massOfPersonRaw) {
                    if (massOfPersonRaw !== "unknown") { 
                        return massOfPersonRaw + " kg"
                        console.log(massOfPersonRaw)

                    }
                    return massOfPersonRaw 
                }
                var massOfPerson = formatedMass(massOfPersonRaw)
                var skin_colorOfPerson = infoOfPersons["skin_color"]
                var hair_colorOfPerson = infoOfPersons["hair_color"]
                var eye_colorOfPerson = infoOfPersons["eye_color"]
                var birth_yearOfPerson = infoOfPersons["birth_year"]
                var genderOfPerson = infoOfPersons["gender"]
                
                var personData = [nameOfPerson, heightOfPerson, massOfPerson, skin_colorOfPerson, hair_colorOfPerson, eye_colorOfPerson, birth_yearOfPerson, genderOfPerson]
                var modalrow = document.createElement("tr");
                document.getElementById("modaltable").appendChild(modalrow);
                for (let k = 0; k < personData.length; k++){
                    var modalcell = document.createElement("td");
                    var modaltext = document.createTextNode(personData[k]);
                    modalrow.appendChild(modalcell);
                    modalcell.appendChild(modaltext);
                }
            }
        }
        residentrequest.send();
    }        
}


function main(url){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) { // successful response
            var data = JSON.parse(request.responseText);
            nextAndPreviousPages(data)
            createTableWithData(data)
           
            var array = document.getElementsByClassName("residentsbutton");
            for (let l = 0; l < array.length; l++) {
            array[l].addEventListener('click', residentsListing, false);                
            }
        }
    }
    request.send();
}
