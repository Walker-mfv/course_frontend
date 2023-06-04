import { authorized } from 'app/middlewares/auth.middleware'
import { NextRequest } from 'next/dist/server/web/spec-extension/request'
import { NextFetchEvent, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  return authorized(req, ev, NextResponse)
}
