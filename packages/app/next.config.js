/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    headers: () => [
        {
            source: "/",
            headers: [
                {
                    key: "X-CSRF-Trick",
                    value: "LOAK_CSRF",
                },
            ],
        },
        {
            source: "/:path*",
            headers: [
                {
                    key: "X-CSRF-Trick",
                    value: "LOAK_CSRF",
                },
            ],
        },
    ],
};

module.exports = nextConfig;
