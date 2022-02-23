const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;



let PostSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 150
    },
    productname: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 150
    },
    category:{
        type: Object,
    },
    subcategory:{
        type: Object,
    },
    body: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 2000
    },
    postedBy: {
        type: ObjectId,
        ref: "user"
    },
    created: {
        type: Date, 
        default: Date.now
    },
    name: {
        type: Object
    },
    size: {
        type: Object
    },
    key: {
        type: Object
    },
    url: {
        type: Object
    },
    likes: [{
        type: ObjectId, 
        ref: "user"
    }],
    rating: {
        type: Number,
        default: 0
    },
    productId: String,
    comments: [{
        text: String, 
        created: {type: Date, default: Date.now},
        postedBy: {
            type: ObjectId,
            ref: "user",
        },
    }],
},
{
    timestams: true,
}
);




const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;