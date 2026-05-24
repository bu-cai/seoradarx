import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@react-pdf/renderer',
      '@prisma/client',
      '@prisma/adapter-libsql',
      '@libsql/client',
      'nodemailer',
    ],
  },
}

export default withNextIntl(nextConfig)
