import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { prisma } from "./lib/prisma";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(morgan(process.env.ENVIROMENT || 'dev'));
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

app.all('/api/:service', async (req, res) => {
    const { service } = req.params;

    try {

        const data = await getPrismaData(service);
        const targetUrl = `${data[0]?.url}/${service}/`;
        
        const response = await fetch(targetUrl, {
            method: req.method,
            body: JSON.stringify(req.body)
        });

        const result = await response.json();

        return res.status(response.status).json(result);

    } catch (error : any) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }


});

app.all('/api/:service/*path', async (req, res) => {
    const { service } = req.params;
    const splat = req.params["path"];

    try {

        const data = await getPrismaData(service);
        const targetUrl = `${data[0]?.url}/${service}/${splat}`;
        
        const response = await fetch(targetUrl, {
            method: req.method,
            body: JSON.stringify(req.body)
        });

        const result = await response.json();

        return res.status(response.status).json(result);
        
    } catch (error: any) {
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }

});

const getPrismaData = async (service: string) => {
    const data = await prisma.service.findMany({
        where: {
            name: service
        }
    });
    return data;
}

app.listen(PORT, () => {
    console.log(`Gateway running on  ${process.env.GATEWAY_URL}`);
});