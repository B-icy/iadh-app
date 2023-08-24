import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    var body = await req.json()
    const updateUser = await prisma.Employee.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            salary: Number(body.salary),
            position: body.position,
            daysWorked: Number(body.daysWorked),
        },
    })
    return NextResponse.json({ "error": "None" })
      
}