import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});


// export const getSession = async () => {
//     const { data: session } = await authClient.getSession();
//     return session;
// }

