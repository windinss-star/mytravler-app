import React from 'react';

export function NotificationSettingsCard({ settings }) {
  return React.createElement(
    'section',
    null,
    React.createElement('h3', null, '알림 설정'),
    React.createElement(
      'ul',
      null,
      ...settings.map((setting) =>
        React.createElement(
          'li',
          { key: setting.id },
          `${setting.label}: ${setting.enabled ? '켜짐' : '꺼짐'}`,
        ),
      ),
    ),
  );
}
