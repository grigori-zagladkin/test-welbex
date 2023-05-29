cp .env.example ./prisma/.env
npx prisma migrate dev
npm run seed
npm run start