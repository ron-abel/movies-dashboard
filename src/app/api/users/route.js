import db from "@/app/config/db";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const results = await new Promise((resolve,reject) => {
            db.query('SELECT * FROM users', (err, results) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(results);
                }
            })
        })
      
        return NextResponse.json(results);
    }
    catch(error){
        return NextResponse.json({
            message: error.message,},{status: 500,})
    }
} 

export async function POST(request){
    const {email,password} = await request.json();
    try{
        
        const results =  
            db.query('INSERT INTO users SET ?', {
              email,
              password
            })
        
        return NextResponse.json(results);
    }
    catch(error){
        return NextResponse.json({
            message: error.message,},{status: 500,})
    }
} 