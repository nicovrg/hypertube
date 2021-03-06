import { Router } from 'express'

import { User, Reset } from 'models'
import { mailer, resetMail } from 'services'
import { auth, ErrorHandler, upload, github, fortytwo } from 'middlewares'

const userRouter = Router()

userRouter.get('/', auth, (req, res, next) => {
  try {
    res.status(200).json(req.user)
  } catch (err) {
    next(err)
  }
})

userRouter.get('/search/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await User.getOne(id)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

userRouter.get('/github', github)

userRouter.get('/fortytwo', fortytwo)

userRouter.post('/register', async (req, res, next) => {
  try {
    const { firstname, lastname, email, login, password } = req.body
    if (!password) throw new ErrorHandler(400, 'Missing required fields')
    await User.register({
      firstname,
      lastname,
      email,
      login,
      password,
    })
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.post('/signIn', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const response = await User.signIn({ email, password })
    res.status(200).json({ token: response })
  } catch (err) {
    next(err)
  }
})

userRouter.post('/signOut', auth, async (req, res, next) => {
  try {
    User.signOut(req.user)
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.post('/update', auth, async (req, res, next) => {
  try {
    const response = await User.edit(req.user, req.body)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/request', async (req, res, next) => {
  try {
    const { email } = req.body
    const reset = await Reset.request(email)
    if (reset) mailer.sendMail(resetMail(reset, req.get('origin')))
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.post('/reset/:token', async (req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body
    await Reset.verify(token, password)
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.post('/picture', [auth, upload], async (req, res, next) => {
  try {
    const response = await User.editPicture(req.user, req.file.filename)
    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
})

export default userRouter
