import ResponseModel  from "../../src/model/ResponseModel";


const updateproduto = (produto) => new Promise(resolve => {
  console.log(produto)
  //status , idpedido, datademodificacao
   fetch('https://app.diwoapp.com.br/whitela/ws/updateprodutobyid.php', {
      method: 'POST',
      body: JSON.stringify(produto),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    
    })
      .then(response => response.json())
      .then(response => {
        // AsyncStorage.setItem('user',JSON.stringify(response));
        const resp = ResponseModel()
       
        resp.status = 200
        resp.message = 'Sucesso'
        resp.data = JSON.stringify(response)

        resolve(resp)

     
      })
      .catch(error => {
        console.log(error)
         const resp = ResponseModel()
         resp.status = 500
         resp.message = error.message
         resp.data = JSON.stringify(error)
     

        resolve(resp);
      });


  
})

const UpdateProdutoService = {
  updateproduto
}

export default UpdateProdutoService
