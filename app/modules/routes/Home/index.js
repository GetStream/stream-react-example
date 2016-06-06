module.exports = {
    path: '/',

    /**
     * getChildRoutes
     * @param location
     * @param cb {Function} callback
     */
    getChildRoutes(location, cb) {
        cb(null, [
            require('./routes/Photo'),
        ])
    },

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Home').default)
    },

}
