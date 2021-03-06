import headless, {
  IP_PRIVATE,
  EVENTS,
  LAN,
  environment,
  EventBus,
  User,
  user,
  ConnectionPool,
  hostName,
  getApplication,
} from 'remoteit-headless'
import electron from 'electron'
import path from 'path'

const iconConnected = path.join(__dirname, 'images', 'iconConnectedTemplate.png')
const iconOffline = path.join(__dirname, 'images', 'iconOfflineTemplate.png')
const iconOnline = path.join(__dirname, 'images', 'iconOnlineTemplate.png')

export default class TrayMenu {
  private tray: any
  private privateIP: ipAddress
  private pool: IConnection[]

  constructor(tray: electron.Tray) {
    this.tray = tray
    this.pool = []
    this.privateIP = IP_PRIVATE

    if (environment.isWindows) {
      this.tray.on('click', () => {
        this.tray.popUpContextMenu()
      })
    }

    EventBus.on(User.EVENTS.signedIn, this.render)
    EventBus.on(User.EVENTS.signedOut, this.render)
    EventBus.on(ConnectionPool.EVENTS.updated, this.updatePool)
    EventBus.on(LAN.EVENTS.privateIP, privateIP => (this.privateIP = privateIP))
  }

  private render = () => {
    const menuItems = user.signedIn ? this.remoteitMenu() : this.signInMenu()
    const contextMenu = electron.Menu.buildFromTemplate(menuItems)
    this.tray.setContextMenu(contextMenu)
  }

  private updatePool = (pool: IConnection[]) => {
    this.pool = pool || []
    this.render()
  }

  private remoteitMenu() {
    return [
      {
        label: 'Open remote.it...',
        type: 'normal',
        click: this.handleOpen,
      },
      {
        label: user.username,
        submenu: [
          {
            label: 'Sign out',
            type: 'normal',
            click: user.signOut,
          },
          {
            label: 'Quit',
            type: 'normal',
            click: electron.app.quit,
          },
        ],
      },
      { type: 'separator' },
      ...this.connectionsMenu(),
    ]
  }

  private connectionsMenu() {
    return this.pool.length
      ? [{ label: 'Connections', enabled: false }, ...this.connectionsList()]
      : [{ label: 'No recent connections', enabled: false }]
  }

  private connectionsList() {
    return this.pool.reduce((result: any[], connection) => {
      if (connection.startTime && connection.owner === user.username) {
        result.push({
          label: connection.name,
          icon: connection.active ? iconConnected : connection.online ? iconOnline : iconOffline,
          submenu: [
            connection.active
              ? { label: 'Disconnect', click: () => this.disconnect(connection) }
              : connection.online
              ? { label: 'Connect', click: () => this.connect(connection) }
              : { label: 'Offline', enabled: false },
            { type: 'separator' },
            { label: hostName(connection), enabled: false },
            { label: 'Copy to clipboard', click: () => this.copy(connection) },
            connection.online
              ? { label: 'Launch', enabled: connection.active, click: () => this.launch(connection) }
              : { label: 'Remove', click: () => EventBus.emit(EVENTS.forget, connection) },
          ],
        })
      }
      return result
    }, [])
  }

  private signInMenu() {
    return [
      { label: 'remote.it', enabled: false },
      {
        label: 'Sign in...',
        type: 'normal',
        click: this.handleOpen,
      },
      {
        label: 'Quit',
        type: 'normal',
        click: electron.app.quit,
      },
    ]
  }

  private handleOpen = (menuItem: any, browserWindow: any, event: any) =>
    EventBus.emit(
      EVENTS.open,
      // Open dev tools when command+option clicked
      process.defaultApp && event.metaKey
    )

  private connect(connection: IConnection) {
    headless.pool.start(connection)
  }

  private disconnect(connection: IConnection) {
    headless.pool.stop(connection, false)
  }

  private copy(connection: IConnection) {
    const app = getApplication(connection.typeID)
    electron.clipboard.writeText(app.copy(connection))
  }

  private launch(connection: IConnection) {
    const app = getApplication(connection.typeID)
    electron.shell.openExternal(app.launch(connection))
  }
}
