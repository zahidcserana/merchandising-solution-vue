import Notifications from './Notifications.vue'

const NotificationStore = {
  state: [], // here the notifications will be added
  settings: {
    overlap: false,
    verticalAlign: 'top',
    horizontalAlign: 'right',
    type: 'info',
    timeout: 5000,
    closeOnClick: true,
    showClose: true
  },
  setOptions (options) {
    this.settings = Object.assign(this.settings, options)
  },
  removeNotification (timestamp) {
    const indexToDelete = this.state.findIndex(n => n.timestamp === timestamp)
    if (indexToDelete !== -1) {
      this.state.splice(indexToDelete, 1)
    }
  },
  addNotification (notification) {
    if (typeof notification === 'string' || notification instanceof String) {
      notification = { message: notification }
    }
    notification.timestamp = new Date()
    notification.timestamp.setMilliseconds(
      notification.timestamp.getMilliseconds() + this.state.length
    )
    notification = Object.assign({}, this.settings, notification)
    this.state.push(notification)
  },
  notify (notification) {
    if (Array.isArray(notification)) {
      notification.forEach(notificationInstance => {
        this.addNotification(notificationInstance)
      })
    } else {
      this.addNotification(notification)
    }
  },
  success () {
    const notificationData = {
      message: `Data successfully saved.`,
      icon: 'nc-icon nc-air-baloon',
      type: 'success'
    }

    if (Array.isArray(notificationData)) {
      notificationData.forEach(notificationInstance => {
        this.addNotification(notificationInstance)
      })
    } else {
      this.addNotification(notificationData)
    }
  },
  danger () {
    const notificationData = {
      message: `Something went wrong.`,
      icon: 'nc-icon nc-note-03',
      horizontalAlign: 'center',
      verticalAlign: 'top',
      type: 'danger'
    }

    if (Array.isArray(notificationData)) {
      notificationData.forEach(notificationInstance => {
        this.addNotification(notificationInstance)
      })
    } else {
      this.addNotification(notificationData)
    }
  },
  warning () {
    const notificationData = {
      message: `Something went wrong.`,
      icon: 'nc-icon nc-app',
      horizontalAlign: 'center',
      verticalAlign: 'top',
      type: 'warning'
    }

    if (Array.isArray(notificationData)) {
      notificationData.forEach(notificationInstance => {
        this.addNotification(notificationInstance)
      })
    } else {
      this.addNotification(notificationData)
    }
  }
}

const NotificationsPlugin = {
  install (Vue, options) {
    let app = new Vue({
      data: {
        notificationStore: NotificationStore
      },
      methods: {
        notify (notification) {
          this.notificationStore.notify(notification)
        }
      }
    })
    Vue.prototype.$notify = app.notify
    Vue.prototype.$notifications = app.notificationStore
    Vue.component('Notifications', Notifications)
    if (options) {
      NotificationStore.setOptions(options)
    }
  }
}

export default NotificationsPlugin
