import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import {
    auth,
    requiresAuth
} from 'express-openid-connect';

const app = express()

app.use(cors());
app.use(express.json());

dotenv.config()

const PORT = 3000

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:3000',
    clientID: 'wYbDr7WQUqQehxsfqfZifKOdeSWikCBS',
    issuerBaseURL: 'https://dev-gpjpz3gkkcsbjgsb.us.auth0.com'
};

app.use(auth(config));


app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

app.get('/profile', requiresAuth(), (req, res) => {
    const user = req.oidc.user
    console.log(user.email);
    
    res.send(JSON.stringify(req.oidc.user));
})

app.get('/error', (req, res) => res.json({
    message: 'error'
}))

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})