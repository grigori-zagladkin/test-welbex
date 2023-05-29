import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const posts = [];
for (let i = 0; i < 30; i++) {
    posts.push({
        contnet: "wefegfrgegegregege",
        media: [],
    });
}

async function main() {
    const author1 = await prisma.author.upsert({
        where: {
            id: 1,
        },
        update: {},
        create: {
            login: "login1",
            password: "wefrwegfreegregege",
            posts: {
                create: {
                    contnet: "wefegfrgegegregege",
                    media: [],
                },
            },
        },
    });
    const author2 = await prisma.author.upsert({
        where: {
            id: 2,
        },
        update: {},
        create: {
            login: "login2",
            password: "wefrwegfreegregege",
            posts: {
                create: {
                    contnet: "wefegfrgegegregege",
                    media: [],
                },
            },
        },
    });
    const author3 = await prisma.author.upsert({
        where: {
            id: 3,
        },
        update: {},
        create: {
            login: "login3",
            password: "wefrwegfreegregege",
            posts: {
                createMany: {
                    data: posts,
                    skipDuplicates: false,
                },
            },
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
