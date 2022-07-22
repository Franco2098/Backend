const result = {}

process.on('message', (msg) => {
   console.log(msg);

   if(msg.start) {
      const amount = msg.amount
      for(let i = 0; i < amount; i++) {
         const number = Math.floor(Math.random() * 1000)
         result[number] = result[number] ? result[number] + 1 : 1
      }

      process.send({ result })
   }
})

