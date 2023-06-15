import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home=()=> {
    const [data,setData] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/allposts',{
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
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'image.jpg');
                // console.log(link.href);
                document.body.appendChild(link);
                // console.log(link)
                // <a href="blob:http://localhost:3000/d9c739a3-a925-46fd-a2b0-44ca2ca7f917" download="image.jpg"></a>
                link.click();
                link.remove();
            })
            .catch(error => {
                console.log(error);
            });
        };

    // const makeComment =(text,postId)=>{
    //     axios.get('http://localhost:5000/comment',{
    //         headers:{
    //                 "Content-Type":"application/json",
    //                 "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         },
    //     }).then(res=>{
    //         console.log(res.data)
            
    //     })  
    //     .catch(error=>{
    //         console.log(error) 
    //     })

    // }
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