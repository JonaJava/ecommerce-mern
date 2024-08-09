const mongoose = require('mongoose');
const {Schema} = mongoose; 

const brandSchema =  new Schema ({
label:{type:String ,required:true ,unique:true },
value:{type:String, require:true,unique:true},


})

//virtual no se almacena en db , mongodb crea id automaticamente, sin embargo  necesito id para manipular

const virtual = brandSchema.virtual('id');
virtual.get(function(){
    return  this._id;
})

brandSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret) {delete ret._id}
})



exports.Brand  = mongoose.model('Brand', brandSchema)
