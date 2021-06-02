const API_KEY = '21863084-959da1d2b923417f2b76bc063';

export default {
    searchQuery: '',
    page: 1,

    async fetchPictures(){

    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
    
    const response = await fetch(url);
    const pictures = await response.json();

    this.incrementPage();
    
    return  pictures;
    },
    
    incrementPage(){
        this.page += 1;
    },
    
    get query(){
        return this.searchQuery;
    },

    set query(newQuery){
        this.searchQuery = newQuery;
    },

    resetPage(){
        this.page = 1;
    },
}