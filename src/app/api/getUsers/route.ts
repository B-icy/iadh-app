import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    const query = await prisma.Employee.findMany()
    return NextResponse.json({ query })
}