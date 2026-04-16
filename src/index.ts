import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import "reflect-metadata";

import { AppDataSource } from "./database";
import { Service } from "./entities/Service";
import { json } from 'node:stream/consumers';

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

        const targetUrl = `http://${data[0]?.service}/${data[0]?.name}/`;

        const requestInit: RequestInit = {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            cache: "default",
            body: JSON.stringify(req.body)
        };

        const response = await fetch(targetUrl, requestInit);

        const result = await response.json();

        return res.status(response.status).json(result);

    } catch (error: any) {
        console.error("ERROR :", error);
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

        const targetUrl = `http://${data[0]?.service}/${data[0]?.name}/${splat}`;

        const requestInit: RequestInit = {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            cache: "default",
            body: JSON.stringify(req.body)
        };

        const response = await fetch(targetUrl, requestInit);

        const result = await response.json();

        return res.status(response.status).json(result);

    } catch (error: any) {
        console.error("ERROR :", error);
        return res.status(500).json({ error: error || 'Internal Server Error' });
    }

});

const getServiceData = async (serviceName: string) => {
    const serviceRepo = AppDataSource.getRepository(Service);
    return await serviceRepo.find({ where: { name: serviceName } });
};

app.listen(PORT, () => {
    console.log(`Gateway running on  ${process.env.GATEWAY_URL}`);
});