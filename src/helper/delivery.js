import _map from 'lodash/map';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _isEmpty from 'lodash/isEmpty';
import _union from 'lodash/union';
import _set from 'lodash/set';
import _compact from 'lodash/compact';
import moment from 'moment';

import { getPickupDate, getDeliveryDate, getPostalCode, getIP, getDeliveryRequest } from './index';

const _transformDeliverData = (ship, delivery) => ([
  {
    key: 'Ship date',
    value: ship.format('MMMM Do YYYY')
  },
  {
    key: 'Delivery date',
    value: delivery.format('MMMM Do YYYY')
  }
]);

export const calculateShipAndDeliverDate = (deliveryDate, firstDateOfDelivery) => {
  if (_isEmpty(deliveryDate) || deliveryDate === null || _isEmpty(firstDateOfDelivery)) {
    return [];
  }

  const firstDelivery = moment(firstDateOfDelivery);
  const today = moment();
  const gap = Math.ceil(moment.duration(firstDelivery.diff(today)).asDays());

  const delivery = moment(deliveryDate);
  let ship = moment(delivery).subtract(gap, 'days');

  if (ship < today) {
    ship = today;
  }

  return _transformDeliverData(ship, delivery);
}

const _getUniqueKey = () => `fedex_deliver_dates_${new Date().getDate()}-${new Date().getHours()}`; // Cache for 1 hour in session storage

const _sessionStorageSave = (dates) => {
  if (typeof window.sessionStorage !== 'undefined') {
    window.sessionStorage.setItem(_getUniqueKey(), JSON.stringify(dates));
  }
};

const _getDatesFromStorage = () => {
  if (typeof window.sessionStorage !== 'undefined') {
    try {
      const data = JSON.parse(window.sessionStorage.getItem(_getUniqueKey()));

      if (_isEmpty(data) === true) {
        return [];
      }
  
      return data;
    } catch {
      return [];
    }
  }
};

const _findSomethingFromGooglePlace = (
	googlePlace,
	fieldText
) => {
	const components = googlePlace.address_components;

	const results = _filter(
		components,
		(addressComponent) =>
			_includes(addressComponent.types, fieldText)
	);

	return _get(results, '[0].long_name', '');
};

const fetchUserCountryLocation = () => {
	return new Promise(resolve => {
		getIP().then(res => res.json().then(ipResponse => {
			let receiver = {};
			const countryCode = _get(ipResponse, 'country_code', '');
			const city = _get(ipResponse, 'city', '');
			const postalCode = _get(ipResponse, 'postal', '');
			_set(receiver, 'countryCode', countryCode);
			_set(receiver, 'city', city);

      if (_isEmpty(postalCode) === false) {
        receiver = {
          ...receiver,
          postalCode
        }
      }

			if (_isEmpty(receiver.countryCode) || _isEmpty(receiver.postalCode)) {
				const lng = _get(ipResponse, 'longitude', 0);
				const lat = _get(ipResponse, 'latitude', 0);
	
				if (lat !== 0 && lng !== 0) {
					getPostalCode(lat, lng).then(res => res.json().then(response => {
            const allCandidates = _compact(_map(response.results, (item) => _findSomethingFromGooglePlace(item, 'postal_code')));
						const postalCodeRes = _get(allCandidates, 0, '');
						if (_isEmpty(postalCodeRes) === false) {
              receiver = {
                ...receiver,
                postalCode: postalCodeRes
              }

              resolve(receiver);
						}
					}))
				} else {
          resolve({});
        }
			} else {
        resolve(receiver);
      }
		})).catch(() => resolve({}));
	})
}

export const processFedExCalendar = () => {
	return new Promise(resolve => {
    const cache = _getDatesFromStorage();

    if (_isEmpty(cache) === false) {
      resolve(cache);
    } else {
      getPickupDate().then(data => data.json().then(pickupResponse => {
        const theDate = _get(pickupResponse, 'output.allowedShipDates[0].shipDates[0]', '');
    
        if (_isEmpty(theDate) === false) {
          // get user IP address to see where are they
          fetchUserCountryLocation().then(receiver => {
            if (_isEmpty(receiver) === false && _isEmpty(receiver.countryCode) === false && _isEmpty(receiver.postalCode) === false) {
              const request = getDeliveryRequest(receiver.countryCode, receiver.city, receiver.postalCode, theDate);
    
              getDeliveryDate(request).then(res => res.json().then(responseFedex => {
                const dateResultsItems = _get(responseFedex, 'output.rateReplyDetails', []);
                const days = _union(_map(dateResultsItems, 'commit.dateDetail.day'));
                _sessionStorageSave(days);
                resolve(days);
              })).catch(() => resolve([]));
            }
          }).catch(() => resolve([]));
        }
      })).catch(() => resolve([]));
    }
	});
};