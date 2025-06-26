import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  Long: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AcceptInvitationInput = {
  invitationCode: Scalars['String']['input'];
};

export type AcceptInvitationPayload = {
  __typename?: 'AcceptInvitationPayload';
  errors?: Maybe<Array<UserError>>;
  invitationResult?: Maybe<InvitationResult>;
  seller?: Maybe<Seller>;
};

export type AddCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayNumber: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type AddCategoryPayload = {
  __typename?: 'AddCategoryPayload';
  category?: Maybe<Category>;
  errors?: Maybe<Array<UserError>>;
};

export type AddExtraOptionCategoryInput = {
  name: Scalars['String']['input'];
};

export type AddExtraOptionCategoryPayload = {
  __typename?: 'AddExtraOptionCategoryPayload';
  errors?: Maybe<Array<UserError>>;
  extraOptionCategory?: Maybe<ExtraOptionCategory>;
};

export type AddExtraOptionInput = {
  extraOptionCategoryId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  price: MoneyInput;
};

export type AddExtraOptionPayload = {
  __typename?: 'AddExtraOptionPayload';
  errors?: Maybe<Array<UserError>>;
  extraOption?: Maybe<ExtraOption>;
};

export type AddImageInput = {
  file: Scalars['Upload']['input'];
};

export type AddImagePayload = {
  __typename?: 'AddImagePayload';
  errors?: Maybe<Array<UserError>>;
  image?: Maybe<Image>;
};

export type AddOrderInput = {
  customerDetails: CustomerDetailsInput;
  customerNotes?: InputMaybe<Scalars['String']['input']>;
  items: Array<AddOrderItemInput>;
  paymentType: PaymentType;
  shippingAddress: AddressInput;
  siteId: Scalars['ID']['input'];
};

export type AddOrderItemInput = {
  extraOptionsIds: Array<Scalars['ID']['input']>;
  productId: Scalars['ID']['input'];
  quantity: Scalars['Decimal']['input'];
};

export type AddOrderPayload = {
  __typename?: 'AddOrderPayload';
  errors?: Maybe<Array<UserError>>;
  order?: Maybe<Order>;
};

export type AddProductInput = {
  categoryIds: Array<Scalars['ID']['input']>;
  currency: Currency;
  description?: InputMaybe<Scalars['String']['input']>;
  extraOptionIds: Array<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  siteId: Scalars['ID']['input'];
  slug: Scalars['String']['input'];
};

export type AddProductPayload = {
  __typename?: 'AddProductPayload';
  errors?: Maybe<Array<UserError>>;
  product?: Maybe<Product>;
};

export type AddSiteInput = {
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type AddSitePayload = {
  __typename?: 'AddSitePayload';
  errors?: Maybe<Array<UserError>>;
  site?: Maybe<Site>;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  region: Scalars['String']['output'];
};

export type AddressFilterInput = {
  and?: InputMaybe<Array<AddressFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  displayName?: InputMaybe<StringOperationFilterInput>;
  line1?: InputMaybe<StringOperationFilterInput>;
  line2?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AddressFilterInput>>;
  region?: InputMaybe<StringOperationFilterInput>;
};

export type AddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  displayName?: InputMaybe<Scalars['String']['input']>;
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
  region: Scalars['String']['input'];
};

export type AddressSortInput = {
  city?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  displayName?: InputMaybe<SortEnumType>;
  line1?: InputMaybe<SortEnumType>;
  line2?: InputMaybe<SortEnumType>;
  region?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type AllExtraOptionsCategoriesForCurrentOrganisationConnection = {
  __typename?: 'AllExtraOptionsCategoriesForCurrentOrganisationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AllExtraOptionsCategoriesForCurrentOrganisationEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ExtraOptionCategory>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type AllExtraOptionsCategoriesForCurrentOrganisationEdge = {
  __typename?: 'AllExtraOptionsCategoriesForCurrentOrganisationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ExtraOptionCategory;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Buyer = Node & {
  __typename?: 'Buyer';
  id: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type CancelOrderInput = {
  orderId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};

export type CancelOrderPayload = {
  __typename?: 'CancelOrderPayload';
  errors?: Maybe<Array<UserError>>;
  order?: Maybe<Order>;
};

/** A connection to a list of items. */
export type CategoriesConnection = {
  __typename?: 'CategoriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CategoriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Category>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CategoriesEdge = {
  __typename?: 'CategoriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Category;
};

export type Category = Node & {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  displayNumber: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organisationId: Scalars['ID']['output'];
  products?: Maybe<ProductsConnection>;
  slug: Scalars['String']['output'];
};


export type CategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ProductSortInput>>;
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  description?: InputMaybe<StringOperationFilterInput>;
  displayNumber?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<LongOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
  organisationId?: InputMaybe<IdOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
};

export type CategorySortInput = {
  description?: InputMaybe<SortEnumType>;
  displayNumber?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  organisationId?: InputMaybe<SortEnumType>;
  slug?: InputMaybe<SortEnumType>;
};

export type CompleteOrderInput = {
  orderId: Scalars['ID']['input'];
};

export type CompleteOrderPayload = {
  __typename?: 'CompleteOrderPayload';
  errors?: Maybe<Array<UserError>>;
  order?: Maybe<Order>;
};

export type CreatePaymentDataInput = {
  orderId: Scalars['ID']['input'];
};

export enum Currency {
  None = 'NONE',
  Ron = 'RON'
}

export type CurrencyOperationFilterInput = {
  eq?: InputMaybe<Currency>;
  in?: InputMaybe<Array<Currency>>;
  neq?: InputMaybe<Currency>;
  nin?: InputMaybe<Array<Currency>>;
};

export type CustomerDetails = {
  __typename?: 'CustomerDetails';
  buyerId?: Maybe<Scalars['ID']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type CustomerDetailsFilterInput = {
  and?: InputMaybe<Array<CustomerDetailsFilterInput>>;
  buyerId?: InputMaybe<LongOperationFilterInput>;
  email?: InputMaybe<EmailAddressFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerDetailsFilterInput>>;
  phoneNumber?: InputMaybe<PhoneNumberFilterInput>;
};

export type CustomerDetailsInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerDetailsSortInput = {
  buyerId?: InputMaybe<SortEnumType>;
  email?: InputMaybe<EmailAddressSortInput>;
  firstName?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<PhoneNumberSortInput>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type DeleteCategoryInput = {
  id: Scalars['ID']['input'];
};

export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  deleted: Scalars['Boolean']['output'];
  errors?: Maybe<Array<UserError>>;
};

export type DeleteExtraOptionCategoryInput = {
  id: Scalars['ID']['input'];
};

export type DeleteExtraOptionCategoryPayload = {
  __typename?: 'DeleteExtraOptionCategoryPayload';
  deleted: Scalars['Boolean']['output'];
  errors?: Maybe<Array<UserError>>;
};

export type DeleteExtraOptionInput = {
  id: Scalars['ID']['input'];
};

export type DeleteExtraOptionPayload = {
  __typename?: 'DeleteExtraOptionPayload';
  deleted: Scalars['Boolean']['output'];
  errors?: Maybe<Array<UserError>>;
};

export type DeleteProductInput = {
  id: Scalars['ID']['input'];
};

export type DeleteProductPayload = {
  __typename?: 'DeleteProductPayload';
  deleted: Scalars['Boolean']['output'];
  errors?: Maybe<Array<UserError>>;
};

export type DeleteSiteInput = {
  id: Scalars['ID']['input'];
};

export type DeleteSitePayload = {
  __typename?: 'DeleteSitePayload';
  deleted: Scalars['Boolean']['output'];
  errors?: Maybe<Array<UserError>>;
};

export type EmailAddressFilterInput = {
  and?: InputMaybe<Array<EmailAddressFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<EmailAddressFilterInput>>;
};

export type EmailAddressSortInput = {
  email?: InputMaybe<SortEnumType>;
};

export type ExtraOption = {
  __typename?: 'ExtraOption';
  category?: Maybe<ExtraOptionCategory>;
  extraOptionCategoryId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Money;
};

export type ExtraOptionByIdPayload = {
  __typename?: 'ExtraOptionByIdPayload';
  errors?: Maybe<Array<UserError>>;
  extraOption?: Maybe<ExtraOption>;
};

export type ExtraOptionCategory = {
  __typename?: 'ExtraOptionCategory';
  extraOptions?: Maybe<ExtraOptionsConnection>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};


export type ExtraOptionCategoryExtraOptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ExtraOptionSortInput>>;
};

export type ExtraOptionCategoryByIdPayload = {
  __typename?: 'ExtraOptionCategoryByIdPayload';
  errors?: Maybe<Array<UserError>>;
  extraOptionCategory?: Maybe<ExtraOptionCategory>;
};

export type ExtraOptionCategorySortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  organisationId?: InputMaybe<SortEnumType>;
};

export type ExtraOptionSortInput = {
  extraOptionCategoryId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  organisationId?: InputMaybe<SortEnumType>;
  price?: InputMaybe<MoneySortInput>;
};

/** A connection to a list of items. */
export type ExtraOptionsConnection = {
  __typename?: 'ExtraOptionsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ExtraOptionsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ExtraOption>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ExtraOptionsEdge = {
  __typename?: 'ExtraOptionsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ExtraOption;
};

/** A connection to a list of items. */
export type ExtraOptionsForCurrentOrganisationConnection = {
  __typename?: 'ExtraOptionsForCurrentOrganisationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ExtraOptionsForCurrentOrganisationEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ExtraOption>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ExtraOptionsForCurrentOrganisationEdge = {
  __typename?: 'ExtraOptionsForCurrentOrganisationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ExtraOption;
};

export type GetOrganisationByIdInput = {
  organisationId: Scalars['ID']['input'];
};

export type IdOperationFilterInput = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type Image = {
  __typename?: 'Image';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  email?: Maybe<Scalars['String']['output']>;
  invitationCode: Scalars['String']['output'];
  invitationDate: Scalars['DateTime']['output'];
  invitationState: InvitationState;
  role: Role;
};

export enum InvitationResult {
  AlreadyAccepted = 'ALREADY_ACCEPTED',
  Joined = 'JOINED'
}

export enum InvitationState {
  Accepted = 'ACCEPTED',
  Canceled = 'CANCELED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

export type InviteSellerInput = {
  email: Scalars['String']['input'];
  role: Role;
};

export type InviteUserPayload = {
  __typename?: 'InviteUserPayload';
  errors?: Maybe<Array<UserError>>;
  seller?: Maybe<Seller>;
};

/** A connection to a list of items. */
export type ItemsConnection = {
  __typename?: 'ItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<OrderItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ItemsEdge = {
  __typename?: 'ItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: OrderItem;
};

export type ListFilterInputTypeOfAddressFilterInput = {
  all?: InputMaybe<AddressFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<AddressFilterInput>;
  some?: InputMaybe<AddressFilterInput>;
};

export type ListFilterInputTypeOfOrderItemExtraOptionFilterInput = {
  all?: InputMaybe<OrderItemExtraOptionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<OrderItemExtraOptionFilterInput>;
  some?: InputMaybe<OrderItemExtraOptionFilterInput>;
};

export type ListFilterInputTypeOfOrderItemFilterInput = {
  all?: InputMaybe<OrderItemFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<OrderItemFilterInput>;
  some?: InputMaybe<OrderItemFilterInput>;
};

export type ListFilterInputTypeOfProductCategoryLinkFilterInput = {
  all?: InputMaybe<ProductCategoryLinkFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ProductCategoryLinkFilterInput>;
  some?: InputMaybe<ProductCategoryLinkFilterInput>;
};

export type ListFilterInputTypeOfProductExtraOptionLinkFilterInput = {
  all?: InputMaybe<ProductExtraOptionLinkFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ProductExtraOptionLinkFilterInput>;
  some?: InputMaybe<ProductExtraOptionLinkFilterInput>;
};

export type LongOperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
  ngt?: InputMaybe<Scalars['Long']['input']>;
  ngte?: InputMaybe<Scalars['Long']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  nlt?: InputMaybe<Scalars['Long']['input']>;
  nlte?: InputMaybe<Scalars['Long']['input']>;
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Decimal']['output'];
  currency: Currency;
};

export type MoneyFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<MoneyFilterInput>>;
  currency?: InputMaybe<CurrencyOperationFilterInput>;
  or?: InputMaybe<Array<MoneyFilterInput>>;
};

export type MoneyInput = {
  amount: Scalars['Decimal']['input'];
  currency: Currency;
};

export type MoneySortInput = {
  amount?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation: AcceptInvitationPayload;
  addCategory: AddCategoryPayload;
  addExtraOption: AddExtraOptionPayload;
  addExtraOptionCategory: AddExtraOptionCategoryPayload;
  addImage: AddImagePayload;
  addOrderForMe: AddOrderPayload;
  addProduct: AddProductPayload;
  addSite: AddSitePayload;
  cancelOrder: CancelOrderPayload;
  completeOrder: CompleteOrderPayload;
  createPaymentData: PaymentDataResult;
  deleteCategory: DeleteCategoryPayload;
  deleteExtraOption: DeleteExtraOptionPayload;
  deleteExtraOptionCategory: DeleteExtraOptionCategoryPayload;
  deleteProduct: DeleteProductPayload;
  deleteSite: DeleteSitePayload;
  inviteSeller: InviteUserPayload;
  onBuyerSignIn: OnBuyerSignInPayload;
  onSellerSignIn: OnSellerSignInPayload;
  removeSeller: RemoveSellerPayload;
  startOrderProcessing: StartOrderProcessingPayload;
  updateCategory: UpdateCategoryPayload;
  updateExtraOption: UpdateExtraOptionPayload;
  updateExtraOptionCategory: UpdateExtraOptionCategoryPayload;
  updateProduct: UpdateProductPayload;
  updateSite: UpdateSitePayload;
};


