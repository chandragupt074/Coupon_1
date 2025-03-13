import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Sample list of coupons
const coupons = ['COUPON1', 'COUPON2', 'COUPON3', 'COUPON4'];
let couponIndex = 0;


const ipTrack = new Map();
const COOLDOWN_PERIOD =  60 * 1000; 

app.post('/api/claim', (req, res) => {
    const ip = req.ip;
    const sessionId = req.cookies['session_id'];


    if (ipTrack.has(ip) && Date.now() - ipTrack.get(ip) < COOLDOWN_PERIOD) {
        return res.status(400).json({ error: 'You can only claim one coupon per minutes.' });
    }

   
    if (!sessionId) {
        res.cookie('session_id', Math.random().toString(36).substring(7), { maxAge: COOLDOWN_PERIOD });
    } else {
        return res.status(400).json({ error: 'Session limit reached. Try again later.' });
    }

 
    const assignedCoupon = coupons[couponIndex % coupons.length];
    couponIndex++;

 
    ipTrack.set(ip, Date.now());

    res.json({ success: true, coupon: assignedCoupon });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));