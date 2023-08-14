const contentBox = document.getElementById("contentBox");
const modalContent = document.getElementById("modalContent");
const modalTitle = document.getElementById("modalTitle");
let stateTable = null; // cartoonsTable, countriesTable,creatorsTable

class Cartoon {
  constructor(
    name = null,
    numberOfSeasons = null,
    numberOfEpisodes = null,
    runningTime = null,
    countriesId = null,
    creatorsId = null,
    AiringStart = null,
    AiringEnd = null
    
  ) {
    this.name = name;
    this.numberOfSeasons = numberOfSeasons;
    this.numberOfEpisodes = numberOfEpisodes;
    this.runningTime = runningTime;
    this.countriesId = countriesId;
    this.creatorsId = creatorsId;
    this.AiringStart= AiringStart;
    this.AiringEnd = AiringEnd;

  }
}

class Country {
  constructor(
    name = null,
    
    
  ) {
    this.name = name;
    

  }
}

class Creator {
  constructor(
    name = null,
    
    
  ) {
    this.name = name;
    

  }
}

let editableCartoon = new Cartoon();
let editableCountry = new Country();
let editableCreator = new Creator();

let state = "view";
let selectedCartoonId = null;
let loadedCartoonId = null;
let selectedCountryId = null;
let loadedCountryId = null;
let selectedCreatorId = null;
let loadedCreatorId = null;

function getHome() {
    let htmlElement = `
      <h1>Home</h1>
      <p>This is the starting page. In the menu, you can select more options.</p>
      `;
  
    contentBox.innerHTML = htmlElement;
  }
  
function getAbout() {
    let htmlElement = `
      <h1>About</h1>
      <p>This page is about cartoons and more interesting programming facts. This is for a project.</p>

      `;
    contentBox.innerHTML = htmlElement;
  }
  
function getContact() {
    let htmlElement = `
      <h1>Contact</h1>
      <p>E-mail: borosuveg6@gmail.com <br> Discord: janesz315 #2378</p>
      `;
  
    contentBox.innerHTML = htmlElement;
  }

async function getTable() {
    state = "view";
    stateTable = "cartoonsTable";
    //lekérjük az adatokat
    const url = "http://localhost:3000/cartoons";
    const response = await fetch(url);
    const data = await response.json();
    const cartoons = data.data;
    
  
  
    //vizualizáljuk
    let htmlElement = `
      <table class="table table-striped table-hover table-bordered w-auto">
          <thead>
              <tr>
                  <th>
                      <button type="button" class="btn btn-outline-success btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickNewButton()"
                      >
                          Add a cartoon!
                      </button>
                  </th>
                  <th>Name</th>
                  <th>Number of seasons</th>
                  <th>Number of episodes</th>
                  <th>Running time</th>
                  <th>Airing start</th>
                  <th>Airing end</th>
                  <th>Country name</th>
                  <th>Creator name</th>
                </tr>
          </thead>
          <tbody>
  
      `;
    //ciklus
    for (const cartoon of cartoons) {
     
      htmlElement += `
              <tr>
                  <td class="text-nowrap">
                      <button type="button" 
                          class="btn btn-outline-danger btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickDeleteButton(${cartoon.id})">
                          
                          <i class="bi bi-trash3-fill"></i>
                      </button>
                      <button type="button" 
                          class="btn btn-outline-warning btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickEditButton(${cartoon.id})"
                      >
                      <i class="bi bi-pencil-fill"></i>
                      </button>
                  </td>
                  <td>${cartoon.name}</td>
                  <td>${cartoon.numberOfSeasons}</td>
                  <td>${cartoon.numberOfEpisodes}</td>
                  <td>${cartoon.runningTime}</td>
                  <td>${cartoon.AiringStart}</td>
                  <td>${cartoon.AiringEnd}</td>
                  <td>${cartoon.countriesId}</td>
                  <td>${cartoon.creatorsId}</td>
                  
              </tr>
          `;
    }
    //maradék
    htmlElement += `
          </tbody>
      </table>
  `;

    contentBox.innerHTML = htmlElement;
  }
