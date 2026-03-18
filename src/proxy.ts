import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(_request: NextRequest) {
  // Auth is handled client-side in the portal layout via supabase.auth.getUser().
  // RLS policies protect all data at the database level.
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
