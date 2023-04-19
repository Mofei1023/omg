import api from "./axiosClient";
export const user = {
async getAll() {
const { data } = await api.get("/users");
return data;
},
async createOne({ name, pwd, img }) {
   // console.log({ name, pwd, img })
    const { data } = await api.post("/users", { name ,pwd, img });
    return data;
  },

};

