import mongoose from "mongoose";

const habitlogSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    habitId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Habit",
        required:true,
        index:true
    },
    completedDate:{
        type:String,
        required:true,
    }, //yyyy-dd-mm
    notes:{
        type:String,
        default:""
    }
},
{
    timestamps:true
})

habitlogSchema.index(
    {userId:1, habitId:1, completedDate:1},
    {unique:true}
)

export default mongoose.models.HabitLog ||
  mongoose.model("HabitLog",habitlogSchema);