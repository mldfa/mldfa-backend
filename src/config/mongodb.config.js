import { connect } from "mongoose";



export default function Connect()
{
    return connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`)
}