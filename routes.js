const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

const APP_ROUTES = [{
    name: 'other',
    pattern: '/other/',
    page: 'other',
}, {
  name: 'post',
  pattern: '/post/:id',
  page: 'post',
}, {  
  name: 'index',
  pattern: '/:id',
  page: 'index'
}]

APP_ROUTES.forEach(route => routes.add(route))
