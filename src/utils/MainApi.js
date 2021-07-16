class MainApi {
    constructor(options) {
      this.options=options;
    }
  
    _check(res){
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getInitialCards() {
      return fetch(`${mainApi.options.baseUrl}/movies`, {
        "credentials": "include",
        headers: this.options.headers
      })
      .then(res => {
        return this._check(res)
  
      })
    
    }
    
    initProfileFomServer(){
      return fetch(`${mainApi.options.baseUrl}/users/me `, {
        "credentials": "include",
        headers: this.options.headers
      })
      .then(res => {
        return this._check(res)
      })
    }
  
    postCardToServer(data){
      return fetch(`${mainApi.options.baseUrl}/movies`, {
        "credentials": "include",
        headers: this.options.headers,
        method: 'POST',
        body: JSON.stringify({
          "country": data.country,
          "director": data.director,
          "duration": data.duration,
          "year": data.year,
          "description": data.description,
          "image": 'https://api.nomoreparties.co'+data.image.url,
          "trailer": data.trailer,
          "thumbnail": 'https://api.nomoreparties.co'+data.thumbnail.url,
          "movieId": data.id,
          "nameRU": data.nameRU,
          "nameEN": data.nameEN,
        })
      })
      .then(res => {if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  
    postLoginToServer(profileName,profileEmail,buttonName){
      return fetch(`${mainApi.options.baseUrl}/users/me`, {
        method: 'PATCH',
        "credentials": "include",
        headers: this.options.headers,
        body: JSON.stringify({
          name: profileName,
          email: profileEmail
        })
      })
      .then(res => {
        return this._check(res)
      })
    }
  
    deleteCardFromServer(cardId){
      return fetch(`${mainApi.options.baseUrl}/movies/${cardId}`, {
        "credentials": "include",
        method: 'DELETE',
        headers: this.options.headers,
        body: JSON.stringify({})
      })
      .then(res => {
        return this._check(res)
      })
    }  
  }
  //api front
  const mainApi = new MainApi({
    baseUrl: 'https://api.diplom.students.nomoredomains.club',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }); 
  
  export {mainApi};