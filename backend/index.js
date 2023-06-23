const express = require('express');
const bodyParser = require('body-parser')
const categoryRoutes = require('./routes/category.route')
const userRoutes = require('./routes/user.route')
const expenRoutes = require('./routes/expenses.route')
const incomRoutes = require('./routes/incomes.route')

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use('/category', categoryRoutes);
app.use('/user', userRoutes);
app.use('/expenses', expenRoutes);
app.use('/incomes', incomRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
