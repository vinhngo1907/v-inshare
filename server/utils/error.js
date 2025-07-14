const convertValidationErrorsToMessage = function (errors) {
    return errors.reduce((result, error) => result += `${error}\n`);
}

// module.exports = {convertValidationErrorsToMessage}

exports.convertValidationErrorsToMessage = convertValidationErrorsToMessage;