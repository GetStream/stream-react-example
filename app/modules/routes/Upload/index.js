module.exports = {
    path: '/upload',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Upload').default)
    },
}