async function getTable2(params) {
    state = "view";
    stateTable = "countriesTable";
    //lekérjük az adatokat
    const url = "http://localhost:3000/countries";
    const response = await fetch(url);
    const data = await response.json();
    const countries = data.data;
    
  
  
    //vizualizáljuk
    let htmlElement = `
      <table class="table table-striped table-hover table-bordered w-auto">
          <thead>
              <tr>
                  <th>
                      <button type="button" class="btn btn-outline-success btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickNewButton2()"
                      >
                          Add a country!
                      </button>
                  </th>
                  <th>Name</th>
                  
                  
                </tr>
          </thead>
          <tbody>
  
      `;
    //ciklus
    for (const country of countries) {
     
      htmlElement += `
              <tr>
                  <td class="text-nowrap">
                      <button type="button" 
                          class="btn btn-outline-danger btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickDeleteButton2(${country.id})"
                      >
                          <i class="bi bi-trash3-fill"></i>
                      </button>
                      <button type="button" 
                          class="btn btn-outline-warning btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickEditButton2(${country.id})"
                      >
                      <i class="bi bi-pencil-fill"></i>
                      </button>
                  </td>
                  <td>${country.name}</td>
                  
                  
              </tr>
          `;
    }
    //maradék
    htmlElement += `
          </tbody>
      </table>
  `;

    contentBox.innerHTML = htmlElement;
  }

async function getTable3(params) {
    state = "view";
    stateTable = "creatorsTable";
    //lekérjük az adatokat
    const url = "http://localhost:3000/creators";
    const response = await fetch(url);
    const data = await response.json();
    const creators = data.data;
    
  
  
    //vizualizáljuk
    let htmlElement = `
      <table class="table table-striped table-hover table-bordered w-auto">
          <thead>
              <tr>
                  <th>
                      <button type="button" class="btn btn-outline-success btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickNewButton3()"
                      >
                          Add a creator!
                      </button>
                  </th>
                  <th>Name</th>
                  
                  
                </tr>
          </thead>
          <tbody>
  
      `;
    //ciklus
    for (const creator of creators) {
     
      htmlElement += `
              <tr>
                  <td class="text-nowrap">
                      <button type="button" 
                          class="btn btn-outline-danger btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickDeleteButton3(${creator.id})"
                      >
                          <i class="bi bi-trash3-fill"></i>
                      </button>
                      <button type="button" 
                          class="btn btn-outline-warning btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickEditButton3(${creator.id})"
                      >
                      <i class="bi bi-pencil-fill"></i>
                      </button>
                  </td>
                  <td>${creator.name}</td>
                  
                  
              </tr>
          `;
    }
    //maradék
    htmlElement += `
          </tbody>
      </table>
  `;

    contentBox.innerHTML = htmlElement;
}

