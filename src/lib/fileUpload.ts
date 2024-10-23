import axios, { AxiosResponse } from "axios"
const apiKey  = 'd8e01e2435e9645f418e345f28a398e4'
interface FileUploadProps {
    frontPartDoc: File
    backPartDoc: File
    secondaryKycDocument: File
    secondaryKycFace: File
}
export const uploadFilesImgBB = async ({
    frontPartDoc,
    backPartDoc,
    secondaryKycDocument,
    secondaryKycFace,
}: FileUploadProps) => {
    let res: any = {}     
    if (frontPartDoc) { 
        const formData = new FormData();
        formData.append('image', frontPartDoc as Blob) 
        const responseImgBB = await imgBBApi(formData);
        res.frontPartDoc = responseImgBB?.data.display_url
    } 
    if (backPartDoc) {
        const formData = new FormData();
        formData.append('image', backPartDoc as Blob);
        const responseImgBB = await imgBBApi(formData);
        res.backPartDoc = responseImgBB?.data?.display_url
    }
    if (secondaryKycDocument) {
        const formData = new FormData();
        formData.append('image', secondaryKycDocument as Blob);
        const responseImgBB = await imgBBApi(formData);
        res.secondaryKycDocument = responseImgBB?.data.display_url
    } 
    if (secondaryKycFace) {
        const formData = new FormData();
        formData.append('image', secondaryKycFace as Blob);
        const responseImgBB = await imgBBApi(formData);
        res.secondaryKycFace = responseImgBB?.data.display_url
    }
    return res
};

const imgBBApi = async (formData: FormData) => {
    const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return res.data;
}