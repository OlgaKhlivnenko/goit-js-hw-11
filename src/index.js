// import '../css/styles.css';
import Notiflix from 'notiflix';
import axios from "axios";
// Your API key: 24781056-75ab6f95c382245b51e5e78bf
const formEl = document.querySelector('.search-form');
const btnSearch = document.querySelector('[type="submit"]');
console.log(btnSearch);
const btnMoreLoad = document.querySelector('.load-more');
const galleryConteiner = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);

btnMoreLoad.addEventListener('click', onLoadMore);

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    axios.get('https://pixabay.com/api/')
  .then(function (response) {
    // handle success
    console.log(response);
  })

}
function onLoadMore(evt) {
    console.log(evt);
}

function markupCards(searchName) {
    // galleryConteiner.innerHTML = '';
   return  galleryConteiner.innerHTML = searchName
        .map(({ webformatURL, likes, views, comments, downloads, }) =>
            `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
    ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
    ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
    ${downloads}
    </p>
  </div>
</div>`).join('');
};
