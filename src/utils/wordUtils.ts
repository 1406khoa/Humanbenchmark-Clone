// Common English words for the game
const WORDS = [
  'time', 'year', 'people', 'way', 'day', 'man', 'thing', 'woman', 'life', 'child',
  'world', 'school', 'state', 'family', 'student', 'group', 'country', 'problem',
  'hand', 'part', 'place', 'case', 'week', 'company', 'system', 'question', 'work',
  'number', 'point', 'government', 'home', 'water', 'room', 'mother', 'area', 'money',
  'story', 'fact', 'month', 'book', 'eye', 'job', 'word', 'business', 'issue', 'side',
  'kind', 'head', 'house', 'service', 'friend', 'father', 'power', 'hour', 'game',
  'line', 'end', 'member', 'law', 'car', 'city', 'name', 'team', 'minute', 'idea',
  'body', 'information', 'fish', 'back', 'parent', 'face', 'others', 'level', 'office',
  'door', 'health', 'person', 'art', 'war', 'history', 'party', 'result', 'change',
  'morning', 'reason', 'research', 'girl', 'guy', 'moment', 'air', 'teacher', 'force'
];

export function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}