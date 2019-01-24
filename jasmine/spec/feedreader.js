/* feedreader.js */

$(function() {
  // Array of indices - used for randomizstion
  const indices = [0, 1, 2, 3];

  // Generates a random number - used for Index
  function randomIndex() {
    return indices[Math.floor(Math.random() * indices.length)];
  }

  /* Test Suite - "RSS Feeds" */
  describe('RSS Feeds', () => {
    it('are defined', () => {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('has a URL defined', () => {
      allFeeds.forEach(feed => {
        expect(feed.url).toBeDefined();
        expect(typeof feed.url).toEqual('string');
        expect(feed.url.length).toBeGreaterThan(0);
      });
    });

    it('has a name defined', () => {
      allFeeds.forEach(feed => {
        expect(feed.name).toBeDefined();
        expect(typeof feed.name).toEqual('string');
        expect(feed.name.length).toBeGreaterThan(0);
      });
    });
  });

  /* Test Suite - "The menu" */
  describe('The menu', () => {
    it('menu element is hidden by default', () => {
      const isHidden = document.body.classList.contains('menu-hidden');
      expect(isHidden).toBe(true);
    });

    it('menu visibility changes upon menu icon click', () => {
      const menuBtn = document.querySelector('a.menu-icon-link');
      menuBtn.click();
      const menuHiddenAfterFirstClick = document.body.classList.contains('menu-hidden');
      expect(menuHiddenAfterFirstClick).toBe(false);
      menuBtn.click();
      const menuHiddenAfterSecondClick = document.body.classList.contains('menu-hidden');
      expect(menuHiddenAfterSecondClick).toBe(true);
    });
  });

  /* Test Suite - "Initial Entries" */
  describe('Initial Entries', () => {
    // Before running the test, perform setup
    // load feed using a randomly generated index every time
    beforeEach(done => {
      loadFeed(randomIndex(), done);
    });

    it('ensures loadFeed loads all the feed items', () => {
      const feedItems = document.querySelectorAll('article.entry');
      expect(feedItems.length).not.toBe(0);
    });
  });

  /* Test Suite - "New Feed Selection" */
  describe('New Feed Selection', () => {
    let initialFeedIndex, updatedFeedIndex, initialFeedContent, updatedFeedContent;

    // Before running the test, perform setup
    // initially, load a feed using a randomly generated index
    // later, load a different feed using another randomly generated index (different than the initial Index)
    beforeEach(done => {
      // Pick a random index for 'initialFeedIndex'
      initialFeedIndex = randomIndex();
      // Removing the 'initialFeedIndex' from indices array to ensure its not chosen again by the randomizer function 
      const index = indices.indexOf(initialFeedIndex);
      indices.splice(index, 1);
      loadFeed(initialFeedIndex, () => {
        initialFeedContent = document.querySelector('div.feed').innerHTML;
        // Pick a random index for 'updatedFeedIndex'
        updatedFeedIndex = randomIndex();
        loadFeed(updatedFeedIndex, () => {
          updatedFeedContent = document.querySelector('div.feed').innerHTML;
          done();
        });
      });
    });

    it('content changes when a new feed is loaded', () => {
      expect(updatedFeedContent).not.toBe(initialFeedContent);
    });
  });
}());
