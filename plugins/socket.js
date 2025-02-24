import io from 'socket.io-client'

export default ({ app }, inject) => {
  const socket = io('http://localhost:8100')
  inject('socket', socket)
}
