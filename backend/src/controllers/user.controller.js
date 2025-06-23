import User from "../models/User.js";


export async function getRecommendedUsers(req,res){
    try{
        const currentUserId=req.user.id;
        const currentUser=req.user;

        const recommendedUsers=await User.find({
            $and:[
                {_id:{$ne:currentUserId}},
                {$id:{$nin:currentUser.friends}},
                {isOnboarded:true}

                

            ],

        });
        res.status(200).json(recommendedUsers);
    }catch(error){
        console.error("error in getrecommendedusers controller",error.message);
        res.status(500).json({message:"internal server error"});

    }
}

export async function getMyFriends(req,res){
    try{
        const user=await User.findById(req.user.id).select("friends")
        .populate("friends","fullName profilicPic nativeLanguage learningLanguage")

        res.status(200).json(user.friends);




    }catch(error){
        console.error("error in getMyFriends controller",error.message);
        res.status(500).json({message:"internal server error"});


    }
}

export async function sendFriendRequest(req,res){
    try{
        const myId=req.user.id;
        const {id:recipientId}=req.params;

        if(myId===recipientId){
            return res.status(400).json({message:"you cannot send friend request to yourself"});
        } 

        const recipient=await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message:"recipient not found"});
        }

        if(recipient.friendRequests.includes(myId)){
            return res.status(400).json({message:"you have already sent a friend request to this user"});
        }

        const updatedRecipient=await 


    }catch(error){

    }
}


