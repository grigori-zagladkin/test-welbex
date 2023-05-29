import { validationResult } from "express-validator";

export class AuthController {
    async register(req, res, next) {
        try {   
            const errors = validationResult(e)
            if (!errors.isEmpty()) {
                return (next(ApiError.BadRequest('Ошибка при валидации', errors.array())))
            }
            const {login, password} = req.body
            const userData = await 
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async login(dto) {

    }

    async refresh(refreshToken)
}