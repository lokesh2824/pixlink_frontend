import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home=()=> {
    const [data,setData] = useState([])

    useEffect(()=>{
        axios.get('https://pixlink-backend.onrender.com/allposts',{
            headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        }).then(res=>{
            // console.log(res.data.posts)
            setData(res.data.posts)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])


    const handleDownload = (imageUrl) => {
            axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'blob',
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                // console.log(url);
                // Check if the device is Android
        if (navigator.userAgent.toLowerCase().includes('android')) {
            // For Android devices
            const downloadButton = document.createElement('a');
            downloadButton.href = url;
            downloadButton.setAttribute('download', 'image.jpg');
            downloadButton.style.display = 'none';
            document.body.appendChild(downloadButton);
            downloadButton.click();
            document.body.removeChild(downloadButton);
        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // For Internet Explorer and Edge
            window.navigator.msSaveBlob(response.data, 'image.jpg');
        } else {
            // For other devices (including Windows)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'image.jpg');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        })
            .catch(error => {
                console.log(error);
            });
        };
    return (
        <div className='home' >
            {
                data.map((pic)=>{
                    return(
                    <div className='card home-card' key={pic._id}>
                        <h5 className='upload-by'>{pic.postedBy.name}</h5>
                        <div className='card-image'>
                            <img src={pic.photo}/>
                        </div>
                        <div className='card-context'>
                            <h6>{pic.title}</h6>
                            <p>{pic.body}</p>
                            {/* <form 
                                //onSubmit={(e)=>{
                                //e.preventDefault()
                                //console.log(e.target[0].value)
                                // makeComment(e.target[0].value,pic._id) }}
                                >
                            <input type='text' placeholder='comment'></input>
                            </form> */}
                            <button onClick={()=>handleDownload(pic.photo)} className="btn waves-effect waves-light download" id='download' >Download </button>
                            
                        </div>
                    </div>
                    )
                
                })
            }
            
            
        </div>
    )
}


export default Home;