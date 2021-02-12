import ResponseModel  from "../../src/model/ResponseModel";


const colocanacestinha = (cestinha) => new Promise(resolve => {
   fetch('https://app.diwoapp.com.br/whitela/ws/criaprodutosarray.php', {
      method: 'POST',
      body: JSON.stringify({data: cestinha}),
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

const ColocaProdutosNaCestaService = {
  colocanacestinha
}

export default ColocaProdutosNaCestaService
