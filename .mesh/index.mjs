export var User_type;
(function (User_type) {
    User_type["admin"] = "admin";
    User_type["content_creator"] = "content_creator";
})(User_type || (User_type = {}));
export var OrderBy;
(function (OrderBy) {
    OrderBy["asc"] = "asc";
    OrderBy["desc"] = "desc";
})(OrderBy || (OrderBy = {}));
import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { join, relative, isAbsolute, dirname } from 'path';
import { fileURLToPath } from 'url';
import ExternalModule_0 from 'ts-node/register/transpile-only';
import ExternalModule_1 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_2 from '@graphql-mesh/mysql';
import ExternalModule_3 from '@graphql-mesh/merger-bare';
import ExternalModule_4 from './sources/Creators Hub/getDatabaseTables_creation.js';
import ExternalModule_5 from './sources/Creators Hub/getTablePrimaryKeyMetadata_User.js';
import ExternalModule_6 from './sources/Creators Hub/getTableFields_User.js';
import ExternalModule_7 from './sources/Creators Hub/getTableForeigns_User.js';
const importedModules = {
    // @ts-ignore
    ["ts-node/register/transpile-only"]: ExternalModule_0,
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_1,
    // @ts-ignore
    ["@graphql-mesh/mysql"]: ExternalModule_2,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: ExternalModule_3,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getDatabaseTables_creation.js"]: ExternalModule_4,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getTablePrimaryKeyMetadata_User.js"]: ExternalModule_5,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getTableFields_User.js"]: ExternalModule_6,
    // @ts-ignore
    [".mesh/sources/Creators Hub/getTableForeigns_User.js"]: ExternalModule_7
};
const baseDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const syncImportFn = (moduleId) => {
    const relativeModuleId = (isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import 'ts-node/register/transpile-only';
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
import { DefaultLogger } from '@graphql-mesh/utils';
import MysqlHandler from '@graphql-mesh/mysql';
import BareMerger from '@graphql-mesh/merger-bare';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
import * as additionalResolvers$0 from '../src/mesh-resolvers.ts';
export const rawConfig = { "sources": [{ "name": "Creators Hub", "handler": { "mysql": { "host": "localhost", "port": 3306, "user": "root", "password": "asd123", "database": "creation" } } }], "require": ["ts-node/register/transpile-only"], "additionalResolvers": ["./src/mesh-resolvers.ts"] };
export async function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const creatorsHubTransforms = [];
    const additionalTypeDefs = [];
    const creatorsHubHandler = new MysqlHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler["mysql"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    sources.push({
        name: 'Creators Hub',
        handler: creatorsHubHandler,
        transforms: creatorsHubTransforms
    });
    const merger = new BareMerger({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    const additionalResolversRawConfig = [];
    additionalResolversRawConfig.push(additionalResolvers$0.resolvers || additionalResolvers$0.default || additionalResolvers$0);
    const additionalResolvers = await resolveAdditionalResolvers(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
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
export const documentsInSDL = /*#__PURE__*/ [];
export async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
export function getSdk(requester) {
    return {};
}
