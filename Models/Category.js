const mongoose = require('mongoose');
const {Schema} = mongoose; 

const categorySchema =  new Schema ({
label:{type:String ,required:true ,unique:true },
value:{type:String, require:true,unique:true},


})

//virtual no se almacena en db , mongodb crea id automaticamente, sin embargo  necesito id para manipular

const virtual = categorySchema.virtual('id');
virtual.get(function(){
    return  this._id;
})

categorySchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret) {delete ret._id}
})



exports.Category = mongoose.model('Category', categorySchema)// exporto esquema nombre Category
