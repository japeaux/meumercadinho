import ResponseModel  from "../../src/model/ResponseModel";


const uploadimg = (img) => new Promise(resolve => {
  console.log(img)
   fetch('https://app.diwoapp.com.br/uploadprodutoimg.php', {
      method: 'POST',
      body: img,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    
    })
      .then(response => response.json())
      .then(response => {
        // AsyncStorage.setItem('user',JSON.stringify(response));
        const resp = ResponseModel()
        console.log(response)
        resp.status = 200
        resp.message = 'Sucesso'
        resp.data = JSON.stringify(response)

        resolve(response)

     
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

const UploadIMGService = {
  uploadimg
}

export default UploadIMGService
