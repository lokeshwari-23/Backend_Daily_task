const http = require("http");

const formidable = require('formidable');
const fs = require('fs');//required but already i mentioned
const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })//writeHead ====>i am using setHeader beacause its not working
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            try {
                var oldPath = files.myfile[0].filepath;

                console.log("hiiiiii", files.myfile[0].originalFilename);
                console.log("sizeeeee", files.myfile[0]);
                var newPath = __dirname + '/' + files.myfile[0].originalFilename;
                console.log(files.myfile[0].originalFilename.endsWith('.txt'));
                if (files.myfile[0].originalFilename === "") {
                    res.write("upload file")
                    res.end()
                }
                console.log(files.myfile[0].size);

                if (files.myfile[0].originalFilename.endsWith('.txt')) {
                    console.log(files.myfile[0].size);
                    if ((files.myfile[0].size <= 10240)) {
                        fs.rename(oldPath, newPath, (err) => {
                            if (err) throw err;
                            res.write('File uploaded and moved')
                            res.end();
                        })
                    }
                    else {
                        res.write('file size exceeded');
                        res.end()
                    }}
                else {
                    res.write('Failed.upload text file');
                    res.end()
                }}
           catch (err) {
                    res.write("no file selected")
                    res.end();
                }
            })

    } else {
        res.write("<form method='post' action='fileupload' enctype='multipart/form-data'>")
        res.write("<input type='file' name='myfile'><br>");
        res.write("<input type='submit' value='submit'>");
        res.write("</form>");
        res.end();
    }

})
app.listen(8000, () => {
    console.log("server is listening on")
});
