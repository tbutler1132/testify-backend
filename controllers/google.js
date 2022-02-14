import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID 

const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04PjyZXP2fDlYCgYIARAAGAQSNwF-L9IrJ9bPR2OqzV5BUbIOv1P4ufTFGfM-_JUAgI4XDrJI6J-vfNZVH7ku5rC_y8IlZdufDCM'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})