export type MutationAcceptInvitationArgs = {
  input: AcceptInvitationInput;
};


export type MutationAddCategoryArgs = {
  input: AddCategoryInput;
};


export type MutationAddExtraOptionArgs = {
  input: AddExtraOptionInput;
};


export type MutationAddExtraOptionCategoryArgs = {
  input: AddExtraOptionCategoryInput;
};


export type MutationAddImageArgs = {
  input: AddImageInput;
};


export type MutationAddOrderForMeArgs = {
  input: AddOrderInput;
};


export type MutationAddProductArgs = {
  input: AddProductInput;
};


export type MutationAddSiteArgs = {
  input: AddSiteInput;
};


export type MutationCancelOrderArgs = {
  input: CancelOrderInput;
};


export type MutationCompleteOrderArgs = {
  input: CompleteOrderInput;
};


export type MutationCreatePaymentDataArgs = {
  input: CreatePaymentDataInput;
};


export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


export type MutationDeleteExtraOptionArgs = {
  input: DeleteExtraOptionInput;
};


export type MutationDeleteExtraOptionCategoryArgs = {
  input: DeleteExtraOptionCategoryInput;
};


export type MutationDeleteProductArgs = {
  input: DeleteProductInput;
};


export type MutationDeleteSiteArgs = {
  input: DeleteSiteInput;
};


export type MutationInviteSellerArgs = {
  input: InviteSellerInput;
};


export type MutationRemoveSellerArgs = {
  input: RemoveSellerInput;
};


export type MutationStartOrderProcessingArgs = {
  input: StartOrderProcessingInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateExtraOptionArgs = {
  input: UpdateExtraOptionInput;
};


export type MutationUpdateExtraOptionCategoryArgs = {
  input: UpdateExtraOptionCategoryInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateSiteArgs = {
  input: UpdateSiteInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID']['output'];
};

export type OnBuyerSignInPayload = {
  __typename?: 'OnBuyerSignInPayload';
  buyer?: Maybe<Buyer>;
  errors?: Maybe<Array<UserError>>;
};

export type OnSellerSignInPayload = {
  __typename?: 'OnSellerSignInPayload';
  errors?: Maybe<Array<UserError>>;
  seller?: Maybe<Seller>;
};

export type Order = Node & {
  __typename?: 'Order';
  belongsToAnonymousUser: Scalars['Boolean']['output'];
  customerDetails: CustomerDetails;
  customerNotes?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isWaitingForPayment: Scalars['Boolean']['output'];
  items?: Maybe<ItemsConnection>;
  number: Scalars['String']['output'];
  orderDateTime: Scalars['DateTime']['output'];
  organisationId: Scalars['ID']['output'];
  paymentState: PaymentState;
  shippingAddress: Address;
  siteId: Scalars['ID']['output'];
  stateDescription: OrderStateDescription;
  totalPrice: Money;
};


export type OrderItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderByIdPayload = {
  __typename?: 'OrderByIdPayload';
  errors?: Maybe<Array<UserError>>;
  order?: Maybe<Order>;
};

export type OrderFilterInput = {
  and?: InputMaybe<Array<OrderFilterInput>>;
  belongsToAnonymousUser?: InputMaybe<BooleanOperationFilterInput>;
  customerDetails?: InputMaybe<CustomerDetailsFilterInput>;
  customerNotes?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<LongOperationFilterInput>;
  isWaitingForPayment?: InputMaybe<BooleanOperationFilterInput>;
  items?: InputMaybe<ListFilterInputTypeOfOrderItemFilterInput>;
  number?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<OrderFilterInput>>;
  orderDateTime?: InputMaybe<DateTimeOperationFilterInput>;
  organisationId?: InputMaybe<IdOperationFilterInput>;
  paymentState?: InputMaybe<PaymentStateFilterInput>;
  shippingAddress?: InputMaybe<AddressFilterInput>;
  siteId?: InputMaybe<LongOperationFilterInput>;
  stateDescription?: InputMaybe<OrderStateDescriptionFilterInput>;
  totalPrice?: InputMaybe<MoneyFilterInput>;
};

export type OrderItem = Node & {
  __typename?: 'OrderItem';
  extraOptions: Array<OrderItemExtraOption>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  orderId: Scalars['ID']['output'];
  orderItemTotalPrice: Money;
  organisationId: Scalars['Long']['output'];
  product?: Maybe<Product>;
  productDescription?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['ID']['output']>;
  productName: Scalars['String']['output'];
  productPrice: Money;
  quantity: Scalars['Decimal']['output'];
};

export type OrderItemExtraOption = {
  __typename?: 'OrderItemExtraOption';
  extraOptionId?: Maybe<Scalars['Long']['output']>;
  name: Scalars['String']['output'];
  price: Money;
};

export type OrderItemExtraOptionFilterInput = {
  and?: InputMaybe<Array<OrderItemExtraOptionFilterInput>>;
  extraOptionId?: InputMaybe<LongOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<OrderItemExtraOptionFilterInput>>;
  price?: InputMaybe<MoneyFilterInput>;
};

export type OrderItemFilterInput = {
  and?: InputMaybe<Array<OrderItemFilterInput>>;
  extraOptions?: InputMaybe<ListFilterInputTypeOfOrderItemExtraOptionFilterInput>;
  id?: InputMaybe<LongOperationFilterInput>;
  image?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<OrderItemFilterInput>>;
  orderId?: InputMaybe<LongOperationFilterInput>;
  orderItemTotalPrice?: InputMaybe<MoneyFilterInput>;
  organisationId?: InputMaybe<LongOperationFilterInput>;
  productDescription?: InputMaybe<StringOperationFilterInput>;
  productId?: InputMaybe<LongOperationFilterInput>;
  productName?: InputMaybe<StringOperationFilterInput>;
  productPrice?: InputMaybe<MoneyFilterInput>;
  quantity?: InputMaybe<DecimalOperationFilterInput>;
};

export type OrderSortInput = {
  belongsToAnonymousUser?: InputMaybe<SortEnumType>;
  customerDetails?: InputMaybe<CustomerDetailsSortInput>;
  customerNotes?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isWaitingForPayment?: InputMaybe<SortEnumType>;
  number?: InputMaybe<SortEnumType>;
  orderDateTime?: InputMaybe<SortEnumType>;
  organisationId?: InputMaybe<SortEnumType>;
  paymentState?: InputMaybe<PaymentStateSortInput>;
  shippingAddress?: InputMaybe<AddressSortInput>;
  siteId?: InputMaybe<SortEnumType>;
  stateDescription?: InputMaybe<OrderStateDescriptionSortInput>;
  totalPrice?: InputMaybe<MoneySortInput>;
};

export enum OrderState {
  AwaitingPayment = 'AWAITING_PAYMENT',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Delivering = 'DELIVERING',
  Draft = 'DRAFT',
  Processing = 'PROCESSING'
}

export type OrderStateDescription = {
  __typename?: 'OrderStateDescription';
  isOpen: Scalars['Boolean']['output'];
  orderState: OrderState;
  stateChangeDescription?: Maybe<Scalars['String']['output']>;
};

export type OrderStateDescriptionFilterInput = {
  and?: InputMaybe<Array<OrderStateDescriptionFilterInput>>;
  isOpen?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<OrderStateDescriptionFilterInput>>;
  orderState?: InputMaybe<OrderStateOperationFilterInput>;
  stateChangeDescription?: InputMaybe<StringOperationFilterInput>;
};

export type OrderStateDescriptionSortInput = {
  isOpen?: InputMaybe<SortEnumType>;
  orderState?: InputMaybe<SortEnumType>;
  stateChangeDescription?: InputMaybe<SortEnumType>;
};

export type OrderStateOperationFilterInput = {
  eq?: InputMaybe<OrderState>;
  in?: InputMaybe<Array<OrderState>>;
  neq?: InputMaybe<OrderState>;
  nin?: InputMaybe<Array<OrderState>>;
};

/** A connection to a list of items. */
export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrdersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Order>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type OrdersEdge = {
  __typename?: 'OrdersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Order;
};

/** A connection to a list of items. */
export type OrdersForMeConnection = {
  __typename?: 'OrdersForMeConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrdersForMeEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Order>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type OrdersForMeEdge = {
  __typename?: 'OrdersForMeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Order;
};

export type OrdersSummaryPayload = {
  __typename?: 'OrdersSummaryPayload';
  errors?: Maybe<Array<UserError>>;
  newOrders: Scalars['Int']['output'];
  processingOrders: Scalars['Int']['output'];
};

export type Organisation = Node & {
  __typename?: 'Organisation';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sellers: Array<Seller>;
};

export type OrganisationByIdResult = {
  __typename?: 'OrganisationByIdResult';
  errors?: Maybe<Array<UserError>>;
  organisation?: Maybe<Organisation>;
};

export type OrganisationFilterInput = {
  and?: InputMaybe<Array<OrganisationFilterInput>>;
  id?: InputMaybe<LongOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<OrganisationFilterInput>>;
};

export type OrganisationSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type OrganisationsConnection = {
  __typename?: 'OrganisationsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrganisationsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Organisation>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type OrganisationsEdge = {
  __typename?: 'OrganisationsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Organisation;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaymentData = {
  __typename?: 'PaymentData';
  cipher: Scalars['String']['output'];
  data: Scalars['String']['output'];
  iv: Scalars['String']['output'];
  key: Scalars['String']['output'];
  paymentUri: Scalars['String']['output'];
};

export type PaymentDataResult = {
  __typename?: 'PaymentDataResult';
  errors?: Maybe<Array<UserError>>;
  pymentData?: Maybe<PaymentData>;
};

export type PaymentState = {
  __typename?: 'PaymentState';
  canAcceptPayment: Scalars['Boolean']['output'];
  paid: PaymentState;
  paymentTransactionId?: Maybe<Scalars['Long']['output']>;
  status: PaymentStatus;
  type: PaymentType;
};


export type PaymentStatePaidArgs = {
  paymentMessageId: Scalars['Long']['input'];
};

export type PaymentStateFilterInput = {
  and?: InputMaybe<Array<PaymentStateFilterInput>>;
  canAcceptPayment?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<PaymentStateFilterInput>>;
  paymentTransactionId?: InputMaybe<LongOperationFilterInput>;
  status?: InputMaybe<PaymentStatusOperationFilterInput>;
  type?: InputMaybe<PaymentTypeOperationFilterInput>;
};

export type PaymentStateSortInput = {
  canAcceptPayment?: InputMaybe<SortEnumType>;
  paymentTransactionId?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export enum PaymentStatus {
  AwaitingPaymentCompletion = 'AWAITING_PAYMENT_COMPLETION',
  NotPaid = 'NOT_PAID',
  Paid = 'PAID'
}

export type PaymentStatusOperationFilterInput = {
  eq?: InputMaybe<PaymentStatus>;
  in?: InputMaybe<Array<PaymentStatus>>;
  neq?: InputMaybe<PaymentStatus>;
  nin?: InputMaybe<Array<PaymentStatus>>;
};

export enum PaymentType {
  Card = 'CARD',
  Cash = 'CASH'
}

export type PaymentTypeOperationFilterInput = {
  eq?: InputMaybe<PaymentType>;
  in?: InputMaybe<Array<PaymentType>>;
  neq?: InputMaybe<PaymentType>;
  nin?: InputMaybe<Array<PaymentType>>;
};

export type PhoneNumber = {
  __typename?: 'PhoneNumber';
  phone: Scalars['String']['output'];
};

export type PhoneNumberFilterInput = {
  and?: InputMaybe<Array<PhoneNumberFilterInput>>;
  or?: InputMaybe<Array<PhoneNumberFilterInput>>;
  phone?: InputMaybe<StringOperationFilterInput>;
};

export type PhoneNumberSortInput = {
  phone?: InputMaybe<SortEnumType>;
};

export type Product = Node & {
  __typename?: 'Product';
  categories: Array<Category>;
  description?: Maybe<Scalars['String']['output']>;
  extraOptions: Array<ExtraOption>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  name: Scalars['String']['output'];
  organisationId: Scalars['ID']['output'];
  price: Money;
  siteId: Scalars['ID']['output'];
  siteSummary: Site;
  slug: Scalars['String']['output'];
};

export type ProductCategoryLinkFilterInput = {
  and?: InputMaybe<Array<ProductCategoryLinkFilterInput>>;
  categoryId?: InputMaybe<LongOperationFilterInput>;
  or?: InputMaybe<Array<ProductCategoryLinkFilterInput>>;
  productId?: InputMaybe<LongOperationFilterInput>;
};

export type ProductExtraOptionLinkFilterInput = {
  and?: InputMaybe<Array<ProductExtraOptionLinkFilterInput>>;
  extraOptionId?: InputMaybe<LongOperationFilterInput>;
  or?: InputMaybe<Array<ProductExtraOptionLinkFilterInput>>;
  productId?: InputMaybe<LongOperationFilterInput>;
};

export type ProductFilterInput = {
  and?: InputMaybe<Array<ProductFilterInput>>;
  categoryLinks?: InputMaybe<ListFilterInputTypeOfProductCategoryLinkFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  extraOptionLinks?: InputMaybe<ListFilterInputTypeOfProductExtraOptionLinkFilterInput>;
  id?: InputMaybe<LongOperationFilterInput>;
  image?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProductFilterInput>>;
  organisationId?: InputMaybe<IdOperationFilterInput>;
  price?: InputMaybe<MoneyFilterInput>;
  siteId?: InputMaybe<LongOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
};

export type ProductSortInput = {
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  image?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  organisationId?: InputMaybe<SortEnumType>;
  price?: InputMaybe<MoneySortInput>;
  siteId?: InputMaybe<SortEnumType>;
  slug?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProductsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Product>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ProductsEdge = {
  __typename?: 'ProductsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Product;
};

export type Query = {
  __typename?: 'Query';
  allExtraOptionsCategoriesForCurrentOrganisation?: Maybe<AllExtraOptionsCategoriesForCurrentOrganisationConnection>;
  allExtraOptionsForCurrentOrganisation: Array<ExtraOption>;
  categories?: Maybe<CategoriesConnection>;
  categoryById: Category;
  extraOptionById: ExtraOptionByIdPayload;
  extraOptionCategoryById: ExtraOptionCategoryByIdPayload;
  extraOptionsForCurrentOrganisation?: Maybe<ExtraOptionsForCurrentOrganisationConnection>;
  mySeller: SellerByIdResult;
  myUser: QueryUserPayload;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  orderById: OrderByIdPayload;
  orders?: Maybe<OrdersConnection>;
  ordersForMe?: Maybe<OrdersForMeConnection>;
  ordersSummary: OrdersSummaryPayload;
  organisationById: OrganisationByIdResult;
  organisations?: Maybe<OrganisationsConnection>;
  productById: Product;
  productBySlug: Product;
  products?: Maybe<ProductsConnection>;
  siteById: Site;
  siteBySlug: Site;
  sites?: Maybe<SitesConnection>;
  userByExternalId: QueryUserPayload;
  userById: QueryUserPayload;
};


export type QueryAllExtraOptionsCategoriesForCurrentOrganisationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ExtraOptionCategorySortInput>>;
};


export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CategorySortInput>>;
  where?: InputMaybe<CategoryFilterInput>;
};


export type QueryCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExtraOptionByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExtraOptionCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryExtraOptionsForCurrentOrganisationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ExtraOptionSortInput>>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryOrderByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<OrderSortInput>>;
  where?: InputMaybe<OrderFilterInput>;
};


export type QueryOrdersForMeArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<OrderSortInput>>;
  where?: InputMaybe<OrderFilterInput>;
};


