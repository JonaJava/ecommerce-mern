const {Order} = require("../../Models/Order")
const { MercadoPagoConfig, Preference } = require ('mercadopago')

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-5778466025830136-071515-2a2725c1f222361160a7662203aa25bc-1903525432', options: { timeout: 5000, idempotencyKey: 'abc' } });

exports.fetchOrdersByUser = async (req,res) => {
  
   
    const {id} = req.user;
    
    try{
const orders = await Order.find({ user:id });
//const result = await orders.

res.status(200).json(orders) 
    }catch(err){
        res.status(400).json(err)
    }
}
exports.fetchAllOrders = async (req, res) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let query = Order.find({deleted:{$ne:true}});
    let totalOrdersQuery = Order.find({deleted:{$ne:true}});
  
    
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
  
    const totalDocs = await totalOrdersQuery.count().exec();
    console.log({ totalDocs });
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.set('X-Total-Count', totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };



exports.createOrder = async (req, res) =>{
    const order = new Order(req.body);
    try{
        const doc = await order.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json(err)
    }
}

exports.deleteOrder = async (req, res) =>{
    const {id} = req.params;
    try{
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateOrder = async (req,res) => {
    const {id} = req.params;
    try{
        const order = await Order.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.status(200).json(order);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.createPreference = async (req,res) => {
   let value =   req.body.order.items;
console.log(value[0].id)
    
  const body = {
   back_urls:{
success :'http://localhost:3000/order-success/'+value[0].id
   },
   "auto_return": "approved",
        items: [
        
        ],
    
    };

    
    for (let i = 0; i < value.length; ++i)
        {
         body.items.push({quantity:value[i].quantity,unit_price:value[i].product.price,description:value[i].product.title})
        }


    try {
        const preference = await new Preference(client).create({ body });
      
        res.json({redirectUrl: preference.init_point});
    } catch (error) {
        res.json(error);
    }

    
}