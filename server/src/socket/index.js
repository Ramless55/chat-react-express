export const socketHandler = (io) => {
  io.on('connection', socket => {
    socket.on('message', (body, name) => {
      socket.broadcast.emit('messageFrontend', {
        body,
        from: name
      })
    })
  })
}