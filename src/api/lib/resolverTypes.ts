import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Cuid: any;
  Currency: any;
  DID: any;
  Date: any;
  DateTime: any;
  Duration: any;
  Email: any;
  EmailAddress: any;
  GUID: any;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IP: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  RoutingNumber: any;
  SafeInt: any;
  SemVer: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
};

export enum EmailType {
  Custom = 'custom',
  Home = 'home',
  Other = 'other',
  Work = 'work'
}

export type Github = {
  __typename?: 'Github';
  username?: Maybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  description?: Maybe<Scalars['String']>;
  directMembersCount?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['Email']>;
  id?: Maybe<Scalars['ID']>;
  members?: Maybe<Array<Maybe<Member>>>;
  name?: Maybe<Scalars['String']>;
};

export type GroupKey = {
  email?: InputMaybe<Scalars['Email']>;
  id?: InputMaybe<Scalars['ID']>;
};

/** The value in an identifier field to search for (e.g. the actual id or email of the group) */
export type GroupSearchKey = {
  value: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  delivery_settings?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** The MemberKey can be the id/email for any member of a group (which can be a user OR a group itself) */
export type MemberKey = {
  email?: InputMaybe<Scalars['Email']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToGroup: Group;
  create: User;
  createGroup: Group;
  delete: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
  removeUserFromGroup: Scalars['Boolean'];
  update: User;
  updateGroup: Group;
};


export type MutationAddUserToGroupArgs = {
  groupKey: GroupKey;
  member: NewGroupMember;
};


export type MutationCreateArgs = {
  user: NewUserInput;
};


export type MutationCreateGroupArgs = {
  group: NewGroupInput;
};


export type MutationDeleteArgs = {
  userKey: UserKey;
};


export type MutationDeleteGroupArgs = {
  groupKey: GroupKey;
};


export type MutationRemoveUserFromGroupArgs = {
  groupKey: GroupKey;
  memberKey: MemberKey;
};


export type MutationUpdateArgs = {
  userInfo: UpdateUserInput;
  userKey: UserKey;
};


export type MutationUpdateGroupArgs = {
  groupInfo: UpdateGroupInput;
  groupKey: GroupKey;
};

export type NewGroupInput = {
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['Email'];
  name: Scalars['String'];
};

export type NewGroupMember = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type NewUserInput = {
  name: UserNameInput;
  primaryEmail: Scalars['Email'];
};

export type ProductLicense = {
  __typename?: 'ProductLicense';
  license?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  group?: Maybe<Group>;
  groups: Array<Maybe<Group>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryGroupArgs = {
  groupKey: GroupSearchKey;
};


export type QueryUserArgs = {
  userKey: UserSearchKey;
};

export type UpdateGroupInput = {
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['Email']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  additionalData?: InputMaybe<UserNotesInput>;
  agreedToTerms?: InputMaybe<Scalars['Boolean']>;
  changePasswordAtNextLogin?: InputMaybe<Scalars['Boolean']>;
  creationTime?: InputMaybe<Scalars['String']>;
  emails?: InputMaybe<Array<InputMaybe<UserEmailInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isDelegatedAdmin?: InputMaybe<Scalars['Boolean']>;
  isMailboxSetup?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<UserNameInput>;
  primaryEmail?: InputMaybe<Scalars['String']>;
  sshPublicKeys?: InputMaybe<Array<InputMaybe<UserSshPublicKeysInput>>>;
  suspended?: InputMaybe<Scalars['Boolean']>;
  suspensionReason?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  additionalData?: Maybe<UserNotes>;
  agreedToTerms?: Maybe<Scalars['Boolean']>;
  changePasswordAtNextLogin?: Maybe<Scalars['Boolean']>;
  creationTime?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Maybe<UserEmail>>>;
  groups?: Maybe<Array<Maybe<Group>>>;
  id?: Maybe<Scalars['ID']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  isDelegatedAdmin?: Maybe<Scalars['Boolean']>;
  isMailboxSetup?: Maybe<Scalars['Boolean']>;
  name?: Maybe<UserName>;
  primaryEmail?: Maybe<Scalars['String']>;
  sshPublicKeys?: Maybe<Array<Maybe<UserSshPublicKeys>>>;
  suspended?: Maybe<Scalars['Boolean']>;
  suspensionReason?: Maybe<Scalars['String']>;
};

export type UserEmail = {
  __typename?: 'UserEmail';
  address: Scalars['Email'];
  customType?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  type?: Maybe<EmailType>;
};

export type UserEmailInput = {
  address: Scalars['Email'];
  customType?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<EmailType>;
};

export type UserKey = {
  id?: InputMaybe<Scalars['ID']>;
  primaryEmail?: InputMaybe<Scalars['Email']>;
};

export type UserName = {
  __typename?: 'UserName';
  familyName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
};

export type UserNameInput = {
  familyName: Scalars['String'];
  fullName?: InputMaybe<Scalars['String']>;
  givenName: Scalars['String'];
};

export type UserNotes = {
  __typename?: 'UserNotes';
  github?: Maybe<Github>;
  productLicenses: Array<Maybe<ProductLicense>>;
};

export type UserNotesInput = {
  github?: InputMaybe<Scalars['String']>;
};

export type UserSearchKey = {
  key: Scalars['String'];
};

export type UserSshPublicKeys = {
  __typename?: 'UserSshPublicKeys';
  expirationTimeUsec?: Maybe<Scalars['Int']>;
  fingerprint?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
};

export type UserSshPublicKeysInput = {
  expirationTimeUsec?: InputMaybe<Scalars['Int']>;
  fingerprint?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<Scalars['AccountNumber']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Byte: ResolverTypeWrapper<Scalars['Byte']>;
  CountryCode: ResolverTypeWrapper<Scalars['CountryCode']>;
  Cuid: ResolverTypeWrapper<Scalars['Cuid']>;
  Currency: ResolverTypeWrapper<Scalars['Currency']>;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Duration: ResolverTypeWrapper<Scalars['Duration']>;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
  EmailType: EmailType;
  GUID: ResolverTypeWrapper<Scalars['GUID']>;
  Github: ResolverTypeWrapper<Github>;
  Group: ResolverTypeWrapper<Group>;
  GroupKey: GroupKey;
  GroupSearchKey: GroupSearchKey;
  HSL: ResolverTypeWrapper<Scalars['HSL']>;
  HSLA: ResolverTypeWrapper<Scalars['HSLA']>;
  HexColorCode: ResolverTypeWrapper<Scalars['HexColorCode']>;
  Hexadecimal: ResolverTypeWrapper<Scalars['Hexadecimal']>;
  IBAN: ResolverTypeWrapper<Scalars['IBAN']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IP: ResolverTypeWrapper<Scalars['IP']>;
  IPv4: ResolverTypeWrapper<Scalars['IPv4']>;
  IPv6: ResolverTypeWrapper<Scalars['IPv6']>;
  ISBN: ResolverTypeWrapper<Scalars['ISBN']>;
  ISO8601Duration: ResolverTypeWrapper<Scalars['ISO8601Duration']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JWT: ResolverTypeWrapper<Scalars['JWT']>;
  Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
  LocalDate: ResolverTypeWrapper<Scalars['LocalDate']>;
  LocalEndTime: ResolverTypeWrapper<Scalars['LocalEndTime']>;
  LocalTime: ResolverTypeWrapper<Scalars['LocalTime']>;
  Locale: ResolverTypeWrapper<Scalars['Locale']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
  Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
  MAC: ResolverTypeWrapper<Scalars['MAC']>;
  Member: ResolverTypeWrapper<Member>;
  MemberKey: MemberKey;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<Scalars['NegativeFloat']>;
  NegativeInt: ResolverTypeWrapper<Scalars['NegativeInt']>;
  NewGroupInput: NewGroupInput;
  NewGroupMember: NewGroupMember;
  NewUserInput: NewUserInput;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']>;
  NonNegativeFloat: ResolverTypeWrapper<Scalars['NonNegativeFloat']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']>;
  NonPositiveFloat: ResolverTypeWrapper<Scalars['NonPositiveFloat']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Port: ResolverTypeWrapper<Scalars['Port']>;
  PositiveFloat: ResolverTypeWrapper<Scalars['PositiveFloat']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  ProductLicense: ResolverTypeWrapper<ProductLicense>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Scalars['RGB']>;
  RGBA: ResolverTypeWrapper<Scalars['RGBA']>;
  RoutingNumber: ResolverTypeWrapper<Scalars['RoutingNumber']>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']>;
  SemVer: ResolverTypeWrapper<Scalars['SemVer']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  TimeZone: ResolverTypeWrapper<Scalars['TimeZone']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  USCurrency: ResolverTypeWrapper<Scalars['USCurrency']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UnsignedFloat: ResolverTypeWrapper<Scalars['UnsignedFloat']>;
  UnsignedInt: ResolverTypeWrapper<Scalars['UnsignedInt']>;
  UpdateGroupInput: UpdateGroupInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserEmail: ResolverTypeWrapper<UserEmail>;
  UserEmailInput: UserEmailInput;
  UserKey: UserKey;
  UserName: ResolverTypeWrapper<UserName>;
  UserNameInput: UserNameInput;
  UserNotes: ResolverTypeWrapper<UserNotes>;
  UserNotesInput: UserNotesInput;
  UserSearchKey: UserSearchKey;
  UserSshPublicKeys: ResolverTypeWrapper<UserSshPublicKeys>;
  UserSshPublicKeysInput: UserSshPublicKeysInput;
  UtcOffset: ResolverTypeWrapper<Scalars['UtcOffset']>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AccountNumber: Scalars['AccountNumber'];
  BigInt: Scalars['BigInt'];
  Boolean: Scalars['Boolean'];
  Byte: Scalars['Byte'];
  CountryCode: Scalars['CountryCode'];
  Cuid: Scalars['Cuid'];
  Currency: Scalars['Currency'];
  DID: Scalars['DID'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Duration: Scalars['Duration'];
  Email: Scalars['Email'];
  EmailAddress: Scalars['EmailAddress'];
  GUID: Scalars['GUID'];
  Github: Github;
  Group: Group;
  GroupKey: GroupKey;
  GroupSearchKey: GroupSearchKey;
  HSL: Scalars['HSL'];
  HSLA: Scalars['HSLA'];
  HexColorCode: Scalars['HexColorCode'];
  Hexadecimal: Scalars['Hexadecimal'];
  IBAN: Scalars['IBAN'];
  ID: Scalars['ID'];
  IP: Scalars['IP'];
  IPv4: Scalars['IPv4'];
  IPv6: Scalars['IPv6'];
  ISBN: Scalars['ISBN'];
  ISO8601Duration: Scalars['ISO8601Duration'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JWT: Scalars['JWT'];
  Latitude: Scalars['Latitude'];
  LocalDate: Scalars['LocalDate'];
  LocalEndTime: Scalars['LocalEndTime'];
  LocalTime: Scalars['LocalTime'];
  Locale: Scalars['Locale'];
  Long: Scalars['Long'];
  Longitude: Scalars['Longitude'];
  MAC: Scalars['MAC'];
  Member: Member;
  MemberKey: MemberKey;
  Mutation: {};
  NegativeFloat: Scalars['NegativeFloat'];
  NegativeInt: Scalars['NegativeInt'];
  NewGroupInput: NewGroupInput;
  NewGroupMember: NewGroupMember;
  NewUserInput: NewUserInput;
  NonEmptyString: Scalars['NonEmptyString'];
  NonNegativeFloat: Scalars['NonNegativeFloat'];
  NonNegativeInt: Scalars['NonNegativeInt'];
  NonPositiveFloat: Scalars['NonPositiveFloat'];
  NonPositiveInt: Scalars['NonPositiveInt'];
  ObjectID: Scalars['ObjectID'];
  PhoneNumber: Scalars['PhoneNumber'];
  Port: Scalars['Port'];
  PositiveFloat: Scalars['PositiveFloat'];
  PositiveInt: Scalars['PositiveInt'];
  PostalCode: Scalars['PostalCode'];
  ProductLicense: ProductLicense;
  Query: {};
  RGB: Scalars['RGB'];
  RGBA: Scalars['RGBA'];
  RoutingNumber: Scalars['RoutingNumber'];
  SafeInt: Scalars['SafeInt'];
  SemVer: Scalars['SemVer'];
  String: Scalars['String'];
  Time: Scalars['Time'];
  TimeZone: Scalars['TimeZone'];
  Timestamp: Scalars['Timestamp'];
  URL: Scalars['URL'];
  USCurrency: Scalars['USCurrency'];
  UUID: Scalars['UUID'];
  UnsignedFloat: Scalars['UnsignedFloat'];
  UnsignedInt: Scalars['UnsignedInt'];
  UpdateGroupInput: UpdateGroupInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserEmail: UserEmail;
  UserEmailInput: UserEmailInput;
  UserKey: UserKey;
  UserName: UserName;
  UserNameInput: UserNameInput;
  UserNotes: UserNotes;
  UserNotesInput: UserNotesInput;
  UserSearchKey: UserSearchKey;
  UserSshPublicKeys: UserSshPublicKeys;
  UserSshPublicKeysInput: UserSshPublicKeysInput;
  UtcOffset: Scalars['UtcOffset'];
  Void: Scalars['Void'];
}>;

export interface AccountNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AccountNumber'], any> {
  name: 'AccountNumber';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface ByteScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Byte'], any> {
  name: 'Byte';
}

export interface CountryCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['CountryCode'], any> {
  name: 'CountryCode';
}

export interface CuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cuid'], any> {
  name: 'Cuid';
}

export interface CurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Currency'], any> {
  name: 'Currency';
}

export interface DidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Duration'], any> {
  name: 'Duration';
}

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['GUID'], any> {
  name: 'GUID';
}

