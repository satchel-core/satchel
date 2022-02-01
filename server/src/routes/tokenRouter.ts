import express from 'express';

require('dotenv').config();
import axios from 'axios';

const router = express.Router();

router.get('/getTokenPrices', async (req, res) => {
    const { tokens } = req.query;
    if (!tokens) {
        return res.status(400).json({
            tokens: 'Tokens not found',
        });
    }

    const prices = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        {
            params: {
                symbol: tokens,
            },
            headers: {
                'X-CMC_PRO_API_KEY': process.env.PRICES_API || '', // TODO: Handle errors here
            },
        }
    );

    return res.status(200).json({ ...prices.data });
});

module.exports = router;
export default router;