async function getCards() {
  //lekérjük az adatokat
  const url = "http://localhost:3000/cartoons";
  const response = await fetch(url);
  const data = await response.json();
  const cartoons = data.data;

  //vizualizáljuk
  let htmlElement = `
    <h1>Cards</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" data-masonry='{"percentPosition": true }' >
      <!-- ezt ismételgetjük -->
    `;
  //ciklus
  for (const cartoon of cartoons) {
    htmlElement += `
        <div class="col">
        <div class="card">
          <img src="./images/cartoons/${cartoon.name}.jpg" class="card-img-top" alt="..." style="width:500px;height:600px;">
          <div class="card-body">
            <h5 class="card-title">${cartoon.name}</h5>
            <ul>
              <li>${cartoon.name}</li>
            </ul>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalCard"
              onclick="onClickCardButton(${cartoon.id})"  

            >
              Details
            </button>
      
          </div>
        </div>        
      </div>
        `;
  }
  //maradék
  htmlElement += `
    </div>

`;

  contentBox.innerHTML = htmlElement;
}
async function getCards2() {
  //lekérjük az adatokat
  const url = "http://localhost:3000/countries";
  const response = await fetch(url);
  const data = await response.json();
  const countries = data.data;

  //vizualizáljuk
  let htmlElement = `
    <h1>Cards</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" data-masonry='{"percentPosition": true }' >
      <!-- ezt ismételgetjük -->
    `;
  //ciklus
  for (const country of countries) {
    htmlElement += `
        <div class="col">
        <div class="card">
          <img src="./images/countries/${country.name}.svg" class="card-img-top" alt="..."  style="width:400px;height:300px;">
          <div class="card-body">
            <h5 class="card-title">${country.name}</h5>
            <ul>
              
            </ul>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalCard"
              onclick="onClickCardButton2(${country.id})"  

            >
              Details
            </button>
      
          </div>
        </div>        
      </div>
        `;
  }
  //maradék
  htmlElement += `
    </div>

`;

  contentBox.innerHTML = htmlElement;
}
async function getCards3() {
  //lekérjük az adatokat
  const url = "http://localhost:3000/creators";
  const response = await fetch(url);
  const data = await response.json();
  const creators = data.data;

  //vizualizáljuk
  let htmlElement = `
    <h1>Cards</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" data-masonry='{"percentPosition": true }' >
      <!-- ezt ismételgetjük -->
    `;
  //ciklus
  for (const creator of creators) {
    htmlElement += `
        <div class="col">
        <div class="card">
          <img src="./images/creators/${creator.name}.jpg" class="card-img-top" alt="..."tyle="width:400px;height:300px;">
          <div class="card-body">
            <h5 class="card-title">${creator.name}</h5>
            <ul>
              
            </ul>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalCard"
              onclick="onClickCardButton3(${creator.id})"  

            >
              Details
            </button>
      
          </div>
        </div>        
      </div>
        `;
  }
  //maradék
  htmlElement += `
    </div>

`;

  contentBox.innerHTML = htmlElement;
}

