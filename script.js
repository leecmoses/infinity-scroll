"use strict";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API
const query = "dogs";
const count = 10;
const apiKey =
  "82546cb4b2c6e97dc19878497a67265f6627936b0240b7285d97ba7cbba87b1e";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
// Only needed for Option #2
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = (arr) => {
  // Run function for each object in arr
  arr.forEach((photo) => {
    // Option #1
    // const el = `
    //     <a href=${photo.links.html} target="_blank">
    //         <img
    //             src=${photo.urls.regular}
    //             alt=${photo.alt_description}
    //             title=${photo.alt_description}
    //         />
    //     </a>`;
    // imageContainer.insertAdjacentHTML("beforeend", el);

    // Option #2
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    console.log(item);

    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos(photosArray);
  } catch (error) {}
}

// On Load
getPhotos();
