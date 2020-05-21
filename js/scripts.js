
const search = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let userData = [];



// Creating <form> and appeding it to 'search' <div>
const searchForm = document.createElement('form');
    searchForm.action = '#';
    searchForm.method = 'get';
    search.appendChild(searchForm);


//Creating search
const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'search-input';
    searchInput.class = 'search-input';
    searchInput.placeholder = 'Search...'
    searchForm.appendChild(searchInput);



const submitInput = document.createElement('input')
    submitInput.type = 'submit';
    submitInput.value = 'submit';
    submitInput.id = 'search-submit';
    submitInput.class = 'search-submit';
    searchForm.appendChild(submitInput);



// searchInput.addEventListener('keyup', (e) =>{
//     let userTxt = e.target.value;
//     const userNames = document.getElementsByClassName('card')
//     for(let i = 0; i < userNames.length; i++){
//        userNames[i].style.display = 'none'
//     }
// })




//Fetch request to to random user api
fetch('https://randomuser.me/api/?results=12&nat=gb')
    .then(res => res.json())
    .then( data => {
        userData.push(data.results)

        generateUserCards(data.results)  

        generateUserModal(data.results)

    })






function generateUserCards(data){

    for(let i = 0; i < data.length; i++){
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        gallery.appendChild(cardDiv);

        const cardImgcontainer = document.createElement('div');
        cardImgcontainer.className = 'card-img-container';
        cardDiv.appendChild(cardImgcontainer);

        const img = document.createElement('img');
        img.src = data[i].picture.large;
        img.className = 'card-img';
        img.alt = 'profile picture';
        cardImgcontainer.appendChild(img)

        const cardInfoContainer = document.createElement('div')
        cardInfoContainer.className = 'card-info-container';
        cardDiv.appendChild(cardInfoContainer);

        const name = document.createElement('h3')
        name.className = 'card-name';
        name.textContent = `${data[i].name.first} ${data[i].name.last}`
        cardInfoContainer.appendChild(name);

        const email = document.createElement('p');
        email.className = 'card-text';
        email.textContent = data[i].email;
        cardInfoContainer.appendChild(email);

        const location = document.createElement('p');
        location.className = ('card-text cap');
        location.textContent = `${data[i].location.city}, ${data[i].location.state}`
        cardInfoContainer.appendChild(location)

    }


    




}

 function generateUserModal(data){

    let cards = document.getElementsByClassName('card');

    for(let i = 0; i < cards.length; i++){
     
     cards[i].addEventListener('click', (e) =>{
        
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        body.appendChild(modalContainer);

        const modalDiv = document.createElement('div')
        modalDiv.className = 'modal';
        modalContainer.appendChild(modalDiv)

        const modalButton = document.createElement('button');
        modalButton.type = 'button';
        modalButton.id = 'modal-close-btn';
        modalButton.className = 'modal-close-btn';
        const modalButtonText = document.createElement('strong');
        modalButtonText.textContent = 'X'
        modalDiv.appendChild(modalButton)
        modalButton.appendChild(modalButtonText);
        
        const modalInfoContainer = document.createElement('div');
        modalInfoContainer. className = 'modal-info-container';
        modalDiv.appendChild(modalInfoContainer);

        const modalImg = document.createElement('img');
        modalImg.src = userData[0][i].picture.large;
        modalImg.className = 'modal-img'
        modalImg.alt = 'profile picture'
        modalInfoContainer.appendChild(modalImg);

        const modalName = document.createElement('h3');
        modalName.className = 'modal-name cap'
        modalName.textContent = `${userData[0][i].name.first} ${userData[0][i].name.last}`
        modalInfoContainer.appendChild(modalName);

        const modalEmail = document.createElement('p');
        modalEmail.className = 'modal-text';
        modalEmail.textContent = userData[0][i].email;
        modalInfoContainer.appendChild(modalEmail)

        const city = document.createElement('p');
        city.className = 'modal-text cap'
        city.textContent = userData[0][i].location.city
        modalInfoContainer.appendChild(city); 

        const hr = document.createElement('hr');
        modalInfoContainer.appendChild(hr);

        const phone = document.createElement('p');
        phone.className = 'modal-text';
        phone.textContent = userData[0][i].phone;
        modalInfoContainer.appendChild(phone);
        
        

        const zipCode = document.createElement('p');
        zipCode.className = 'modal-text'
        zipCode.textContent = `${userData[0][i].location.country}, ${userData[0][i].location.postcode}`;
        modalInfoContainer.appendChild(zipCode)
        

        const birthday = document.createElement('p');
        birthday.className = 'modal-text'
        const dataToString = userData[0][i].dob.date;
        let birthdayDate = ''
        birthdayDate += dataToString.slice(-16, -14);
        birthdayDate += dataToString.slice(-17, -16);
        birthdayDate += dataToString.slice(-19, -17);
        birthdayDate += dataToString.slice(-20, -19);
        birthdayDate += dataToString.slice(-24, -20);
        const updatedBirthdayDate = birthdayDate.replace(/-/g, "/")
        birthday.textContent = `Birthday: ${updatedBirthdayDate}`;
        modalInfoContainer.appendChild(birthday);

       const modalButtonContainer = document.createElement('div');
       modalButtonContainer.className = 'modal-btn-container';
       modalContainer.appendChild(modalButtonContainer);

       const prevButton = document.createElement('button');
       prevButton.type = 'button'
       prevButton.className = 'modal-prev btn'
       prevButton.textContent = 'Prev'
       modalButtonContainer.appendChild(prevButton);
        
       const nextButton = document.createElement('button');
       nextButton.type = 'button';
       nextButton.className = 'modal-next btn'
       nextButton.textContent = 'Next'
       modalButtonContainer.appendChild(nextButton);
       
       
        modalButton.addEventListener('click', (e) => {
             modalContainer.remove();
         })

    })  

    }
 }

//  const cards = document.getElementsByClassName('card');
//  for(let i = 0; i < cards.length; i++ ){
//     generateUserModal(cards[i])
//  }
  

 
 







































 
//     function generateUserCards(data){
//         let userCards = ''
//         data.map(user =>
//          userCards +=   
//                     `
//                     <div class="card">
//                     <div class="card-img-container">
//                         <img class="card-img" src="${user.picture.large}" alt="profile picture">       
//                     </div>
//                     <div class="card-info-container">
//                     <h3 id="name" class="card-name cap"> ${user.name.first} ${user.name.last}</h3>
//                     <p class="card-text">${user.email}</p>
//                     <p class="card-text cap">${user.location.city}, ${user.location.state}</p> 
//                     </div>
//             </div>
//     `
//         );
//         gallery.innerHTML = userCards;
//     }




//     function generateUserModal(data) {

// let userCards = gallery.querySelectorAll('card');

//     for(let i = 0; i < userCards.length; i++){

//     userCards[i].addEventListner('click', (e) => {
    
//     let modalContainer = document.createElement('div');
//     modalContainer.className = 'modal-container'
//     body.appendChild.modalContainer;

//     let modalContent = '';
//     modalContent = `
    
//         <div class="modal">
//         <p>Modal Test<p>
//     `
   

        
     