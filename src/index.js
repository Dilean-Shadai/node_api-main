const app = require("./app");

function main() {
    const port = 3000;
    app.listen(port, () => {
        console.log(`API funcionando en el puerto ${port}`);
    });
}

main();