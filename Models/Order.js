const mongoose = require('mongoose');
const {Schema} = mongoose; 

const orderSchema =  new Schema ({
items:{type:[Schema.Types.Mixed], require:true},
totalAmount:{type:Number},
totalItems:{type:Number},
user:{type:Schema.Types.ObjectId , ref:'User', require:true},
paymentMethod:{type:String, require:true},
status:{type:String, default:'pendiente'},
selectedAddress:{type:Schema.Types.Mixed, require:true}

})

//virtual no se almacena en db , mongodb crea id automaticamente, sin embargo  necesito id para manipular

const virtual = orderSchema.virtual('id');
virtual.get(function(){
    return  this._id;
})

orderSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret) {delete ret._id}
})



exports.Order  = mongoose.model('Order', orderSchema)
