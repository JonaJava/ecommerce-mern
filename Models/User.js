const mongoose = require("mongoose");
const {Schema} = mongoose
const userSchema = new mongoose.Schema( //clase para guardar en db
  {
    email: {
      type: String,
      required: [true, "Email es requerido"],
      trim: true,
      unique:true
    },
    password: {
      type: String,
      required: [true, "Password es requerido"],
      trim: true,
    },
    role:{type:String, require:true, default:'user'},
    addresses:{type:[Schema.Types.Mixed]},
    name:{type:String},
    orders:{type:[Schema.Types.Mixed]}

    
  },
);

const  virtual = userSchema.virtual('id');
virtual.get(function(){
  return this._id
})
userSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform:function(doc,ret) {delete ret._id}
})



exports.User = mongoose.model("User", userSchema);//interactuar con db metodos

