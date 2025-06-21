import {StreamChat} from "stream-chat";

import "dotenv/config"

const apiKey=process.env.STEAM_API_KEY;
const apisecret=process.env.STREAM_API_SECRET;

if(!apiKey || !apisecret){
    console.error("api or secret is missing");


}
const streamclient=StreamChat.getInstance(apiKey,apisecret);
export const upsertStreamUser=async(userData)=>{
    try{
        await streamclient.upsertUsers([userData]);
        return userData;
    }catch(error){
        console.error("error upserting stream user:",error);
    }
};

export const generateStreamToken=(userId)=>{};