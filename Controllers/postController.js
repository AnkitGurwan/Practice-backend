import express, { response } from "express";
import  OpenAI from 'openai';

// const openai = new OpenAI({apiKey : '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'});
// const openai = new OpenAIApi(configuration);

const apikey = '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';
const contentGenerate = async (req,res) => {
    const options = {
        method : "POST",
        headers : {
            "Authorization" :   `Bearer ${apikey}`,
            'Content-Type' : "application/json"
        },
        body : JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": `${req.body.content}`}],
            max_tokens : 20


        })
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions',options);
    const data = await response.json();
    // console.log(data.choices[0].message.content)
    const description = data.choices[0] ? data.choices[0].message.content : "Currently system is under maintenance";
    console.log(description);
    console.log(data);
    res.status(200).json({description})
}

// const response = await openai.chat.completions.create({
//     messages: [{"role": "system", "content": "You are a helpful assistant."},
//     {"role": "user", "content": "Who won the world series in 2020?"},
//     {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//     {"role": "user", "content": "Where was it played?"}],
// model: "gpt-3.5-turbo",
// })
// console.log(response.choices[0].message.content);

export {contentGenerate};