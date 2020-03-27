const connection = require('../database/connection')
const crypto = require('crypto')


module.exports = {

    async index(request, response)  {//routa para lista as ongs

         const ongs = await connection('ongs').select('*');
        
         return response.json(ongs);

      },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX')//gera 4bytes de caracteris decimais, e converte para hexa
    
        //inserindo os dados na tabela
        //"await -> aguarda a resposta "
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });
    }
}