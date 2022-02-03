import express from "express";
import { createUser, getUser, signin, signup, createTest } from "../controllers/user.js";

const router = express.Router()

router.post('/', createUser)
router.get('/:id', getUser)
router.post('/:id/tests', createTest)

router.post('/signin', signin)
router.post('/signup', signup)

export default router