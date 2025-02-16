"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {

    try{
        const user = await currentUser();
        if (!user) {
            return {
                error: 'User not found',
                status : 403
             }
        }

        const userExist = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include : {
                PurchasedProjects : {
                    select : {
                        id : true
                    },
                },
            },
         });

         if(userExist){
                return {
                    user : userExist,
                    status : 200
                }
         }

            const newUser = await client.user.create({
                data : {
                    clerkId : user.id,
                    email : user.emailAddresses[0].emailAddress,
                    name : user.firstName + ' ' + user.lastName,
                    profileImage : user.imageUrl,
                }
            });
            
            if(newUser){
                return { 
                    status : 201,
                    user : newUser,
                }
            }
            return {
                status: 400,
            }
    }catch(error){
        console.log("Error",error);
        return {
            status : 500,            
        }
    }
}


         
