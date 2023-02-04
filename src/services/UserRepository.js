import GenericRepository from "./GenericRepository.js";
import User from "../models/User.js";

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao, User.model);
  }

  getUserByEmail = (email) => {
    return this.getBy({ email });
  };

  getUsers = () => {
    return this.getAll();
  };

  saveUser = (user) => {
    return this.save(user);
  };

  getUserById = (uid) => {
    return this.getBy(uid);
  };

  updateUser = (dataUser) => {
    return this.update({ _id: id }, { $set: dataUser });
  };
}
