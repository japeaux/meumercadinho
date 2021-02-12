import ResponseModel  from "../../src/model/ResponseModel";


const updatepedido = (pedido) => new Promise(resolve => {
  console.log(pedido)
  //status , idpedido, datademodificacao
   fetch('https://app.diwoapp.com.br/updatepedidobyid.php', {
      method: 'POST',
      body: JSON.stringify(pedido),
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

const UpdatePedidoService = {
  updatepedido
}

export default UpdatePedidoService
