const WAIT_TIME = 60*1000

const login = browser => {
  browser
    .url('https://reg-cue-web-bertha.tm-dev-aws.com/cue-web/#/Login')
    .waitForElementVisible('#form-username', WAIT_TIME)
    .setValue('#form-username', 'dan-vasiliu')
    .setValue('#form-password', 'Silver89')
    .click('#login')
    .waitForElementVisible('welcome-screen-home-panel', WAIT_TIME)
}

const search = browser => {
  browser
    .waitForElementVisible('#panels cue-vertical-tab-item:nth-child(2) > div', WAIT_TIME)
    .click('#panels cue-vertical-tab-item:nth-child(2) > div')
    .waitForElementVisible('#search span.list-name', WAIT_TIME)
    .waitForElementVisible('#search span.search-text', WAIT_TIME)
    .setValue('#search cue-search-field > div > input', 'test')
    .waitForElementVisible('#search span.list-name', WAIT_TIME)
    .waitForElementVisible('#search span.search-text', WAIT_TIME)
}

const homesection = browser => {
  browser
    .click('[title="Sections"]')
    .waitForElementVisible('.destination cf-section-tree-item cf-section-tree-item a span', WAIT_TIME)
}

const inbox = browser => {
  browser
    .click('[title="CUE Inbox"]')
    .pause(3000)
    .execute(function (selector) {
      document.querySelector('cue-inbox').shadowRoot.querySelector(selector).click()
    }, ['.split.CueSection__displayArea h5 + div'])
    .pause(10000)
    .execute(function () {
      let count = document.querySelector('cue-inbox').shadowRoot.querySelector('#sectionInbox #totalItems p').innerText
      return count
    },[],function(res){
      console.log(res.value)
    })
    // .waitForElementVisible('cue-inbox').shadowRoot.querySelector('#sectionInbox').querySelector('#totalItems').querySelector('.count')
}

const new_news = browser => {
  browser
    .click('#top cf-new-content-toggler > button')
    .waitForElementVisible('div.news.selected > button')
    .click('div.news.selected > button')
    .pause(3000)
    .windowHandles(res => {
      browser.assert.equal(res.value.length, 2, 'There are now two window handles')
      const [first, second] = res.value
      browser
        .switchWindow(second)
        .waitForElementVisible('[id*="title"]', WAIT_TIME)
        .setValue('[id*="title"]', 'Title')
        .setValue('[name="body"]', 'this is body')
    })
}

const end = browser => {
  browser.end()
}

module.exports = {
  'login': login,
  // 'search': search,
  // 'homesection': homesection,
  'inbox': inbox,
  // 'open new news': new_news,
  'end': end
}
