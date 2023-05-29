import PostService from "../services/post.service.js";

class PostController {
    async createPost(req, res, next) {
        try {
            const { id } = req.user;
            const { contnet, media } = req.body;
            const postData = await PostService.createPost(contnet, media, +id);
            res.json(postData);
        } catch (e) {
            next(e);
        }
    }
    async getAllPost(req, res, next) {
        try {
            const { page, authorId } = req.query;
            const posts = await PostService.getAllPost(+page, +authorId);
            res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    async getPostById(req, res, next) {
        try {
            const { id } = req.params;
            const post = await PostService.getPostById(+id);
            res.json(post);
        } catch (e) {
            next(e);
        }
    }

    async updatePost(req, res, next) {
        try {
            const { id } = req.user;
            const { postId } = req.params;
            const { contnet, media } = req.body;
            const postData = await PostService.updatePost(+postId, contnet, media, +id);
            res.json(postData);
        } catch (e) {
            next(e);
        }
    }

    async deletePost(req, res, next) {
        try {
            const { id } = req.user;
            console.log(id);
            const { postId } = req.params;
            const postData = await PostService.deletePost(+postId, +id);
            res.json(postData);
        } catch (e) {
            next(e);
        }
    }
}

export default new PostController();
