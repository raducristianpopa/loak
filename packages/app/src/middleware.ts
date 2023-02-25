import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/sign-in*", "/api/clerk*"];

const isPublicPath = (path: string) => {
    return publicPaths.find((x) =>
        path.match(new RegExp(`^${x}$`.replace("*$", "($|/)"))),
    );
};

export default withClerkMiddleware((req: NextRequest) => {
    const { userId } = getAuth(req);
    const isPublic = isPublicPath(req.nextUrl.pathname);

    // If the user exists and tries to go to the sign in page, redirect to base path
    if (userId && isPublic) {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
    }

    // If there is no user and the path is not public, redirect to sign-in
    if (!userId && !isPublic) {
        const signInUrl = new URL("/sign-in", req.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
    matcher: "/((?!static|.*\\..*|_next|favicon.ico).*)",
};
