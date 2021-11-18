import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Business = {
  __typename?: 'Business';
  businessInfoId?: Maybe<Scalars['String']>;
  businessInvestmentCampaignPlanId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  userId: Scalars['String'];
};

export type GetBusinessesByUserIdInput = {
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBusiness: Business;
};

export type Query = {
  __typename?: 'Query';
  getBusinessesByUserId: Array<Maybe<Business>>;
};


export type QueryGetBusinessesByUserIdArgs = {
  input: GetBusinessesByUserIdInput;
};

export type CreateBusinessMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness: { __typename?: 'Business', id: string, userId: string } };


export const CreateBusinessDocument = gql`
    mutation CreateBusiness {
  createBusiness {
    id
    userId
  }
}
    `;
export type CreateBusinessMutationFn = Apollo.MutationFunction<CreateBusinessMutation, CreateBusinessMutationVariables>;
export type CreateBusinessComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateBusinessMutation, CreateBusinessMutationVariables>, 'mutation'>;

    export const CreateBusinessComponent = (props: CreateBusinessComponentProps) => (
      <ApolloReactComponents.Mutation<CreateBusinessMutation, CreateBusinessMutationVariables> mutation={CreateBusinessDocument} {...props} />
    );
    

/**
 * __useCreateBusinessMutation__
 *
 * To run a mutation, you first call `useCreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = useCreateBusinessMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(CreateBusinessDocument, options);
      }
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>;
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>;
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<CreateBusinessMutation, CreateBusinessMutationVariables>;