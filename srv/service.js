const cds = require('@sap/cds')

module.exports = (srv) => {

    srv.before('CREATE', 'Boletins', (req) => {
        console.log(req)
        return req.error(400, `O método ${req.method} não é valido.`);
    });
}