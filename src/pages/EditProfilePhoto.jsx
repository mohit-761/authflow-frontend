import { useContext, useEffect, useState } from "react"
import { updateProfilePhoto } from "../api/profile.api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function EditProfilePhoto() {

    let [file, setFile] = useState(null);
    let [previewUrl, setPreviewUrl] = useState("");
    let { userData, setUserData } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (userData?.avatar_url) {
            setPreviewUrl(userData.avatar_url);
        }
    }, [userData]);

    useEffect(() => {
        return () => {
            if (previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            if (!file) {
                alert("Please select an image.");
                return;
            }

            const formData = new FormData();

            formData.append("avatar", file);

            let response = await updateProfilePhoto(formData);

            setUserData(response.data);
            localStorage.setItem('userData', JSON.stringify(response.data));

            navigate('/profile', { replace: true })

        } catch (error) {

            let errorData = error.response?.data;

            alert(errorData.message);

        }

    }

    async function handleOnChange(e) {

        const selectedFile = e.target?.files[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);

        // FIXED CLEANUP: Revoke the old URL before generating a new one
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);

        /**
         * this line "URL.revokeObjectURL(objectUrl)"
         * is use full for memory management.
         * so when the user selects new image
         * it tells the browser leave the last image
         * so it frees the ram. because if user selects
         * a image so browser directly uploads them on the
         * computers memory until they completely close or
         * refresh the browser tab. If a user selects
         * 10 high resolution images then all the images
         * are using the computers ram which can slow down
         * the app or crash the browers tab.
         * 
         * if we are returning this "URL.revokeObjectURL(objectUrl)"
         * from an evenHandler like onChange then react will completely
         * ignore it.
         * It only works inside a React hook like useEffect.
         * So in this case we need to revoke the previous URL
         * right before you create the new one.
         */

    }

    return (<>
        <h1>Edit Profile Photo</h1>
        <div style={{ margin: "1.5rem 0", display: "flex", justifyContent: "start" }}>
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Profile Preview"
                    width="150px"
                    height="auto"
                />
            ) : (
                <div>
                    please select an image to see the preview 📷
                </div>
            )}
        </div>
        <form onSubmit={handleSubmit}>
            <input id='avatar' type='file' accept="image/*" name="avatar" onChange={handleOnChange} />
            <button type='submit'>upload</button>
        </form>
    </>)
}