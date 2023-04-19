import api from "./axiosClient";

export const auth = {
  async getCsrf() {
    const {
      data: { csrfToken },
    } = await api.get("/users/csrf-token");
    return { csrfToken };
  },
  async login(formData) {
    try{
      const {data: { user, token }} = await api.post("/users/login", formData); 
      
      localStorage.setItem("jwtToken", token);

  //console.log(user.img)
 
      localStorage.setItem("callid", user.id);
      localStorage.setItem("callname", user.name);
      localStorage.setItem("callpwd", user.pwd);
      localStorage.setItem("callimg", user.img);

      return user
  }
    catch(e){
      return e.response.data;
    }
  },
};
