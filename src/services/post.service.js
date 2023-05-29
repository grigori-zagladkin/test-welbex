import prisma from "../client";
import { FileService } from "./file.service";

export class PostService {
    async createPost(content, media, authorId) {
        return await prisma.post
            .create({
                data: {
                    contnet,
                    media,
                    authorId,
                },
            })
            .then((data) => data.id);
    }

    async getAllPost(page) {
        return await prisma.post.findMany({
            skip: 20 * (page - 1),
            take: 20,
        });
    }

    async getPostById(id) {
        return await prisma.post.findFirst({
            where: {
                id,
            },
        });
    }

    async updatePost(id, content, media) {
        return await prisma.post.update({
            where: {
                id,
            },
            data: {
                contnet,
                media,
            },
        });
    }

    async deletePost(id) {
        const post = await this.getPostById(id);
        if (post.media.length) {
            await Promise.all(post.media.map(async (item) => await FileService.deleteFile(item)));
        }
        return await prisma.post.delete({
            where: { id },
        });
    }
}
