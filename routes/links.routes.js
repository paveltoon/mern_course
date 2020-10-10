const {Router} = require('express')
const router = Router()
const shortid = require('shortid')
const config = require('../config/default.json')
const auth = require('../milddleware/auth.middleware')
const Link = require('../models/Link')

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config["baseUrl"]
    const {from} = req.body
    const code = shortid.generate()

    const existing = await Link.findOne({from})

    if (existing) {
      return res.json({link: existing})
    }

    const to = baseUrl + '/t/' + code
    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    await link.save()

    res.status(201).json({link})

  } catch (e) {
    console.log(e)
    res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId}) // ???
    res.json(links)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const links = await Link.findById(req.params.id) // ???
    res.json(links)
  } catch (e) {
    console.log(e)
    res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
  }
})

module.exports = router