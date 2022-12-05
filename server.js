const express = require('express');
const PORT = 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors')

app.listen(PORT, () => {
    console.log("start running");
})

app.use(cors());

app.get("/initial-path", (req, res) => {
    res.send(path.join(__dirname));
})

app.get("/path/:myp", (req, res, next) => {
    const {myp} = req.params;;
    if (fs.lstatSync(myp).isDirectory()){
        let data = [];
        fs.readdir(myp, (err, files) => {
            if (err){
                console.error("read directory failed");
                return [];
            }
            for(let file of files){
                const subFilePath = path.join(myp, file);
                const stat = fs.lstatSync(subFilePath);
                data.push({
                    name: file,
                    type: stat.isDirectory()? "dir" : "file"
                })
            }
            res.send(data);
        })
    }else{
       res.send({
        name: path.basename(myp),
        type: "file"
        });
    }
    
});



