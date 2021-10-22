"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.getMeshSDK = exports.getBuiltMesh = exports.documentsInSDL = exports.getMeshOptions = exports.rawConfig = exports.OrderBy = exports.User_type = void 0;
const tslib_1 = require("tslib");
var User_type;
(function (User_type) {
    User_type["admin"] = "admin";
    User_type["content_creator"] = "content_creator";
})(User_type = exports.User_type || (exports.User_type = {}));
var OrderBy;
(function (OrderBy) {
    OrderBy["asc"] = "asc";
    OrderBy["desc"] = "desc";
})(OrderBy = exports.OrderBy || (exports.OrderBy = {}));
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const path_1 = require("path");
const transpile_only_1 = (0, tslib_1.__importDefault)(require("ts-node/register/transpile-only"));
const cache_inmemory_lru_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const mysql_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/mysql"));
const merger_bare_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const getDatabaseTables_creation_js_1 = (0, tslib_1.__importDefault)(require("./sources/Creators Hub/getDatabaseTables_creation.js"));
const getTablePrimaryKeyMetadata_User_js_1 = (0, tslib_1.__importDefault)(require("./sources/Creators Hub/getTablePrimaryKeyMetadata_User.js"));
const getTableFields_User_js_1 = (0, tslib_1.__importDefault)(require("./sources/Creators Hub/getTableFields_User.js"));
const getTableForeigns_User_js_1 = (0, tslib_1.__importDefault)(require("./sources/Creators Hub/getTableForeigns_User.js"));
const importedModules = {
    // @ts-ignore
    ["ts-node/register/transpile-only"]: transpile_only_1.default,
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: cache_inmemory_lru_1.default,
    // @ts-ignore
    ["@graphql-mesh/mysql"]: mysql_1.default,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: merger_bare_1.default,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getDatabaseTables_creation.js"]: getDatabaseTables_creation_js_1.default,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getTablePrimaryKeyMetadata_User.js"]: getTablePrimaryKeyMetadata_User_js_1.default,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getTableFields_User.js"]: getTableFields_User_js_1.default,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getTableForeigns_User.js"]: getTableForeigns_User_js_1.default
};
const baseDir = (0, path_1.join)(__dirname, '..');
const syncImportFn = (moduleId) => {
    const relativeModuleId = ((0, path_1.isAbsolute)(moduleId) ? (0, path_1.relative)(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
require("ts-node/register/transpile-only");
const cache_inmemory_lru_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const events_1 = require("events");
const utils_1 = require("@graphql-mesh/utils");
const mysql_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/mysql"));
const merger_bare_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const utils_2 = require("@graphql-mesh/utils");
const additionalResolvers$0 = (0, tslib_1.__importStar)(require("../src/mesh-resolvers.ts"));
exports.rawConfig = { "sources": [{ "name": "Creators Hub", "handler": { "mysql": { "host": "localhost", "port": 3306, "user": "root", "password": "asd123", "database": "creation" } } }], "require": ["ts-node/register/transpile-only"], "additionalResolvers": ["./src/mesh-resolvers.ts"] };
async function getMeshOptions() {
    const cache = new cache_inmemory_lru_2.default({
        ...(exports.rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new events_1.EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new graphql_subscriptions_1.PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_1.DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const creatorsHubTransforms = [];
    const additionalTypeDefs = [];
    const creatorsHubHandler = new mysql_2.default({
        name: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].handler["mysql"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[0].name),
        logger: logger.child(exports.rawConfig.sources[0].name),
        importFn
    });
    sources.push({
        name: 'Creators Hub',
        handler: creatorsHubHandler,
        transforms: creatorsHubTransforms
    });
    const merger = new merger_bare_2.default({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    const additionalResolversRawConfig = [];
    additionalResolversRawConfig.push(additionalResolvers$0.resolvers || additionalResolvers$0.default || additionalResolvers$0);
    const additionalResolvers = await (0, utils_2.resolveAdditionalResolvers)(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = exports.rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
exports.getMeshOptions = getMeshOptions;
exports.documentsInSDL = [];
async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return (0, runtime_1.getMesh)(meshConfig);
}
exports.getBuiltMesh = getBuiltMesh;
async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
exports.getMeshSDK = getMeshSDK;
function getSdk(requester) {
    return {};
}
exports.getSdk = getSdk;
