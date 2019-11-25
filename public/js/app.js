console.log('Client side js file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{  //when JSON data arrived then data is consolled.
//         console.log(data);
//     });
// });



// Default nature of FORM is to completely reload the page
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');

//messageOne.textContent= 'From Javascript'
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // its going to prevent default behaviour i.e. refreshing browser
    //console.log('testing');
    const location = search.value;
    messageOne.textContent= 'Loading...';
    messageTwo.textContent= '';

// NOTE: Fetch API used with then
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
        response.json().then((data)=>{  
            if(data.error){
                messageOne.textContent= data.error;
            }
            else{
                messageOne.textContent= data.location;
                messageTwo.textContent= data.forecast
                // console.log(data.location);
                // console.log(data.forecast);
            }               
        });
    });

    //console.log(location);
});