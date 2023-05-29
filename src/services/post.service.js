import prisma from "../client.js";
import ApiError from "../exceptions/api.error.js";
import FileService from "./file.service.js";

class PostService {
    async createPost(contnet, media, authorId) {
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

    async getAllPost(page, authorId) {
        return await prisma.post.findMany({
            where: {
                authorId,
            },
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

    async updatePost(id, contnet, media, authorId) {
        const post = await this.getPostById(id);
        if (post.authorId === authorId) {
            return await prisma.post.update({
                where: {
                    id,
                },
                data: {
                    contnet,
                    media,
                },
            });
        } else {
            throw ApiError.BadRequest("Вы не можете редачить этот пост");
        }
    }

    async deletePost(id, authorId) {
        const post = await this.getPostById(id);
        if (post.authorId === authorId) {
            if (post.media.length) {
                await Promise.all(post.media.map(async (item) => await FileService.deleteFile(item)));
            }
            return await prisma.post.delete({
                where: { id },
            });
        } else {
            throw ApiError.BadRequest("Вы не можете удалить этот пост");
        }
    }
}

export default new PostService();
