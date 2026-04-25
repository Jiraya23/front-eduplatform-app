/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Très courant pour les photos de profil Google
      },
      // Ajoute d'autres domaines si besoin (ex: S3, Cloudinary)
    ],
  },
};

export default nextConfig;