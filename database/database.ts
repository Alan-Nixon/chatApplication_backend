import { connect } from "mongoose";

connect(process.env.MONGO_URL + "").then(() => console.log("database connected"))