import db from "@/app/config/db";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    const data = await req.json();
    try {
        const result = db.query(
            'UPDATE movies SET ? WHERE id = ?',
            [data, params.id]
        );

        return NextResponse.json(result);
    }
    catch (error) {
        return NextResponse.json({
            message: error.message,
        }, { status: 500, })
    }
}