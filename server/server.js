import express from "express";
import * as dotenv from 'dotenv';
//secures api key 
import cors from 'cors';
//for all cross origin requests say form frontend.
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    organization: "org-PqiUmqOTdQuFR1kR4fuki8I0",
    apiKey: process.env.OPENAI_API_KEY,
});
// console.log(configuration);

// console.log(process.env.OPENAI_API_KEY)


//new instance of openai
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json()); //passing json from frontend to backend

app.get('/', async(req, res) => {
    res.status(200).send({
        'messsage': 'connected to openai'
    })
});

app.post('/', async(req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log(req);
        console.log(prompt);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.3,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            // stop: ["\"\"\""],
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });

        console.log(response.data.choices[0]);


    } catch (err) {
        console.log(err);
        res.status(500).send({ err })
    }

})

// app.use(express.static('public'));

// app.get('/public');

app.listen(process.env.PORT, () => console.log('running on port http://localhost:5000'))