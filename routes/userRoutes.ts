import express from 'express'
import { UserModel } from '../model/user'

const router = express.Router()

router.post("/logout", async (req, res) => {
    try {
        const userData = await UserModel.findById(req.body.userId)
        userData.lastSeen = new Date() + ""
        await userData.save()
        res.status(200).json({})
    } catch (error: any) {
        console.log(error)
    }
})

export default router