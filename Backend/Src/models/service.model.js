import { Destination } from "./destination";

const service = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        enum: ['hotel', 'transportation', 'tour guide']
    },
    destinationRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Destination,
        required: true
    },
    providerRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true
    },
    price:{
        type:Number,
        required:true,
    },
    Availability:{
        type:String,
        enum:["rooms","seats","vehicles"],
        default:"rooms",
    },
    serviceStatus:{
        type:String,
        enum:["active","inactive"],
        default:"inactive",
    },
    mediaUrl:{
        type:String,

    },
    created:{
        type:Date,
        default:Date.now,
    }
},
{    timestamps:true,}
)
export const Service = mongoose.model("Service", service);