export type GithubResolvers<ContextType = any, ParentType extends ResolversParentTypes['Github'] = ResolversParentTypes['Github']> = ResolversObject<{
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directMembersCount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['Email']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['Member']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface HslScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSL'], any> {
  name: 'HSL';
}

export interface HslaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HSLA'], any> {
  name: 'HSLA';
}

export interface HexColorCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HexColorCode'], any> {
  name: 'HexColorCode';
}

export interface HexadecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Hexadecimal'], any> {
  name: 'Hexadecimal';
}

export interface IbanScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IBAN'], any> {
  name: 'IBAN';
}

export interface IpScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IP'], any> {
  name: 'IP';
}

export interface IPv4ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv4'], any> {
  name: 'IPv4';
}

export interface IPv6ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['IPv6'], any> {
  name: 'IPv6';
}

export interface IsbnScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISBN'], any> {
  name: 'ISBN';
}

export interface Iso8601DurationScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601Duration'], any> {
  name: 'ISO8601Duration';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export interface JwtScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JWT'], any> {
  name: 'JWT';
}

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LocalDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalDate'], any> {
  name: 'LocalDate';
}

export interface LocalEndTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalEndTime'], any> {
  name: 'LocalEndTime';
}

export interface LocalTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['LocalTime'], any> {
  name: 'LocalTime';
}

