"use client";

import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";
import { Currency, GetAllOrdersForMeQueryDocument, Money, OrderState, PaymentType } from "@/gql/graphql";

const addOrderMutation = graphql(/* GraphQL */ `
  mutation AddOrder($input: AddOrderInput!) {
    addOrderForMe(input: $input) {
      order {
        id
        number
        totalPrice {
          amount
          currency
        }
        orderDateTime
        stateDescription {
          orderState
          stateChangeDescription
        }
        items {
          nodes {
            id
            image {
              url
            }
            extraOptions {
              name
              price {
                amount
                currency
              }
              extraOptionId
            }
            orderItemTotalPrice {
              currency
              amount
            }
            product {
              id
              name
              image {
                url
              }
              price {
                currency
                amount
              }
              slug
              description
              siteId
              siteSummary {
                name
                slug
              }
              categories {
                name
                slug
              }
              extraOptions {
                category{
                  id
                  name
                }
                extraOptionCategoryId
                price {
                  amount
                  currency
                }
                id
                name
              }
            }
            productDescription
            productName
            productPrice {
              amount
              currency
            }
            quantity
            productId
          }
        }
      }
    }
  }
`);

export type OrderItemExtraOption = {
  name: string;
  price: Money;
  extraOptionId?: string;
}

export type OrderItem = {
  id: string;
  image?: {
    url: string;
  } | null;
  product?: {
    description?: string | null;
    id: string;
    image?: {
      url: string;
    } | null;
    name: string;
    price: Money;
    slug: string;
    siteId: string;
    siteSummary: SiteSummary;
    extraOptions: ExtraOption[]
  } | null;
  orderItemTotalPrice: Money;
  extraOptions: OrderItemExtraOption[]
  productDescription?: string | null;
  productName: string;
  productPrice: Money;
  quantity: number;
  productId?: string | null;
};

export type Order = {
  id: string;
  number: string;
  totalPrice: Money;
  orderDateTime: Date;
  stateDescription: {
    orderState: OrderState;
    stateChangeDescription?: string | null;
  };
  items: Array<OrderItem>;
};

type BasketProviderProps = {
  children: React.ReactNode;
  featureFlagForShowingCardPayment: boolean;
};

export type SiteSummary = {
  name: string;
  slug: string;
};

export type ProductDetails = {
  description?: string | null | undefined;
  id: string;
  image?: string;
  name: string;
  price: Money;
  slug: string;
  siteId: string;
  siteSummary: SiteSummary;
  extraOptions: ExtraOption[]
};

export type BasketItem = {
  guid: string;
  product: ProductDetails;
  quantity: number;
  extraOptions: ExtraOption[];
  totalItemPrice: Money
};

export type Address = {
  city: string;
  country: string;
  displayName?: string | null | undefined;
  line1: string;
  line2?: string | null | undefined;
  region: string;
};

export type CustomerDetails = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
};

export type ExtraOptionCategory = {
  id: string
  name: string
}

export type ExtraOption = {
  id: string;
  name: string;
  price: Money;
  category?: ExtraOptionCategory | null;
  extraOptionCategoryId: string
};

type InitialState = {
  featureFlagForShowingCardPayment: boolean;
  siteId: string | null;
  items: BasketItem[];
  total: Money;
  deliveryAddress: Address | null;
  customerDetails: CustomerDetails | null;
  lastOrder: Order | null;
  orderSubmitting: boolean;
  addToBasket(product: ProductDetails, quantity: number, extraOptions: ExtraOption[]): void;
  removeFromBasket(product: BasketItem): void;
  updateQuantity(guid: string, quantity: number): void;
  setDeliveryAddress(address: Address): void;
  setCustomerDetails(customerDetails: CustomerDetails): void;
  setSiteId(siteId: string): void;
  paymentType: PaymentType;
  setPaymentType(paymentType: PaymentType): void;
  submit(): Promise<Order | null | undefined>;
  addListener(listener: () => void): void;
  removeListener(listener: () => void): void;
};

const ZeroMoney: Money = {
  amount: 0,
  currency: Currency.None
}

const initialState: InitialState = {
  featureFlagForShowingCardPayment: false,
  siteId: null,
  items: [],
  deliveryAddress: null,
  customerDetails: null,
  total: ZeroMoney,
  lastOrder: null,
  orderSubmitting: false,
  paymentType: PaymentType.Card,
  addToBasket: () => {},
  removeFromBasket: () => {},
  updateQuantity: () => {},
  setDeliveryAddress: () => {},
  setCustomerDetails: () => {},
  setSiteId: () => {},
  setPaymentType: () => {},
  submit: async () => {
    return null;
  },
  addListener: () => {},
  removeListener: () => {},
};

enum BasketState {
  Draft,
  Completed,
}

const basketItemsStorageKey = "basket-items-v3";

const BasketContext = createContext(initialState);

