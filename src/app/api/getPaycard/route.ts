import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    var body = await req.json()
    const query = await prisma.Pay.findMany({
        where: {
            startTime: {
                gte: new Date(body.date).toISOString(),
                lte: new Date(body.date + 1).toISOString(),
        }
    })
    console.log(new Date(body.date).toISOString())
    return NextResponse.json({ query })
}