export interface LocaleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Locale'], any> {
  name: 'Locale';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export interface MacScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MAC'], any> {
  name: 'MAC';
}

export type MemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  delivery_settings?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addUserToGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationAddUserToGroupArgs, 'groupKey' | 'member'>>;
  create?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateArgs, 'user'>>;
  createGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'group'>>;
  delete?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteArgs, 'userKey'>>;
  deleteGroup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteGroupArgs, 'groupKey'>>;
  removeUserFromGroup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveUserFromGroupArgs, 'groupKey' | 'memberKey'>>;
  update?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateArgs, 'userInfo' | 'userKey'>>;
  updateGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, 'groupInfo' | 'groupKey'>>;
}>;

export interface NegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeFloat'], any> {
  name: 'NegativeFloat';
}

export interface NegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NegativeInt'], any> {
  name: 'NegativeInt';
}

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeFloat'], any> {
  name: 'NonNegativeFloat';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface NonPositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveFloat'], any> {
  name: 'NonPositiveFloat';
}

export interface NonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export interface PortScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Port'], any> {
  name: 'Port';
}

export interface PositiveFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveFloat'], any> {
  name: 'PositiveFloat';
}

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type ProductLicenseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductLicense'] = ResolversParentTypes['ProductLicense']> = ResolversObject<{
  license?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  group?: Resolver<Maybe<ResolversTypes['Group']>, ParentType, ContextType, RequireFields<QueryGroupArgs, 'groupKey'>>;
  groups?: Resolver<Array<Maybe<ResolversTypes['Group']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'userKey'>>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export interface RgbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGB'], any> {
  name: 'RGB';
}

