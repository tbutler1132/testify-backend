import express from "express";
import { createUser, getUser, signin, signup, createTest, uploadMedia } from "../controllers/user.js";

const router = express.Router()

router.post('/', createUser)
router.get('/:id', getUser)
router.post('/:id/tests', createTest)
router.post('/:id/upload', uploadMedia)

router.post('/signin', signin)
router.post('/signup', signup)

export default router