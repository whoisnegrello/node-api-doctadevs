function err(description, message, code) {
    let e = new Error(message);

    if (description) {
        e.description = description;
    }

    if (code) {
        e.statusCode = code;
    }

    return e;
}

module.exports = err;