export interface RgbaScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RGBA'], any> {
  name: 'RGBA';
}

export interface RoutingNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RoutingNumber'], any> {
  name: 'RoutingNumber';
}

export interface SafeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export interface SemVerScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['SemVer'], any> {
  name: 'SemVer';
}

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface TimeZoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TimeZone'], any> {
  name: 'TimeZone';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UsCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['USCurrency'], any> {
  name: 'USCurrency';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface UnsignedFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedFloat'], any> {
  name: 'UnsignedFloat';
}

export interface UnsignedIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnsignedInt'], any> {
  name: 'UnsignedInt';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  additionalData?: Resolver<Maybe<ResolversTypes['UserNotes']>, ParentType, ContextType>;
  agreedToTerms?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  changePasswordAtNextLogin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  creationTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserEmail']>>>, ParentType, ContextType>;
  groups?: Resolver<Maybe<Array<Maybe<ResolversTypes['Group']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isDelegatedAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isMailboxSetup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['UserName']>, ParentType, ContextType>;
  primaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sshPublicKeys?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserSshPublicKeys']>>>, ParentType, ContextType>;
  suspended?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  suspensionReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserEmailResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEmail'] = ResolversParentTypes['UserEmail']> = ResolversObject<{
  address?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  customType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  primary?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EmailType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserName'] = ResolversParentTypes['UserName']> = ResolversObject<{
  familyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  givenName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNotesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNotes'] = ResolversParentTypes['UserNotes']> = ResolversObject<{
  github?: Resolver<Maybe<ResolversTypes['Github']>, ParentType, ContextType>;
  productLicenses?: Resolver<Array<Maybe<ResolversTypes['ProductLicense']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserSshPublicKeysResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSshPublicKeys'] = ResolversParentTypes['UserSshPublicKeys']> = ResolversObject<{
  expirationTimeUsec?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fingerprint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UtcOffsetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UtcOffset'], any> {
  name: 'UtcOffset';
}

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  AccountNumber?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  CountryCode?: GraphQLScalarType;
  Cuid?: GraphQLScalarType;
  Currency?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  Github?: GithubResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IP?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  ProductLicense?: ProductLicenseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  SemVer?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserEmail?: UserEmailResolvers<ContextType>;
  UserName?: UserNameResolvers<ContextType>;
  UserNotes?: UserNotesResolvers<ContextType>;
  UserSshPublicKeys?: UserSshPublicKeysResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Void?: GraphQLScalarType;
}>;

