//Фронт auth
export const BASE_URL = 'https://api.diplom.students.nomoredomains.club';
export const register = (name, password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    "credentials": "include",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, password, email})
  })
  .then((response) => {
    try {
      if (response.status === 201){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res;
  })
};

export const authorize = (email, password,handleFailedLogin) => {
    
    return fetch(`${BASE_URL}/signin`, {
      "credentials": "include",
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((response => response.json()))
    .then((data) => {
      if (data){
        if (data.token){
          localStorage.setItem('token', data.token);
          localStorage.setItem('mail', email);
          alert('Вы вошли!');
          console.log(data.token)
          return data;
        } else {
         console.log('токен не добавлен');
         handleFailedLogin()
        }
      }
      else{
        alert('here we are')
      }
       }) 
  };

  export const getContent = (token) => {
    
    console.log(token)
    return fetch(`${BASE_URL}/users/me`, {
      "credentials": "include",
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  } 
