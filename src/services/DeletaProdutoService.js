import ResponseModel  from "../../src/model/ResponseModel";


const deletaproduto = (idproduto) => new Promise(resolve => {
  console.log(idproduto)
   fetch('https://app.diwoapp.com.br/whitela/ws/deletaproduto.php', {
      method: 'POST',
      body: JSON.stringify({idproduto: idproduto}),
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data'
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

const DeletaProdutoService = {
  deletaproduto
}

export default DeletaProdutoService