export type QueryOrganisationByIdArgs = {
  input: GetOrganisationByIdInput;
};


export type QueryOrganisationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<OrganisationSortInput>>;
  where?: InputMaybe<OrganisationFilterInput>;
};


export type QueryProductByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductBySlugArgs = {
  productSlug: Scalars['String']['input'];
  siteSlug: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ProductSortInput>>;
  where?: InputMaybe<ProductFilterInput>;
};


export type QuerySiteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySiteBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QuerySitesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SiteSortInput>>;
  where?: InputMaybe<SiteFilterInput>;
};


export type QueryUserByExternalIdArgs = {
  externalId: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUserPayload = {
  __typename?: 'QueryUserPayload';
  errors?: Maybe<Array<UserError>>;
  user?: Maybe<User>;
};

export type RemoveSellerInput = {
  sellerId: Scalars['ID']['input'];
};

export type RemoveSellerPayload = {
  __typename?: 'RemoveSellerPayload';
  deleted: Scalars['Boolean']['output'];
  errors?: Maybe<Array<UserError>>;
};

export enum Role {
  Admin = 'ADMIN',
  Owner = 'OWNER',
  Seller = 'SELLER'
}

export type Seller = Node & {
  __typename?: 'Seller';
  id: Scalars['ID']['output'];
  invitation?: Maybe<Invitation>;
  isSellerInvitationAccepted: Scalars['Boolean']['output'];
  organisation: Organisation;
  organisationId: Scalars['ID']['output'];
  role: Role;
  sellerState: SellerState;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type SellerByIdResult = {
  __typename?: 'SellerByIdResult';
  errors?: Maybe<Array<UserError>>;
  seller?: Maybe<Seller>;
};

export enum SellerState {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  InvitationPending = 'INVITATION_PENDING'
}

export type Site = Node & {
  __typename?: 'Site';
  categories?: Maybe<CategoriesConnection>;
  deliveryOptions: Array<Address>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  onlyPredeffinedDeliveryOptions: Scalars['Boolean']['output'];
  organisationId: Scalars['ID']['output'];
  products?: Maybe<ProductsConnection>;
  slug: Scalars['String']['output'];
};


export type SiteCategoriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CategorySortInput>>;
};


export type SiteProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type SiteFilterInput = {
  and?: InputMaybe<Array<SiteFilterInput>>;
  deliveryOptions?: InputMaybe<ListFilterInputTypeOfAddressFilterInput>;
  id?: InputMaybe<LongOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  onlyPredeffinedDeliveryOptions?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<SiteFilterInput>>;
  organisationId?: InputMaybe<IdOperationFilterInput>;
  slug?: InputMaybe<StringOperationFilterInput>;
};

export type SiteSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  onlyPredeffinedDeliveryOptions?: InputMaybe<SortEnumType>;
  organisationId?: InputMaybe<SortEnumType>;
  slug?: InputMaybe<SortEnumType>;
};

