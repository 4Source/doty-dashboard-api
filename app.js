const express = require('express');

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Running on Port ${process.env.PORT}`);
})