import api from "./axiosClient";

export const auth = {
  async getCsrf() {
    const {
      data: { csrfToken },
    } = await api.get("/csrf-token");
    return { csrfToken };
  },
  async login({name,pwd}){
    try{
      const { data } = await api.post("/users/login", {name,pwd});
      //localStorage.setItem('jwtToken',data.token)
      return data;
    }
    catch(e){
      return e.response.data;
    }
  }
};
