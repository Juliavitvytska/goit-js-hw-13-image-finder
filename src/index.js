import './sass/main.scss';
import { error } from '@pnotify/core';
import  '../node_modules/@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import _ from 'lodash';

import picturesApiService from './js/apiService';
import listTpl from './templates/cards-list.hbs';

const refs = {
    searchForm: document.querySelector('.search-form'),
    btn: document.querySelector('[data-action="load-more"]'),
    container: document.querySelector('.js-pictures-container'),
}

refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));
refs.btn.addEventListener('click', onLoadMore);

async function onSearch(e){
    e.preventDefault();
    refs.container.innerHTML = '';
    picturesApiService.resetPage();

    picturesApiService.query = e.target.value;

    if(picturesApiService.searchQuery.trim() ===''){
        error({ text: "Please enter a more specific request!", maxTextHeight: null, delay: 3000 });
        return;
        }
        try {
            const data = await picturesApiService.fetchPictures();
            firstRenderPictures(data);
        } catch {
            console.log('error');
        }
}

async function onLoadMore(e){
    e.preventDefault();
    
    const data = await picturesApiService.fetchPictures();
    renderPictures(data);
}


function firstRenderPictures(picture){
    const markup = listTpl(picture);
    refs.container.insertAdjacentHTML('beforeend', markup);
}

function renderPictures(picture){
const markup = listTpl(picture);
refs.container.insertAdjacentHTML('beforeend', markup);
refs.container.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
}