async function onClickCardButton(id) {
  console.log(id);
  //lekérjük az adatokat
  const url = `http://localhost:3000/cartoons/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const cartoon = data.data[0];
  let htmlElement = `
        <h5 class="card-title">${cartoon.name}</h5>
        <img src="./images/${cartoon.name}.jpg" class="card-img-top" alt="...">
        <ul>
          <li>${cartoon.name}</li>
          <li>${cartoon.numberOfSeasons}</li>
          <li>${cartoon.numberOfEpisodes}</li>
          <li>${cartoon.runningTime}</li>
          <li>${cartoon.AiringStart}</li>
          <li>${cartoon.AiringEnd}</li>
          <li>${cartoon.countriesId}</li>
          <li>${cartoon.creatorsId}</li>
        </ul>
    `;
  modalContent.innerHTML = htmlElement;
  modalTitle.innerHTML = "Content of the cartoon.";
}
async function onClickCardButton2(id) {
  console.log(id);
  //lekérjük az adatokat
  const url = `http://localhost:3000/countries/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const country = data.data[0];
  let htmlElement = `
        <h5 class="card-title">${country.name}</h5>
        <img src="./images/${country.name}.jpg" class="card-img-top" alt="...">
        <ul>
        <li>${country.name}</li>
            
        
        </ul>
    `;
  modalContent.innerHTML = htmlElement;
  modalTitle.innerHTML = "Content of the countries:";
}
async function onClickCardButton3(id) {
  console.log(id);
  //lekérjük az adatokat
  const url = `http://localhost:3000/creators/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const creator = data.data[0];
  let htmlElement = `
        <h5 class="card-title">${creator.name}</h5>
        <img src="./images/${creator.name}.jpg" class="card-img-top" alt="...">
        <ul>
            
            <li>${creator.name}</li>
        </ul>
    `;
  modalContent.innerHTML = htmlElement;
  modalTitle.innerHTML = "Content of creators:";
}



async function onClickNewButton() {
  state = "new";
  modalTitle.innerHTML = "A new record of a cartoon";
  buttonShowHide("saveButton", true);
  let url = "http://localhost:3000/countriesAbc";
  let response = await fetch(url);
  let data = await response.json();
  const countries = data.data

  
  url = "http://localhost:3000/creatorsAbc";
  response = await fetch(url);
  data = await response.json();
  const creators = data.data
  
  

  let htmlElement = `
    <div class="col-12">
        <label for="name" class="form-label">The cartoon name:</label>
        <input type="text" class="form-control" id="name">
    </div>
    
    <div class="col-6">
        <label for="numberOfSeasons" class="form-label">Number of Seasons:</label>
        <input type="number" class="form-control" id="numberOfSeasons">
    </div>
    <div class="col-5">
        <label for="numberOfEpisodes" class="form-label">Number of episodes:</label>
        <input type="number" class="form-control" id="numberOfEpisodes">
    </div>
    <div class="col-5">
        <label for="runningTime" class="form-label">Running time (of one episode):</label>
        <input type="number" class="form-control" id="runningTime">
    </div>
    <div class="col-5">
        <label for="AiringStart" class="form-label">When it started:</label>
        <input type="date" class="form-control" id="AiringStart">
    </div>
    <div class="col-5">
        <label for="AiringEnd" class="form-label">When it ended:</label>
        <input type="date" class="form-control" id="AiringEnd">
    </div>
    <select class="form-select my-3" aria-label="Default select example" id="countriesId">
        <option value="null">No country</option>
      
    
    

    
    `;

    for (const country of countries) {
      
      htmlElement+= `
      <option value="${country.id}">${country.name}</option>
      

    
      `
        
    
    }
    
  
  
  
    

 //+ ciklus
 htmlElement += `</select>`;
 
 htmlElement+= `
 <select class="form-select" aria-label="Default select example" id="creatorsId">
 <option value="null">No creator</option>
 
 `;
 for (const creator of creators) {
  htmlElement+= `
 <option value="${creator.id}">${creator.name}</option>
 `
}
  //vége
  htmlElement += `</select>`;

  modalContent.innerHTML = htmlElement;
}
async function onClickNewButton2() {
  state = "new2";
  modalTitle.innerHTML = "A new record of a country";
  buttonShowHide("saveButton", true);
  const url = "http://localhost:3000/countries";
  const response = await fetch(url);
  const data = await response.json();
  const cartoon = data.data
  
  

  let htmlElement = `
    <div class="col-12">
        <label for="name" class="form-label">The country's name:</label>
        <input type="text" class="form-control" id="name">
    
    
    
    `;
  
  
  

  //vége
  htmlElement += `</div>`;

  modalContent.innerHTML = htmlElement;
}
async function onClickNewButton3() {
  state = "new3";
  modalTitle.innerHTML = "A new record of a creator";
  buttonShowHide("saveButton", true);
  const url = "http://localhost:3000/creators";
  const response = await fetch(url);
  const data = await response.json();
  const cartoon = data.data
  
  

  let htmlElement = `
    <div class="col-12">
        <label for="name" class="form-label">The creator name:</label>
        <input type="text" class="form-control" id="name">
    
    
    
    `;
  
  
  

  //vége
  htmlElement += `</div>`;

  modalContent.innerHTML = htmlElement;
}

function onClickDeleteButton(id) {
  state = "delete";
  modalTitle.innerHTML = "Cartoon deletion";
  modalContent.innerHTML = "Do you really want that?";
  buttonShowHide("yesButton", true);
  selectedCartoonId = id;
}
function onClickDeleteButton2(id) {
  state = "delete2";
  modalTitle.innerHTML = "country deletion";
  modalContent.innerHTML = "Do you really want that?";
  buttonShowHide("yesButton", true);
  selectedCountryId = id;
}
function onClickDeleteButton3(id) {
  state = "delete3";
  modalTitle.innerHTML = "creator deletion";
  modalContent.innerHTML = "Do you really want that?";
  buttonShowHide("yesButton", true);
  selectedCreatorId = id;
}

async function onClickEditButton(id) {
  //országok és készítők beolvasása -> countriesAbc, creatorsAbc
  
  let url = "http://localhost:3000/countriesAbc";
  let response = await fetch(url);
  let data = await response.json();
  const countries = data.data

  
  url = "http://localhost:3000/creatorsAbc";
  response = await fetch(url);
  data = await response.json();
  const creators = data.data
  
  state = "edit";
  modalTitle.innerHTML = "You are currently editing the cartoon";
  buttonShowHide("saveButton", true);

  let htmlElement = `
  <div class="col-12">
        <label for="name" class="form-label">The cartoon name:</label>
        <input type="text" class="form-control" id="name">
    </div>
    
    <div class="col-6">
        <label for="numberOfSeasons" class="form-label">Number of Seasons:</label>
        <input type="number" class="form-control" id="numberOfSeasons">
    </div>
    <div class="col-5">
        <label for="numberOfEpisodes" class="form-label">Number of episodes:</label>
        <input type="number" class="form-control" id="numberOfEpisodes">
    </div>
    <div class="col-5">
        <label for="runningTime" class="form-label">Running time (of one episode):</label>
        <input type="number" class="form-control" id="runningTime">
    </div>
    <div class="col-5">
        <label for="AiringStart" class="form-label">When it started:</label>
        <input type="date" class="form-control" id="AiringStart">
    </div>
    <div class="col-5">
        <label for="AiringEnd" class="form-label">When it ended:</label>
        <input type="date" class="form-control" id="AiringEnd">
    </div>
    <select class="form-select my-3" aria-label="Default select example" id="countriesId">
        <option value="null">No country</option>
      
    
    

    
    `;

    for (const country of countries) {
      
      htmlElement+= `
      <option value="${country.id}">${country.name}</option>
      

    
      `
        
    
    }
    
  
  
  
    

 //vége
 htmlElement += `</select>`;
 
 htmlElement+= `
 <select class="form-select" aria-label="Default select example" id="creatorsId">
 <option value="null">No creator</option>
 
 `;
 for (const creator of creators) {
  htmlElement+= `
 <option value="${creator.id}">${creator.name}</option>
 `
}
  //vége
  htmlElement += `</select>`;

  modalContent.innerHTML = htmlElement;

  //a kiválasztott rajzfilm -> cartoons
  url = `http://localhost:3000/cartoons/${id}`;
  response = await fetch(url);
  data = await response.json();
  const cartoon = data.data[0];

  document.getElementById("name").value = cartoon.name;
  document.getElementById("numberOfSeasons").value = cartoon.numberOfSeasons;
  document.getElementById("numberOfEpisodes").value = cartoon.numberOfEpisodes;
  document.getElementById("runningTime").value = cartoon.runningTime;
  document.getElementById("AiringStart").value = cartoon.AiringStart;
  document.getElementById("AiringEnd").value = cartoon.AiringEnd;
  document.getElementById("countriesId").value = cartoon.countriesId;
  document.getElementById("creatorsId").value = cartoon.creatorsId;
  
  selectedCartoonId = id;
}
async function onClickEditButton2(id) {
  //országok beolvasása -> countries
  let url = "http://localhost:3000/countries";
  let response = await fetch(url);
  let data = await response.json();
  
  state = "edit2";
  modalTitle.innerHTML = "You are currently editing the country";
  buttonShowHide("saveButton", true);

  let htmlElement = `
  <div class="col-12">
        <label for="name" class="form-label">The country name:</label>
        <input type="text" class="form-control" id="name">
    
  `;
  //vége
  htmlElement += `</div>`;
  modalContent.innerHTML = htmlElement;

  //a kiválasztott ország -> country
  url = `http://localhost:3000/countries/${id}`;
  response = await fetch(url);
  data = await response.json();
  const country = data.data[0];

  document.getElementById("name").value = country.name;
  
  
  selectedCountryId = id;
}

