import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(morgan(process.env.ENVIROMENT || 'dev'));
app.use(express.json());



app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

app.all('/api/:service/*path', async (req, res) => {
    const { service } = req.params;
    const splat = req.params.path;
    console.log(`Received request for service: ${service}, path: ${splat.join('/')}`);


    return res.status(200).json({ message: `Request received for service: ${service} with path: ${splat}` });
    //   const target = routes[service];
    //   if (!target) return res.status(404).json({ error: 'Service not found' });

    //   try {
    //     const response = await axios({
    //       method: req.method,
    //       url: `${target}${req.url.replace(`/api/${service}`, '')}`,
    //       data: req.body,
    //       headers: { ...req.headers, host: undefined }
    //     });
    //     res.status(response.status).json(response.data);
    //   } catch (error) {
    //     res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    //   }
});

app.listen(PORT, () => {
    console.log(`Gateway running on  ${process.env.GATEWAY_URL}`);
});