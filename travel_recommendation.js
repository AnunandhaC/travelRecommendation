const search = document.getElementById('search');
const clear=document.getElementById('clear')

function recommend() {

    const place = document.getElementById('places').value.toLowerCase().trim();
    const results = document.getElementById('results'); // correct id

    if (place === "") {
        alert("Enter a place");
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            results.innerHTML = "";

            if (place === "beach" || place === "beaches") {

                data.beaches.forEach(beach => {
                    results.innerHTML += `
                        <div class="card">
                            <img src="${beach.imageUrl}">
                            <h3>${beach.name}</h3>
                            <p>${beach.description}</p>
                            <button class="visit">Visit</button>
                    
                        </div>
                    `;
                });

            }
             else if (place === "temple" || place === "temples") {

                data.temples.forEach(temple => {
                    results.innerHTML += `
                        <div class="card">
                            <img src="${temple.imageUrl}" width="250">
                            <h3>${temple.name}</h3>
                            <p>${temple.description}</p>
                            <button class="visit">Visit</button>
                        </div>
                    `;
                });
            }
            else if (place === "country" || place === "countries") {

                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        results.innerHTML += `
                            <div class="card">
                                <img src="${city.imageUrl}" width="250">
                                <h3>${city.name}</h3>
                                <p>${city.description}</p>
                                <button class="visit">Visit</button>
                            </div>
                        `;
                    });
                });
            }

            else {
                results.innerHTML = "<h3>No recommendations found</h3>";
            }

        });
}

function clears(){
    const results = document.getElementById('results');
    results.innerHTML=""
    const place = document.getElementById('places')
    place.value=""
}

search.addEventListener('click', recommend);
clear.addEventListener('click', clears);