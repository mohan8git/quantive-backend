const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Card = require("../model/Card");

router.post('/add', auth, async (req, res) => {
  try {
    const { email, cardId } = req.body;
    const user = await Card.findOne({ email });
    if (user) {
      if (user.cardIds.includes(cardId)) {
        return res.send({ message: 'Card ID already present in the array' });
      }
      user.cardIds.push(cardId);
      await user.save();
      return res.send({ message: 'Card ID added to the array successfully' });
    }
    const newCard = new Card({ email, cardIds: [cardId] });
    await newCard.save();
    res.send({ message: 'User and Card ID added successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/remove', auth, async (req, res) => {
  try {
    const { email, cardId } = req.body;
    const user = await Card.findOne({ email });
    if (user) {
      user.cardIds = user.cardIds.filter(id => id !== cardId);
      await user.save();
      return res.send({ message: 'Card ID removed from the array successfully' });
    }
    res.send({ message: 'User not found' });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/getMyCards', auth, async (req, res) => {
  try {
    const user = await Card.findOne(req.email);
    console.log('suer', req.email)
    if (user) {
      return res.send({ cardIds: user.cardIds });
    }
    res.status(500).send({ message: 'User not found' });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
