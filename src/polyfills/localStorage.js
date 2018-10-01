// Refer to https://gist.github.com/remy/350433
try {
  // Test webstorage existence.
  if (!window.localStorage || !window.sessionStorage) throw new Error("exception")
  // Test webstorage accessibility - Needed for Safari private browsing.
  localStorage.setItem('storage_test', 1)
  localStorage.removeItem('storage_test')
} catch(e) {
  (function () {
    var Storage = function (type) {
      function createCookie(name, value, days) {
        var date, expires

        if (days) {
          date = new Date()
          date.setTime(date.getTime()+(days*24*60*60*1000))
          expires = "; expires="+date.toGMTString()
        } else {
          expires = ""
        }
        document.cookie = name+"="+value+expires+"; path=/"
      }

      function readCookie(name) {
        var nameEQ = name + "=",
          ca = document.cookie.split(';'),
          i, c

        for (i=0; i < ca.length; i++) {
          c = ca[i]
          while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length)
          }

          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length)
          }
        }
        return null
      }

      function setData(data) {
        // Convert data into JSON and encode to accommodate for special characters.
        data = encodeURIComponent(JSON.stringify(data))
        // Create cookie.
        if (type === 'session') {
          createCookie(getSessionName(), data, 365)
        } else {
          createCookie('localStorage', data, 365)
        }
      }

      function clearData() {
        if (type === 'session') {
          createCookie(getSessionName(), '', 365)
        } else {
          createCookie('localStorage', '', 365)
        }
      }

      function getData() {
        // Get cookie data.
        var data = type === 'session' ? readCookie(getSessionName()) : readCookie('localStorage')
        // If we have some data decode, parse and return it.
        return data ? JSON.parse(decodeURIComponent(data)) : {}
      }

      function getSessionName() {
        // If there is no name for this window, set one.
        // To ensure it's unquie use the current timestamp.
        if(!window.name) {
          window.name = new Date().getTime()
        }
        return 'sessionStorage' + window.name
      }

      // Initialise if there's already data.
      var data = getData()

      return {
        length: 0,
        clear: function () {
          data = {}
          this.length = 0
          clearData()
        },
        getItem: function (key) {
          return data[key] === undefined ? null : data[key]
        },
        key: function (i) {
          // not perfect, but works
          var ctr = 0
          for (var k in data) {
            if (ctr === i) return k
            else ctr++
          }
          return null
        },
        removeItem: function (key) {
          delete data[key]
          this.length--
          setData(data)
        },
        setItem: function (key, value) {
          data[key] = value+''; // forces the value to a string
          this.length++
          setData(data)
        }
      }
    }

    // Replace window.localStorage and window.sessionStorage with out custom
    // implementation.
    var localStorage = new Storage('local')
    var sessionStorage = new Storage('session')
    window.localStorage = localStorage
    window.sessionStorage = sessionStorage
    // For Safari private browsing need to also set the proto value.
    try {
      window.localStorage.__proto__ = localStorage
      window.sessionStorage.__proto__ = sessionStorage
    } catch(e) {
    }
  })()
}