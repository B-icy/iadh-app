import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    var body = await req.json()
    const query = await prisma.Employee.create({
        data: {
            name: body.name,
            salary: Number(body.salary),
            position: body.position,
        },
    })
    return NextResponse.json({ "error": "None" })
}