import * as usersData from 'data/users'

export default (action) => {
  let count = window.localStorage.getItem('emulateCount')
  let fakeMsg = usersData.client_patterns[count]

  if (count < usersData.client_patterns.length) {
    count = ++count

    window.localStorage.setItem('emulateCount', count)

    setTimeout(() => {
      action({ type: 'text', data: fakeMsg }, true)
    }, 3000)
  }
  else {
    setTimeout(() => {
      action({ type: 'text', data: 'Сорри, не могу ответить сейчас.' }, true)
    }, 3000)
  }
}