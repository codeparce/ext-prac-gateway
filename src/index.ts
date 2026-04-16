import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import "reflect-metadata";

import { AppDataSource } from "./database";
import { Service } from "./entities/Service";

await AppDataSource.initialize();

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

        const data = await getServiceData(service);

        if (!data[0]) {
            return res.status(404).json({ error: "Service not found" });
        }

        const targetUrl = `${data[0]?.service}/${data[0]?.name}`;


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

app.all('/api/:service/*path', async (req, res) => {
    const { service } = req.params;
    const splat = req.params["path"];

    try {

        const data = await getServiceData(service);

        if (!data[0]) {
            return res.status(404).json({ error: "Service not found" });
        }
        const targetUrl = `${data[0]?.service}/${data[0]?.name}/${splat}`;

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

const getServiceData = async (serviceName: string) => {
    const serviceRepo = AppDataSource.getRepository(Service);
    return await serviceRepo.find({ where: { name: serviceName } });
};

app.listen(PORT, () => {
    console.log(`Gateway running on  ${process.env.GATEWAY_URL}`);
});