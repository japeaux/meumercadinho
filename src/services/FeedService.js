import ResponseModel  from "../../src/model/ResponseModel";

const feed = () => new Promise(resolve => {

  fetch('https://app.diwoapp.com.br/whitela/ws/feedproduto.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app: 'Minha horta',
      }),
    })
      .then(response => response.json())
      .then(response => {
        // AsyncStorage.setItem('user',JSON.stringify(response));

        let res = response.reduce((re, o) => {  
              let existObj = re.find(
                obj => obj.title === o.categoria
              )

              if (existObj) {
                existObj.data.push(o)
              } else {
                re.push({
                  title: o.categoria,
                  data: [o]
                })
              }
              return re
            }, [])

        const resp = ResponseModel()
       
        resp.status = 200
        resp.message = 'Sucesso'
        resp.data = JSON.stringify(res)
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

const FeedService = {
  feed
}

export default FeedService