export type SiteSummary = Node & {
  __typename?: 'SiteSummary';
  deliveryOptions: Array<Address>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  onlyPredeffinedDeliveryOptions: Scalars['Boolean']['output'];
  organisationId: Scalars['Long']['output'];
  slug: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type SitesConnection = {
  __typename?: 'SitesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SitesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Site>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SitesEdge = {
  __typename?: 'SitesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Site;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StartOrderProcessingInput = {
  orderId: Scalars['ID']['input'];
};

export type StartOrderProcessingPayload = {
  __typename?: 'StartOrderProcessingPayload';
  errors?: Maybe<Array<UserError>>;
  order?: Maybe<Order>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayNumber: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  category?: Maybe<Category>;
  errors?: Maybe<Array<UserError>>;
};

export type UpdateExtraOptionCategoryInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateExtraOptionCategoryPayload = {
  __typename?: 'UpdateExtraOptionCategoryPayload';
  errors?: Maybe<Array<UserError>>;
  extraOptionCategory?: Maybe<ExtraOptionCategory>;
};

export type UpdateExtraOptionInput = {
  extraOptionCategoryId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  price: MoneyInput;
};

export type UpdateExtraOptionPayload = {
  __typename?: 'UpdateExtraOptionPayload';
  errors?: Maybe<Array<UserError>>;
  extraOption?: Maybe<ExtraOption>;
};

export type UpdateProductInput = {
  categoryIds: Array<Scalars['ID']['input']>;
  currency: Currency;
  description?: InputMaybe<Scalars['String']['input']>;
  extraOptionIds: Array<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  siteId: Scalars['ID']['input'];
  slug: Scalars['String']['input'];
};

export type UpdateProductPayload = {
  __typename?: 'UpdateProductPayload';
  errors?: Maybe<Array<UserError>>;
  product?: Maybe<Product>;
};

export type UpdateSiteInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type UpdateSitePayload = {
  __typename?: 'UpdateSitePayload';
  errors?: Maybe<Array<UserError>>;
  site?: Maybe<Site>;
};

export type User = Node & {
  __typename?: 'User';
  buyer: Buyer;
  email?: Maybe<Scalars['String']['output']>;
  externalId: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<PhoneNumber>;
  sellers: Array<Seller>;
};

export type UserError = {
  __typename?: 'UserError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type AddSiteMutationVariables = Exact<{
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
}>;


export type AddSiteMutation = { __typename?: 'Mutation', addSite: { __typename?: 'AddSitePayload', site?: { __typename?: 'Site', name: string, id: string, slug: string } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type UpdateSiteMutationVariables = Exact<{
  input: UpdateSiteInput;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite: { __typename?: 'UpdateSitePayload', site?: { __typename?: 'Site', id: string, name: string, slug: string } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type DeleteSiteMutationVariables = Exact<{
  input: DeleteSiteInput;
}>;


export type DeleteSiteMutation = { __typename?: 'Mutation', deleteSite: { __typename?: 'DeleteSitePayload', deleted: boolean, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type AddProductMutationVariables = Exact<{
  input: AddProductInput;
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'AddProductPayload', product?: { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, price: { __typename?: 'Money', amount: any, currency: Currency } } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'UpdateProductPayload', product?: { __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, image?: { __typename?: 'Image', name: string, url: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency }, categories: Array<{ __typename?: 'Category', name: string }> } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type DeleteProductMutationVariables = Exact<{
  input: DeleteProductInput;
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: { __typename?: 'DeleteProductPayload', deleted: boolean, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type AddCategoryMutationVariables = Exact<{
  input: AddCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'AddCategoryPayload', category?: { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, displayNumber: number } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type UpdateCategoryMutationVariables = Exact<{
  input: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'UpdateCategoryPayload', category?: { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type DeleteCategoryMutationVariables = Exact<{
  input: DeleteCategoryInput;
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'DeleteCategoryPayload', deleted: boolean, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type AddExtraOptionCategoryMutationVariables = Exact<{
  input: AddExtraOptionCategoryInput;
}>;


export type AddExtraOptionCategoryMutation = { __typename?: 'Mutation', addExtraOptionCategory: { __typename?: 'AddExtraOptionCategoryPayload', errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null, extraOptionCategory?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null } };

export type UpdateExtraOptionCategoryMutationVariables = Exact<{
  input: UpdateExtraOptionCategoryInput;
}>;


export type UpdateExtraOptionCategoryMutation = { __typename?: 'Mutation', updateExtraOptionCategory: { __typename?: 'UpdateExtraOptionCategoryPayload', errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null, extraOptionCategory?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null } };

export type DeleteExtraOptionCategoryMutationVariables = Exact<{
  input: DeleteExtraOptionCategoryInput;
}>;


export type DeleteExtraOptionCategoryMutation = { __typename?: 'Mutation', deleteExtraOptionCategory: { __typename?: 'DeleteExtraOptionCategoryPayload', deleted: boolean, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type AddExtraOptionMutationVariables = Exact<{
  input: AddExtraOptionInput;
}>;


export type AddExtraOptionMutation = { __typename?: 'Mutation', addExtraOption: { __typename?: 'AddExtraOptionPayload', errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null, extraOption?: { __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, price: { __typename?: 'Money', amount: any, currency: Currency } } | null } };

export type UpdateExtraOptionMutationVariables = Exact<{
  input: UpdateExtraOptionInput;
}>;


export type UpdateExtraOptionMutation = { __typename?: 'Mutation', updateExtraOption: { __typename?: 'UpdateExtraOptionPayload', errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null, extraOption?: { __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, price: { __typename?: 'Money', amount: any, currency: Currency } } | null } };

export type DeleteExtraOptionMutationVariables = Exact<{
  input: DeleteExtraOptionInput;
}>;


export type DeleteExtraOptionMutation = { __typename?: 'Mutation', deleteExtraOption: { __typename?: 'DeleteExtraOptionPayload', deleted: boolean, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type AddImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type AddImageMutation = { __typename?: 'Mutation', addImage: { __typename?: 'AddImagePayload', image?: { __typename?: 'Image', name: string, url: string } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type StartOrderProcessingMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type StartOrderProcessingMutation = { __typename?: 'Mutation', startOrderProcessing: { __typename?: 'StartOrderProcessingPayload', order?: { __typename?: 'Order', stateDescription: { __typename?: 'OrderStateDescription', orderState: OrderState, stateChangeDescription?: string | null } } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type CompleteOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type CompleteOrderMutation = { __typename?: 'Mutation', completeOrder: { __typename?: 'CompleteOrderPayload', order?: { __typename?: 'Order', stateDescription: { __typename?: 'OrderStateDescription', orderState: OrderState, stateChangeDescription?: string | null } } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type CancelOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
}>;


export type CancelOrderMutation = { __typename?: 'Mutation', cancelOrder: { __typename?: 'CancelOrderPayload', order?: { __typename?: 'Order', stateDescription: { __typename?: 'OrderStateDescription', orderState: OrderState, stateChangeDescription?: string | null } } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type InviteSellerMutationVariables = Exact<{
  email: Scalars['String']['input'];
  role: Role;
}>;


export type InviteSellerMutation = { __typename?: 'Mutation', inviteSeller: { __typename?: 'InviteUserPayload', seller?: { __typename?: 'Seller', id: string } | null } };

export type RemoveSellerMutationVariables = Exact<{
  sellerId: Scalars['ID']['input'];
}>;


export type RemoveSellerMutation = { __typename?: 'Mutation', removeSeller: { __typename?: 'RemoveSellerPayload', deleted: boolean, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type CoreSiteFieldsFragment = { __typename?: 'Site', id: string, name: string, slug: string };

export type GetSitesQueryVariables = Exact<{
  organisationId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetSitesQuery = { __typename?: 'Query', sites?: { __typename?: 'SitesConnection', nodes?: Array<{ __typename?: 'Site', id: string, name: string, slug: string }> | null } | null };

export type GetSiteByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSiteByIdQuery = { __typename?: 'Query', siteById: { __typename?: 'Site', id: string, name: string, slug: string } };

export type CoreProductFieldsFragment = { __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, price: { __typename?: 'Money', amount: any, currency: Currency }, image?: { __typename?: 'Image', url: string, name: string } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products?: { __typename?: 'ProductsConnection', nodes?: Array<{ __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, price: { __typename?: 'Money', amount: any, currency: Currency }, image?: { __typename?: 'Image', url: string, name: string } | null }> | null } | null };

export type DetailedProductFieldsFragment = { __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string }>, site: { __typename?: 'Site', id: string, name: string }, extraOptions: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, price: { __typename?: 'Money', amount: any, currency: Currency }, image?: { __typename?: 'Image', url: string, name: string } | null };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', productById: { __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string }>, site: { __typename?: 'Site', id: string, name: string }, extraOptions: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, price: { __typename?: 'Money', amount: any, currency: Currency }, image?: { __typename?: 'Image', url: string, name: string } | null } };

export type CoreCategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, displayNumber: number };

export type DetailedCategoryFieldsFragment = { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, products?: { __typename?: 'ProductsConnection', nodes?: Array<{ __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string }>, site: { __typename?: 'Site', id: string, name: string }, extraOptions: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, price: { __typename?: 'Money', amount: any, currency: Currency }, image?: { __typename?: 'Image', url: string, name: string } | null }> | null } | null };

export type GetCategoriesQueryVariables = Exact<{
  organisationId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoriesConnection', nodes?: Array<{ __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, displayNumber: number }> | null } | null };

export type GetCategoryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', categoryById: { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, displayNumber: number } };

export type GetExtraOptionsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExtraOptionsCategoriesQuery = { __typename?: 'Query', allExtraOptionsCategoriesForCurrentOrganisation?: { __typename?: 'AllExtraOptionsCategoriesForCurrentOrganisationConnection', totalCount: number, nodes?: Array<{ __typename?: 'ExtraOptionCategory', id: string, name: string, extraOptions?: { __typename?: 'ExtraOptionsConnection', totalCount: number } | null }> | null } | null };

export type GetAllExtraOptionCategoriesPaginationQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllExtraOptionCategoriesPaginationQuery = { __typename?: 'Query', allExtraOptionsCategoriesForCurrentOrganisation?: { __typename?: 'AllExtraOptionsCategoriesForCurrentOrganisationConnection', totalCount: number, nodes?: Array<{ __typename?: 'ExtraOptionCategory', id: string, name: string, extraOptions?: { __typename?: 'ExtraOptionsConnection', totalCount: number } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type GetExtraOptionsCategoriesNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExtraOptionsCategoriesNameQuery = { __typename?: 'Query', allExtraOptionsCategoriesForCurrentOrganisation?: { __typename?: 'AllExtraOptionsCategoriesForCurrentOrganisationConnection', nodes?: Array<{ __typename?: 'ExtraOptionCategory', id: string, name: string }> | null } | null };

export type GetExtraOptionCategoryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetExtraOptionCategoryByIdQuery = { __typename?: 'Query', extraOptionCategoryById: { __typename?: 'ExtraOptionCategoryByIdPayload', extraOptionCategory?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null } };

export type GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetExtraOptionCategoryWithExtraOptionsByIdQuery = { __typename?: 'Query', extraOptionCategoryById: { __typename?: 'ExtraOptionCategoryByIdPayload', extraOptionCategory?: { __typename?: 'ExtraOptionCategory', id: string, name: string, extraOptions?: { __typename?: 'ExtraOptionsConnection', totalCount: number, nodes?: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, price: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null } | null } };

export type GetExtraOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExtraOptionsQuery = { __typename?: 'Query', extraOptionsForCurrentOrganisation?: { __typename?: 'ExtraOptionsForCurrentOrganisationConnection', totalCount: number, nodes?: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, category?: { __typename?: 'ExtraOptionCategory', name: string, id: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null };

export type GetAllExtraOptionsPaginationQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllExtraOptionsPaginationQuery = { __typename?: 'Query', extraOptionsForCurrentOrganisation?: { __typename?: 'ExtraOptionsForCurrentOrganisationConnection', totalCount: number, nodes?: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, category?: { __typename?: 'ExtraOptionCategory', name: string, id: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type GetExtraOptionByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetExtraOptionByIdQuery = { __typename?: 'Query', extraOptionById: { __typename?: 'ExtraOptionByIdPayload', extraOption?: { __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, price: { __typename?: 'Money', amount: any, currency: Currency } } | null } };

export type GetCategoryWithProductsByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCategoryWithProductsByIdQuery = { __typename?: 'Query', categoryById: { __typename?: 'Category', id: string, name: string, slug: string, description?: string | null, products?: { __typename?: 'ProductsConnection', nodes?: Array<{ __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string }>, site: { __typename?: 'Site', id: string, name: string }, extraOptions: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, price: { __typename?: 'Money', amount: any, currency: Currency }, image?: { __typename?: 'Image', url: string, name: string } | null }> | null } | null } };

export type GetCreateProductDetailsQueryVariables = Exact<{
  organisationId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCreateProductDetailsQuery = { __typename?: 'Query', categories?: { __typename?: 'CategoriesConnection', nodes?: Array<{ __typename?: 'Category', id: string, name: string }> | null } | null, sites?: { __typename?: 'SitesConnection', nodes?: Array<{ __typename?: 'Site', id: string, name: string }> | null } | null, allExtraOptionsForCurrentOrganisation: Array<{ __typename?: 'ExtraOption', id: string, name: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }> };

export type CoreOrderFieldsFragment = { __typename?: 'Order', id: string, number: string, stateDescription: { __typename?: 'OrderStateDescription', isOpen: boolean, orderState: OrderState, stateChangeDescription?: string | null }, totalPrice: { __typename?: 'Money', amount: any, currency: Currency } };

export type OrderItemsDetailsFragment = { __typename?: 'Order', items?: { __typename?: 'ItemsConnection', nodes?: Array<{ __typename?: 'OrderItem', id: string, productName: string, quantity: any, productDescription?: string | null, productPrice: { __typename?: 'Money', amount: any, currency: Currency }, extraOptions: Array<{ __typename?: 'OrderItemExtraOption', name: string, price: { __typename?: 'Money', amount: any, currency: Currency } }>, orderItemTotalPrice: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null };

export type ShippingAddressFragment = { __typename?: 'Order', shippingAddress: { __typename?: 'Address', country: string, region: string, city: string, line1: string, line2?: string | null, displayName?: string | null } };

export type CustomerDetailsFragment = { __typename?: 'Order', customerDetails: { __typename?: 'CustomerDetails', phoneNumber?: string | null, email?: string | null, fullName: string } };

export type OrderDetailsFragment = { __typename?: 'Order', id: string, number: string, stateDescription: { __typename?: 'OrderStateDescription', isOpen: boolean, orderState: OrderState, stateChangeDescription?: string | null }, totalPrice: { __typename?: 'Money', amount: any, currency: Currency }, items?: { __typename?: 'ItemsConnection', nodes?: Array<{ __typename?: 'OrderItem', id: string, productName: string, quantity: any, productDescription?: string | null, productPrice: { __typename?: 'Money', amount: any, currency: Currency }, extraOptions: Array<{ __typename?: 'OrderItemExtraOption', name: string, price: { __typename?: 'Money', amount: any, currency: Currency } }>, orderItemTotalPrice: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null, shippingAddress: { __typename?: 'Address', country: string, region: string, city: string, line1: string, line2?: string | null, displayName?: string | null }, customerDetails: { __typename?: 'CustomerDetails', phoneNumber?: string | null, email?: string | null, fullName: string } };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', orders?: { __typename?: 'OrdersConnection', nodes?: Array<{ __typename?: 'Order', id: string, number: string, stateDescription: { __typename?: 'OrderStateDescription', isOpen: boolean, orderState: OrderState, stateChangeDescription?: string | null }, totalPrice: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null };

export type GetOrderByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', orderById: { __typename?: 'OrderByIdPayload', order?: { __typename?: 'Order', id: string, number: string, stateDescription: { __typename?: 'OrderStateDescription', isOpen: boolean, orderState: OrderState, stateChangeDescription?: string | null }, totalPrice: { __typename?: 'Money', amount: any, currency: Currency }, items?: { __typename?: 'ItemsConnection', nodes?: Array<{ __typename?: 'OrderItem', id: string, productName: string, quantity: any, productDescription?: string | null, productPrice: { __typename?: 'Money', amount: any, currency: Currency }, extraOptions: Array<{ __typename?: 'OrderItemExtraOption', name: string, price: { __typename?: 'Money', amount: any, currency: Currency } }>, orderItemTotalPrice: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null, shippingAddress: { __typename?: 'Address', country: string, region: string, city: string, line1: string, line2?: string | null, displayName?: string | null }, customerDetails: { __typename?: 'CustomerDetails', phoneNumber?: string | null, email?: string | null, fullName: string } } | null } };

export type OrdersSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersSummaryQuery = { __typename?: 'Query', ordersSummary: { __typename?: 'OrdersSummaryPayload', newOrders: number, processingOrders: number } };

export type PageInfoFieldsFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type GetAllProductsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  organisationId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAllProductsQuery = { __typename?: 'Query', products?: { __typename?: 'ProductsConnection', totalCount: number, nodes?: Array<{ __typename?: 'Product', id: string, siteId: string, name: string, slug: string, description?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string }>, site: { __typename?: 'Site', id: string, name: string }, extraOptions: Array<{ __typename?: 'ExtraOption', id: string, name: string, extraOptionCategoryId: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, price: { __typename?: 'Money', amount: any, currency: Currency }, image?: { __typename?: 'Image', url: string, name: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type GetAllOrdersPaginationQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  organisationId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetAllOrdersPaginationQuery = { __typename?: 'Query', orders?: { __typename?: 'OrdersConnection', totalCount: number, nodes?: Array<{ __typename?: 'Order', id: string, number: string, stateDescription: { __typename?: 'OrderStateDescription', isOpen: boolean, orderState: OrderState, stateChangeDescription?: string | null }, totalPrice: { __typename?: 'Money', amount: any, currency: Currency }, customerDetails: { __typename?: 'CustomerDetails', phoneNumber?: string | null, email?: string | null, fullName: string }, shippingAddress: { __typename?: 'Address', country: string, region: string, city: string, line1: string, line2?: string | null, displayName?: string | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, externalId: string, email?: string | null, lastName: string, firstName: string, sellers: Array<{ __typename?: 'Seller', id: string, userId?: string | null, organisationId: string, role: Role, organisation: { __typename?: 'Organisation', id: string, name: string } }>, buyer: { __typename?: 'Buyer', id: string, userId: string } };

export type GetUserByExternalIdQueryVariables = Exact<{
  externalId: Scalars['String']['input'];
}>;


export type GetUserByExternalIdQuery = { __typename?: 'Query', userByExternalId: { __typename?: 'QueryUserPayload', user?: { __typename?: 'User', id: string, externalId: string, email?: string | null, lastName: string, firstName: string, sellers: Array<{ __typename?: 'Seller', id: string, userId?: string | null, organisationId: string, role: Role, organisation: { __typename?: 'Organisation', id: string, name: string } }>, buyer: { __typename?: 'Buyer', id: string, userId: string } } | null, errors?: Array<{ __typename?: 'UserError', message: string, code: string }> | null } };

export type GetOrganisationWithSellersByIdQueryVariables = Exact<{
  organisationId: Scalars['ID']['input'];
}>;


export type GetOrganisationWithSellersByIdQuery = { __typename?: 'Query', organisationById: { __typename?: 'OrganisationByIdResult', organisation?: { __typename?: 'Organisation', id: string, name: string, sellers: Array<{ __typename?: 'Seller', id: string, organisationId: string, role: Role, sellerState: SellerState, invitation?: { __typename?: 'Invitation', email?: string | null, invitationCode: string, invitationState: InvitationState, invitationDate: any } | null, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, email?: string | null, externalId: string } | null }> } | null, errors?: Array<{ __typename?: 'UserError', code: string, message: string }> | null } };

export type GetMySellerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMySellerQuery = { __typename?: 'Query', mySeller: { __typename?: 'SellerByIdResult', seller?: { __typename?: 'Seller', id: string, role: Role, userId?: string | null, user?: { __typename?: 'User', id: string, externalId: string, email?: string | null, lastName: string, firstName: string, sellers: Array<{ __typename?: 'Seller', id: string, userId?: string | null, organisationId: string, role: Role, organisation: { __typename?: 'Organisation', id: string, name: string } }>, buyer: { __typename?: 'Buyer', id: string, userId: string } } | null, organisation: { __typename?: 'Organisation', id: string, name: string } } | null } };

export const CoreSiteFieldsFragmentDoc = gql`
    fragment CoreSiteFields on Site {
  id
  name
  slug
}
    `;
export const CoreCategoryFieldsFragmentDoc = gql`
    fragment CoreCategoryFields on Category {
  id
  name
  slug
  description
  displayNumber
}
    `;
export const CoreProductFieldsFragmentDoc = gql`
    fragment CoreProductFields on Product {
  id
  siteId
  price {
    amount
    currency
  }
  name
  slug
  description
  image {
    url
    name
  }
}
    `;
export const DetailedProductFieldsFragmentDoc = gql`
    fragment DetailedProductFields on Product {
  ...CoreProductFields
  categories {
    id
    name
  }
  site: siteSummary {
    id
    name
  }
  extraOptions {
    id
    name
    extraOptionCategoryId
    category {
      id
      name
    }
    price {
      amount
      currency
    }
  }
}
    ${CoreProductFieldsFragmentDoc}`;
export const DetailedCategoryFieldsFragmentDoc = gql`
    fragment DetailedCategoryFields on Category {
  id
  name
  slug
  description
  products {
    nodes {
      ...DetailedProductFields
    }
  }
}
    ${DetailedProductFieldsFragmentDoc}`;
export const CoreOrderFieldsFragmentDoc = gql`
    fragment CoreOrderFields on Order {
  id
  number
  stateDescription {
    isOpen
    orderState
    stateChangeDescription
  }
  totalPrice {
    amount
    currency
  }
}
    `;
export const OrderItemsDetailsFragmentDoc = gql`
    fragment OrderItemsDetails on Order {
  items {
    nodes {
      id
      productName
      productPrice {
        amount
        currency
      }
      extraOptions {
        name
        price {
          amount
          currency
        }
      }
      orderItemTotalPrice {
        amount
        currency
      }
      quantity
      productDescription
    }
  }
}
    `;
export const ShippingAddressFragmentDoc = gql`
    fragment ShippingAddress on Order {
  shippingAddress {
    country
    region
    city
    line1
    line2
    displayName
  }
}
    `;
export const CustomerDetailsFragmentDoc = gql`
    fragment CustomerDetails on Order {
  customerDetails {
    phoneNumber
    email
    fullName
  }
}
    `;
export const OrderDetailsFragmentDoc = gql`
    fragment OrderDetails on Order {
  ...CoreOrderFields
  ...OrderItemsDetails
  ...ShippingAddress
  ...CustomerDetails
}
    ${CoreOrderFieldsFragmentDoc}
${OrderItemsDetailsFragmentDoc}
${ShippingAddressFragmentDoc}
${CustomerDetailsFragmentDoc}`;
export const PageInfoFieldsFragmentDoc = gql`
    fragment PageInfoFields on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  externalId
  email
  lastName
  firstName
  sellers {
    id
    userId
    organisationId
    organisation {
      id
      name
    }
    role
  }
  buyer {
    id
    userId
  }
}
    `;
export const AddSiteDocument = gql`
    mutation AddSite($name: String!, $slug: String!) {
  addSite(input: {name: $name, slug: $slug}) {
    site {
      name
      id
      slug
    }
    errors {
      code
      message
    }
  }
}
    `;
export type AddSiteMutationFn = Apollo.MutationFunction<AddSiteMutation, AddSiteMutationVariables>;

/**
 * __useAddSiteMutation__
 *
 * To run a mutation, you first call `useAddSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSiteMutation, { data, loading, error }] = useAddSiteMutation({
 *   variables: {
 *      name: // value for 'name'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAddSiteMutation(baseOptions?: Apollo.MutationHookOptions<AddSiteMutation, AddSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSiteMutation, AddSiteMutationVariables>(AddSiteDocument, options);
      }
export type AddSiteMutationHookResult = ReturnType<typeof useAddSiteMutation>;
export type AddSiteMutationResult = Apollo.MutationResult<AddSiteMutation>;
export type AddSiteMutationOptions = Apollo.BaseMutationOptions<AddSiteMutation, AddSiteMutationVariables>;
export const UpdateSiteDocument = gql`
    mutation UpdateSite($input: UpdateSiteInput!) {
  updateSite(input: $input) {
    site {
      id
      name
      slug
    }
    errors {
      code
      message
    }
  }
}
    `;
export type UpdateSiteMutationFn = Apollo.MutationFunction<UpdateSiteMutation, UpdateSiteMutationVariables>;

/**
 * __useUpdateSiteMutation__
 *
 * To run a mutation, you first call `useUpdateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSiteMutation, { data, loading, error }] = useUpdateSiteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSiteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSiteMutation, UpdateSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument, options);
      }
export type UpdateSiteMutationHookResult = ReturnType<typeof useUpdateSiteMutation>;
export type UpdateSiteMutationResult = Apollo.MutationResult<UpdateSiteMutation>;
export type UpdateSiteMutationOptions = Apollo.BaseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables>;
export const DeleteSiteDocument = gql`
    mutation DeleteSite($input: DeleteSiteInput!) {
  deleteSite(input: $input) {
    deleted
    errors {
      code
      message
    }
  }
}
    `;
export type DeleteSiteMutationFn = Apollo.MutationFunction<DeleteSiteMutation, DeleteSiteMutationVariables>;

/**
 * __useDeleteSiteMutation__
 *
 * To run a mutation, you first call `useDeleteSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSiteMutation, { data, loading, error }] = useDeleteSiteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSiteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSiteMutation, DeleteSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSiteMutation, DeleteSiteMutationVariables>(DeleteSiteDocument, options);
      }
export type DeleteSiteMutationHookResult = ReturnType<typeof useDeleteSiteMutation>;
export type DeleteSiteMutationResult = Apollo.MutationResult<DeleteSiteMutation>;
export type DeleteSiteMutationOptions = Apollo.BaseMutationOptions<DeleteSiteMutation, DeleteSiteMutationVariables>;
export const AddProductDocument = gql`
    mutation AddProduct($input: AddProductInput!) {
  addProduct(input: $input) {
    product {
      id
      name
      price {
        amount
        currency
      }
      slug
      description
    }
    errors {
      code
      message
    }
  }
}
    `;
export type AddProductMutationFn = Apollo.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, options);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = Apollo.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    product {
      id
      siteId
      image {
        name
        url
      }
      price {
        amount
        currency
      }
      name
      slug
      description
      categories {
        name
      }
    }
    errors {
      code
      message
    }
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
    deleted
    errors {
      code
      message
    }
  }
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const AddCategoryDocument = gql`
    mutation AddCategory($input: AddCategoryInput!) {
  addCategory(input: $input) {
    category {
      id
      name
      slug
      description
      displayNumber
    }
    errors {
      code
      message
    }
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    category {
      id
      name
      slug
      description
    }
    errors {
      code
      message
    }
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input) {
    deleted
    errors {
      code
      message
    }
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const AddExtraOptionCategoryDocument = gql`
    mutation AddExtraOptionCategory($input: AddExtraOptionCategoryInput!) {
  addExtraOptionCategory(input: $input) {
    errors {
      code
      message
    }
    extraOptionCategory {
      id
      name
    }
  }
}
    `;
export type AddExtraOptionCategoryMutationFn = Apollo.MutationFunction<AddExtraOptionCategoryMutation, AddExtraOptionCategoryMutationVariables>;

/**
 * __useAddExtraOptionCategoryMutation__
 *
 * To run a mutation, you first call `useAddExtraOptionCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExtraOptionCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExtraOptionCategoryMutation, { data, loading, error }] = useAddExtraOptionCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddExtraOptionCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddExtraOptionCategoryMutation, AddExtraOptionCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExtraOptionCategoryMutation, AddExtraOptionCategoryMutationVariables>(AddExtraOptionCategoryDocument, options);
      }
export type AddExtraOptionCategoryMutationHookResult = ReturnType<typeof useAddExtraOptionCategoryMutation>;
export type AddExtraOptionCategoryMutationResult = Apollo.MutationResult<AddExtraOptionCategoryMutation>;
export type AddExtraOptionCategoryMutationOptions = Apollo.BaseMutationOptions<AddExtraOptionCategoryMutation, AddExtraOptionCategoryMutationVariables>;
export const UpdateExtraOptionCategoryDocument = gql`
    mutation UpdateExtraOptionCategory($input: UpdateExtraOptionCategoryInput!) {
  updateExtraOptionCategory(input: $input) {
    errors {
      code
      message
    }
    extraOptionCategory {
      id
      name
    }
  }
}
    `;
export type UpdateExtraOptionCategoryMutationFn = Apollo.MutationFunction<UpdateExtraOptionCategoryMutation, UpdateExtraOptionCategoryMutationVariables>;

/**
 * __useUpdateExtraOptionCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateExtraOptionCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExtraOptionCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExtraOptionCategoryMutation, { data, loading, error }] = useUpdateExtraOptionCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExtraOptionCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExtraOptionCategoryMutation, UpdateExtraOptionCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExtraOptionCategoryMutation, UpdateExtraOptionCategoryMutationVariables>(UpdateExtraOptionCategoryDocument, options);
      }
export type UpdateExtraOptionCategoryMutationHookResult = ReturnType<typeof useUpdateExtraOptionCategoryMutation>;
export type UpdateExtraOptionCategoryMutationResult = Apollo.MutationResult<UpdateExtraOptionCategoryMutation>;
export type UpdateExtraOptionCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateExtraOptionCategoryMutation, UpdateExtraOptionCategoryMutationVariables>;
export const DeleteExtraOptionCategoryDocument = gql`
    mutation DeleteExtraOptionCategory($input: DeleteExtraOptionCategoryInput!) {
  deleteExtraOptionCategory(input: $input) {
    deleted
    errors {
      code
      message
    }
  }
}
    `;
export type DeleteExtraOptionCategoryMutationFn = Apollo.MutationFunction<DeleteExtraOptionCategoryMutation, DeleteExtraOptionCategoryMutationVariables>;

/**
 * __useDeleteExtraOptionCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteExtraOptionCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExtraOptionCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExtraOptionCategoryMutation, { data, loading, error }] = useDeleteExtraOptionCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteExtraOptionCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExtraOptionCategoryMutation, DeleteExtraOptionCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExtraOptionCategoryMutation, DeleteExtraOptionCategoryMutationVariables>(DeleteExtraOptionCategoryDocument, options);
      }
export type DeleteExtraOptionCategoryMutationHookResult = ReturnType<typeof useDeleteExtraOptionCategoryMutation>;
export type DeleteExtraOptionCategoryMutationResult = Apollo.MutationResult<DeleteExtraOptionCategoryMutation>;
export type DeleteExtraOptionCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteExtraOptionCategoryMutation, DeleteExtraOptionCategoryMutationVariables>;
export const AddExtraOptionDocument = gql`
    mutation AddExtraOption($input: AddExtraOptionInput!) {
  addExtraOption(input: $input) {
    errors {
      code
      message
    }
    extraOption {
      id
      name
      extraOptionCategoryId
      price {
        amount
        currency
      }
    }
  }
}
    `;
export type AddExtraOptionMutationFn = Apollo.MutationFunction<AddExtraOptionMutation, AddExtraOptionMutationVariables>;

/**
 * __useAddExtraOptionMutation__
 *
 * To run a mutation, you first call `useAddExtraOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExtraOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExtraOptionMutation, { data, loading, error }] = useAddExtraOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddExtraOptionMutation(baseOptions?: Apollo.MutationHookOptions<AddExtraOptionMutation, AddExtraOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExtraOptionMutation, AddExtraOptionMutationVariables>(AddExtraOptionDocument, options);
      }
export type AddExtraOptionMutationHookResult = ReturnType<typeof useAddExtraOptionMutation>;
export type AddExtraOptionMutationResult = Apollo.MutationResult<AddExtraOptionMutation>;
export type AddExtraOptionMutationOptions = Apollo.BaseMutationOptions<AddExtraOptionMutation, AddExtraOptionMutationVariables>;
export const UpdateExtraOptionDocument = gql`
    mutation UpdateExtraOption($input: UpdateExtraOptionInput!) {
  updateExtraOption(input: $input) {
    errors {
      code
      message
    }
    extraOption {
      id
      name
      extraOptionCategoryId
      price {
        amount
        currency
      }
    }
  }
}
    `;
export type UpdateExtraOptionMutationFn = Apollo.MutationFunction<UpdateExtraOptionMutation, UpdateExtraOptionMutationVariables>;

/**
 * __useUpdateExtraOptionMutation__
 *
 * To run a mutation, you first call `useUpdateExtraOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExtraOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExtraOptionMutation, { data, loading, error }] = useUpdateExtraOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExtraOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExtraOptionMutation, UpdateExtraOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExtraOptionMutation, UpdateExtraOptionMutationVariables>(UpdateExtraOptionDocument, options);
      }
export type UpdateExtraOptionMutationHookResult = ReturnType<typeof useUpdateExtraOptionMutation>;
export type UpdateExtraOptionMutationResult = Apollo.MutationResult<UpdateExtraOptionMutation>;
export type UpdateExtraOptionMutationOptions = Apollo.BaseMutationOptions<UpdateExtraOptionMutation, UpdateExtraOptionMutationVariables>;
export const DeleteExtraOptionDocument = gql`
    mutation DeleteExtraOption($input: DeleteExtraOptionInput!) {
  deleteExtraOption(input: $input) {
    deleted
    errors {
      code
      message
    }
  }
}
    `;
export type DeleteExtraOptionMutationFn = Apollo.MutationFunction<DeleteExtraOptionMutation, DeleteExtraOptionMutationVariables>;

/**
 * __useDeleteExtraOptionMutation__
 *
 * To run a mutation, you first call `useDeleteExtraOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExtraOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExtraOptionMutation, { data, loading, error }] = useDeleteExtraOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteExtraOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExtraOptionMutation, DeleteExtraOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExtraOptionMutation, DeleteExtraOptionMutationVariables>(DeleteExtraOptionDocument, options);
      }
export type DeleteExtraOptionMutationHookResult = ReturnType<typeof useDeleteExtraOptionMutation>;
export type DeleteExtraOptionMutationResult = Apollo.MutationResult<DeleteExtraOptionMutation>;
export type DeleteExtraOptionMutationOptions = Apollo.BaseMutationOptions<DeleteExtraOptionMutation, DeleteExtraOptionMutationVariables>;
export const AddImageDocument = gql`
    mutation AddImage($file: Upload!) {
  addImage(input: {file: $file}) {
    image {
      name
      url
    }
    errors {
      code
      message
    }
  }
}
    `;
export type AddImageMutationFn = Apollo.MutationFunction<AddImageMutation, AddImageMutationVariables>;

/**
 * __useAddImageMutation__
 *
 * To run a mutation, you first call `useAddImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addImageMutation, { data, loading, error }] = useAddImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddImageMutation(baseOptions?: Apollo.MutationHookOptions<AddImageMutation, AddImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddImageMutation, AddImageMutationVariables>(AddImageDocument, options);
      }
export type AddImageMutationHookResult = ReturnType<typeof useAddImageMutation>;
export type AddImageMutationResult = Apollo.MutationResult<AddImageMutation>;
export type AddImageMutationOptions = Apollo.BaseMutationOptions<AddImageMutation, AddImageMutationVariables>;
export const StartOrderProcessingDocument = gql`
    mutation StartOrderProcessing($orderId: ID!) {
  startOrderProcessing(input: {orderId: $orderId}) {
    order {
      stateDescription {
        orderState
        stateChangeDescription
      }
    }
    errors {
      code
      message
    }
  }
}
    `;
export type StartOrderProcessingMutationFn = Apollo.MutationFunction<StartOrderProcessingMutation, StartOrderProcessingMutationVariables>;

/**
 * __useStartOrderProcessingMutation__
 *
 * To run a mutation, you first call `useStartOrderProcessingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartOrderProcessingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startOrderProcessingMutation, { data, loading, error }] = useStartOrderProcessingMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useStartOrderProcessingMutation(baseOptions?: Apollo.MutationHookOptions<StartOrderProcessingMutation, StartOrderProcessingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartOrderProcessingMutation, StartOrderProcessingMutationVariables>(StartOrderProcessingDocument, options);
      }
export type StartOrderProcessingMutationHookResult = ReturnType<typeof useStartOrderProcessingMutation>;
export type StartOrderProcessingMutationResult = Apollo.MutationResult<StartOrderProcessingMutation>;
export type StartOrderProcessingMutationOptions = Apollo.BaseMutationOptions<StartOrderProcessingMutation, StartOrderProcessingMutationVariables>;
export const CompleteOrderDocument = gql`
    mutation CompleteOrder($orderId: ID!) {
  completeOrder(input: {orderId: $orderId}) {
    order {
      stateDescription {
        orderState
        stateChangeDescription
      }
    }
    errors {
      code
      message
    }
  }
}
    `;
export type CompleteOrderMutationFn = Apollo.MutationFunction<CompleteOrderMutation, CompleteOrderMutationVariables>;

/**
 * __useCompleteOrderMutation__
 *
 * To run a mutation, you first call `useCompleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeOrderMutation, { data, loading, error }] = useCompleteOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useCompleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<CompleteOrderMutation, CompleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteOrderMutation, CompleteOrderMutationVariables>(CompleteOrderDocument, options);
      }
export type CompleteOrderMutationHookResult = ReturnType<typeof useCompleteOrderMutation>;
export type CompleteOrderMutationResult = Apollo.MutationResult<CompleteOrderMutation>;
export type CompleteOrderMutationOptions = Apollo.BaseMutationOptions<CompleteOrderMutation, CompleteOrderMutationVariables>;
export const CancelOrderDocument = gql`
    mutation CancelOrder($orderId: ID!, $reason: String!) {
  cancelOrder(input: {orderId: $orderId, reason: $reason}) {
    order {
      stateDescription {
        orderState
        stateChangeDescription
      }
    }
    errors {
      code
      message
    }
  }
}
    `;
export type CancelOrderMutationFn = Apollo.MutationFunction<CancelOrderMutation, CancelOrderMutationVariables>;

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useCancelOrderMutation(baseOptions?: Apollo.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(CancelOrderDocument, options);
      }
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export type CancelOrderMutationResult = Apollo.MutationResult<CancelOrderMutation>;
export type CancelOrderMutationOptions = Apollo.BaseMutationOptions<CancelOrderMutation, CancelOrderMutationVariables>;
export const InviteSellerDocument = gql`
    mutation InviteSeller($email: String!, $role: Role!) {
  inviteSeller(input: {email: $email, role: $role}) {
    seller {
      id
    }
  }
}
    `;
export type InviteSellerMutationFn = Apollo.MutationFunction<InviteSellerMutation, InviteSellerMutationVariables>;

/**
 * __useInviteSellerMutation__
 *
 * To run a mutation, you first call `useInviteSellerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteSellerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteSellerMutation, { data, loading, error }] = useInviteSellerMutation({
 *   variables: {
 *      email: // value for 'email'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useInviteSellerMutation(baseOptions?: Apollo.MutationHookOptions<InviteSellerMutation, InviteSellerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteSellerMutation, InviteSellerMutationVariables>(InviteSellerDocument, options);
      }
export type InviteSellerMutationHookResult = ReturnType<typeof useInviteSellerMutation>;
export type InviteSellerMutationResult = Apollo.MutationResult<InviteSellerMutation>;
export type InviteSellerMutationOptions = Apollo.BaseMutationOptions<InviteSellerMutation, InviteSellerMutationVariables>;
export const RemoveSellerDocument = gql`
    mutation RemoveSeller($sellerId: ID!) {
  removeSeller(input: {sellerId: $sellerId}) {
    deleted
    errors {
      code
      message
    }
  }
}
    `;
export type RemoveSellerMutationFn = Apollo.MutationFunction<RemoveSellerMutation, RemoveSellerMutationVariables>;

/**
 * __useRemoveSellerMutation__
 *
 * To run a mutation, you first call `useRemoveSellerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSellerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSellerMutation, { data, loading, error }] = useRemoveSellerMutation({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useRemoveSellerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSellerMutation, RemoveSellerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSellerMutation, RemoveSellerMutationVariables>(RemoveSellerDocument, options);
      }
export type RemoveSellerMutationHookResult = ReturnType<typeof useRemoveSellerMutation>;
export type RemoveSellerMutationResult = Apollo.MutationResult<RemoveSellerMutation>;
export type RemoveSellerMutationOptions = Apollo.BaseMutationOptions<RemoveSellerMutation, RemoveSellerMutationVariables>;
export const GetSitesDocument = gql`
    query GetSites($organisationId: ID) {
  sites(where: {organisationId: {eq: $organisationId}}) {
    nodes {
      ...CoreSiteFields
    }
  }
}
    ${CoreSiteFieldsFragmentDoc}`;

/**
 * __useGetSitesQuery__
 *
 * To run a query within a React component, call `useGetSitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSitesQuery({
 *   variables: {
 *      organisationId: // value for 'organisationId'
 *   },
 * });
 */
export function useGetSitesQuery(baseOptions?: Apollo.QueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
      }
export function useGetSitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
        }
export function useGetSitesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
        }
export type GetSitesQueryHookResult = ReturnType<typeof useGetSitesQuery>;
export type GetSitesLazyQueryHookResult = ReturnType<typeof useGetSitesLazyQuery>;
export type GetSitesSuspenseQueryHookResult = ReturnType<typeof useGetSitesSuspenseQuery>;
export type GetSitesQueryResult = Apollo.QueryResult<GetSitesQuery, GetSitesQueryVariables>;
export const GetSiteByIdDocument = gql`
    query GetSiteById($id: ID!) {
  siteById(id: $id) {
    ...CoreSiteFields
  }
}
    ${CoreSiteFieldsFragmentDoc}`;

/**
 * __useGetSiteByIdQuery__
 *
 * To run a query within a React component, call `useGetSiteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSiteByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSiteByIdQuery, GetSiteByIdQueryVariables> & ({ variables: GetSiteByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteByIdQuery, GetSiteByIdQueryVariables>(GetSiteByIdDocument, options);
      }
export function useGetSiteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteByIdQuery, GetSiteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteByIdQuery, GetSiteByIdQueryVariables>(GetSiteByIdDocument, options);
        }
export function useGetSiteByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSiteByIdQuery, GetSiteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSiteByIdQuery, GetSiteByIdQueryVariables>(GetSiteByIdDocument, options);
        }
export type GetSiteByIdQueryHookResult = ReturnType<typeof useGetSiteByIdQuery>;
export type GetSiteByIdLazyQueryHookResult = ReturnType<typeof useGetSiteByIdLazyQuery>;
export type GetSiteByIdSuspenseQueryHookResult = ReturnType<typeof useGetSiteByIdSuspenseQuery>;
export type GetSiteByIdQueryResult = Apollo.QueryResult<GetSiteByIdQuery, GetSiteByIdQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    nodes {
      ...CoreProductFields
    }
  }
}
    ${CoreProductFieldsFragmentDoc}`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export function useGetProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductByIdDocument = gql`
    query GetProductById($id: ID!) {
  productById(id: $id) {
    ...DetailedProductFields
  }
}
    ${DetailedProductFieldsFragmentDoc}`;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables> & ({ variables: GetProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export function useGetProductByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetProductByIdSuspenseQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories($organisationId: ID) {
  categories(where: {organisationId: {eq: $organisationId}}) {
    nodes {
      ...CoreCategoryFields
    }
  }
}
    ${CoreCategoryFieldsFragmentDoc}`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      organisationId: // value for 'organisationId'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryByIdDocument = gql`
    query GetCategoryById($id: ID!) {
  categoryById(id: $id) {
    id
    name
    slug
    description
    displayNumber
  }
}
    `;

/**
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables> & ({ variables: GetCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export function useGetCategoryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetCategoryByIdSuspenseQuery>;
export type GetCategoryByIdQueryResult = Apollo.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const GetExtraOptionsCategoriesDocument = gql`
    query GetExtraOptionsCategories {
  allExtraOptionsCategoriesForCurrentOrganisation {
    totalCount
    nodes {
      id
      name
      extraOptions {
        totalCount
      }
    }
  }
}
    `;

/**
 * __useGetExtraOptionsCategoriesQuery__
 *
 * To run a query within a React component, call `useGetExtraOptionsCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtraOptionsCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtraOptionsCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExtraOptionsCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetExtraOptionsCategoriesQuery, GetExtraOptionsCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtraOptionsCategoriesQuery, GetExtraOptionsCategoriesQueryVariables>(GetExtraOptionsCategoriesDocument, options);
      }
export function useGetExtraOptionsCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtraOptionsCategoriesQuery, GetExtraOptionsCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtraOptionsCategoriesQuery, GetExtraOptionsCategoriesQueryVariables>(GetExtraOptionsCategoriesDocument, options);
        }
export function useGetExtraOptionsCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExtraOptionsCategoriesQuery, GetExtraOptionsCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExtraOptionsCategoriesQuery, GetExtraOptionsCategoriesQueryVariables>(GetExtraOptionsCategoriesDocument, options);
        }
export type GetExtraOptionsCategoriesQueryHookResult = ReturnType<typeof useGetExtraOptionsCategoriesQuery>;
export type GetExtraOptionsCategoriesLazyQueryHookResult = ReturnType<typeof useGetExtraOptionsCategoriesLazyQuery>;
export type GetExtraOptionsCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetExtraOptionsCategoriesSuspenseQuery>;
export type GetExtraOptionsCategoriesQueryResult = Apollo.QueryResult<GetExtraOptionsCategoriesQuery, GetExtraOptionsCategoriesQueryVariables>;
export const GetAllExtraOptionCategoriesPaginationDocument = gql`
    query GetAllExtraOptionCategoriesPagination($first: Int, $after: String, $last: Int, $before: String) {
  allExtraOptionsCategoriesForCurrentOrganisation(
    first: $first
    after: $after
    last: $last
    before: $before
  ) {
    nodes {
      id
      name
      extraOptions {
        totalCount
      }
    }
    pageInfo {
      ...PageInfoFields
    }
    totalCount
  }
}
    ${PageInfoFieldsFragmentDoc}`;

/**
 * __useGetAllExtraOptionCategoriesPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllExtraOptionCategoriesPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExtraOptionCategoriesPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExtraOptionCategoriesPaginationQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetAllExtraOptionCategoriesPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExtraOptionCategoriesPaginationQuery, GetAllExtraOptionCategoriesPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExtraOptionCategoriesPaginationQuery, GetAllExtraOptionCategoriesPaginationQueryVariables>(GetAllExtraOptionCategoriesPaginationDocument, options);
      }
export function useGetAllExtraOptionCategoriesPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExtraOptionCategoriesPaginationQuery, GetAllExtraOptionCategoriesPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExtraOptionCategoriesPaginationQuery, GetAllExtraOptionCategoriesPaginationQueryVariables>(GetAllExtraOptionCategoriesPaginationDocument, options);
        }
export function useGetAllExtraOptionCategoriesPaginationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllExtraOptionCategoriesPaginationQuery, GetAllExtraOptionCategoriesPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllExtraOptionCategoriesPaginationQuery, GetAllExtraOptionCategoriesPaginationQueryVariables>(GetAllExtraOptionCategoriesPaginationDocument, options);
        }
export type GetAllExtraOptionCategoriesPaginationQueryHookResult = ReturnType<typeof useGetAllExtraOptionCategoriesPaginationQuery>;
export type GetAllExtraOptionCategoriesPaginationLazyQueryHookResult = ReturnType<typeof useGetAllExtraOptionCategoriesPaginationLazyQuery>;
export type GetAllExtraOptionCategoriesPaginationSuspenseQueryHookResult = ReturnType<typeof useGetAllExtraOptionCategoriesPaginationSuspenseQuery>;
export type GetAllExtraOptionCategoriesPaginationQueryResult = Apollo.QueryResult<GetAllExtraOptionCategoriesPaginationQuery, GetAllExtraOptionCategoriesPaginationQueryVariables>;
export const GetExtraOptionsCategoriesNameDocument = gql`
    query GetExtraOptionsCategoriesName {
  allExtraOptionsCategoriesForCurrentOrganisation {
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useGetExtraOptionsCategoriesNameQuery__
 *
 * To run a query within a React component, call `useGetExtraOptionsCategoriesNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtraOptionsCategoriesNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtraOptionsCategoriesNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExtraOptionsCategoriesNameQuery(baseOptions?: Apollo.QueryHookOptions<GetExtraOptionsCategoriesNameQuery, GetExtraOptionsCategoriesNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtraOptionsCategoriesNameQuery, GetExtraOptionsCategoriesNameQueryVariables>(GetExtraOptionsCategoriesNameDocument, options);
      }
export function useGetExtraOptionsCategoriesNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtraOptionsCategoriesNameQuery, GetExtraOptionsCategoriesNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtraOptionsCategoriesNameQuery, GetExtraOptionsCategoriesNameQueryVariables>(GetExtraOptionsCategoriesNameDocument, options);
        }
export function useGetExtraOptionsCategoriesNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExtraOptionsCategoriesNameQuery, GetExtraOptionsCategoriesNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExtraOptionsCategoriesNameQuery, GetExtraOptionsCategoriesNameQueryVariables>(GetExtraOptionsCategoriesNameDocument, options);
        }
export type GetExtraOptionsCategoriesNameQueryHookResult = ReturnType<typeof useGetExtraOptionsCategoriesNameQuery>;
export type GetExtraOptionsCategoriesNameLazyQueryHookResult = ReturnType<typeof useGetExtraOptionsCategoriesNameLazyQuery>;
export type GetExtraOptionsCategoriesNameSuspenseQueryHookResult = ReturnType<typeof useGetExtraOptionsCategoriesNameSuspenseQuery>;
export type GetExtraOptionsCategoriesNameQueryResult = Apollo.QueryResult<GetExtraOptionsCategoriesNameQuery, GetExtraOptionsCategoriesNameQueryVariables>;
export const GetExtraOptionCategoryByIdDocument = gql`
    query GetExtraOptionCategoryById($id: ID!) {
  extraOptionCategoryById(id: $id) {
    extraOptionCategory {
      id
      name
    }
  }
}
    `;

/**
 * __useGetExtraOptionCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetExtraOptionCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtraOptionCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtraOptionCategoryByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExtraOptionCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetExtraOptionCategoryByIdQuery, GetExtraOptionCategoryByIdQueryVariables> & ({ variables: GetExtraOptionCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtraOptionCategoryByIdQuery, GetExtraOptionCategoryByIdQueryVariables>(GetExtraOptionCategoryByIdDocument, options);
      }
export function useGetExtraOptionCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtraOptionCategoryByIdQuery, GetExtraOptionCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtraOptionCategoryByIdQuery, GetExtraOptionCategoryByIdQueryVariables>(GetExtraOptionCategoryByIdDocument, options);
        }
export function useGetExtraOptionCategoryByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExtraOptionCategoryByIdQuery, GetExtraOptionCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExtraOptionCategoryByIdQuery, GetExtraOptionCategoryByIdQueryVariables>(GetExtraOptionCategoryByIdDocument, options);
        }
export type GetExtraOptionCategoryByIdQueryHookResult = ReturnType<typeof useGetExtraOptionCategoryByIdQuery>;
export type GetExtraOptionCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetExtraOptionCategoryByIdLazyQuery>;
export type GetExtraOptionCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetExtraOptionCategoryByIdSuspenseQuery>;
export type GetExtraOptionCategoryByIdQueryResult = Apollo.QueryResult<GetExtraOptionCategoryByIdQuery, GetExtraOptionCategoryByIdQueryVariables>;
export const GetExtraOptionCategoryWithExtraOptionsByIdDocument = gql`
    query GetExtraOptionCategoryWithExtraOptionsById($id: ID!) {
  extraOptionCategoryById(id: $id) {
    extraOptionCategory {
      id
      name
      extraOptions {
        totalCount
        nodes {
          id
          name
          extraOptionCategoryId
          price {
            amount
            currency
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetExtraOptionCategoryWithExtraOptionsByIdQuery__
 *
 * To run a query within a React component, call `useGetExtraOptionCategoryWithExtraOptionsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtraOptionCategoryWithExtraOptionsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtraOptionCategoryWithExtraOptionsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExtraOptionCategoryWithExtraOptionsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetExtraOptionCategoryWithExtraOptionsByIdQuery, GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables> & ({ variables: GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtraOptionCategoryWithExtraOptionsByIdQuery, GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables>(GetExtraOptionCategoryWithExtraOptionsByIdDocument, options);
      }
export function useGetExtraOptionCategoryWithExtraOptionsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtraOptionCategoryWithExtraOptionsByIdQuery, GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtraOptionCategoryWithExtraOptionsByIdQuery, GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables>(GetExtraOptionCategoryWithExtraOptionsByIdDocument, options);
        }
export function useGetExtraOptionCategoryWithExtraOptionsByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExtraOptionCategoryWithExtraOptionsByIdQuery, GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExtraOptionCategoryWithExtraOptionsByIdQuery, GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables>(GetExtraOptionCategoryWithExtraOptionsByIdDocument, options);
        }
export type GetExtraOptionCategoryWithExtraOptionsByIdQueryHookResult = ReturnType<typeof useGetExtraOptionCategoryWithExtraOptionsByIdQuery>;
export type GetExtraOptionCategoryWithExtraOptionsByIdLazyQueryHookResult = ReturnType<typeof useGetExtraOptionCategoryWithExtraOptionsByIdLazyQuery>;
export type GetExtraOptionCategoryWithExtraOptionsByIdSuspenseQueryHookResult = ReturnType<typeof useGetExtraOptionCategoryWithExtraOptionsByIdSuspenseQuery>;
export type GetExtraOptionCategoryWithExtraOptionsByIdQueryResult = Apollo.QueryResult<GetExtraOptionCategoryWithExtraOptionsByIdQuery, GetExtraOptionCategoryWithExtraOptionsByIdQueryVariables>;
export const GetExtraOptionsDocument = gql`
    query GetExtraOptions {
  extraOptionsForCurrentOrganisation {
    totalCount
    nodes {
      id
      name
      extraOptionCategoryId
      category {
        name
        id
      }
      price {
        amount
        currency
      }
    }
  }
}
    `;

/**
 * __useGetExtraOptionsQuery__
 *
 * To run a query within a React component, call `useGetExtraOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtraOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtraOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExtraOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetExtraOptionsQuery, GetExtraOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtraOptionsQuery, GetExtraOptionsQueryVariables>(GetExtraOptionsDocument, options);
      }
export function useGetExtraOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtraOptionsQuery, GetExtraOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtraOptionsQuery, GetExtraOptionsQueryVariables>(GetExtraOptionsDocument, options);
        }
export function useGetExtraOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExtraOptionsQuery, GetExtraOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExtraOptionsQuery, GetExtraOptionsQueryVariables>(GetExtraOptionsDocument, options);
        }
export type GetExtraOptionsQueryHookResult = ReturnType<typeof useGetExtraOptionsQuery>;
export type GetExtraOptionsLazyQueryHookResult = ReturnType<typeof useGetExtraOptionsLazyQuery>;
export type GetExtraOptionsSuspenseQueryHookResult = ReturnType<typeof useGetExtraOptionsSuspenseQuery>;
export type GetExtraOptionsQueryResult = Apollo.QueryResult<GetExtraOptionsQuery, GetExtraOptionsQueryVariables>;
export const GetAllExtraOptionsPaginationDocument = gql`
    query GetAllExtraOptionsPagination($first: Int, $after: String, $last: Int, $before: String) {
  extraOptionsForCurrentOrganisation(
    first: $first
    after: $after
    last: $last
    before: $before
  ) {
    nodes {
      id
      name
      extraOptionCategoryId
      category {
        name
        id
      }
      price {
        amount
        currency
      }
    }
    pageInfo {
      ...PageInfoFields
    }
    totalCount
  }
}
    ${PageInfoFieldsFragmentDoc}`;

/**
 * __useGetAllExtraOptionsPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllExtraOptionsPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExtraOptionsPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExtraOptionsPaginationQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetAllExtraOptionsPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExtraOptionsPaginationQuery, GetAllExtraOptionsPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExtraOptionsPaginationQuery, GetAllExtraOptionsPaginationQueryVariables>(GetAllExtraOptionsPaginationDocument, options);
      }
export function useGetAllExtraOptionsPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExtraOptionsPaginationQuery, GetAllExtraOptionsPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExtraOptionsPaginationQuery, GetAllExtraOptionsPaginationQueryVariables>(GetAllExtraOptionsPaginationDocument, options);
        }
export function useGetAllExtraOptionsPaginationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllExtraOptionsPaginationQuery, GetAllExtraOptionsPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllExtraOptionsPaginationQuery, GetAllExtraOptionsPaginationQueryVariables>(GetAllExtraOptionsPaginationDocument, options);
        }
export type GetAllExtraOptionsPaginationQueryHookResult = ReturnType<typeof useGetAllExtraOptionsPaginationQuery>;
export type GetAllExtraOptionsPaginationLazyQueryHookResult = ReturnType<typeof useGetAllExtraOptionsPaginationLazyQuery>;
export type GetAllExtraOptionsPaginationSuspenseQueryHookResult = ReturnType<typeof useGetAllExtraOptionsPaginationSuspenseQuery>;
export type GetAllExtraOptionsPaginationQueryResult = Apollo.QueryResult<GetAllExtraOptionsPaginationQuery, GetAllExtraOptionsPaginationQueryVariables>;
export const GetExtraOptionByIdDocument = gql`
    query GetExtraOptionById($id: ID!) {
  extraOptionById(id: $id) {
    extraOption {
      id
      name
      extraOptionCategoryId
      price {
        amount
        currency
      }
    }
  }
}
    `;

/**
 * __useGetExtraOptionByIdQuery__
 *
 * To run a query within a React component, call `useGetExtraOptionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExtraOptionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExtraOptionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExtraOptionByIdQuery(baseOptions: Apollo.QueryHookOptions<GetExtraOptionByIdQuery, GetExtraOptionByIdQueryVariables> & ({ variables: GetExtraOptionByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExtraOptionByIdQuery, GetExtraOptionByIdQueryVariables>(GetExtraOptionByIdDocument, options);
      }
export function useGetExtraOptionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExtraOptionByIdQuery, GetExtraOptionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExtraOptionByIdQuery, GetExtraOptionByIdQueryVariables>(GetExtraOptionByIdDocument, options);
        }
export function useGetExtraOptionByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExtraOptionByIdQuery, GetExtraOptionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExtraOptionByIdQuery, GetExtraOptionByIdQueryVariables>(GetExtraOptionByIdDocument, options);
        }
export type GetExtraOptionByIdQueryHookResult = ReturnType<typeof useGetExtraOptionByIdQuery>;
export type GetExtraOptionByIdLazyQueryHookResult = ReturnType<typeof useGetExtraOptionByIdLazyQuery>;
export type GetExtraOptionByIdSuspenseQueryHookResult = ReturnType<typeof useGetExtraOptionByIdSuspenseQuery>;
export type GetExtraOptionByIdQueryResult = Apollo.QueryResult<GetExtraOptionByIdQuery, GetExtraOptionByIdQueryVariables>;
export const GetCategoryWithProductsByIdDocument = gql`
    query getCategoryWithProductsById($id: ID!) {
  categoryById(id: $id) {
    ...DetailedCategoryFields
  }
}
    ${DetailedCategoryFieldsFragmentDoc}`;

/**
 * __useGetCategoryWithProductsByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryWithProductsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryWithProductsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryWithProductsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryWithProductsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryWithProductsByIdQuery, GetCategoryWithProductsByIdQueryVariables> & ({ variables: GetCategoryWithProductsByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryWithProductsByIdQuery, GetCategoryWithProductsByIdQueryVariables>(GetCategoryWithProductsByIdDocument, options);
      }
export function useGetCategoryWithProductsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryWithProductsByIdQuery, GetCategoryWithProductsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryWithProductsByIdQuery, GetCategoryWithProductsByIdQueryVariables>(GetCategoryWithProductsByIdDocument, options);
        }
export function useGetCategoryWithProductsByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryWithProductsByIdQuery, GetCategoryWithProductsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryWithProductsByIdQuery, GetCategoryWithProductsByIdQueryVariables>(GetCategoryWithProductsByIdDocument, options);
        }
export type GetCategoryWithProductsByIdQueryHookResult = ReturnType<typeof useGetCategoryWithProductsByIdQuery>;
export type GetCategoryWithProductsByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryWithProductsByIdLazyQuery>;
export type GetCategoryWithProductsByIdSuspenseQueryHookResult = ReturnType<typeof useGetCategoryWithProductsByIdSuspenseQuery>;
export type GetCategoryWithProductsByIdQueryResult = Apollo.QueryResult<GetCategoryWithProductsByIdQuery, GetCategoryWithProductsByIdQueryVariables>;
export const GetCreateProductDetailsDocument = gql`
    query GetCreateProductDetails($organisationId: ID) {
  categories(where: {organisationId: {eq: $organisationId}}) {
    nodes {
      id
      name
    }
  }
  sites(where: {organisationId: {eq: $organisationId}}) {
    nodes {
      id
      name
    }
  }
  allExtraOptionsForCurrentOrganisation {
    id
    name
    category {
      id
      name
    }
    price {
      amount
      currency
    }
  }
}
    `;

/**
 * __useGetCreateProductDetailsQuery__
 *
 * To run a query within a React component, call `useGetCreateProductDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreateProductDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreateProductDetailsQuery({
 *   variables: {
 *      organisationId: // value for 'organisationId'
 *   },
 * });
 */
export function useGetCreateProductDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetCreateProductDetailsQuery, GetCreateProductDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreateProductDetailsQuery, GetCreateProductDetailsQueryVariables>(GetCreateProductDetailsDocument, options);
      }
export function useGetCreateProductDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreateProductDetailsQuery, GetCreateProductDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreateProductDetailsQuery, GetCreateProductDetailsQueryVariables>(GetCreateProductDetailsDocument, options);
        }
export function useGetCreateProductDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCreateProductDetailsQuery, GetCreateProductDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCreateProductDetailsQuery, GetCreateProductDetailsQueryVariables>(GetCreateProductDetailsDocument, options);
        }
export type GetCreateProductDetailsQueryHookResult = ReturnType<typeof useGetCreateProductDetailsQuery>;
export type GetCreateProductDetailsLazyQueryHookResult = ReturnType<typeof useGetCreateProductDetailsLazyQuery>;
export type GetCreateProductDetailsSuspenseQueryHookResult = ReturnType<typeof useGetCreateProductDetailsSuspenseQuery>;
export type GetCreateProductDetailsQueryResult = Apollo.QueryResult<GetCreateProductDetailsQuery, GetCreateProductDetailsQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders {
  orders {
    nodes {
      ...CoreOrderFields
    }
  }
}
    ${CoreOrderFieldsFragmentDoc}`;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetOrderByIdDocument = gql`
    query GetOrderById($id: ID!) {
  orderById(id: $id) {
    order {
      ...OrderDetails
    }
  }
}
    ${OrderDetailsFragmentDoc}`;

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables> & ({ variables: GetOrderByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export function useGetOrderByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdSuspenseQueryHookResult = ReturnType<typeof useGetOrderByIdSuspenseQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const OrdersSummaryDocument = gql`
    query OrdersSummary {
  ordersSummary {
    newOrders
    processingOrders
  }
}
    `;

/**
 * __useOrdersSummaryQuery__
 *
 * To run a query within a React component, call `useOrdersSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrdersSummaryQuery(baseOptions?: Apollo.QueryHookOptions<OrdersSummaryQuery, OrdersSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersSummaryQuery, OrdersSummaryQueryVariables>(OrdersSummaryDocument, options);
      }
export function useOrdersSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersSummaryQuery, OrdersSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersSummaryQuery, OrdersSummaryQueryVariables>(OrdersSummaryDocument, options);
        }
export function useOrdersSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrdersSummaryQuery, OrdersSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersSummaryQuery, OrdersSummaryQueryVariables>(OrdersSummaryDocument, options);
        }
export type OrdersSummaryQueryHookResult = ReturnType<typeof useOrdersSummaryQuery>;
export type OrdersSummaryLazyQueryHookResult = ReturnType<typeof useOrdersSummaryLazyQuery>;
export type OrdersSummarySuspenseQueryHookResult = ReturnType<typeof useOrdersSummarySuspenseQuery>;
export type OrdersSummaryQueryResult = Apollo.QueryResult<OrdersSummaryQuery, OrdersSummaryQueryVariables>;
export const GetAllProductsDocument = gql`
    query GetAllProducts($first: Int, $after: String, $last: Int, $before: String, $organisationId: ID) {
  products(
    first: $first
    after: $after
    last: $last
    before: $before
    where: {organisationId: {eq: $organisationId}}
  ) {
    nodes {
      ...DetailedProductFields
    }
    pageInfo {
      ...PageInfoFields
    }
    totalCount
  }
}
    ${DetailedProductFieldsFragmentDoc}
${PageInfoFieldsFragmentDoc}`;

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      organisationId: // value for 'organisationId'
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsSuspenseQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetAllOrdersPaginationDocument = gql`
    query GetAllOrdersPagination($first: Int, $after: String, $last: Int, $before: String, $organisationId: ID) {
  orders(
    first: $first
    after: $after
    last: $last
    before: $before
    order: {stateDescription: {orderState: ASC}, number: ASC}
    where: {organisationId: {eq: $organisationId}}
  ) {
    nodes {
      ...CoreOrderFields
      ...CustomerDetails
      ...ShippingAddress
    }
    pageInfo {
      ...PageInfoFields
    }
    totalCount
  }
}
    ${CoreOrderFieldsFragmentDoc}
${CustomerDetailsFragmentDoc}
${ShippingAddressFragmentDoc}
${PageInfoFieldsFragmentDoc}`;

/**
 * __useGetAllOrdersPaginationQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersPaginationQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      organisationId: // value for 'organisationId'
 *   },
 * });
 */
export function useGetAllOrdersPaginationQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrdersPaginationQuery, GetAllOrdersPaginationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersPaginationQuery, GetAllOrdersPaginationQueryVariables>(GetAllOrdersPaginationDocument, options);
      }
export function useGetAllOrdersPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersPaginationQuery, GetAllOrdersPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersPaginationQuery, GetAllOrdersPaginationQueryVariables>(GetAllOrdersPaginationDocument, options);
        }
export function useGetAllOrdersPaginationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllOrdersPaginationQuery, GetAllOrdersPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrdersPaginationQuery, GetAllOrdersPaginationQueryVariables>(GetAllOrdersPaginationDocument, options);
        }
export type GetAllOrdersPaginationQueryHookResult = ReturnType<typeof useGetAllOrdersPaginationQuery>;
export type GetAllOrdersPaginationLazyQueryHookResult = ReturnType<typeof useGetAllOrdersPaginationLazyQuery>;
export type GetAllOrdersPaginationSuspenseQueryHookResult = ReturnType<typeof useGetAllOrdersPaginationSuspenseQuery>;
export type GetAllOrdersPaginationQueryResult = Apollo.QueryResult<GetAllOrdersPaginationQuery, GetAllOrdersPaginationQueryVariables>;
export const GetUserByExternalIdDocument = gql`
    query GetUserByExternalId($externalId: String!) {
  userByExternalId(externalId: $externalId) {
    user {
      ...UserFragment
    }
    errors {
      message
      code
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserByExternalIdQuery__
 *
 * To run a query within a React component, call `useGetUserByExternalIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByExternalIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByExternalIdQuery({
 *   variables: {
 *      externalId: // value for 'externalId'
 *   },
 * });
 */
export function useGetUserByExternalIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByExternalIdQuery, GetUserByExternalIdQueryVariables> & ({ variables: GetUserByExternalIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByExternalIdQuery, GetUserByExternalIdQueryVariables>(GetUserByExternalIdDocument, options);
      }
export function useGetUserByExternalIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByExternalIdQuery, GetUserByExternalIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByExternalIdQuery, GetUserByExternalIdQueryVariables>(GetUserByExternalIdDocument, options);
        }
export function useGetUserByExternalIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByExternalIdQuery, GetUserByExternalIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByExternalIdQuery, GetUserByExternalIdQueryVariables>(GetUserByExternalIdDocument, options);
        }
export type GetUserByExternalIdQueryHookResult = ReturnType<typeof useGetUserByExternalIdQuery>;
export type GetUserByExternalIdLazyQueryHookResult = ReturnType<typeof useGetUserByExternalIdLazyQuery>;
export type GetUserByExternalIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByExternalIdSuspenseQuery>;
export type GetUserByExternalIdQueryResult = Apollo.QueryResult<GetUserByExternalIdQuery, GetUserByExternalIdQueryVariables>;
export const GetOrganisationWithSellersByIdDocument = gql`
    query GetOrganisationWithSellersById($organisationId: ID!) {
  organisationById(input: {organisationId: $organisationId}) {
    organisation {
      id
      name
      sellers {
        id
        organisationId
        role
        sellerState
        invitation {
          email
          invitationCode
          invitationState
          invitationDate
        }
        user {
          id
          firstName
          lastName
          email
          externalId
        }
      }
    }
    errors {
      code
      message
    }
  }
}
    `;

/**
 * __useGetOrganisationWithSellersByIdQuery__
 *
 * To run a query within a React component, call `useGetOrganisationWithSellersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganisationWithSellersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganisationWithSellersByIdQuery({
 *   variables: {
 *      organisationId: // value for 'organisationId'
 *   },
 * });
 */
export function useGetOrganisationWithSellersByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrganisationWithSellersByIdQuery, GetOrganisationWithSellersByIdQueryVariables> & ({ variables: GetOrganisationWithSellersByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganisationWithSellersByIdQuery, GetOrganisationWithSellersByIdQueryVariables>(GetOrganisationWithSellersByIdDocument, options);
      }
export function useGetOrganisationWithSellersByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganisationWithSellersByIdQuery, GetOrganisationWithSellersByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganisationWithSellersByIdQuery, GetOrganisationWithSellersByIdQueryVariables>(GetOrganisationWithSellersByIdDocument, options);
        }
export function useGetOrganisationWithSellersByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrganisationWithSellersByIdQuery, GetOrganisationWithSellersByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganisationWithSellersByIdQuery, GetOrganisationWithSellersByIdQueryVariables>(GetOrganisationWithSellersByIdDocument, options);
        }
export type GetOrganisationWithSellersByIdQueryHookResult = ReturnType<typeof useGetOrganisationWithSellersByIdQuery>;
export type GetOrganisationWithSellersByIdLazyQueryHookResult = ReturnType<typeof useGetOrganisationWithSellersByIdLazyQuery>;
export type GetOrganisationWithSellersByIdSuspenseQueryHookResult = ReturnType<typeof useGetOrganisationWithSellersByIdSuspenseQuery>;
export type GetOrganisationWithSellersByIdQueryResult = Apollo.QueryResult<GetOrganisationWithSellersByIdQuery, GetOrganisationWithSellersByIdQueryVariables>;
export const GetMySellerDocument = gql`
    query GetMySeller {
  mySeller {
    seller {
      id
      role
      userId
      user {
        ...UserFragment
      }
      organisation {
        id
        name
      }
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetMySellerQuery__
 *
 * To run a query within a React component, call `useGetMySellerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySellerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySellerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySellerQuery(baseOptions?: Apollo.QueryHookOptions<GetMySellerQuery, GetMySellerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMySellerQuery, GetMySellerQueryVariables>(GetMySellerDocument, options);
      }
export function useGetMySellerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMySellerQuery, GetMySellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMySellerQuery, GetMySellerQueryVariables>(GetMySellerDocument, options);
        }
export function useGetMySellerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMySellerQuery, GetMySellerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMySellerQuery, GetMySellerQueryVariables>(GetMySellerDocument, options);
        }
export type GetMySellerQueryHookResult = ReturnType<typeof useGetMySellerQuery>;
export type GetMySellerLazyQueryHookResult = ReturnType<typeof useGetMySellerLazyQuery>;
export type GetMySellerSuspenseQueryHookResult = ReturnType<typeof useGetMySellerSuspenseQuery>;
export type GetMySellerQueryResult = Apollo.QueryResult<GetMySellerQuery, GetMySellerQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "Buyer",
      "Category",
      "Order",
      "OrderItem",
      "Organisation",
      "Product",
      "Seller",
      "Site",
      "SiteSummary",
      "User"
    ]
  }
};
      export default result;
    