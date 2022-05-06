function firstToUpperCase(str) {
    str = str || '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = { firstToUpperCase };