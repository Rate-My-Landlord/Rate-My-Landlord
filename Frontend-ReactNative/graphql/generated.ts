export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum CostOfRentRating {
  Cheap = 'CHEAP',
  Fair = 'FAIR',
  Pricy = 'PRICY'
}

export type Landlord = {
  __typename?: 'Landlord';
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  overallRating: Scalars['Float'];
  properties?: Maybe<Array<Maybe<Property>>>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  user?: Maybe<User>;
  zipCode: Scalars['String'];
};

export type LandlordResult = {
  __typename?: 'LandlordResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  landlord?: Maybe<Landlord>;
  success: Scalars['Boolean'];
};

export type LandlordsResult = {
  __typename?: 'LandlordsResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  landlords?: Maybe<Array<Maybe<Landlord>>>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** External Login (Google sign in) */
  ExternalLogin: UserResult;
  /** Login a user */
  Login: UserResult;
  /** Create a new landlord */
  NewLandlord?: Maybe<LandlordResult>;
  /** Create a new property */
  NewProperty: PropertyResult;
  /** Create a new review */
  NewReview: ReviewResult;
  /** Create a new user */
  NewUser: UserResult;
  /** Create a new account using an external authenticator */
  NewUserExternal: UserResult;
  /** Update user info */
  UpdateUser: UserResult;
};


export type MutationExternalLoginArgs = {
  externalToken: Scalars['String'];
  provider: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationNewLandlordArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  userId?: InputMaybe<Scalars['ID']>;
  zipCode: Scalars['String'];
};


export type MutationNewPropertyArgs = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  landlordId: Scalars['ID'];
  state: Scalars['String'];
  zipCode: Scalars['String'];
};


export type MutationNewReviewArgs = {
  authorId: Scalars['ID'];
  communicationStarRating?: InputMaybe<Scalars['Int']>;
  costOfRentRating?: InputMaybe<CostOfRentRating>;
  entryWithoutNotice?: InputMaybe<Scalars['Boolean']>;
  landlordId: Scalars['ID'];
  maintenanceStarRating?: InputMaybe<Scalars['Int']>;
  overallStarRating: Scalars['Int'];
  propertyId?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
};


export type MutationNewUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationNewUserExternalArgs = {
  externalToken: Scalars['String'];
  phone: Scalars['String'];
  provider?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type Property = {
  __typename?: 'Property';
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['ID'];
  landlord: Landlord;
  state: Scalars['String'];
  zipCode: Scalars['String'];
};

export type PropertyResult = {
  __typename?: 'PropertyResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  property?: Maybe<Property>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  /** Get all landlords */
  AllLandlords: LandlordsResult;
  /** Get all reviews */
  AllReviews: ReviewsResult;
  /** Get a landlord by ID */
  LandlordById: LandlordResult;
  /** Get the landlord of the property with propertyId */
  LandlordByPropertyId: LandlordResult;
  /** Get all landlords by zip code */
  LandlordsByZipCode: LandlordsResult;
  /** Refresh a token */
  RefreshToken: RefreshTokenResult;
  /** Get a review by the reviewId */
  ReviewById: ReviewResult;
  /** Get all reviews for a landlord with landlordId */
  ReviewsByLandlordId: ReviewsResult;
  /** Get all reviews for a property with propertyId */
  ReviewsByPropertyId: ReviewsResult;
  /** Get all reviews by landlord zip code */
  ReviewsByZipCode: ReviewsResult;
  /** Search */
  Search: SearchResult;
  /** Get a user by userId */
  UserByUserId: UserResult;
};


export type QueryLandlordByIdArgs = {
  landlordId: Scalars['ID'];
};


export type QueryLandlordByPropertyIdArgs = {
  propertyId: Scalars['ID'];
};


export type QueryLandlordsByZipCodeArgs = {
  zipCode: Scalars['String'];
};


export type QueryReviewByIdArgs = {
  reviewId: Scalars['ID'];
};


export type QueryReviewsByLandlordIdArgs = {
  landlordId: Scalars['ID'];
};


export type QueryReviewsByPropertyIdArgs = {
  propertyId: Scalars['ID'];
};


export type QueryReviewsByZipCodeArgs = {
  zipCode: Scalars['String'];
};


export type QuerySearchArgs = {
  searchTerm: Scalars['String'];
  zipCode: Scalars['String'];
};


export type QueryUserByUserIdArgs = {
  userId: Scalars['ID'];
};

export type RefreshTokenResult = {
  __typename?: 'RefreshTokenResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['ID']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Review = {
  __typename?: 'Review';
  author: User;
  communicationStarRating?: Maybe<Scalars['Int']>;
  costOfRentRating?: Maybe<CostOfRentRating>;
  createdAt: Scalars['String'];
  entryWithoutNotice?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  landlord: Landlord;
  maintenanceStarRating?: Maybe<Scalars['Int']>;
  overallStarRating: Scalars['Int'];
  property?: Maybe<Property>;
  text?: Maybe<Scalars['String']>;
};

export type ReviewResult = {
  __typename?: 'ReviewResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  review?: Maybe<Review>;
  success: Scalars['Boolean'];
};

export type ReviewsResult = {
  __typename?: 'ReviewsResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  success: Scalars['Boolean'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  landlords?: Maybe<Array<Maybe<Landlord>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  success: Scalars['Boolean'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  reviews?: Maybe<Array<Maybe<Review>>>;
};

export type UserResult = {
  __typename?: 'UserResult';
  errors?: Maybe<Array<Maybe<Scalars['String']>>>;
  success: Scalars['Boolean'];
  tokens?: Maybe<Tokens>;
  user?: Maybe<User>;
};

export type AddUserMutationVariables = Exact<{
  phone: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', NewUser: { __typename?: 'UserResult', success: boolean, errors?: Array<string | null> | null, user?: { __typename?: 'User', id: string } | null, tokens?: { __typename?: 'Tokens', accessToken: string, refreshToken: string } | null } };

export type ExternalLoginMutationVariables = Exact<{
  externalToken: Scalars['String'];
  provider: Scalars['String'];
}>;


export type ExternalLoginMutation = { __typename?: 'Mutation', ExternalLogin: { __typename?: 'UserResult', success: boolean, errors?: Array<string | null> | null, tokens?: { __typename?: 'Tokens', accessToken: string, refreshToken: string } | null, user?: { __typename?: 'User', id: string } | null } };

export type LoginMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'UserResult', success: boolean, errors?: Array<string | null> | null, tokens?: { __typename?: 'Tokens', accessToken: string, refreshToken: string } | null, user?: { __typename?: 'User', id: string } | null } };