async function onClickEditButton3(id) {
  //készítők beolvasása -> creators
  let url = "http://localhost:3000/creators";
  let response = await fetch(url);
  let data = await response.json();
  
  state = "edit3";
  modalTitle.innerHTML = "You are currently editing the creator";
  buttonShowHide("saveButton", true);

  let htmlElement = `
  <div class="col-12">
        <label for="name" class="form-label">The cartoon name:</label>
        <input type="text" class="form-control" id="name">
    
  `;
  //vége
  htmlElement += `</div>`;
  modalContent.innerHTML = htmlElement;

  //a kiválasztott készítő -> creators
  url = `http://localhost:3000/creators/${id}`;
  response = await fetch(url);
  data = await response.json();
  const creator = data.data[0];

  document.getElementById("name").value = creator.name;
  
  selectedCreatorId = id;
}


async function onClickSaveButton() {
  buttonShowHide("saveButton", false);
  buttonShowHide("yesButton", false);

  //olvassuk ki az űrlap adatait
  if (stateTable == "cartoonsTable") {
    editableCartoon.name = document.getElementById("name").value;
    editableCartoon.numberOfSeasons = document.getElementById("numberOfSeasons").value;
    editableCartoon.numberOfEpisodes = document.getElementById("numberOfEpisodes").value;
    editableCartoon.runningTime = document.getElementById("runningTime").value;
    editableCartoon.AiringStart = document.getElementById("AiringStart").value;
    editableCartoon.AiringEnd = document.getElementById("AiringEnd").value;
    editableCartoon.countriesId = document.getElementById("countriesId").value;
    editableCartoon.creatorsId = document.getElementById("creatorsId").value;
  }
  else if (stateTable == "countriesTable") 
  {
    editableCountry.name = document.getElementById("name").value;
  }
  else if (stateTable =="creatorsTable")
  {
    editableCreator.name = document.getElementById("name").value;
  }

  if (state === "new") {
    const url = "http://localhost:3000/cartoons";
    //obj to json konverzió
    const body = JSON.stringify(editableCartoon);
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    };
    const response = await fetch(url, config);
    console.log(editableCartoon);
  } else if (state === "edit") {
    const url = `http://localhost:3000/cartoons/${selectedCartoonId}`;
    const body = JSON.stringify(editableCartoon);
    const config = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    };
    const response = await fetch(url, config);
  } else if (state === "edit2") {
    const url = `http://localhost:3000/countries/${selectedCountryId}`;
    const body = JSON.stringify(editableCountry);
    const config = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    };
    const response = await fetch(url, config);
  } else if (state === "edit3") {
    const url = `http://localhost:3000/creators/${selectedCreatorId}`;
    const body = JSON.stringify(editableCreator);
    const config = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    };
    const response = await fetch(url, config);
  } else if (state === "new2") {
    const url = "http://localhost:3000/countries";
    //obj to json konverzió
    const body = JSON.stringify(editableCountry);
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    };
    const response = await fetch(url, config);
    
  } else if (state === "new3") {
    const url = "http://localhost:3000/creators";
    //obj to json konverzió
    const body = JSON.stringify(editableCreator);
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: body,
    };
    const response = await fetch(url, config);
    
  }


  //lássuk hogy bővült a táblázat
  if (stateTable == "cartoonsTable") {
    
    getTable();
  }
  else if (stateTable == "countriesTable") {
    
    getTable2();
    
  }
  else if (stateTable =="creatorsTable")
  {
   
    getTable3();
    
  }
}
//ide építjük be törlés ajax kérést
async function onClickYesButton() {
  buttonShowHide("saveButton", false);
  buttonShowHide("yesButton", false);
  //Ajax kéréssel küldjünk post-ot
  if (state == "delete") {
  const config = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  };
  let url = `http://localhost:3000/cartoons/${selectedCartoonId}`;
  const response = await fetch(url, config);
  }
  
  else if (state == "delete2") {
    const config = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };
    
    let url = `http://localhost:3000/countries/${selectedCountryId}`;
    const response = await fetch(url, config);
  }
  
  else if (state == "delete3")
  {
    const config = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    };
    let url = `http://localhost:3000/creators/${selectedCreatorId}`;
    const response = await fetch(url, config);
  }
  //lássuk hogy tölrődött a sor
  if (stateTable == "cartoonsTable") 
    {
    getTable();
  }
  else if (stateTable == "countriesTable") 
  { 
    getTable2();
  }
  else if (stateTable =="creatorsTable")
  {
    getTable3();
  }
}

function onClickCancelButton() {
  //Eltünteti: Save, és Yes gombokat
  buttonShowHide("saveButton", false);
  buttonShowHide("yesButton", false);
}

function buttonShowHide(buttonId, ShowHide) {
  const button = document.getElementById(buttonId);
  if (ShowHide) {
    //megjelenít
    button.classList.remove("d-none");
  } else {
    //Eltüntet
    button.classList.add("d-none");
  }
}
