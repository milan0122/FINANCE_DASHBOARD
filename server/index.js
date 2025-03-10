import express from  "express";
import bodyParser  from "body-parser";
import mongoose  from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan";
import kpiRoutes from './routes/kpi.js';
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import productRoutes from "./routes/product.js";
import { kpis, products, transactions } from "./data/data.js";
import transactionsRoutes from "./routes/transactions.js";
import Transactions from "./models/Transactions.js";



// configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
// console.log("hello");
//console.log("Mongo URI:", process.env.MONGO_URI);

//Routes
app.use("/kpi", kpiRoutes); 
app.use("/product",productRoutes)
app.use("/transaction",transactionsRoutes)

// MONGOOSE setup
const PORT = process.env.PORT || 9000;
mongoose
 .connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })
 .then(async()=>{
    app.listen(PORT,()=> console.log(`Server Port: ${PORT}`));
//add data one time or as needed
   //  await mongoose.connection.db.dropDatabase();
   // KPI.insertMany(kpis);
    // Products.insertMany(products);
      // Transactions.insertMany(transactions);
 })
 .catch((error)=> console.log(`${error} did not connect`));