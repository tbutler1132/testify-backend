import express from "express";
import { createUser, getUser, signin, signup, createTest, uploadMedia, getRandomTest, updateTest, updateMedia, deleteTest } from "../controllers/user.js";

const router = express.Router()

router.post('/', createUser)
router.get('/:id', getUser)
router.post('/:id/tests', createTest)
router.post('/:id/upload', uploadMedia)
router.get('/tests/random', getRandomTest)
router.get('/:userId/tests/:testId', updateTest)
router.patch('/:userId/tests/:testId/media/:mediaId', updateMedia)
router.delete('/"userId/tests/"testId')

router.post('/signin', signin)
router.post('/signup', signup)

export default router