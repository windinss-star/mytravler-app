import React from 'react';

export function LayoutFrame({ title, activeTab, children }) {
  const tabs = [
    { id: 'home', label: '홈', href: '/', icon: '⌂' },
    { id: 'countries', label: '국가', href: '/countries', icon: '◫' },
    { id: 'youtubers', label: '유튜버', href: '/youtubers', icon: '◉' },
    { id: 'more', label: '더보기', href: '/more', icon: '☰' },
  ];

  return React.createElement(
    'html',
    { lang: 'ko' },
    React.createElement(
      'head',
      null,
      React.createElement('meta', { charSet: 'utf-8' }),
      React.createElement('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      }),
      React.createElement('title', null, `${title} | 여행 유튜버 코스`),
      React.createElement(
        'style',
        null,
        `
          :root { color-scheme: dark; --bg: #0b0d10; --surface: #15181d; --surface-soft: #1b2027; --surface-strong: #20262f; --surface-nav: rgba(9,11,14,0.94); --ink: #f8fafc; --muted: #9aa4b2; --line: #262d36; --line-strong: #313a46; --accent: #4f8dff; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", sans-serif; background: var(--bg); color: var(--ink); }
          a { color: inherit; }
          .shell { max-width: 430px; min-height: 100vh; margin: 0 auto; background: linear-gradient(180deg, #0d1014 0%, #090b0e 100%); }
          .content { padding: 20px 20px 108px; }
          .screen { display: grid; gap: 16px; }
          .panel { display: grid; gap: 16px; padding: 20px; border-radius: 24px; background: var(--surface); box-shadow: inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.28); }
          .bottom-nav { position: sticky; bottom: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; padding: 10px 14px 18px; background: var(--surface-nav); backdrop-filter: blur(22px); border-top: 1px solid rgba(255,255,255,0.05); box-shadow: 0 -12px 28px rgba(0,0,0,0.34); }
          .bottom-nav-item { position: relative; display: grid; gap: 4px; justify-items: center; padding: 10px 6px 8px; border-radius: 14px; text-decoration: none; color: #7f8b99; font-size: 12px; font-weight: 600; letter-spacing: -0.01em; }
          .bottom-nav-item.active { color: var(--ink); background: transparent; box-shadow: none; }
          .bottom-nav-item.active::before { content: ""; position: absolute; top: 0; left: 50%; width: 24px; height: 3px; border-radius: 999px; background: var(--ink); transform: translateX(-50%); }
          .bottom-nav-icon { font-size: 18px; line-height: 1; opacity: 0.92; }
        `,
      ),
    ),
    React.createElement(
      'body',
      null,
      React.createElement(
        'div',
        { className: 'shell' },
        React.createElement(
          'div',
          { className: 'content' },
          React.createElement(
            'main',
            { className: activeTab === 'home' ? 'screen' : 'panel' },
            children,
          ),
        ),
        React.createElement(
          'nav',
          { className: 'bottom-nav' },
          ...tabs.map((tab) =>
            React.createElement(
              'a',
              {
                key: tab.id,
                href: tab.href,
                className: activeTab === tab.id ? 'bottom-nav-item active' : 'bottom-nav-item',
              },
              React.createElement('span', { className: 'bottom-nav-icon', 'aria-hidden': 'true' }, tab.icon),
              React.createElement('span', null, tab.label),
            ),
          ),
        ),
      ),
    ),
  );
}
