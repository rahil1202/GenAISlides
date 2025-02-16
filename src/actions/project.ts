"use server";

import { onAuthenticateUser } from "./user";
import { client } from "@/lib/prisma";

export const getAllProjects = async () => {

   try{
     const checkUser = await onAuthenticateUser()

     if(checkUser.status === 200 || checkUser.status ){
        return {
            status : 403,
            error : "User Not Authenticated"
        }       
   }

   const projects = await client.project.findMany({
      where : {
            userId : checkUser.user.id,
            isDeleted : false,
      },
    });

    if(projects.length === 0){
        return {
            status : 404,
            error : "No Projects Found"
        }
    }

    return {
        status : 200,
        data: projects,
    }

 } catch(error){    
    console.log("Error", error)
    return {
        status : 500,
        error : "Internal Server Error: " + error,        
    }
 }

}