/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStoryInput = {
  id?: string | null,
  title: string,
  content: string,
};

export type ModelStoryConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelStoryConditionInput | null > | null,
  or?: Array< ModelStoryConditionInput | null > | null,
  not?: ModelStoryConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Story = {
  __typename: "Story",
  id: string,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateStoryInput = {
  id: string,
  title?: string | null,
  content?: string | null,
};

export type DeleteStoryInput = {
  id: string,
};

export type ModelStoryFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelStoryFilterInput | null > | null,
  or?: Array< ModelStoryFilterInput | null > | null,
  not?: ModelStoryFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStoryConnection = {
  __typename: "ModelStoryConnection",
  items:  Array<Story | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionStoryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStoryFilterInput | null > | null,
  or?: Array< ModelSubscriptionStoryFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateStoryMutationVariables = {
  input: CreateStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type CreateStoryMutation = {
  createStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStoryMutationVariables = {
  input: UpdateStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type UpdateStoryMutation = {
  updateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStoryMutationVariables = {
  input: DeleteStoryInput,
  condition?: ModelStoryConditionInput | null,
};

export type DeleteStoryMutation = {
  deleteStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetStoryQueryVariables = {
  id: string,
};

export type GetStoryQuery = {
  getStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStoriesQueryVariables = {
  filter?: ModelStoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStoriesQuery = {
  listStories?:  {
    __typename: "ModelStoryConnection",
    items:  Array< {
      __typename: "Story",
      id: string,
      title: string,
      content: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStorySubscriptionVariables = {
  filter?: ModelSubscriptionStoryFilterInput | null,
};

export type OnCreateStorySubscription = {
  onCreateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStorySubscriptionVariables = {
  filter?: ModelSubscriptionStoryFilterInput | null,
};

export type OnUpdateStorySubscription = {
  onUpdateStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStorySubscriptionVariables = {
  filter?: ModelSubscriptionStoryFilterInput | null,
};

export type OnDeleteStorySubscription = {
  onDeleteStory?:  {
    __typename: "Story",
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
