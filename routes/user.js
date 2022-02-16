import express from "express";
import { createUser, getUser, signin, signup, createTest, uploadMedia, getRandomTest, updateTest, updateMedia, uploadToGoogle } from "../controllers/user.js";
import Multer from 'multer'

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

const router = express.Router()

router.post('/', createUser)
router.get('/:id', getUser)
router.post('/:id/tests', createTest)
router.post('/:id/upload', uploadMedia)
router.get('/tests/random', getRandomTest)
router.get('/:userId/tests/:testId', updateTest)
router.patch('/:userId/tests/:testId/media/:mediaId', updateMedia)
router.post('/googleCloud', multer.single('file'), uploadToGoogle)

router.post('/signin', signin)
router.post('/signup', signup)

export default router