const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 4003;

http.createServer((req, res) => {
    const fullPath = url.parse(req.url, true);
    let queries = fullPath.query;

    res.writeHead(200, { "Content-Type": "text/html" });

    // Read and include header.html first
    fs.readFile("./data/header.html", (err, data) => {
        if (err) {
            res.write("<div>Header not found</div>");
        } else {
            res.write(data);
        }

        // Handle home page
        if (req.url === "/") {
            res.write("<a style='margin-right: 16px' href='/children'>My Children</a>");
            res.write("<a style='margin-right: 16px' href='/parents'>My Parents</a>");
            return res.end();
        }

        // Handle children page
        if (fullPath.pathname === "/children") {
            res.write("<h1>My darling children</h1>");
            res.write("<div><p>I have two beautiful kids</p></div>");
            res.write("<a style='margin-right: 16px' href='/'>Home</a>");
            res.write("<div>To read more about my kids, please click on a link below:</div>");
            res.write("<a style='margin-right: 16px' href='/children?name=areeba'>My daughter Areeba</a>");
            res.write("<a style='margin-right: 16px' href='/children?name=fatima'>My daughter Fatima</a>");

            // Handle Areeba details
            if (queries.name === "areeba") {
                fs.readFile("./data/areeba.txt", (err, data) => {
                    if (err) {
                        res.write("<div>Something went wrong loading Areeba's details</div>");
                    } else {
                        res.write("<div>" + data + "</div>");
                    }
                    res.end(); 
                });
                return; 
            }

            // Handle Fatima details
            if (queries.name === "fatima") {
                fs.readFile("./data/fatima.html", (err, data) => {
                    if (err) {
                        res.write("<div>Something went wrong loading Fatima's details</div>");
                    } else {
                        res.write("<div>" + data + "</div>");
                    }
                    res.end();
                });
                return;
            }

            return res.end(); // End response if no specific child is selected
        }

        // Default catch-all response
        res.end();
    });

}).listen(PORT, () => console.log(`Server running on port ${PORT}`));