export type NewUserExternalMutationVariables = Exact<{
  externalToken: Scalars['String'];
  provider: Scalars['String'];
  phone: Scalars['String'];
}>;


export type NewUserExternalMutation = { __typename?: 'Mutation', NewUserExternal: { __typename?: 'UserResult', success: boolean, errors?: Array<string | null> | null, tokens?: { __typename?: 'Tokens', accessToken: string, refreshToken: string } | null, user?: { __typename?: 'User', id: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', UpdateUser: { __typename?: 'UserResult', success: boolean } };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', UserByUserId: { __typename?: 'UserResult', success: boolean, errors?: Array<string | null> | null, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, email?: string | null, phone?: string | null } | null, tokens?: { __typename?: 'Tokens', accessToken: string, refreshToken: string } | null } };

export type NewLandlordMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  zipCode: Scalars['String'];
}>;


export type NewLandlordMutation = { __typename?: 'Mutation', NewLandlord?: { __typename?: 'LandlordResult', success: boolean, errors?: Array<string | null> | null } | null };

export type NewPropertyMutationVariables = Exact<{
  landlordId: Scalars['ID'];
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  zipCode: Scalars['String'];
  state: Scalars['String'];
  country: Scalars['String'];
}>;


export type NewPropertyMutation = { __typename?: 'Mutation', NewProperty: { __typename?: 'PropertyResult', success: boolean, errors?: Array<string | null> | null } };

export type GetLandlordQueryVariables = Exact<{
  landlordId: Scalars['ID'];
}>;


export type GetLandlordQuery = { __typename?: 'Query', LandlordById: { __typename?: 'LandlordResult', success: boolean, errors?: Array<string | null> | null, landlord?: { __typename?: 'Landlord', firstName: string, properties?: Array<{ __typename?: 'Property', id: string, address1: string, city: string, state: string } | null> | null } | null } };

export type NewReviewMutationVariables = Exact<{
  authorId: Scalars['ID'];
  landlordId: Scalars['ID'];
  propertyId?: InputMaybe<Scalars['ID']>;
  overallStarRating: Scalars['Int'];
  communicationStarRating?: InputMaybe<Scalars['Int']>;
  maintenanceStarRating?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
}>;


export type NewReviewMutation = { __typename?: 'Mutation', NewReview: { __typename?: 'ReviewResult', success: boolean, errors?: Array<string | null> | null, review?: { __typename?: 'Review', id: string } | null } };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', AllLandlords: { __typename?: 'LandlordsResult', success: boolean, errors?: Array<string | null> | null, landlords?: Array<{ __typename?: 'Landlord', id: string, overallRating: number, firstName: string, lastName: string, zipCode: string, reviews?: Array<{ __typename?: 'Review', id: string } | null> | null } | null> | null } };

export type LandlordByIdQueryVariables = Exact<{
  landlordId: Scalars['ID'];
}>;


export type LandlordByIdQuery = { __typename?: 'Query', LandlordById: { __typename?: 'LandlordResult', success: boolean, errors?: Array<string | null> | null, landlord?: { __typename?: 'Landlord', firstName: string, reviews?: Array<{ __typename?: 'Review', id: string, overallStarRating: number, text?: string | null, createdAt: string, property?: { __typename?: 'Property', address1: string, city: string, state: string } | null } | null> | null } | null } };

export type SearchQueryVariables = Exact<{
  zipCode: Scalars['String'];
  searchTerm: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', Search: { __typename?: 'SearchResult', success: boolean, errors?: Array<string | null> | null, landlords?: Array<{ __typename?: 'Landlord', firstName: string, lastName: string, overallRating: number, reviews?: Array<{ __typename?: 'Review', id: string } | null> | null } | null> | null, properties?: Array<{ __typename?: 'Property', address1: string, city: string, state: string, zipCode: string, landlord: { __typename?: 'Landlord', id: string } } | null> | null } };
