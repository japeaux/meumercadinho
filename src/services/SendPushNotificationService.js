import ResponseModel  from "../../src/model/ResponseModel";


const SendPushNotification = (msg) => new Promise(resolve => {
  console.log(msg)

   fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        host: 'exp.host',
        'accept-encoding': 'gzip, deflate',
      },
      body: JSON.stringify({                 
              to: msg.devicetoken,                        
              title: msg.title,                  
              body: msg.body,             
              priority: "high",            
              sound:"default",              
              channelId:"default",   
                  }),
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

const SendPushNotificationService = {
  SendPushNotification
}

export default SendPushNotificationService
