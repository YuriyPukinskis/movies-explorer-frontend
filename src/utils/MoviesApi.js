class Api {//буква длжна быть мала
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
    return fetch(`${this.options.baseUrl}/beatfilm-movies`, {
     // headers: this.options.headers
     })
    .then(res => {
      return this._check(res)
    })
  }  
} 

  //api front
  const moviesApi = new Api({
    baseUrl: ' https://api.nomoreparties.co',
    headers: {
      // 'Authorization': `ece4ec17-0364-4590-98d8-28086b7fa384`,
      'Content-Type': 'application/json'
    }
  }); 
  
  export {moviesApi};