const connection = require('../database/connection');

module.exports = {

    async list(request, response){

        const incidents = await connection('incident').select('*');

        return response.json(incidents);

    },

    async create(request, response){

        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.status(201).send();

    },

    async delete(request, response){

        const ong_id = request.headers.authorization;

        
        const { id } = request.params;

        console.log(id);

        const incident = await connection('incident')
        .where('id',id)
        .select('ong_id')
        .first();

        console.log(incident);        

        if (incident==undefined || incident.ong_id != ong_id){
            response.status(401).json({error: 'Operation not permitted.'});
        }
        
        await connection('incident').where('id',id).delete();

        return response.status(204).send();

    }



}