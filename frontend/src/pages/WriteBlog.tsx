import './WriteBlog.css';
import { LoginNavbar } from '../components/LoginNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
export const WriteBlog = () =>{
    const isWriting = true;
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    // console.log(selectedFile)
    const handleFileUpload = async (event:any) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
        const formData = new FormData();
        formData.append('file', file); // Direct file object

        try {
            const response = axios.post(`${BACKEND_URL}/api/v1/blog/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: localStorage.getItem("token")
                }
            })
            console.log(await response);
        } catch (error) {
            console.error('Error:', error);
        }
        }
    };

    const fetchImage = async () => {
        
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/image`, {
              headers: {
                Authorization: localStorage.getItem("token")
              },
              responseType: 'arraybuffer',
            //   responseType: 'blob'
            });
            
            // const response = res.data;
            console.log(res)
    
            // const imgUrl = await URL.createObjectURL(response);
            // setImageSrc(imgUrl);
            const blob = new Blob([res.data], { type: 'image/png' });
            console.log(blob)
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
            console.log(imageUrl)
          } catch (error) {
            console.error('Error fetching image:', error);
            // Handle error gracefully
          }
    };

    useEffect(() => {
        // Fetch image data from Cloudflare Worker
        fetchImage();

        // Cleanup function to revoke the object URL when component unmounts
    }, []);

    
    return(
        <div className="write-blog">
            <LoginNavbar isWriting={isWriting}/>
            <div className="write-container">
                <form action="/" method="post" encType="multipart/form-data">
                    <div className="top">
                        <input type="text" placeholder='Title' />
                        <textarea placeholder='Tell your story...' />
                    </div>
                    <div className="bottom">
                        <div className="f-left">
                            Featured Image
                            <input type="file" onChange={handleFileUpload} name="imageUpload" id="" />
                            <button type="submit" >Publish</button>
                        </div>
                        <div className="f-right">
                            <img src={imageSrc} alt="" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}