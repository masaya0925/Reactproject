import { app } from './app';
import { PORT } from './utils/config';
import { info } from './utils/logger';

const bPORT = PORT;

app.listen(bPORT, () => {
    info(`Server running on port: ${bPORT}`);
});