const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const DB = process.env.MONGO_URL;

mongoose.connect(DB,{
    //useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("Database Connected"))
.catch((error)=>{
    console.log("error",error);
})

// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () => {np
//   console.log("Connected to MongoDB");
// });