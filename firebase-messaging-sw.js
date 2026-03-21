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

// Background notifications
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || 'SideQuest ⚡', {
    body: body || '',
    icon: icon || '/sidequests/icon.png',
    badge: '/sidequests/icon.png',
    vibrate: [200, 100, 200],
    tag: payload.data?.type || 'sidequests',
    data: payload.data || {}
  });
});

// Click on notification opens the app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('https://lion391.github.io/sidequests/');
    })
  );
});
