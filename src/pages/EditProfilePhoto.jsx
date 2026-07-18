import { useState } from "react"

export default function EditProfilePhoto() {

    let [file, setFile] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('value: ', e.target.files);
    }

    return (<>
        <h1>Edit Profile Photo</h1>
        <form onSubmit={handleSubmit}>
            <input type='file' accept="image" name="avatar"/>
            <button>submit</button>
        </form>
    </>)
}