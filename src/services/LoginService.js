import ResponseModel  from "../../src/model/ResponseModel";

const login = (login, senha) => new Promise(resolve => {

  fetch('https://app.diwoapp.com.br/whitela/ws/entraconta.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contato: login,
        password: senha,
      }),
    })
      .then(response => response.json())
      .then(response => {
        // AsyncStorage.setItem('user',JSON.stringify(response));
        const resp = ResponseModel()
       
        resp.status = 200
        resp.message = 'Sucesso'
        resp.data = JSON.stringify(response[0])

        resolve(resp)

     
      })
      .catch(error => {
  
         const resp = ResponseModel()
         resp.status = 500
         resp.message = 'Não foi possível completar login, senha ou contato inválido'
         

        resolve(resp);
      });


  
})

const LoginService = {
  login
}

export default LoginService
