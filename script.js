"use strict";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
const query = "dogs";
const initialCount = 5;
const apiKey =
  "82546cb4b2c6e97dc19878497a67265f6627936b0240b7285d97ba7cbba87b1e";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${initialCount}`;

const updateApiUrlWithNewCount = (newCount) => {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${query}&count=${newCount}`;
};

// Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;

  if (imagesLoaded == totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// Helper Function to Set Attributes on DOM Elements
// Only needed for Option #2
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = (arr) => {
  imagesLoaded = 0;
  totalImages = photosArray.length;

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

    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos(photosArray);

    if (isInitialLoad) {
      updateApiUrlWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {}
};

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
// On Load
getPhotos();
