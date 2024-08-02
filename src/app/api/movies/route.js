import db from "@/app/config/db";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const results = await new Promise((resolve,reject) => {
            db.query('SELECT * FROM movies', (err, results) => {
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
    const {title,year,poster} = await request.json();
    try{
        const results = 
            db.query('INSERT INTO movies SET ?', {
              title,
              year,
              poster
            })
        
        return NextResponse.json(results);
    }
    catch(error){
        return NextResponse.json({
            message: error.message,},{status: 500,})
    }
} 