export const BasketProvider = ({
  children,
  featureFlagForShowingCardPayment,
}: BasketProviderProps) => {
  const [basketUpdatedListeners, setBasketUpdatedListeners] = useState<Array<() => void>>([]);
  const [state, _setState] = useLocalStorage<BasketState>("bascket-state", BasketState.Draft);
  const [paymentType, _setPaymentType] = useLocalStorage<PaymentType>(
    "basket-payment-type",
    PaymentType.Card
  );
  const [siteId, _setSiteId] = useLocalStorage<string | null>("siteid", null);
  const [customerDetails, _setCustomerDetails] = useLocalStorage<CustomerDetails | null>(
    "basket-customerDetails",
    null
  );
  const [deliveryAddress, _setDeliveryAddress] = useLocalStorage<Address | null>(
    "basket-address",
    null
  );
  const [lastOrder, _setLastOrder] = useLocalStorage<Order | null>("basket-last-order", null);

  const [items, setItems] = useLocalStorage<BasketItem[]>(basketItemsStorageKey, []);
  const [addOrderForMe, { loading: mutLoading, error: mutErrors }] = useMutation(addOrderMutation);

  const calculatetItemSubTotal = (product: ProductDetails, extraOptions: ExtraOption[]) => {
    return (product.price.amount + extraOptions.map(x=>x.price.amount).reduce((acc, curr) => acc + curr, 0))
  }

  const [currency, _setCurrency] = useLocalStorage<Currency>("basket-currency", Currency.None);
  const total: Money = {
    amount: items.reduce((add, item) => {return item.totalItemPrice.amount + add;}, 0),
    currency: currency,
  }

  const reset = () => {
    setItems([]);
  };

  const addToBasket = (product: ProductDetails, quantity: number, extraOptions: ExtraOption[]) => {
    if (siteId && siteId !== "undefined") {
      if (siteId !== product?.siteId) {
        // todo: show warning error
      }
    } else {
      setSiteId(product.siteId);
    }
    if (state === BasketState.Completed) {
      reset();
    }
    if (currency === Currency.None){
      setCurrency(product.price.currency);
    } else if (product.price.currency !== currency || !extraOptions.every(x=>x.price.currency === currency)) {
      throw Error("Can't add an item with different currency in basket!");
    }
    const newItem = {
      guid: window.crypto.randomUUID(),
      product,
      quantity,
      totalItemPrice: {
        amount: calculatetItemSubTotal(product, extraOptions) * quantity,
        currency: product.price.currency
      },
      extraOptions: extraOptions.sort((a, b) => a.id.localeCompare(b.id)),
    };
    setItems([...items, newItem]);
    basketUpdatedListeners.forEach(x => x());
  };

  const removeFromBasket = (product: BasketItem) => {
    var newItems = items.filter(x => x.guid !== product.guid);
    setItems(newItems);
  };
  const updateQuantity = (guid: string, quantity: number) => {
    if (state === BasketState.Completed) {
      reset();
    }
    var item = items.find(x => x.guid === guid);
    if (item) {
      const newItem = {
        guid: guid,
        product: item.product,
        quantity,
        totalItemPrice: {
          amount: calculatetItemSubTotal(item.product, item.extraOptions) * quantity,
          currency: item.totalItemPrice.currency
        },
        extraOptions: item.extraOptions.sort((a, b) => a.id.localeCompare(b.id)),
      };
      const newItems = items.map(x => (x.guid === guid ? newItem : x));
      setItems(newItems);
    }
  };

  const setSiteId = (siteId: string) => {
    _setSiteId(siteId);
  };

  const setCurrency = (currency: Currency) => {
    _setCurrency(currency);
  };

  const setDeliveryAddress = (address: Address) => {
    _setDeliveryAddress(address);
  };

  const setCustomerDetails = (customerDetails: CustomerDetails) => {
    _setCustomerDetails(customerDetails);
  };

  const setPaymentType = (paymentType: PaymentType) => {
    _setPaymentType(paymentType);
  };

  const submit = async () => {
    if (deliveryAddress && siteId && customerDetails && paymentType) {
      const result = await addOrderForMe({
        refetchQueries: [{ query: GetAllOrdersForMeQueryDocument, variables: { first: 5 } }],
        variables: {
          input: {
            items: items.map(x => ({ 
              productId: x.product.id, 
              quantity: x.quantity, 
              extraOptionsIds: x.extraOptions.map(x=>x.id)
            })),
            shippingAddress: deliveryAddress,
            customerDetails: {
              firstName: customerDetails.firstName,
              lastName: customerDetails.lastName,
              email: customerDetails.email,
              phoneNumber: customerDetails.phoneNumber,
            },
            paymentType: paymentType,
            siteId: siteId,
            //customerNotes: '', // TODO: add customer notes
          },
        },
      });

      setCurrency(Currency.None);
      setItems([]);
      const order = result.data?.addOrderForMe.order;
      let orderObject = null;

      if (order?.id) {
        if (order.items?.nodes) {
          orderObject = { ...order, items: order.items.nodes };
          _setLastOrder(orderObject);
        }
      }
      return orderObject;
    }
  };

  const addListener = (listener: () => void) => {
    setBasketUpdatedListeners([...basketUpdatedListeners, listener]);
  };

  const removeListener = (listener: () => void) => {
    setBasketUpdatedListeners([...basketUpdatedListeners.filter(x => x !== listener)]);
  };

  return (
    <BasketContext.Provider
      value={{
        featureFlagForShowingCardPayment,
        items,
        total,
        deliveryAddress,
        customerDetails,
        siteId,
        lastOrder,
        orderSubmitting: mutLoading,
        paymentType,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        setDeliveryAddress,
        setCustomerDetails,
        setSiteId,
        setPaymentType,
        submit,
        addListener,
        removeListener,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
