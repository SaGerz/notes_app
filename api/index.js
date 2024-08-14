const express = require('express')
const port = 5000;
const cors = require('cors')

const notesRoutes = require('./Routes/notesRoutes')

const app = express();
app.use(cors())
app.use(express.json())

app.use(notesRoutes)

app.listen(port, () => {
    console.log(`Server was running on port ${port}`)
})