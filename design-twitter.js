class mPriorityQueue {

  constructor(objectArr = []) {
    this.heap = [];
    this.buildPriorityQueue(objectArr);
  }

  // Bulk heapify (Floyd’s)
  // tc: O(n)
  // each heapifyDown takes O(logn) but the agregated work takes O(n)
  buildPriorityQueue(objectArr) {
    // this should validate that each element is a object
    this.heap = objectArr;

    const startIdx = Math.floor(this.heap.length / 2) - 1;
    for (let i = startIdx; i >= 0; i--) {
      this._heapifyDown(i);
    }
  }

  _left(i) {
    return 2 * i + 1
  }

  _right(i) {
    return 2 * i + 2
  }

  _parent(i) {
    return Math.floor((i - 1) / 2)
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  _heapifyUp(i) {
    while (i > 0 && this.heap[this._parent(i)].priority < this.heap[i].priority) {
      let p = this._parent(i);
      this._swap(p, i);
      i = p;
    }
  }

  _heapifyDown(i) {
    let heap = this.heap;

    while (true) {
      let left = this._left(i);
      let right = this._right(i);
      let highest = i;

      if (left < heap.length && heap[highest].priority < heap[left].priority) highest = left;
      if (right < heap.length && heap[highest].priority < heap[right].priority) highest = right;

      if (highest === i) break;
      this._swap(i, highest);
      i = highest;
    }
  }

  insert(value, priority) {
    this.heap.push({ value, priority });
    this._heapifyUp(this.heap.length - 1);
  }

  peek() {
    return this.heap[0].value;
  }

  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop().value;

    let top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);

    return top.value;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

}


var Twitter = function () {
  this.usersTweets = new Map();
  this.usersFollowees = new Map();
  this.dateId = 0;
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */

Twitter.prototype.postTweet = function (userId, tweetId) {

  let tweets = this.usersTweets.get(userId) || [];
  this.dateId++;
  tweets.push([this.dateId, tweetId]);

  this.usersTweets.set(userId, tweets);
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  let heap = new mPriorityQueue();
  let followees = new Set(this.usersFollowees.get(userId) || []);
  followees.add(userId);

  for (const followeeId of followees) {
    const followeeTweets = this.usersTweets.get(followeeId) || [];
    for (let i = followeeTweets.length - 1; i >= Math.max(0, followeeTweets.length - 10); i--) {
      let [dateId, tweet] = followeeTweets[i];
      heap.insert([dateId, tweet], -dateId);
      if (heap.size() > 10) heap.pop();
    }
  }

  let feed = [];
  while (!heap.isEmpty() && feed.length < 10) {
    feed.push(heap.pop()[1]);
  }

  return feed.reverse();
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  if (followerId === followeeId) return;
  let followees = this.usersFollowees.get(followerId) || (new Set());
  followees.add(followeeId);
  this.usersFollowees.set(followerId, followees);
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  let followees = this.usersFollowees.get(followerId);
  if (!followees) return;
  followees.delete(followeeId);

};

// var obj = new Twitter()
// obj.postTweet(1, 11);
// obj.postTweet(2, 21);
// obj.postTweet(1, 12);
// var param_2 = obj.getNewsFeed(1);
// console.log(param_2);
// obj.follow(2, 6)
// obj.postTweet(6, 61);
// obj.follow(2, 8)
// obj.postTweet(8, 81);
// obj.unfollow(2, 8)
// obj.postTweet(8, 82);
// console.log(obj.getNewsFeed(2));
// console.log(obj);


var twitter = new Twitter()
twitter.postTweet(1, 4); // User 1 posts a new tweet (id = 5).
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
console.log(twitter.getNewsFeed(1));  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
console.log(twitter.getNewsFeed(1));  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2);  // User 1 unfollows user 2.

console.log(twitter.getNewsFeed(1));  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.

console.log(twitter);

// tc: for getNewsFeed:
// O(F * 10 * log 10) + O(log10 + 10) => O(F)

// Let F = number of followees
// You scan up to F * 10 tweets
// Each insert into heap is log 10, and heap is capped at 10
// the pop for res and the reverse takes O(log10 + 10) -> O(1)

// sc: heap size = feed size = O(10) -> O(1)
// followee size = O(F)




