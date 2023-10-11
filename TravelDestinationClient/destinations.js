

// const user = getUser();
const user = true;
const destinationList = document.getElementById('destinationList');
const sendButton = document.getElementById('hero-button');

const createDestinationElement = (destination) =>  {
    const template = document.getElementById('destination-template');
    const card = template.content.cloneNode(true);
  
    card.querySelector('.image').src = destination.image;
    card.querySelector('.destination-country').textContent = destination.country;
    card.querySelector('.link').href = destination.link;
    card.querySelector('.destination-title').textContent = destination.title;
    card.querySelector('.arrival-date').textContent = destination.arrivalDate ? destination.arrivalDate.substring(0, 10): destination.arrivalDate;
    card.querySelector('.departure-date').textContent = destination.departureDate ? destination.departureDate.substring(0, 10): destination.departureDate;
    card.querySelector('p').textContent = destination.description;
    card.querySelector('.delete-destination').dataset._id = destination._id;
    card.querySelector('.edit-destination').dataset._id = destination._id;

    return card;
}


const renderDestinations = async () =>  {
    try {
      const response = await fetch('http://localhost:3000/destinations');
      const destinations = await response.json();
      console.log("destinations", destinations);

  
      const destinationElements = destinations.map(createDestinationElement);
      destinationElements.forEach((element) => {
        destinationList.appendChild(element);
      });


    if (user) {
        const deleteButtons = document.querySelectorAll('.delete-destination');
        deleteButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset._id;
            console.log("this is the id", id)
            try {
            const response = await fetch(`http://localhost:3000/destinations/${id}`, {
                method: 'DELETE',
            });
            const result = await response.text();
            console.log(result);
            if(result.includes("deleted")){
                location.reload();
            }
            } catch (error) {
            console.error('Error deleting destination:', error);
            }
        });
        });
    } else {
        const deleteButtons = document.querySelectorAll('.delete-destination');
        deleteButtons.forEach((button) => {
            button.style.display = 'none';
        }); 
    }

    let selectedDestination;
       
    const editButtons = document.querySelectorAll('.edit-destination');
        editButtons.forEach((button) => {

        button.addEventListener('click', async (event) => {

            selectedDestination = destinations.filter((destination) => {
                if (destination._id === event.target.dataset._id) {
                    return destination;
                }
            })

            console.log("what is the data here?", selectedDestination )
            localStorage.setItem('selectedDestination', JSON.stringify(selectedDestination));
            window.location.href = `createDestinationPage.html?update=true&id=${selectedDestination[0]._id}`;

        });
        });
    } catch (error) {
      console.error('Error loading destinations:', error);
    }
  }
  

  sendButton.addEventListener('click', async () => {
    window.location.href = `createDestinationPage.html?update=${false}&id=${null}`;
  });

renderDestinations();


