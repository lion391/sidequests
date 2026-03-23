importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBUiQ-p46Y_TykhjhHZL6sgfMhEURmV1hU",
  authDomain: "sideqest-a6c82.firebaseapp.com",
  projectId: "sideqest-a6c82",
  storageBucket: "sideqest-a6c82.firebasestorage.app",
  messagingSenderId: "617838511978",
  appId: "1:617838511978:web:60456c0b4bbc30f448c713"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'SideQuest ⚡', {
    body: body || '',
    icon: icon || 'https://lion391.github.io/sidequests/icon.png',
    badge: 'https://lion391.github.io/sidequests/icon.png',
    vibrate: [200, 100, 200],
    tag: 'sidequests',
    data: { url: 'https://lion391.github.io/sidequests/', ...payload.data }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || 'https://lion391.github.io/sidequests/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('lion391.github.io/sidequests') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
