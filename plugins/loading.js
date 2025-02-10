import { Loading } from 'notiflix'

const notiflix = {
  loading (word = '') {
    Loading.standard(word)
    setTimeout(() => {
      Loading.remove()
    }, 1000)
  }
}

export default ({ app }, inject) => {
  inject('notiflix', notiflix)
}
