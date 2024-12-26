const app = require("./src/app/app.server");
require('dotenv').config();


const PORT = process.env.PORT || 8000;

app.listen(PORT, async ()=>{
  try {
      console.log(`Server started on ${PORT}`);
    } catch (e) {
      console.log(e);
    }
});