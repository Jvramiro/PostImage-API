import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { PostController } from "../controllers/post.controller";
import { CommentController } from "../controllers/comment.controller";
import { LikeController } from "../controllers/like.controller";
import { loginSchema, refreshTokenSchema, registerSchema } from "../schemas/auth.schema";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createPostSchema } from "../schemas/post.schema";
import { createCommentSchema, updateCommentSchema } from "../schemas/comment.schema";

const router = Router();
const authController = new AuthController();
const postController = new PostController();
const commentController = new CommentController();
const likeController = new LikeController();

// Auth
router.post('/auth/register', validate(registerSchema), (req, res, next) => authController.register(req, res, next));
router.post('/auth/login', validate(loginSchema), (req, res, next) => authController.login(req, res, next));
router.post('/auth/refresh', validate(refreshTokenSchema), (req, res, next) => authController.refresh(req, res, next));
router.post('/auth/logout', authenticate, validate(refreshTokenSchema), (req, res, next) => authController.logout(req, res, next));

// Posts
router.get('/posts', (req, res, next) => postController.findAll(req, res, next));
router.get('/posts/:id', (req, res, next) => postController.findById(req, res, next));
router.post('/posts', authenticate, validate(createPostSchema), (req, res, next) => postController.create(req, res, next));
router.delete('/posts/:id', authenticate, (req, res, next) => postController.delete(req, res, next));

// Comments
router.get('/posts/:postId/comments', (req, res, next) => commentController.findByPost(req, res, next));
router.post('/posts/:postId/comments', authenticate, validate(createCommentSchema), (req, res, next) => commentController.create(req, res, next));
router.put('/comments/:id', authenticate, validate(updateCommentSchema), (req, res, next) => commentController.update(req, res, next));
router.delete('/comments/:id', authenticate, (req, res, next) => commentController.delete(req, res, next));

// Likes
router.post('/posts/:postId/likes', authenticate, (req, res, next) => likeController.toggle(req, res, next));
router.get('/posts/:postId/likes', (req, res, next) => likeController.countByPost(req, res, next));

export default router;