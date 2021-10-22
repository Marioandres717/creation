import { GraphQLResolveInfo } from 'graphql';
import { DocumentNode } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
    String: string;
    /** The `Boolean` scalar type represents `true` or `false`. */
    Boolean: boolean;
    /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
    Int: number;
    Float: number;
};
export declare type Query = {
    User?: Maybe<Array<Maybe<User>>>;
    count_User?: Maybe<Scalars['Int']>;
};
export declare type QueryUserArgs = {
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    where?: Maybe<User_WhereInput>;
    orderBy?: Maybe<User_OrderByInput>;
};
export declare type Querycount_UserArgs = {
    where?: Maybe<User_WhereInput>;
};
export declare type User = {
    id: Scalars['Int'];
    email: Scalars['String'];
    username?: Maybe<Scalars['String']>;
    type?: Maybe<User_type>;
};
export declare enum User_type {
    admin = "admin",
    content_creator = "content_creator"
}
export declare type User_WhereInput = {
    id?: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};
export declare type User_OrderByInput = {
    id?: Maybe<OrderBy>;
    email?: Maybe<OrderBy>;
    username?: Maybe<OrderBy>;
    type?: Maybe<OrderBy>;
};
export declare enum OrderBy {
    asc = "asc",
    desc = "desc"
}
export declare type Mutation = {
    insert_User?: Maybe<User>;
    update_User?: Maybe<User>;
    delete_User?: Maybe<Scalars['Boolean']>;
};
export declare type Mutationinsert_UserArgs = {
    User: User_InsertInput;
};
export declare type Mutationupdate_UserArgs = {
    User: User_UpdateInput;
    where?: Maybe<User_WhereInput>;
};
export declare type Mutationdelete_UserArgs = {
    where?: Maybe<User_WhereInput>;
};
export declare type User_InsertInput = {
    id: Scalars['Int'];
    email: Scalars['String'];
    username?: Maybe<Scalars['String']>;
    type?: Maybe<User_type>;
};
export declare type User_UpdateInput = {
    id?: Maybe<Scalars['Int']>;
    email?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
    type?: Maybe<User_type>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    User: ResolverTypeWrapper<User>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    User_type: User_type;
    User_WhereInput: User_WhereInput;
    User_OrderByInput: User_OrderByInput;
    OrderBy: OrderBy;
    Mutation: ResolverTypeWrapper<{}>;
    User_InsertInput: User_InsertInput;
    User_UpdateInput: User_UpdateInput;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    User: User;
    Int: Scalars['Int'];
    String: Scalars['String'];
    User_WhereInput: User_WhereInput;
    User_OrderByInput: User_OrderByInput;
    Mutation: {};
    User_InsertInput: User_InsertInput;
    User_UpdateInput: User_UpdateInput;
    Boolean: Scalars['Boolean'];
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    User?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUserArgs, never>>;
    count_User?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<Querycount_UserArgs, never>>;
}>;
export declare type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    type?: Resolver<Maybe<ResolversTypes['User_type']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
    insert_User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<Mutationinsert_UserArgs, 'User'>>;
    update_User?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<Mutationupdate_UserArgs, 'User'>>;
    delete_User?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<Mutationdelete_UserArgs, never>>;
}>;
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
}>;
import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { InContextSdkMethod } from '@graphql-mesh/types';
export declare type QueryCreatorsHubSdk = {
    User: InContextSdkMethod<Query['User'], QueryUserArgs, MeshContext>;
    count_User: InContextSdkMethod<Query['count_User'], Querycount_UserArgs, MeshContext>;
};
export declare type MutationCreatorsHubSdk = {
    insert_User: InContextSdkMethod<Mutation['insert_User'], Mutationinsert_UserArgs, MeshContext>;
    update_User: InContextSdkMethod<Mutation['update_User'], Mutationupdate_UserArgs, MeshContext>;
    delete_User: InContextSdkMethod<Mutation['delete_User'], Mutationdelete_UserArgs, MeshContext>;
};
export declare type SubscriptionCreatorsHubSdk = {};
export declare type CreatorsHubContext = {
    ["Creators Hub"]: {
        Query: QueryCreatorsHubSdk;
        Mutation: MutationCreatorsHubSdk;
        Subscription: SubscriptionCreatorsHubSdk;
    };
};
export declare type MeshContext = CreatorsHubContext & BaseMeshContext;
import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
import 'ts-node/register/transpile-only';
export declare const rawConfig: YamlConfig.Config;
export declare function getMeshOptions(): GetMeshOptions;
export declare const documentsInSDL: any[];
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare function getMeshSDK(): Promise<{}>;
export declare type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>;
export declare function getSdk<C>(requester: Requester<C>): {};
export declare type Sdk = ReturnType<typeof getSdk>;
