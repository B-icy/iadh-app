import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    var body = await req.json()
    var endTime = null
    if (body.endTime != '') {
        endTime = new Date(body.endTime)
    }
    const query = await prisma.Pay.create({
        data: {
            payDate: body.payDate,
            amount: Number(body.salary),
            eid: body.eid,
            startTime: new Date(body.startTime),
            endTime: endTime,
        },
    })
    return NextResponse.json({ "error": "None" })
}