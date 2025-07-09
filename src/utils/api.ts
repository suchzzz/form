import axios from "axios";
import { bloodGroupEnum, maratialStatusEnum, statusEnum, roleTypeEnum } from "./formItems";
const API_URL = import.meta.env.VITE_BASE_URL;

export const saveData = async (formData, setSubmitting, id = null) => {
    let Config = {
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
        },
        // responseType: "blob"
    };
    // if(formData.candidatePhoto)
    // {

    // }

    formData.editId=id;
    if(id==null)
        formData.editId="1";
    console.log(formData)
    // const data = {
    //     id,
    //     formData
    // }
    // formData.files={
    //     candidatePhoto:formData.candidatePhoto,
    //     candidateSign:formData.candidateSign
    // }
    formData.Files=formData.candidatePhoto;
    try {
        const url = `${API_URL}/api/Employees`;
        const response = await axios.post(url,
            // data,
            formData,
            Config);
        console.log(response);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        setSubmitting(false);
    }
};

export const deleteData = async (id: string) => {
    console.log(id);
    let Config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        // console.log(id);
        const response = await axios.post(`${API_URL}/api/Employees/delete`,
            id,
            Config
        );
        console.log(response);
    } catch (e) {
        console.error(e);
    }
};