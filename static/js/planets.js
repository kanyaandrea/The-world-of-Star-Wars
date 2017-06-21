
window.onload = function() { 
    getPlanets(url);
    document.getElementById("nextbutton").addEventListener("click", function(){
        var url = document.getElementById("nextbutton").getAttribute("class");
        var table = document.getElementById("planets")
        table.innerHTML= ""
        getPlanets(url); // atribute from html button data-property which was added to the button in getPlanets() function
    });
    document.getElementById("previousbutton").addEventListener("click", function(){
        var url = document.getElementById("previousbutton").getAttribute("class");
        if (url = "null") {
            url = "http://swapi.co/api/planets";
            alert("No previous page.");
            main(url);  
        }
        var table = document.getElementById("planets")
        table.innerHTML= ""
        getPlanets(url); // atribute from html button data-property which was added to the button in getPlanets() function
    });
}


function getPlanets(url){
  // document.getElementById("button").addEventListener("click", function(){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) { // successful response
        var data = JSON.parse(request.responseText);
        var planetCount = data['count'];
        var nextPage = data.next;
        var nextButton = document.getElementById("nextbutton");
        nextButton.setAttribute("class", nextButton)
        var previousPage = data.previous;
        var previousButton = document.getElementById("previousbutton");
        previousButton.setAttribute("class", previousButton) //

        for (let i = 0; i < 10; i++) {
            var planetName = data['results'][i]["name"];
            var planetDiameter = data['results'][i]["diameter"];  //km
            var planetClimate = data['results'][i]["climate"];
            var planetTerrain = data['results'][i]["terrain"];
            var planetWaterPercent = data['results'][i]["surface_water"];
            var planetPopulation = data['results'][i]["population"];  //formatted way

            var row = document.createElement("tr")
            row.setAttribute("id", i);
            document.getElementById("mytable").appendChild(row);
            
            var cell = document.createElement("td");
            var text = document.createTextNode(planetName);
            row.appendChild(cell);
            cell.appendChild(text);
            
            var x = document.createElement("td");
            var t = document.createTextNode(planetDiameter);
            x.appendChild(t);
            document.getElementById(i).appendChild(x);

            var x = document.createElement("td");
            var t = document.createTextNode(planetClimate);
            x.appendChild(t);
            document.getElementById(i).appendChild(x);
            

            var x = document.createElement("td");
            var t = document.createTextNode(planetTerrain);
            x.appendChild(t);
            document.getElementById(i).appendChild(x);

            var x = document.createElement("td");
            var t = document.createTextNode(waterPercentage);
            x.appendChild(t);
            document.getElementById(i).appendChild(x);

            var x = document.createElement("td");
            var t = document.createTextNode(population);
            x.appendChild(t);
            document.getElementById(i).appendChild(x);
            }
        }
    }  
    request.send();
}








