const contentBox = document.getElementById("contentBox");
const modalContent = document.getElementById("modalContent");
const modalTitle = document.getElementById("modalTitle");

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
                  <th>Country id</th>
                  <th>Creator id</th>
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
                          onclick="onClickDeleteButton(${cartoon.id})"
                      >
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
                          onclick="onClickNewButton()"
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
                          onclick="onClickDeleteButton(${country.id})"
                      >
                          <i class="bi bi-trash3-fill"></i>
                      </button>
                      <button type="button" 
                          class="btn btn-outline-warning btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickEditButton(${country.id})"
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
                          onclick="onClickNewButton()"
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
                          onclick="onClickDeleteButton(${creator.id})"
                      >
                          <i class="bi bi-trash3-fill"></i>
                      </button>
                      <button type="button" 
                          class="btn btn-outline-warning btn-sm"
                          data-bs-toggle="modal" data-bs-target="#modalCard"
                          onclick="onClickEditButton(${creator.id})"
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
    <h1>Kártyák</h1>
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
              Részletek
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
    <h1>Kártyák</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" data-masonry='{"percentPosition": true }' >
      <!-- ezt ismételgetjük -->
    `;
  //ciklus
  for (const country of countries) {
    htmlElement += `
        <div class="col">
        <div class="card">
          <img src="./images/countries/${country.name}.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${country.name}</h5>
            <ul>
              <li>${country.name}</li>
            </ul>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalCard"
              onclick="onClickCardButton2(${country.id})"  

            >
              Részletek
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
    <h1>Kártyák</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" data-masonry='{"percentPosition": true }' >
      <!-- ezt ismételgetjük -->
    `;
  //ciklus
  for (const creator of creators) {
    htmlElement += `
        <div class="col">
        <div class="card">
          <img src="./images/creators/${creator.name}.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${creator.name}</h5>
            <ul>
              <li>${creator.name}</li>
            </ul>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalCard"
              onclick="onClickCardButton3(${creator.id})"  

            >
              Részletek
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