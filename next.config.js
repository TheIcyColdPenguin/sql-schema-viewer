const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            trailingSlash: true,
        };
    }

    return {
        basePath: '/sql-schema-viewer',
        assetPrefix: '/sql-schema-viewer/',
        trailingSlash: true,
    };
};
