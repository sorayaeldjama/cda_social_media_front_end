import React, { useState } from 'react'
import { useEffect } from "react";
import "./update.scss";
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upload } from '@testing-library/user-event/dist/upload';
import { Description } from '@mui/icons-material';


const Update = ({setOpenUpdate,user}) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    console.log("Update component mounted");
  }, []);
  const [profile, setProfile] = useState(null);
  const [cover,setCover]=useState(null)
  const [texts, setTexts]=useState({
name : "",
city:"",
website:"",
  });

  console.log("user",user)

  const upload = async (file) => {
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };
  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );


  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl=user.coverPicture; 
    let profileUrl=user.profilePicture; 

    console.log("je susi dans click updta")
    coverUrl = cover ? await upload(cover) : user.coverPicture;
    profileUrl = profile ? await upload(profile) : user.profilePicture;
    
    console.log(coverUrl,"cover url")
    mutation.mutate({...texts,coverPicture : coverUrl ,profilePicture:profileUrl });
    setOpenUpdate(false);
    // if(file) imgUrl = await upload();
    // mutation.mutate({Description,image : imgUrl})
  }



  return (
    <div className="update">Update 
    <form action="">
      <input type="file"   onChange={(e) => setCover(e.target.files[0])} />
      <input type="file" 
             
              onChange={(e) => setProfile(e.target.files[0])} />
      <input type="text" name='name' onChange={handleChange}/>
      <input type="text"  name='city' onChange={handleChange}/>
      <input type="text"  name='website' onChange={handleChange} />
      <button onClick={handleClick}>Update</button>

    </form>
      <button onClick={()=>setOpenUpdate(false)}>x</button>
    </div>
  )
}

export default Update