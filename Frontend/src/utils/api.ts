import axios from "axios";
// import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_BASE_URL;
// const {validate}=useAuth();
const validate = (() => {
    axios.get((`${API_URL}/api/auth/stillAuthorized`), {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).catch((res) => {
      const status = res.status;
      if (status == 401) {
        axios.get((`${API_URL}/api/auth/getToken`), {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }).then((res) => {
          // console.log("hio");
          // console.log(res);
          if(res.status==200)
            localStorage.setItem("token", res.data.newAcessToken);
        }).catch(()=>{
        //   localStorage.setItem("token","");
        });
      }
    });
  });
const token = localStorage.getItem("token");
// console.log(token);
export const saveData = async (formData, setSubmitting, id = null) => {
    let Config = {
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`

        },
    };
    formData.editId = id;
    formData.orgId="1";
    console.log(formData);
    if (id == null)
        formData.editId = "1";
    // console.log(formData)
    formData.Files = formData.candidatePhoto;
    // console.log(formData);
    try {
        const url = `${API_URL}/api/Employees`;
        validate();
        const response = await axios.post(url,
            formData,
            Config);
        // console.log(response);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        setSubmitting(false);
    }
};

export const deleteData = async (id: string) => {
    // console.log(id);
    let Config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };
    try {
        validate();
        const response = await axios.post(`${API_URL}/api/Employees/delete`,
            id,
            Config
        );
        // console.log(response);
    } catch (e) {
        console.error(e);
    }
};