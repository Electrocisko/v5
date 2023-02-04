export default class GenericRepository {
    constructor(dao,model) {
        this.dao = dao;
        this.model = model;
    }

    getAll = (params) => {
        return this.dao.getAll(params,this.model)
    }

    getBy = (params) => {
        return this.dao.findOne(params,this.model);
    }

    save = (data) => {
        return this.dao.save(data,this.model);
    }

    delete = (params) => {
        return this.dao.delete(params,this.model);
    }

    update = (id,data) => {
        return this.dao.update(id,data,this.model);
    }

    getLast = () => {
        return this.dao.last(this.model)
    }

    drop = (params) => {
        return this.dao.drop(params,this.model);
    }

    getByAndPopulate = (params,path) => {
        return this.dao.find(params,this.model).populate(path)
    }

}