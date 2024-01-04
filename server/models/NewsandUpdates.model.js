const mongoose =  require('mongoose')


const NewsandUpdatesSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    timeofAdded:{
        type:Date,
        default:Date.now()
    },
    enable:{
        type:Boolean,
        default:false
    }
},{
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('NewsandUpdates',NewsandUpdatesSchema)