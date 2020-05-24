//Global variables declared
const search = document.querySelector('.search-container');
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let userData = [];



// Creating <form> and appeding it to 'search' <div>
const searchForm = document.createElement('form');
    searchForm.action = '#';
    searchForm.method = 'get';
    search.appendChild(searchForm);

//Creating search searchInput and appending it to search Element
const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'search-input';
    searchInput.class = 'search-input';
    searchInput.placeholder = 'Search...'
    searchForm.appendChild(searchInput);


//Creating submitInput and appending it to search form
const submitInput = document.createElement('input')
    submitInput.type = 'submit';
    submitInput.value = 'submit';
    submitInput.id = 'search-submit';
    submitInput.class = 'search-submit';
    searchForm.appendChild(submitInput);

//Event listner to listen for user activity in search input field
searchInput.addEventListener('keyup',  (e) => {
    const userCards = document.getElementsByClassName('card')
    const cardName = document.getElementsByClassName('card-name')
    let userInput = '';
    userInput += e.target.value;
   

/*For Loop, loops through userNames in card <div>. An if compares what the user
has entred to cardNames using indexOf() and hides all non matches */
    for(let i = 0; i < cardName.length; i++){
        let name = cardName[i].textContent.toLowerCase()
        let input = userInput.toLowerCase();
        if(name.indexOf(input) > -1){
            userCards[i].style.display = ''
        } else{
            userCards[i].style.display = 'none'
        }
    }

})



//Fetch request to to random user api
fetch('https://randomuser.me/api/?results=12&nat=gb')
    .then(res => res.json())
    .then( data => {
        //creating an array random user results to be use in generateUserModal function
        userData.push(data.results)

        //Used to generate randomUserCards to be shown in gallery
        generateUserCards(data.results)  

        //Used to create modals
        generateUserModal(data.results)

    })






function generateUserCards(data){
    //For loop, loops over the data collected from reftch request and creates html for gallery
    for(let i = 0; i < data.length; i++){

        //Create card <div>, class name and append to gallery <div>
        const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            gallery.appendChild(cardDiv);

        //Create cardImageContainer <div>, className and append to cardDiv
        const cardImgcontainer = document.createElement('div');
            cardImgcontainer.className = 'card-img-container';
            cardDiv.appendChild(cardImgcontainer);


        //Create <img> tag, className, alt, src and assign to cardImageContainer
        const img = document.createElement('img');
            img.src = data[i].picture.large;
            img.className = 'card-img';
            img.alt = 'profile picture';
            cardImgcontainer.appendChild(img)


        //Create cardInfoContainer, classname and append to cardDiv
        const cardInfoContainer = document.createElement('div')
            cardInfoContainer.className = 'card-info-container';
            cardDiv.appendChild(cardInfoContainer);


        //Create name <h3>, className and textContent and append to cardInfoContainer
        const name = document.createElement('h3')
            name.className = 'card-name';
            name.textContent = `${data[i].name.first} ${data[i].name.last}`
            cardInfoContainer.appendChild(name);

        //Create email <p>, className and textContent and append to cardInfoContainer
        const email = document.createElement('p');
            email.className = 'card-text';
            email.textContent = data[i].email;
            cardInfoContainer.appendChild(email);

         //Create location <p>, className, textContent and append to cardInfo container   
        const location = document.createElement('p');
            location.className = ('card-text cap');
            location.textContent = `${data[i].location.city}, ${data[i].location.state}`
            cardInfoContainer.appendChild(location)
    }
}




 //Function used to generate models
 function generateUserModal(data){

    //Selecting all elements in 'card' class
    let cards = document.getElementsByClassName('card');

    //Looping over all the elements in the card class
    for(let i = 0; i < cards.length; i++){


     //Click event created for all the elements in the 'card' class
     cards[i].addEventListener('click', (e) => {
        

        //Create modalContainer, className and append to <body>
        const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            body.appendChild(modalContainer);
            

        //Create modal <div>, className and append to modalContainer
        const modalDiv = document.createElement('div')
            modalDiv.className = 'modal';
            modalContainer.appendChild(modalDiv)

        //Create modalButton, className, type, id, className, textContent and append to modalDiv
        const modalButton = document.createElement('button');
            modalButton.type = 'button';
            modalButton.id = 'modal-close-btn';
            modalButton.className = 'modal-close-btn';
        const modalButtonText = document.createElement('strong');
            modalButtonText.textContent = 'X'
            modalDiv.appendChild(modalButton)
            modalButton.appendChild(modalButtonText);


        //Create modalInfoContainer <div>, className and append to modalDiv
        const modalInfoContainer = document.createElement('div');
        modalInfoContainer. className = 'modal-info-container';
        modalDiv.appendChild(modalInfoContainer);


        //Create modal <img> element, src, alt and append to modalInfoContainer
        const modalImg = document.createElement('img');
        modalImg.src = userData[0][i].picture.large;
        modalImg.className = 'modal-img'
        modalImg.alt = 'profile picture'
        modalInfoContainer.appendChild(modalImg);


        //Create modalName, className and appennd to modalInfoContainer
        const modalName = document.createElement('h3');
        modalName.className = 'modal-name cap'
        modalName.textContent = `${userData[0][i].name.first} ${userData[0][i].name.last}`
        modalInfoContainer.appendChild(modalName);


        //Create modalEmail, className and append to modalInfoContainer
        const modalEmail = document.createElement('p');
        modalEmail.className = 'modal-text';
        modalEmail.textContent = userData[0][i].email;
        modalInfoContainer.appendChild(modalEmail)


        //Create city <p> element, className and append to ModalInfoContainer
        const city = document.createElement('p');
        city.className = 'modal-text cap'
        city.textContent = userData[0][i].location.city
        modalInfoContainer.appendChild(city); 


        //Create horizontal rule and appennd to modalInfoConatiner
        const hr = document.createElement('hr');
        modalInfoContainer.appendChild(hr);


        //Create phone <p> element, className and append to modalInfoContainer
        const phone = document.createElement('p');
        phone.className = 'modal-text';
        phone.textContent = userData[0][i].phone;
        modalInfoContainer.appendChild(phone);
        
        
        //Create zipCode <p>, className and append to modalInfoContainer
        const zipCode = document.createElement('p');
        zipCode.className = 'modal-text'
        zipCode.textContent = `${userData[0][i].location.country}, ${userData[0][i].location.postcode}`;
        modalInfoContainer.appendChild(zipCode)
        
        //Create birthday <p> element, className and append to modalInfoContainer
        //I used slice to put birthday in the right order and replace to change - to /
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

    
       
       
        modalButton.addEventListener('click', (e) => {
             modalContainer.remove();
         })

        })  
    }
}
 
 







































 
//     