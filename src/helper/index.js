// Facebook pixel events
export const fbAddToCart = (
  content_ids,
  content_type,
  currency = 'USD'
) => {
  if (typeof window !== 'undefined') {
    if (window.fbq != null) {
      window.fbq('track', 'AddToCart', {
        content_ids: content_ids,
        content_type: content_type,
        currency: currency
      });
    }
  }
}

export const snapPageView = () => {
  const userEmail = localStorage.getItem('dor_user_email');
  if (typeof window !== 'undefined') {
    if (window.snaptr) {
      window.snaptr('init', '71a99375-a469-4098-9c78-604a676001cc', {
        'user_email': userEmail
      });
      window.snaptr('track', 'PAGE_VIEW');
    }
  }
}

export const snapAddToCart = () => {
  const userEmail = localStorage.getItem('dor_user_email');
  if (typeof window !== 'undefined') {
    if (window.snaptr) {
      window.snaptr('init', '71a99375-a469-4098-9c78-604a676001cc', {
        'user_email': userEmail
      });
      window.snaptr('track', 'ADD_CART');
    }
  }
}

const API_URL = 'https://tkstudiovn-eval-prod.apigee.net/fedex-api/country/v2/countries/US';

const DEFAULT_OPTIONS = {
  cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *omit
  mode: 'cors', // no-cors, *same-origin
  redirect: 'follow', // *manual, follow, error
  referrer: 'no-referrer' // *client
};

const defaultHeader = () => {
  return {
    Accept: 'application/json',
    'user-agent': 'Mozilla/4.0 MDN',
    'content-type': 'application/json',
    'authorization': 'Bearer l7xx8daef6fbb1724f21b2ada537e059ad7b',
  };
}

export const getPickupDate = () => {
  const method = 'GET';
  const headers =
    defaultHeader();
  const opts = { method, headers, ...DEFAULT_OPTIONS };
  return fetch(`${API_URL}`, opts)
};

export const getDeliveryDate = (data) => {
  const method = 'POST';
  const headers = {
    ...defaultHeader(), ...{
      'x-locale': 'en_US'
    }
  };
  const body = JSON.stringify(data);
  const opts = { method, body,headers, ...DEFAULT_OPTIONS };
  return fetch(`https://tkstudiovn-eval-prod.apigee.net/fedex-api/rate/v2/rates/quotes`, opts)
};

export const getLocation = () => {
  const method = 'GET';

  const opts = { method };
  return fetch(`http://ip-api.com/json`, opts)
};

export const getPostalCode = (lat, lon) => {
  const method = 'GET';

  const opts = { method };
  return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyA8u1MTeHJ128oM7WxIiQZldp_p9T8E3uU', opts)
};

export const deliveryDatesData = {
  rateRequestControlParameters: {
    rateSortOrder: "COMMITASCENDING",
    returnTransitTimes: true,
    variableOptions: null,
    servicesNeededOnRateFailure: false
  },
  requestedShipment: {
    shipper: {
      accountNumber: {
        value: ""
      },
      address: {
        city: "New York",
        postalCode: "10007",
        countryCode: "US",
        streetLines: [
          ""
        ],
        residential: false,
        stateOrProvinceCode: "NY"
      }
    },
    recipients: [
      {
        address: {
          city: '',
          countryCode: '',
          streetLines: [
            ""
          ],
          postalCode: '',
          residential: false,
          stateOrProvinceCode: ""
        }
      }
    ],
    shipTimestamp: '',
    pickupType: "DROPOFF_AT_FEDEX_LOCATION",
    packagingType: "YOUR_PACKAGING",
    shippingChargesPayment: {
      payor: {
        responsibleParty: {
          accountNumber: {
            value: ""
          },
          address: {
            countryCode: "US"
          }
        }
      }
    },
    blockInsightVisibility: false,
    edtRequestType: "NONE",
    rateRequestType: [
      "ACCOUNT",
      "LIST"
    ],
    requestedPackageLineItems: [
      {
        groupPackageCount: 1,
        physicalPackaging: "YOUR_PACKAGING",
        insuredValue: {
          currency: "USD",
          currencySymbol: null,
          amount: 0
        },
        weight: {
          units: "LB",
          value: 1
        }
      }
    ],
    preferredCurrency: "USD",
    customsClearanceDetail: {
      commodities: [
        {
          name: "documents",
          numberOfPieces: 1,
          description: "documents",
          countryOfManufacture: "",
          harmonizedCode: "",
          harmonizedCodeDescription: "",
          itemDescriptionForClearance: "",
          weight: {
            units: "LB",
            value: 1
          },
          quantity: 1,
          quantityUnits: "",
          unitPrice: {
            currency: "USD",
            amount: null,
            currencySymbol: ""
          },
          unitsOfMeasures: [
            {
              category: "",
              code: "",
              name: "",
              value: "",
              originalCode: ""
            }
          ],
          excises: [
            {
              values: [
                ""
              ],
              code: ""
            }
          ],
          customsValue: {
            currency: "USD",
            amount: 1,
            currencySymbol: ""
          },
          exportLicenseNumber: "",
          partNumber: "",
          exportLicenseExpirationDate: "",
          getcIMarksAndNumbers: ""
        }
      ]
    }
  },
  carrierCodes: [
    "FDXG",
    "FDXE"
  ],
  returnLocalizedDateTime: true,
  webSiteCountryCode: "US"
}