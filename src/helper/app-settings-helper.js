import _filter from 'lodash/filter';
import _startsWith from 'lodash/startsWith';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { appSettingPrefix, rushProcessingSetting } from '../data/app-settings';

export const transformAppSettingsResponse = (rawData) => _map(_filter(rawData, item => _startsWith(item.title, appSettingPrefix)), setting => ({
  key: setting.title.split(':')[1],
  value: setting.subTitle
}));

export const getAppSetting = (appSettings, key, fallback) => _get(_find(appSettings, item => item.key === key), 'value', fallback);

export const getRushProcessingSetting = (rawData) => {
  const allSettings = transformAppSettingsResponse(rawData);
  const rushProcessing = getAppSetting(allSettings, rushProcessingSetting, 'false');

  return rushProcessing.toString().toLowerCase() === 'true';
};
