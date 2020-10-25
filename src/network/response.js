const statusMessages = {
    '200': 'Ok',
    '201': 'Creado',
    '400': 'Formato inválido',
    '403': 'No tenés permisos',
    '404': 'No se encontró el recurso',
    '500': 'Error interno'
}

exports.success = function (req, res, message, status = 200) {
    let statusCode = status;
    let statusMessage = message;

    if (!message) {
        statusMessage = statusMessages[status];
    }

    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: statusMessage,
    });
}

exports.error = function (req, res, message, status, details) {
    res.status(status || 500).send({
        error: true,
        message: message,
        status: status || 500,
        body: false,
    });
}
