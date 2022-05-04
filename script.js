"use strict";

const imageContainer = document.getElementById("image-container");
// Unsplash API
const count = 10;
const apiKey =
  "82546cb4b2c6e97dc19878497a67265f6627936b0240b7285d97ba7cbba87b1e";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
    data.forEach((photo) => {
      const el = `<img src=${photo.urls.regular} alt=${photo.description}/>`;
      console.log(el);
      imageContainer.insertAdjacentHTML("beforeend", el);
    });
  } catch (error) {}
}

// On Load
getPhotos();
