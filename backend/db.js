const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.bu0ngq2.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
//const mongoURI = 'mongodb://gofood:gofood@ac-bxhmy8e-shard-00-00.bu0ngq2.mongodb.net:27017,ac-bxhmy8e-shard-00-01.bu0ngq2.mongodb.net:27017,ac-bxhmy8e-shard-00-02.bu0ngq2.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-n3cpue-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

const mongoDB = async() =>{
    try {

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        });
        console.log("Connected...😎😎😎😎😎");
        const fetched_data = mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        //console.log(data.length);
        global.food_items = data;
        //console.log( global.food_items)

        const foodCategory = mongoose.connection.db.collection("food_category");
        const foodCat = await foodCategory.find({}).toArray();
        global.food_category = foodCat
        //console.log(food _category)
        
        

        } 
    catch(error){
        console.error("Failed to connect to MongoDB" , error);
    }
    
}

module.exports = mongoDB;