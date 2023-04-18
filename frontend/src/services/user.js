import api from "./axiosClient.js";

export const user = {
  async getAll() {
    const { data } = await api.get("/users");
    return data;
  },
  async createOne({ name, pwd }) {
    const { data } = await api.post("/users", { name, pwd});
    return data;
  },
  async login({name,pwd}){
    console.log("in user.js async login")
    console.log(name)
    console.log(pwd)
    const { data } = await api.post("/users/login", {name,pwd});
    return data;
  }
};
