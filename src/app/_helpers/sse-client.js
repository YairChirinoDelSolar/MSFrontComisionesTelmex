import { fetchEventSource } from '@microsoft/fetch-event-source'

import { handleError } from '../_utils'

export default class SSEClient {
  constructor({ url }) {
    this.config = { url }
  }

  onOpen(handler) {
    this.handleOpen = handler
  }

  onMessage(handler) {
    this.handleMessage = handler
  }

  onError(handler) {
    this.handleError = handler
  }

  listen() {
    fetchEventSource(this.config.url, {
      onopen: this.handleOpen,
      onmessage: this.handleMessage,
      onerror: this.handleError,
      credentials: 'include'
    }).catch(handleError)
  }
}
