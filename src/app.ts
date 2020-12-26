import axios from 'axios';

const mapArea = document.getElementById('map')!;
const form = document.getElementById('search-form')!;
const addressInput = document.getElementById('address-input')! as HTMLInputElement;

const GOOGLE_API_KEY = 'YOUR_KEY_IS_HERE';

type GoogleGeoResponse = {
  results: {
    geometry: {
      location: {
        lat: number,
        lng: number
      }
    }
  }[],
  status: 'OK' | 'ZERO_RESULTS'
};

function createUrl(enteredAddress: string): string {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  
  axios.get<GoogleGeoResponse>(createUrl(enteredAddress), )
    .then(response => {
      if(response.data.status !== 'OK') {
        throw new Error('Cannot get Geometry.....')
      }
      const cordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(mapArea, {
        center: cordinates,
        zoom: 16
      });
      new google.maps.Marker({position: cordinates, map: map});
    })
    .catch(err => {
      alert(err.message)
    });
};

form.addEventListener('submit', searchAddressHandler)