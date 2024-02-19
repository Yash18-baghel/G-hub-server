const handleResponse = (req, res, next) => {
    if(res.error){
        res.status(400).json({ error: res.error }); // Send response
    }

    res.status(200).json({ data: res.data }); // Send response
};

const handleErrors = (err, req, res, next) => {
    if (err) {
        if (err.details && (err.details.get('body') || err.details.get('query') || err.details.get('params'))) {
            const validationError = ['body', 'query', 'params']
                .filter(field => err.details.get(field) && err.details.get(field).isJoi)
                .flatMap(field => err.details.get(field).details.map(detail => detail.message));
            return res.status(400).json({ error: validationError });
        } else {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    res.status(200).json({ data: res.data }); // Send response
};


const responseHandler = [handleErrors, handleResponse];
module.exports = responseHandler;
