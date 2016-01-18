import io from 'socket.io-client'

let socket
if (typeof window != 'undefined') {
  socket = io(`${window.location.origin}/`)
  let onevent = socket.onevent
  socket.onevent = function(packet) {
    let args = packet.data || [];
    onevent.call (this, packet)
    packet.data = ["*"].concat(args)
    onevent.call(this, packet)
  }
} else {
  socket = null
}

export default socket
