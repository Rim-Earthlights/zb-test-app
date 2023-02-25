import Express from 'express';
import got from 'got';
import { CONFIG } from '../../config/config.js';

export const messageRouter = Express.Router();

/**
 * POST: /message
 * メッセージを送信する
 */
messageRouter.post('/message', async (req: Express.Request, res: Express.Response) => {
    const body = req.body;

    const channel = body.channel;
    const text = body.text;

    const response = await got.post('https://slack.com/api/chat.postMessage', {
        json: {
            channel,
            text
        },
        responseType: 'json',
        headers: {
            Authorization: `Bearer ${CONFIG.SLACK.BOT_TOKEN}`
        }
    });

    if (response.ok === false) {
        res.status(500).send({ result: false });
        return;
    }
    res.status(200).send({ result: true });
});
