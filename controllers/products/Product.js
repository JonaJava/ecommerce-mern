const {Product} = require ('../../Models/Product.js')


exports.createProduct = async (req,res) => {
    //product viene desde el body de la api
    const product = new Product(req.body);//lo que ingresa el usuario
    try{
    const doc = await product.save();//doc document  retorna datos mongodb
        res.status(201).json(doc);//servidor response con los datos de la db en formato json
        
    }catch(err){
res.status(400).json(err);
    }

}
// toda variable con / viene desde mongodb
exports.fetchAllProduct = async (req,res) => {
    //todos los query string
    //filter ={"categoria":["smart", "lapto"]}
    //sort = {_sort:"price",_order="desc"}
    //pagination = {_page:1,_limit=10}
    let query = Product.find({deleted:{$ne:true}});//desclaro dato y su tipo
    let totalProductsQuery = Product.find({deleted:{$ne:true}});

    if(req.query.category){
       
      query = query.find({category:{$in:req.query.category.split(',')}});
      totalProductsQuery = totalProductsQuery.find({category:{$in:req.query.category.split(',')}})
    }

    if(req.query.brand){
        query = query.find({brand:{$in:req.query.brand.split(',')}});
        totalProductsQuery = totalProductsQuery.find({brand:{$in:req.query.brand.split(',')}})

    }
    if(req.query._sort && req.query._order){//sort manera de ordernar , order forma asc or desc
    
        query = query.sort({[req.query._sort]:req.query._order})

    }
    const totalDocs = await totalProductsQuery.count().exec();//obtengo total docs
//console.log(totalDocs)


    if(req.query._page  && req.query._limit){
        const pageSize = req.query._limit;
        const page = req.query._page 
        query = query.skip(pageSize*(page-1)).limit(pageSize);

    }


    try{
    const docs = await query.exec();//ejecuto query
        res.set ('X-Total-Count', totalDocs)//seteo var xtotalcount
    res.status(200).json(docs);//servidor response con los datos de la db en formato json
        
    }catch(err){
res.status(400).json(err);
    }

}

exports.fetchProductById = async (req,res) => {
    const {id} = req.params;
    try{
        const product = await Product.findById(id)
            res.status(201).json(product);//servidor response con los datos de la db en formato json
            
        }catch(err){
    res.status(400).json(err);
        }
}


exports.updateProduct = async (req,res) => {
    const {id} = req.params;
    try{
        const product = await Product.findByIdAndUpdate(id, req.body,{new:true})//new:true retorna el nuevo objeto modificado
            res.status(201).json(product);//servidor response con los datos de la db en formato json
            
        }catch(err){
    res.status(400).json(err);
        }
}