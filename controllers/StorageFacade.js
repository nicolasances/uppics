var diskStorageStrategy = require('./strategies/DiskStorage');

/**
 * This function takes care of storing the provided filename on the target box and collection.
 * It's just a facade, that will redirect to the correct class based on the storage strategy.
 */
exports.store = (filename, box, collection) => {

    return diskStorageStrategy.store(filename, box, collection);
}