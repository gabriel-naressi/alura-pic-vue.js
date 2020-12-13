export default class FotoService {
    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    lista() {
        return this._resource
            .query()
            // response.json() retorna uma promise.
            .then(response => response.json());
    }

    cadastra(foto) {
        return this._resource.save(foto);
    }

    apaga(id) {
        //{ id : id } equivale a { id }
        return this._resource.delete({ id })
    }
}