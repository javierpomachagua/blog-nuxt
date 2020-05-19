export default (context) => {
  console.log('context.store.getters', context.store.getters)
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/auth');
  }
}
