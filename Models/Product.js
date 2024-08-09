const mongoose = require('mongoose');
const {Schema} = mongoose; 

const productSchema =  new Schema ({
title:{type:String ,required:true , },
description:{type:String, require:true},
price:{type:Number,min:[1,'Error minimo precio'], max:[10000,'Error maximo precio']},
discountPercentage:{type:Number,min:[1,'Error min descuento'], max:[99,'Error maximo descuento']},
rating:{type:Number,min:[0,'Error minimo rating'], max:[5,'Error maximo rating'],default:0},
stock:{type:Number,min:[0,'Error minimo stock'],default:0},
brand:{type:String , require:true},
category:{type:String , require:true},
thumbnail:{type:String , require:true},
images:{type:[String] , require:true},
delete:{type:Boolean , default:false}

})

//virtual no se almacena en db , mongodb crea id automaticamente, sin embargo  necesito id para manipular

const virtual = productSchema.virtual('id');
virtual.get(function(){
    return  this._id;
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret) {delete ret._id}
})
//toObject:{virtuals:true}//agregamos el objeto virtual json al objeto del modelo para accerder a el y manipularlo

/* Schema.virtual("fullname").get(function()=>{
    return this._id+'-'+this.name+' '+this.
}) */


exports.Product  = mongoose.model('Product', productSchema)
