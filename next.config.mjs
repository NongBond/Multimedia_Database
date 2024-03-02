/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "drive.google.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "rs.thaiparaathletics.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
