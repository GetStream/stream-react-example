module.exports = {
    path: '/landing',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Landing').default)
    },
}
