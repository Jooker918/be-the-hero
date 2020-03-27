const connection = require('../database/connection')

module.exports ={

    async index(request,response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count()
        
        

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')// inner join 
        .limit(5) //limita o tanto de resultado que irá mostrar
        .offset((page -1)* 5) //5 resultado por cada pagina 
        .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'])//aqui estou definindo quais valores eu quero selecionar de cada tabela

        response.header('X-Total-Count',count['count(*)'])
        return response.json(incidents);
    },


    async create(request,response){
        const {title, description,value} = request.body;
        const ong_id= request.headers.authorization; //geralmente a autenticação acontece no header(cabeçalho)/ aqui estamos pegando o "id" de qual ong esta cadastrando um caso
        
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id })
    },
    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;


        const incident = await connection('incidents')
        .where('id',id)// busca um incidente onde o "id" for igual ao id da requisição
        .select('ong_id')// seleciona somente a coluna 'ong_id'
        .first();

        if(incident.ong_id != ong_id){
           return response.status(401).json({ error :'Operation not permitted'})

        }
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();


    }
};