import { chain } from "@/middlewares/chain";

export default chain([]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
