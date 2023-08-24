import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    var body = await req.json()
    const deletedAuthor = await prisma.Employee.delete({
        where: {
          id: body.id,
        },
      });
      
    return NextResponse.json({ "error": "None" })
}