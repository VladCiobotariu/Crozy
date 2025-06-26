/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The built-in `Decimal` scalar type. */
  Decimal: { input: any; output: any; }
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
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
  currency?: Currency;
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
export type AllExtraOptionsForCurrentOrganisationConnection = {
  __typename?: 'AllExtraOptionsForCurrentOrganisationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<AllExtraOptionsForCurrentOrganisationEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ExtraOption>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type AllExtraOptionsForCurrentOrganisationEdge = {
  __typename?: 'AllExtraOptionsForCurrentOrganisationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ExtraOption;
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

export type ExtraOptionCategory = {
  __typename?: 'ExtraOptionCategory';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ExtraOptionSortInput = {
  extraOptionCategoryId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  organisationId?: InputMaybe<SortEnumType>;
  price?: InputMaybe<MoneySortInput>;
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
  deleteProduct: DeleteProductPayload;
  deleteSite: DeleteSitePayload;
  inviteSeller: InviteUserPayload;
  onBuyerSignIn: OnBuyerSignInPayload;
  onSellerSignIn: OnSellerSignInPayload;
  removeSeller: RemoveSellerPayload;
  startOrderProcessing: StartOrderProcessingPayload;
  updateCategory: UpdateCategoryPayload;
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
  allExtraOptionsForCurrentOrganisation?: Maybe<AllExtraOptionsForCurrentOrganisationConnection>;
  categories?: Maybe<CategoriesConnection>;
  categoryById: Category;
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


export type QueryAllExtraOptionsForCurrentOrganisationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ExtraOptionSortInput>>;
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

export type UpdateProductInput = {
  categoryIds: Array<Scalars['ID']['input']>;
  currency?: Currency;
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

export type GetProductBySlugQueryQueryVariables = Exact<{
  siteSlug: Scalars['String']['input'];
  productSlug: Scalars['String']['input'];
}>;


export type GetProductBySlugQueryQuery = { __typename?: 'Query', productBySlug: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFieldsFromProductSlugFragment': ProductFieldsFromProductSlugFragment } }
  ) };

export type GetSiteBySlugForSitePageQueryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetSiteBySlugForSitePageQueryQuery = { __typename?: 'Query', siteBySlug: (
    { __typename?: 'Site', name: string }
    & { ' $fragmentRefs'?: { 'SiteDetailsFragment': SiteDetailsFragment } }
  ) };

export type GetSiteDeliveryInfoQueryQueryVariables = Exact<{
  siteId: Scalars['ID']['input'];
}>;


export type GetSiteDeliveryInfoQueryQuery = { __typename?: 'Query', siteById: (
    { __typename?: 'Site' }
    & { ' $fragmentRefs'?: { 'SiteDeliveryInfoFragment': SiteDeliveryInfoFragment } }
  ) };

export type GetOrderByIdQueryQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type GetOrderByIdQueryQuery = { __typename?: 'Query', orderById: { __typename?: 'OrderByIdPayload', order?: (
      { __typename?: 'Order', orderDateTime: any }
      & { ' $fragmentRefs'?: { 'OrderByIdDetailsFragment': OrderByIdDetailsFragment } }
    ) | null } };

export type GetAllOrdersForMeQueryQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllOrdersForMeQueryQuery = { __typename?: 'Query', ordersForMe?: { __typename?: 'OrdersForMeConnection', totalCount: number, edges?: Array<{ __typename?: 'OrdersForMeEdge', cursor: string, node: (
        { __typename?: 'Order', id: string }
        & { ' $fragmentRefs'?: { 'OrderCardFieldsFragment': OrderCardFieldsFragment } }
      ) }> | null, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };

export type GetSiteBySlugQueryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetSiteBySlugQueryQuery = { __typename?: 'Query', siteBySlug: (
    { __typename?: 'Site' }
    & { ' $fragmentRefs'?: { 'SiteDetailsFragment': SiteDetailsFragment } }
  ) };

export type CreatePaymentDataMutationMutationVariables = Exact<{
  input: CreatePaymentDataInput;
}>;


export type CreatePaymentDataMutationMutation = { __typename?: 'Mutation', createPaymentData: { __typename?: 'PaymentDataResult', pymentData?: { __typename?: 'PaymentData', data: string, key: string, cipher: string, iv: string, paymentUri: string } | null, errors?: Array<{ __typename?: 'UserError', message: string, code: string }> | null } };

export type ProductListItemFragment = { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, siteId: string, price: { __typename?: 'Money', amount: any, currency: Currency }, siteSummary: { __typename?: 'Site', name: string, slug: string }, extraOptions: Array<{ __typename?: 'ExtraOption', extraOptionCategoryId: string, id: string, name: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, categories: Array<{ __typename?: 'Category', name: string, slug: string }>, image?: { __typename?: 'Image', url: string } | null } & { ' $fragmentName'?: 'ProductListItemFragment' };

export type SiteDeliveryInfoFragment = { __typename?: 'Site', id: string, onlyPredeffinedDeliveryOptions: boolean, deliveryOptions: Array<{ __typename?: 'Address', country: string, region: string, city: string, line1: string, line2?: string | null, displayName?: string | null }> } & { ' $fragmentName'?: 'SiteDeliveryInfoFragment' };

export type ProductFieldsForOrderFragment = { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, siteId: string, price: { __typename?: 'Money', amount: any, currency: Currency }, siteSummary: { __typename?: 'Site', name: string, slug: string }, categories: Array<{ __typename?: 'Category', name: string, slug: string }>, image?: { __typename?: 'Image', url: string } | null } & { ' $fragmentName'?: 'ProductFieldsForOrderFragment' };

export type OrderCardFieldsFragment = { __typename?: 'Order', id: string, number: string, orderDateTime: any, stateDescription: { __typename?: 'OrderStateDescription', orderState: OrderState, stateChangeDescription?: string | null }, totalPrice: { __typename?: 'Money', amount: any, currency: Currency }, paymentState: { __typename?: 'PaymentState', status: PaymentStatus, type: PaymentType }, items?: { __typename?: 'ItemsConnection', nodes?: Array<{ __typename?: 'OrderItem', id: string, productId?: string | null, productName: string, quantity: any, productDescription?: string | null, productPrice: { __typename?: 'Money', amount: any, currency: Currency }, orderItemTotalPrice: { __typename?: 'Money', currency: Currency, amount: any }, extraOptions: Array<{ __typename?: 'OrderItemExtraOption', extraOptionId?: any | null, name: string, price: { __typename?: 'Money', amount: any, currency: Currency } }>, product?: { __typename?: 'Product', slug: string, siteSummary: { __typename?: 'Site', name: string, slug: string } } | null, image?: { __typename?: 'Image', url: string } | null }> | null } | null } & { ' $fragmentName'?: 'OrderCardFieldsFragment' };

export type OrderByIdDetailsFragment = { __typename?: 'Order', id: string, number: string, orderDateTime: any, totalPrice: { __typename?: 'Money', amount: any, currency: Currency }, stateDescription: { __typename?: 'OrderStateDescription', orderState: OrderState, stateChangeDescription?: string | null }, items?: { __typename?: 'ItemsConnection', nodes?: Array<{ __typename?: 'OrderItem', id: string, productDescription?: string | null, productName: string, quantity: any, productId?: string | null, image?: { __typename?: 'Image', url: string } | null, extraOptions: Array<{ __typename?: 'OrderItemExtraOption', extraOptionId?: any | null, name: string, price: { __typename?: 'Money', amount: any, currency: Currency } }>, orderItemTotalPrice: { __typename?: 'Money', currency: Currency, amount: any }, product?: { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, siteId: string, image?: { __typename?: 'Image', url: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency }, siteSummary: { __typename?: 'Site', name: string, slug: string }, extraOptions: Array<{ __typename?: 'ExtraOption', extraOptionCategoryId: string, id: string, name: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, categories: Array<{ __typename?: 'Category', name: string, slug: string }> } | null, productPrice: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null } & { ' $fragmentName'?: 'OrderByIdDetailsFragment' };

export type ProductFieldsFromProductSlugFragment = { __typename?: 'Product', name: string, id: string, slug: string, description?: string | null, siteId: string, price: { __typename?: 'Money', amount: any, currency: Currency }, extraOptions: Array<{ __typename?: 'ExtraOption', extraOptionCategoryId: string, id: string, name: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, siteSummary: { __typename?: 'Site', name: string, slug: string }, categories: Array<{ __typename?: 'Category', name: string, slug: string }>, image?: { __typename?: 'Image', url: string } | null } & { ' $fragmentName'?: 'ProductFieldsFromProductSlugFragment' };

export type SiteDetailsFragment = { __typename?: 'Site', name: string, id: string, slug: string, categories?: { __typename?: 'CategoriesConnection', nodes?: Array<{ __typename?: 'Category', id: string, name: string, slug: string, products?: { __typename?: 'ProductsConnection', nodes?: Array<(
          { __typename?: 'Product', id: string }
          & { ' $fragmentRefs'?: { 'ProductListItemFragment': ProductListItemFragment } }
        )> | null } | null }> | null } | null } & { ' $fragmentName'?: 'SiteDetailsFragment' };

export type AddOrderMutationVariables = Exact<{
  input: AddOrderInput;
}>;


export type AddOrderMutation = { __typename?: 'Mutation', addOrderForMe: { __typename?: 'AddOrderPayload', order?: { __typename?: 'Order', id: string, number: string, orderDateTime: any, totalPrice: { __typename?: 'Money', amount: any, currency: Currency }, stateDescription: { __typename?: 'OrderStateDescription', orderState: OrderState, stateChangeDescription?: string | null }, items?: { __typename?: 'ItemsConnection', nodes?: Array<{ __typename?: 'OrderItem', id: string, productDescription?: string | null, productName: string, quantity: any, productId?: string | null, image?: { __typename?: 'Image', url: string } | null, extraOptions: Array<{ __typename?: 'OrderItemExtraOption', name: string, extraOptionId?: any | null, price: { __typename?: 'Money', amount: any, currency: Currency } }>, orderItemTotalPrice: { __typename?: 'Money', currency: Currency, amount: any }, product?: { __typename?: 'Product', id: string, name: string, slug: string, description?: string | null, siteId: string, image?: { __typename?: 'Image', url: string } | null, price: { __typename?: 'Money', currency: Currency, amount: any }, siteSummary: { __typename?: 'Site', name: string, slug: string }, categories: Array<{ __typename?: 'Category', name: string, slug: string }>, extraOptions: Array<{ __typename?: 'ExtraOption', extraOptionCategoryId: string, id: string, name: string, category?: { __typename?: 'ExtraOptionCategory', id: string, name: string } | null, price: { __typename?: 'Money', amount: any, currency: Currency } }> } | null, productPrice: { __typename?: 'Money', amount: any, currency: Currency } }> | null } | null } | null } };

export const SiteDeliveryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteDeliveryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"onlyPredeffinedDeliveryOptions"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<SiteDeliveryInfoFragment, unknown>;
export const ProductFieldsForOrderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFieldsForOrder"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<ProductFieldsForOrderFragment, unknown>;
export const OrderCardFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderCardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"stateDescription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderState"}},{"kind":"Field","name":{"kind":"Name","value":"stateChangeDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"paymentState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderItemTotalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extraOptionId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OrderCardFieldsFragment, unknown>;
export const OrderByIdDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderByIdDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"stateDescription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderState"}},{"kind":"Field","name":{"kind":"Name","value":"stateChangeDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extraOptionId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItemTotalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]}}]} as unknown as DocumentNode<OrderByIdDetailsFragment, unknown>;
export const ProductFieldsFromProductSlugFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFieldsFromProductSlug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<ProductFieldsFromProductSlugFragment, unknown>;
export const ProductListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<ProductListItemFragment, unknown>;
export const SiteDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayNumber"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductListItem"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<SiteDetailsFragment, unknown>;
export const GetProductBySlugQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductBySlugQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"siteSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"siteSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"siteSlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"productSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFieldsFromProductSlug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFieldsFromProductSlug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetProductBySlugQueryQuery, GetProductBySlugQueryQueryVariables>;
export const GetSiteBySlugForSitePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSiteBySlugForSitePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SiteDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayNumber"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductListItem"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSiteBySlugForSitePageQueryQuery, GetSiteBySlugForSitePageQueryQueryVariables>;
export const GetSiteDeliveryInfoQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSiteDeliveryInfoQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"siteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"siteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SiteDeliveryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteDeliveryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"onlyPredeffinedDeliveryOptions"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]} as unknown as DocumentNode<GetSiteDeliveryInfoQueryQuery, GetSiteDeliveryInfoQueryQueryVariables>;
export const GetOrderByIdQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOrderByIdQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderDateTime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderByIdDetails"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderByIdDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"stateDescription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderState"}},{"kind":"Field","name":{"kind":"Name","value":"stateChangeDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extraOptionId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItemTotalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderByIdQueryQuery, GetOrderByIdQueryQueryVariables>;
export const GetAllOrdersForMeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllOrdersForMeQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ordersForMe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"orderDateTime"},"value":{"kind":"EnumValue","value":"DESC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderCardFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderCardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"stateDescription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderState"}},{"kind":"Field","name":{"kind":"Name","value":"stateChangeDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"paymentState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"orderItemTotalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"extraOptionId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllOrdersForMeQueryQuery, GetAllOrdersForMeQueryQueryVariables>;
export const GetSiteBySlugQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSiteBySlugQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"siteBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SiteDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SiteDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Site"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"displayNumber"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductListItem"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSiteBySlugQueryQuery, GetSiteBySlugQueryQueryVariables>;
export const CreatePaymentDataMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePaymentDataMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePaymentDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pymentData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"cipher"}},{"kind":"Field","name":{"kind":"Name","value":"iv"}},{"kind":"Field","name":{"kind":"Name","value":"paymentUri"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePaymentDataMutationMutation, CreatePaymentDataMutationMutationVariables>;
export const AddOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrderForMe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"stateDescription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderState"}},{"kind":"Field","name":{"kind":"Name","value":"stateChangeDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderItemTotalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"siteId"}},{"kind":"Field","name":{"kind":"Name","value":"siteSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraOptionCategoryId"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"productDescription"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"productPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddOrderMutation, AddOrderMutationVariables>;