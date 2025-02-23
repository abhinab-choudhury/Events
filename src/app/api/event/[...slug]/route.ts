// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";

import { NextRequest, NextResponse } from "next/server";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//         clientId: process.env.GITHUB_ID!,
//         clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
// };

// export default NextAuth(authOptions);

// export function GET(req: NextRequest, {params}:{params:{nextauth: string[]}}) {
//     console.log(params.nextauth)
//     return NextResponse.json({
//         message: "Handled",
//         request: req.url
//     })
// }
import NextAuth from "next-auth"

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }